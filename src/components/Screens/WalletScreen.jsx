import React, { useState, useEffect } from 'react';
import PrimaryButton from '../UI/PrimaryButton';
import Toast from '../UI/Toast';
import CircleWalletModal from '../UI/CircleWalletModal';
import { getDestinationWalletId } from '../../config/circleConfig';

const WalletScreen = ({ onScreenChange }) => {
  const [currentScreen, setCurrentScreen] = useState('join');
  const [timeLeft, setTimeLeft] = useState(2 * 3600 + 12 * 60 + 34); // 2h 12m 34s
  const [agreeRules, setAgreeRules] = useState(false);
  const [autoAuthorize, setAutoAuthorize] = useState(false);
  const [agreePayout, setAgreePayout] = useState(false);
  const [joinedUsers, setJoinedUsers] = useState(6);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showQuote, setShowQuote] = useState(false);
  const [selectedToken, setSelectedToken] = useState('PYUSD');
  const [toast, setToast] = useState({ message: '', type: 'success', isVisible: false });
  const [showCircleWalletModal, setShowCircleWalletModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('0.23');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    if (seconds <= 0) return 'Expired!';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const showCustomModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type, isVisible: true });
  };

  const joinGroup = () => {
    if (!agreeRules) {
      showToast('Please agree to the rules to join the group.', 'error');
      return;
    }

    // Show Circle wallet modal for payment
    setShowCircleWalletModal(true);
  };

  const handlePaymentSuccess = (transferResult) => {
    showToast('Payment successful! Welcome to the group!', 'success');
    setJoinedUsers(prev => prev + 1);
    setShowCircleWalletModal(false);
    
    // You could also navigate to a success screen or update the UI
    // onScreenChange('success-screen');
  };

  const handlePaymentError = (error) => {
    showToast(`Payment failed: ${error}`, 'error');
    setShowCircleWalletModal(false);
  };

  const getQuote = () => {
    showToast('Getting quote...', 'info');
    setTimeout(() => {
      setShowQuote(true);
      showToast('Quote received!');
    }, 1500);
  };

  const connectProvider = (provider) => {
    showToast(`Connecting to ${provider}...`, 'info');
    setTimeout(() => {
      showToast(`${provider} connected successfully!`);
    }, 2500);
  };

  const cashOut = () => {
    if (!agreePayout) {
      showToast('Please agree to the terms to cash out.', 'error');
      return;
    }

    showToast(`Cashing out ${selectedToken}...`, 'success');
    setTimeout(() => {
      showToast('Cash out completed!');
    }, 3000);
  };

  const renderJoinScreen = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => onScreenChange('task-setup-screen')}
          className="text-blue-400 hover:text-blue-300 text-lg font-bold"
        >
          ←
        </button>
        <h2 className="text-blue-400 text-2xl font-bold">Join Group</h2>
      </div>
      <p className="text-sm text-gray-300 mb-2">Time-Limited Group Available</p>
      <p className="font-semibold text-lg mb-2 text-white">Group ID: #FocusSync_8973</p>
      <p className="text-md text-gray-300 mb-2">
        Matched Tags: 
        <span className="bg-blue-900 text-blue-200 px-2 py-1 rounded-full text-xs font-medium ml-2">✍️ Deep</span>
        <span className="bg-purple-900 text-purple-200 px-2 py-1 rounded-full text-xs font-medium ml-2">🎧 Immersive</span>
      </p>
      <p className="text-md text-gray-300 mb-4">
        Payment Token: <span className="font-bold text-yellow-400">💎 PYUSD</span>
      </p>
      <p className="text-green-400 font-semibold mb-2">
        {joinedUsers} of 10 users joined | Min threshold: 8 users
      </p>
      <p className="text-gray-300 mb-4">
        Time limit: <span className="font-bold text-red-400">{formatTime(timeLeft)}</span>
      </p>

      <div className="card bg-white/10 backdrop-blur-sm rounded-xl p-4 my-2 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg border border-white/20">
        <span className="font-medium text-gray-300">🔒 Collateral:</span>
        <span className="text-blue-400 font-semibold ml-2">0.115 PYUSD</span>
      </div>
      
      <div className="card bg-white/10 backdrop-blur-sm rounded-xl p-4 my-2 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg border border-white/20">
        <span className="font-medium text-gray-300">⛽ Gas Plan:</span>
        <span className="text-green-400 font-semibold ml-2">Original $12.50 | Batched $2.10 | Discount -$1.50</span>
      </div>
      
      <p className="text-xl font-bold text-white my-4">
        Discounted Price: <span className="text-blue-400">0.23 PYUSD</span>
      </p>

      <label className="flex items-center text-sm text-gray-300 my-2 cursor-pointer">
        <input
          type="checkbox"
          checked={agreeRules}
          onChange={(e) => setAgreeRules(e.target.checked)}
          className="mr-2 h-4 w-4 text-blue-400 rounded focus:ring-blue-400 accent-blue-400"
        />
        Agree to Rules 
        <button
          onClick={() => showCustomModal('Rules', 'Here are the rules for joining this group: <br>1. Be respectful. <br>2. Adhere to the time limits. <br>3. Collateral will be forfeited if rules are broken.')}
          className="text-blue-400 hover:text-blue-300 ml-1 underline"
        >
          View
        </button>
      </label>
      
      <label className="flex items-center text-sm text-gray-300 my-2 cursor-pointer">
        <input
          type="checkbox"
          checked={autoAuthorize}
          onChange={(e) => setAutoAuthorize(e.target.checked)}
          className="mr-2 h-4 w-4 text-blue-400 rounded focus:ring-blue-400 accent-blue-400"
        />
        Auto-authorize
      </label>

      <PrimaryButton onClick={joinGroup} className="w-full">
        Join & Pay 50%
      </PrimaryButton>
      
      <button
        onClick={() => setCurrentScreen('fund')}
        className="w-full bg-gradient-to-r from-gray-400 to-gray-600 text-white font-bold py-3 px-6 rounded-full mt-2 transition-all duration-300 hover:from-gray-600 hover:to-gray-800 hover:scale-105 shadow-lg"
      >
        Next Groups
      </button>
    </div>
  );

  const renderFundScreen = () => (
    <div className="space-y-4">
      <h2 className="text-blue-400 text-2xl font-bold mb-4">← Fund Management</h2>
      <p className="text-md text-gray-300 mb-4">Here you can explore and manage other available groups.</p>

      <div className="card bg-white/10 backdrop-blur-sm rounded-xl p-4 my-2 shadow-md border border-white/20">
        <h3 className="font-semibold text-lg mb-2 text-white">Available Groups</h3>
        <ul className="list-disc list-inside text-gray-300 text-sm">
          <li className="mb-1">#CodeFlow_9001 - ✍️ Dev + 🚀 Fast</li>
          <li className="mb-1">#ArtZone_7654 - 🎨 Creative + ✨ Vibrant</li>
          <li className="mb-1">#StudyBoost_1122 - 📚 Focus + 💡 Insight</li>
        </ul>
        <button
          onClick={() => showToast('Loading more groups...', 'info')}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-full mt-4 hover:bg-blue-700 transition-all duration-200"
        >
          Load More
        </button>
      </div>

      <button
        onClick={() => setCurrentScreen('join')}
        className="w-full bg-gray-400 text-white font-bold py-3 px-6 rounded-full mt-4 hover:bg-gray-600 transition-all duration-300 shadow-lg"
      >
        Back to Join Group
      </button>
      
      <button
        onClick={() => setCurrentScreen('treasury')}
        className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-full mt-2 hover:bg-blue-700 transition-all duration-300 shadow-lg"
      >
        Go to Treasury
      </button>
    </div>
  );

  const renderTreasuryScreen = () => (
    <div className="space-y-4">
      <h2 className="text-blue-400 text-2xl font-bold mb-4">← Treasury Management</h2>
      <p className="font-semibold text-lg mb-4">
        Balance: <span className="text-green-400">45.67 PYUSD</span>
      </p>

      <label htmlFor="token-out" className="block text-sm font-medium text-gray-300 mb-1">
        Select Token for Cash Out:
      </label>
      <select
        id="token-out"
        value={selectedToken}
        onChange={(e) => setSelectedToken(e.target.value)}
        className="w-full p-2 border border-gray-600 rounded-lg mb-4 focus:ring-blue-400 focus:border-blue-400 bg-gray-800 text-white"
      >
        <option>PYUSD</option>
        <option>USDC</option>
        <option>USD</option>
      </select>
      
      <button
        onClick={getQuote}
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-full mb-4 hover:bg-blue-700 transition-all duration-200 shadow-md"
      >
        Get Quote
      </button>

      {showQuote && (
        <div className="card bg-blue-900/30 backdrop-blur-sm rounded-xl p-4 my-2 shadow-md transition-all duration-200 border border-blue-500/30">
          <span className="font-medium text-blue-300">Quote:</span>
          Gross <span className="font-bold text-green-400">$45.67</span> | 
          Fees <span className="font-bold text-red-400">$1.25</span> | 
          Net <span className="font-bold text-green-400">$44.42</span>
        </div>
      )}

      <h3 className="font-semibold text-lg mt-6 mb-3 text-white">Connect Providers</h3>
      <button
        onClick={() => connectProvider('Circle')}
        className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-full mb-2 hover:bg-indigo-700 transition-all duration-200 shadow-md"
      >
        Connect Circle
      </button>
      
      <button
        onClick={() => connectProvider('PayPal')}
        className="w-full bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4 hover:bg-blue-900 transition-all duration-200 shadow-md"
      >
        Connect PayPal
      </button>

      <label className="flex items-center text-sm text-gray-300 my-2 cursor-pointer">
        <input
          type="checkbox"
          checked={agreePayout}
          onChange={(e) => setAgreePayout(e.target.checked)}
          className="mr-2 h-4 w-4 text-blue-400 rounded focus:ring-blue-400 accent-blue-400"
        />
        Agree to Terms 
        <button
          onClick={() => showCustomModal('Terms and Conditions', 'Please read our comprehensive terms and conditions before proceeding with the payout.')}
          className="text-blue-400 hover:text-blue-300 ml-1 underline"
        >
          View
        </button>
      </label>
      
      <button
        onClick={cashOut}
        className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-full mt-4 hover:bg-green-700 transition-all duration-300 shadow-lg"
      >
        Cash Out
      </button>

      <h3 className="font-semibold text-lg mt-6 mb-3 text-white">History Log</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse my-4 text-sm">
          <thead>
            <tr className="bg-blue-900/30 text-blue-200 font-medium">
              <th className="p-2 border-b border-gray-600">ID</th>
              <th className="p-2 border-b border-gray-600">Time</th>
              <th className="p-2 border-b border-gray-600">Token</th>
              <th className="p-2 border-b border-gray-600">Amount</th>
              <th className="p-2 border-b border-gray-600">Destination</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr>
              <td className="p-2 border-b border-gray-600">co_abc123</td>
              <td className="p-2 border-b border-gray-600">2025-08-16</td>
              <td className="p-2 border-b border-gray-600">USD</td>
              <td className="p-2 border-b border-gray-600">498.75</td>
              <td className="p-2 border-b border-gray-600">Circle: xxx</td>
            </tr>
            <tr>
              <td className="p-2 border-b border-gray-600">co_xyz456</td>
              <td className="p-2 border-b border-gray-600">2025-08-15</td>
              <td className="p-2 border-b border-gray-600">PYUSD</td>
              <td className="p-2 border-b border-gray-600">0.23</td>
              <td className="p-2 border-b border-gray-600">Wallet</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <button
        onClick={() => setCurrentScreen('join')}
        className="w-full bg-gray-400 text-white font-bold py-3 px-6 rounded-full mt-4 hover:bg-gray-600 transition-all duration-300 shadow-lg"
      >
        Back to Join Group
      </button>
    </div>
  );

  return (
    <div className="screen h-full flex flex-col">
      <div className="flex-1 overflow-y-auto px-3 sm:px-5 pt-4 pb-4">
        <div className="space-y-4">
          {currentScreen === 'join' && renderJoinScreen()}
          {currentScreen === 'fund' && renderFundScreen()}
          {currentScreen === 'treasury' && renderTreasuryScreen()}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-around py-4 bg-white/10 backdrop-blur-sm border-t border-white/10">
        <button className="flex flex-col items-center gap-1 text-white/70">
          ⏰
          <span className="text-xs">Flow Check</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-white/70">
          🎯
          <span className="text-xs">Action Pools</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">{modalTitle}</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div 
              className="text-gray-700 mb-6"
              dangerouslySetInnerHTML={{ __html: modalMessage }}
            />
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />

      {/* Circle Wallet Modal */}
      <CircleWalletModal
        isVisible={showCircleWalletModal}
        onClose={() => setShowCircleWalletModal(false)}
        amount={paymentAmount}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        destinationWalletId={getDestinationWalletId()}
      />
    </div>
  );
};

export default WalletScreen;
