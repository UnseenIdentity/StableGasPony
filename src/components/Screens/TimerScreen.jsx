import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import FocusTimeline from '../UI/FocusTimeline';
import ProgressBar from '../UI/ProgressBar';

const TimerScreen = ({ onScreenChange }) => {
  const { taskName, vibeSignature, selectedTags, costTags, expectedDuration, aiEstimationPercentage } = useAppContext();
  const [timeRemaining, setTimeRemaining] = useState((expectedDuration || 60) * 60); // Convert minutes to seconds, default to 60 if undefined
  const [isRunning, setIsRunning] = useState(false);
  const [currentFocusIntensity, setCurrentFocusIntensity] = useState('light-blue');

  const timerIntervalRef = useRef(null);

  // Auto-start timer when component first mounts
  useEffect(() => {
    if (expectedDuration && !isRunning && timeRemaining === (expectedDuration || 60) * 60) {
      console.log('Auto-starting timer on mount with duration:', expectedDuration, 'minutes');
      setIsRunning(true);
    }
  }, []); // Empty dependency array - runs only once on mount

  // Reset timer when expectedDuration changes
  useEffect(() => {
    if (expectedDuration) {
      console.log('Resetting timer to:', expectedDuration, 'minutes'); // Debug log
      setTimeRemaining(expectedDuration * 60);
    }
  }, [expectedDuration]);

  useEffect(() => {
    if (isRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          console.log('Timer tick:', prev, '->', prev - 1); // Debug log
          if (prev <= 1) {
            // Timer finished
            setIsRunning(false);
            if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }

    return () => clearInterval(timerIntervalRef.current);
  }, [isRunning]);

  // Handle timer completion
  useEffect(() => {
    if (timeRemaining <= 0 && isRunning === false) {
      // Timer has finished, navigate to completion screen
      setTimeout(() => {
        onScreenChange('completion-screen');
      }, 1000); // Small delay to show "00:00" briefly
    }
  }, [timeRemaining, isRunning, onScreenChange]);

  useEffect(() => {
    // Change intensity based on remaining time
    const remainingMinutes = timeRemaining / 60;
    if (remainingMinutes > expectedDuration * 0.75) {
      setCurrentFocusIntensity('light-blue');
    } else if (remainingMinutes > expectedDuration * 0.5) {
      setCurrentFocusIntensity('green');
    } else if (remainingMinutes > expectedDuration * 0.25) {
      setCurrentFocusIntensity('orange');
    } else {
      setCurrentFocusIntensity('red');
    }
  }, [timeRemaining, expectedDuration]);

  const formatTime = (totalSeconds) => {
    if (totalSeconds <= 0) return '00:00';
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    // Only reset timer if it's at 0 or hasn't been started yet
    if (timeRemaining <= 0) {
      console.log('Starting fresh timer with duration:', expectedDuration, 'minutes'); // Debug log
      setTimeRemaining(expectedDuration * 60);
    } else {
      console.log('Resuming timer from:', timeRemaining, 'seconds remaining'); // Debug log
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    if (navigator.vibrate) navigator.vibrate(20);
  };

  const stopTimer = () => {
    setIsRunning(false);
    onScreenChange('completion-screen');
    if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
  };

  const skipToNext = () => {
    // Skip to next focus block (reduce remaining time by 5 minutes)
    const newTimeRemaining = Math.max(timeRemaining - 300, 0);
    setTimeRemaining(newTimeRemaining);
    if (navigator.vibrate) navigator.vibrate(30);
  };

  const resetTimer = () => {
    // Reset timer to full duration
    console.log('Resetting timer to full duration:', expectedDuration, 'minutes');
    setTimeRemaining(expectedDuration * 60);
    setIsRunning(false);
  };

  const getIntensityLabel = () => {
    if (timeRemaining <= 0) return 'Session Complete!';
    
    switch (currentFocusIntensity) {
      case 'light-blue': return 'Ease-In Mode';
      case 'green': return 'Flow Mode';
      case 'orange': return 'High Focus Mode';
      case 'red': return 'Ultra Mode';
      default: return 'Deep Creation Mode';
    }
  };

  const getVibeEmoji = () => {
    const vibeEmojis = {
      'Calm': '😌',
      'Focus': '🎯',
      'Creative': '🎨',
      'Energetic': '⚡'
    };
    return vibeEmojis[vibeSignature] || '😌';
  };

  const liveBlocks = [
    { type: 'light-blue', label: 'Current', width: '20%', left: '0%' },
    { type: 'green', label: 'Next: Flow', width: '40%', left: '20%' },
    { type: 'orange', label: 'High Focus', width: '30%', left: '60%' },
    { type: 'red', label: 'Ultra', width: '10%', left: '90%' }
  ];

  return (
    <div className="screen">
      {/* Main Content Area - Scrollable with proper height and width */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-5 pt-4 pb-4 w-full" style={{ height: 'calc(100vh - 80px)' }}>
        <div className="text-center py-6 sm:py-8 w-full">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl font-bold mb-2">{taskName || 'Focus Session'}</h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-2">
              <span className="text-lg">{getVibeEmoji()}</span>
              <span className="font-medium">{vibeSignature}</span>
            </div>
            <div className="text-sm text-white/70">
              Duration: {expectedDuration} minutes
            </div>
            {isRunning && (
              <div className="text-xs text-green-400 mt-1 animate-pulse">
                ⏰ Timer is running...
              </div>
            )}
            {!isRunning && timeRemaining > 0 && timeRemaining < (expectedDuration * 60) && (
              <div className="text-xs text-blue-400 mt-1">
                ⏸️ Timer paused - click ▶️ to resume from {formatTime(timeRemaining)}
              </div>
            )}
            {!isRunning && timeRemaining === (expectedDuration * 60) && (
              <div className="text-xs text-yellow-400 mt-1">
                ⏸️ Timer ready - click ▶️ to start
              </div>
            )}
            {/* Debug info - remove this later */}
            <div className="text-xs text-white/50 mt-1">
              Debug: isRunning={isRunning.toString()}, timeRemaining={timeRemaining}s
            </div>
          </div>

          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px]">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="40" fill="transparent"
                  stroke="#10B981"
                  strokeWidth="8"
                  strokeDasharray={`${Math.min(((expectedDuration * 60 - timeRemaining) / (expectedDuration * 60)) * 100, 100) * 2.51} 251`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-[40px] sm:text-[56px] font-mono font-bold text-white drop-shadow-[0_0_15px_rgba(79,172,254,0.5)] sm:drop-shadow-[0_0_20px_rgba(79,172,254,0.5)]">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-white/60 text-xs sm:text-sm mt-2 sm:mt-2.5 uppercase tracking-wider">
                  {getIntensityLabel()}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 sm:gap-6 my-6 sm:my-8">
            <button
              className={`w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-full border-2 text-white text-2xl sm:text-[28px] cursor-pointer transition-all duration-300 flex items-center justify-center backdrop-blur-[10px] hover:scale-110 hover:shadow-[0_0_25px_rgba(79,172,254,0.5)] active:scale-95 ${
                isRunning 
                  ? 'bg-yellow-500/20 border-yellow-400/50 hover:bg-yellow-500/30' 
                  : 'bg-white/5 border-[rgba(79,172,254,0.3)] hover:bg-[rgba(79,172,254,0.2)]'
              }`}
              onClick={isRunning ? pauseTimer : startTimer}
              title={isRunning ? 'Pause Timer' : timeRemaining < (expectedDuration * 60) ? 'Resume Timer' : 'Start Timer'}
            >
              {isRunning ? '⏸' : '▶️'}
            </button>
            <button
              className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-full bg-white/5 border-2 border-[rgba(79,172,254,0.3)] text-white text-2xl sm:text-[28px] cursor-pointer transition-all duration-300 flex items-center justify-center backdrop-blur-[10px] hover:bg-[rgba(79,172,254,0.2)] hover:scale-110 hover:shadow-[0_0_25px_rgba(79,172,254,0.5)] active:scale-95"
              onClick={stopTimer}
              title="Stop Timer & Complete Session"
            >
              ⏹
            </button>
            <button 
              className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-full bg-orange-500/20 border-2 border-orange-400/50 text-white text-2xl sm:text-[28px] cursor-pointer transition-all duration-300 flex items-center justify-center backdrop-blur-[10px] hover:bg-orange-500/30 hover:scale-110 hover:shadow-[0_0_25px_rgba(255,165,0,0.5)] active:scale-95"
              onClick={resetTimer}
              title="Reset Timer to Full Duration"
            >
              🔄
            </button>
            <button
              className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-full bg-gradient-to-br from-[rgba(79,172,254,0.2)] to-[rgba(240,147,251,0.2)] border-2 border-[rgba(79,172,254,0.3)] text-white text-2xl sm:text-[28px] cursor-pointer transition-all duration-300 flex items-center justify-center backdrop-blur-[10px] hover:bg-[rgba(79,172,254,0.2)] hover:scale-110 hover:shadow-[0_0_25px_rgba(79,172,254,0.5)] active:scale-95"
              onClick={skipToNext}
              title="Skip Ahead 5 Minutes"
            >
              ⏭
            </button>
          </div>

          {/* Live Focus Bar */}
          <div className="mb-6 sm:mb-8">
            <FocusTimeline blocks={liveBlocks} />
          </div>

          {/* Session Progress with AI Estimation */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium">Session Progress</span>
              <span className="text-sm opacity-80">{Math.floor((expectedDuration * 60 - timeRemaining) / 60)}/{expectedDuration} min</span>
            </div>
            
            <div className="relative">
              {/* AI Estimation Background Bar */}
              <ProgressBar
                progressPercentage={aiEstimationPercentage || 70}
                expectedDuration={expectedDuration}
                height="48px"
                showCursor={true}
                cursorPosition={Math.min(((expectedDuration * 60 - timeRemaining) / (expectedDuration * 60)) * 100, 100)}
              >
                {/* Vibe tag - positioned within the filled progress area */}
                <div className="absolute right-2 top-0 h-full flex items-center">
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-medium flex items-center gap-1 text-white">
                      <span className="text-base">{getVibeEmoji()}</span>
                      <span>{vibeSignature}</span>
                    </span>
                  </div>
                </div>
              </ProgressBar>
            </div>
          </div>



          {/* Selected Tags Display */}
          {(selectedTags.length > 0 || costTags.length > 0) && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="text-sm font-medium mb-3 opacity-90 text-center">Session Tags</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedTags.map(tag => (
                  <span key={tag} className="px-3 py-2 bg-white/20 rounded-full text-sm text-white border border-white/30">
                    {tag}
                  </span>
                ))}
                {costTags.map(tag => (
                  <span key={tag} className="px-3 py-2 bg-blue-500/80 text-white rounded-full text-sm font-medium border border-blue-400/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimerScreen;
