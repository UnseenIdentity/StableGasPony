// Circle Wallet Configuration
// Update these values with your actual Circle API credentials and wallet IDs

// Helper function to safely get environment variables
const getEnvVar = (key, fallback) => {
  try {
    return import.meta.env[key] || fallback;
  } catch (error) {
    console.warn(`Environment variable ${key} not accessible, using fallback:`, fallback);
    return fallback;
  }
};

export const CIRCLE_CONFIG = {
  // Application Server Configuration
  APP_SERVER_URL: getEnvVar('VITE_APP_SERVER_URL', 'http://localhost:8000'),
  
  // Environment (sandbox or production)
  ENVIRONMENT: getEnvVar('VITE_CIRCLE_ENV', 'sandbox'),
  
  // Your Circle Wallet ID (where payments will be sent)
  DESTINATION_WALLET_ID: getEnvVar('VITE_CIRCLE_DESTINATION_WALLET', 'your-actual-circle-wallet-id'),
  
  // Supported currencies
  SUPPORTED_CURRENCIES: ['USD', 'USDC'],
  
  // Default payment settings
  DEFAULT_PAYMENT: {
    currency: 'USD',
    amount: '0.23', // Default group joining fee
    description: 'Group Payment - FocusSync'
  },
  
  // Wallet settings
  WALLET: {
    description: 'User Wallet',
    idempotencyKey: true
  },
  
  // Transfer settings
  TRANSFER: {
    autoMint: true, // Automatically mint USDC if needed
    retryAttempts: 3,
    timeout: 30000 // 30 seconds
  }
};

// Helper function to get application server URL
export const getAppServerUrl = () => {
  return CIRCLE_CONFIG.APP_SERVER_URL;
};

// Helper function to get destination wallet ID
export const getDestinationWalletId = () => {
  return CIRCLE_CONFIG.DESTINATION_WALLET_ID;
};

// Helper function to check if running in production
export const isProduction = () => {
  return CIRCLE_CONFIG.ENVIRONMENT === 'production';
};

export default CIRCLE_CONFIG;
