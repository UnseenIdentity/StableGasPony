// Circle Wallet Service using CDN version of Circle SDK
// This avoids Node.js compatibility issues in the browser

import { getAppServerUrl, isProduction } from '../config/circleConfig';

class CircleWalletServiceCDN {
  constructor() {
    this.apiBase = getAppServerUrl();
    this.appId = null;
    this.userToken = null;
    this.encryptionKey = null;
    this.userId = null;
    this.wallets = [];
    this.sdk = null;
    this.isProduction = isProduction();
    this.sdkLoaded = false;
  }

  // Load SDK from CDN
  async loadSDK() {
    if (this.sdkLoaded) return true;
    
    try {
      // Load Circle SDK from CDN
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@circle-fin/w3s-pw-web-sdk@latest/dist/index.umd.js';
      script.async = true;
      
      return new Promise((resolve, reject) => {
        script.onload = () => {
          this.sdk = window.WalletSdk;
          this.sdkLoaded = true;
          resolve(true);
        };
        script.onerror = () => reject(new Error('Failed to load Circle SDK'));
        document.head.appendChild(script);
      });
    } catch (error) {
      console.error('Failed to load Circle SDK:', error);
      return false;
    }
  }

  // Initialize the service with app ID
  async initialize() {
    try {
      // Load SDK first
      await this.loadSDK();
      
      const response = await fetch(`${this.apiBase}/app_id`);
      const data = await response.json();
      this.appId = data.appId;
      
      // Initialize SDK
      this.sdk = new this.sdk();
      this.sdk.setAppSettings({ 
        appId: this.appId,
        environment: this.isProduction ? 'production' : 'sandbox'
      });
      
      return { success: true, appId: this.appId };
    } catch (error) {
      console.error('Failed to initialize Circle service:', error);
      return { success: false, error: error.message };
    }
  }

  // Set authentication credentials
  setAuthentication(userToken, encryptionKey, userId = null) {
    this.userToken = userToken;
    this.encryptionKey = encryptionKey;
    if (userId) this.userId = userId;
    
    if (this.sdk) {
      this.sdk.setAuthentication({ userToken, encryptionKey });
    }
  }

  // Create new user and wallet
  async createNewUser() {
    try {
      // Create user
      const userResponse = await fetch(`${this.apiBase}/create_user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const userData = await userResponse.json();
      const newUserId = userData.userId;
      
      // Get user token
      const tokenResponse = await fetch(`${this.apiBase}/get_user_token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: newUserId })
      });
      const tokenData = await tokenResponse.json();
      
      // Set authentication
      this.setAuthentication(tokenData.userToken, tokenData.encryptionKey, newUserId);
      
      // Initialize wallet
      const walletResult = await this.initializeWallet();
      
      return { 
        success: true, 
        userId: newUserId,
        userToken: tokenData.userToken,
        encryptionKey: tokenData.encryptionKey,
        walletInitialized: walletResult.success
      };
    } catch (error) {
      console.error('Failed to create new user:', error);
      return { success: false, error: error.message };
    }
  }

  // Import existing wallet
  async importWallet(userId) {
    try {
      const response = await fetch(`${this.apiBase}/get_user_token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await response.json();
      
      this.setAuthentication(data.userToken, data.encryptionKey, userId);
      
      // Fetch user status and wallets
      await this.fetchUserStatusAndWallets();
      
      return { success: true, userId, userToken: data.userToken, encryptionKey: data.encryptionKey };
    } catch (error) {
      console.error('Failed to import wallet:', error);
      return { success: false, error: error.message };
    }
  }

  // Login with email
  async loginWithEmail() {
    try {
      if (!this.sdk) {
        await this.initialize();
      }
      
      const deviceId = this.sdk.getDeviceId();
      const response = await fetch(`${this.apiBase}/get_otp_tokens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId })
      });
      const { deviceToken, encryptionKey: encKey, otpToken } = await response.json();
      
      this.encryptionKey = encKey;
      this.sdk.setAuthentication({ userToken: deviceToken, encryptionKey: encKey });
      
      return new Promise((resolve, reject) => {
        this.sdk.verifyOTP(
          otpToken,
          async (verifyType) => {
            // For demo purposes, use prompt; in production, implement proper UI
            if (verifyType.toUpperCase() === 'EMAIL') {
              return prompt('Enter your email');
            } else {
              return prompt('Enter the OTP sent to your email');
            }
          },
          (error) => reject(new Error(`Login error: ${error}`)),
          (result) => {
            this.userToken = result.userToken;
            this.setAuthentication(result.userToken, encKey);
            resolve({ success: true, userToken: result.userToken, encryptionKey: encKey });
          }
        );
      });
    } catch (error) {
      console.error('Failed to login with email:', error);
      return { success: false, error: error.message };
    }
  }

  // Initialize wallet
  async initializeWallet() {
    try {
      const response = await fetch(`${this.apiBase}/initialize_wallet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userToken: this.userToken })
      });
      const data = await response.json();
      const challengeId = data.challengeId;
      
      return await this.executeChallenge(challengeId, 'Wallet initialized successfully!');
    } catch (error) {
      console.error('Failed to initialize wallet:', error);
      return { success: false, error: error.message };
    }
  }

  // Fetch user status and wallets
  async fetchUserStatusAndWallets() {
    try {
      if (!this.sdk || !this.userToken) {
        throw new Error('SDK not initialized or user not authenticated');
      }
      
      const statusRes = await this.sdk.getUserStatus({ userToken: this.userToken });
      this.userId = statusRes.data.id;
      
      const walletsResponse = await fetch(`${this.apiBase}/get_wallets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: this.userId })
      });
      const walletsData = await walletsResponse.json();
      this.wallets = walletsData.wallets || [];
      
      return { success: true, userId: this.userId, wallets: this.wallets };
    } catch (error) {
      console.error('Failed to fetch user status and wallets:', error);
      return { success: false, error: error.message };
    }
  }

  // Get wallet balance
  async getWalletBalance(walletId = null) {
    try {
      const targetWalletId = walletId || (this.wallets[0]?.id);
      if (!targetWalletId) {
        throw new Error('No wallet available');
      }
      
      const response = await fetch(`${this.apiBase}/get_balance/${targetWalletId}`);
      const data = await response.json();
      
      return { success: true, balance: data.tokenBalances || [] };
    } catch (error) {
      console.error('Failed to get wallet balance:', error);
      return { success: false, error: error.message };
    }
  }

  // Transfer USDC
  async transferUSDC(amount, destinationWalletId, sourceWalletId = null) {
    try {
      const walletId = sourceWalletId || (this.wallets[0]?.id);
      if (!walletId) {
        throw new Error('No source wallet available');
      }
      
      const response = await fetch(`${this.apiBase}/create_transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userToken: this.userToken, 
          walletId, 
          amount,
          destinationWalletId 
        })
      });
      const data = await response.json();
      const challengeId = data.challengeId;
      
      return await this.executeChallenge(challengeId, 'Transfer completed successfully!');
    } catch (error) {
      console.error('Failed to transfer USDC:', error);
      return { success: false, error: error.message };
    }
  }

  // Execute challenge (PIN verification, etc.)
  async executeChallenge(challengeId, successMessage) {
    try {
      if (!this.sdk) {
        throw new Error('SDK not initialized');
      }
      
      return new Promise((resolve, reject) => {
        this.sdk.execute(
          challengeId,
          async (verifyType) => {
            // For demo purposes, use prompt; in production, implement proper UI
            return prompt(`Enter your ${verifyType}`);
          },
          (error) => reject(new Error(`Challenge execution error: ${error}`)),
          () => {
            resolve({ success: true, message: successMessage });
          }
        );
      });
    } catch (error) {
      console.error('Failed to execute challenge:', error);
      return { success: false, error: error.message };
    }
  }

  // Get current user info
  getCurrentUser() {
    return {
      userId: this.userId,
      userToken: this.userToken,
      hasWallet: this.wallets.length > 0,
      walletCount: this.wallets.length
    };
  }

  // Get current wallets
  getCurrentWallets() {
    return this.wallets;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!(this.userToken && this.encryptionKey);
  }

  // Logout
  logout() {
    this.userToken = null;
    this.encryptionKey = null;
    this.userId = null;
    this.wallets = [];
    this.sdk = null;
  }
}

export default new CircleWalletServiceCDN();
