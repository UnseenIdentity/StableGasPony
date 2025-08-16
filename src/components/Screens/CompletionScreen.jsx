import React from 'react';
import { useAppContext } from '../../context/AppContext';
import PrimaryButton from '../UI/PrimaryButton';
import FocusTimeline from '../UI/FocusTimeline';

const CompletionScreen = ({ onScreenChange }) => {
  const { 
    taskName, 
    vibeSignature, 
    selectedTags, 
    costTags, 
    resetTaskSetup,
    addSession 
  } = useAppContext();

  const completionStats = [
    { label: 'Total Time Focused:', value: '37 min', isLarge: true },
    { label: 'Time Earned:', value: '+4.2 Presence Tokens' },
    { label: 'Sync Rating:', value: 'High Resonance (8 users)' },
    { label: 'Vibe Signature:', value: vibeSignature }
  ];

  const actionStreaks = [
    { type: 'light-blue', label: '5m', width: '15%', left: '0%' },
    { type: 'green', label: '15m', width: '40%', left: '15%' },
    { type: 'orange', label: '12m', width: '30%', left: '55%' },
    { type: 'red', label: '5m', width: '15%', left: '85%' }
  ];

  const getVibeEmoji = () => {
    const vibeEmojis = {
      'Calm': '😌',
      'Focus': '🎯',
      'Creative': '🎨',
      'Energetic': '⚡'
    };
    return vibeEmojis[vibeSignature] || '😌';
  };

  const saveSession = () => {
    // Store session patterns for offline mode
    const sessionData = {
      timestamp: Date.now(),
      duration: 2220, // 37 minutes in seconds
      intensity: vibeSignature.toLowerCase(),
      tokens: 4.2,
      taskName,
      selectedTags,
      costTags
    };
    
    addSession(sessionData);
    
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  const handleNewTask = () => {
    resetTaskSetup();
    onScreenChange('welcome-screen');
  };

  return (
    <div className="screen">
      {/* Main Content Area - Scrollable with proper height and width */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-5 pt-4 pb-4 w-full" style={{ height: 'calc(100vh - 80px)' }}>
        <div className="text-center my-6 sm:my-8 w-full">
          <h1 className="text-[36px] mb-2.5">✅</h1>
          <h2 className="text-2xl font-bold text-white">Task Complete!</h2>
        </div>

        <div className="bg-gradient-to-br from-[rgba(79,172,254,0.1)] to-[rgba(240,147,251,0.1)] rounded-[20px] sm:rounded-[25px] p-6 sm:p-8 my-4 sm:my-5 border border-[rgba(79,172,254,0.3)]">
          {completionStats.map((stat, index) => (
            <div key={index} className="flex justify-between items-center my-4 sm:my-5 text-sm sm:text-base">
              <span className="text-white/60">{stat.label}</span>
              <span className={`font-semibold bg-gradient-to-br from-[#4facfe] to-[#f093fb] bg-clip-text text-transparent ${
                stat.isLarge ? 'text-2xl sm:text-3xl' : ''
              }`}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Task Details */}
        {taskName && (
          <div className="bg-white/5 rounded-[20px] sm:rounded-[25px] p-4 sm:p-6 my-4 sm:my-5">
            <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4">{taskName}</h3>
            
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <span className="text-2xl">{getVibeEmoji()}</span>
              <span className="font-medium">{vibeSignature} Session</span>
            </div>
            
            {(selectedTags.length > 0 || costTags.length > 0) && (
              <div className="flex flex-wrap gap-2">
                {selectedTags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-white/20 rounded">
                    {tag}
                  </span>
                ))}
                {costTags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-blue-500/80 text-white rounded font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mb-6 sm:mb-8">
          <h3 className="text-base mb-3 sm:mb-4">Action Streaks Visual</h3>
          <FocusTimeline blocks={actionStreaks} />
          <p className="text-xs text-white/60 mt-2 sm:mt-2.5">
            Tap any block to see detailed performance metrics
          </p>
        </div>

        <div className="flex gap-2.5 mb-4 sm:mb-5">
          <PrimaryButton 
            className="flex-1" 
            onClick={saveSession}
          >
            💾 Save Session Format
          </PrimaryButton>
          <PrimaryButton 
            className="flex-1" 
            variant="warning"
          >
            ✏️ Edit & Resave
          </PrimaryButton>
        </div>

        <PrimaryButton 
          variant="success"
          onClick={handleNewTask}
        >
          📤 Share Session as Experience
        </PrimaryButton>
      </div>
    </div>
  );
};

export default CompletionScreen;
