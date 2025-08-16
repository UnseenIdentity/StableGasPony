import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import FocusTimeline from '../UI/FocusTimeline';

const TimerScreen = ({ onScreenChange }) => {
  const { taskName, vibeSignature, selectedTags, costTags } = useAppContext();
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentFocusIntensity, setCurrentFocusIntensity] = useState('light-blue');
  const [notes, setNotes] = useState('');
  const timerIntervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerIntervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }

    return () => clearInterval(timerIntervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    // Change intensity based on time
    if (seconds < 300) {
      setCurrentFocusIntensity('light-blue');
    } else if (seconds < 900) {
      setCurrentFocusIntensity('green');
    } else if (seconds < 1500) {
      setCurrentFocusIntensity('orange');
    } else {
      setCurrentFocusIntensity('red');
    }
  }, [seconds]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
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
    // Skip to next focus block
    const newSeconds = Math.ceil(seconds / 300) * 300;
    setSeconds(newSeconds);
    if (navigator.vibrate) navigator.vibrate(30);
  };

  const getIntensityLabel = () => {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full">
              <span className="text-lg">{getVibeEmoji()}</span>
              <span className="font-medium">{vibeSignature}</span>
            </div>
          </div>

          <div className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] mx-auto mb-6 sm:mb-8 relative">
            <div className="w-full h-full rounded-full bg-conic-gradient from-[#4facfe] via-[#00f2fe] via-[#f093fb] to-[#4facfe] p-2 animate-spin shadow-[0_0_40px_rgba(79,172,254,0.5),inset_0_0_40px_rgba(79,172,254,0.2)] sm:shadow-[0_0_60px_rgba(79,172,254,0.5),inset_0_0_60px_rgba(79,172,254,0.2)]" style={{ animationDuration: '20s' }}>
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0a0e27] to-[#151933] flex items-center justify-center flex-col shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] sm:shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
                <div className="text-[40px] sm:text-[56px] font-extralight font-mono tracking-wider text-white drop-shadow-[0_0_15px_rgba(79,172,254,0.5)] sm:drop-shadow-[0_0_20px_rgba(79,172,254,0.5)]">
                  {formatTime(seconds)}
                </div>
                <div className="text-white/60 text-xs sm:text-sm mt-2 sm:mt-2.5 uppercase tracking-wider">
                  {getIntensityLabel()}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 sm:gap-6 my-6 sm:my-8">
            <button
              className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-full bg-white/5 border-2 border-[rgba(79,172,254,0.3)] text-white text-2xl sm:text-[28px] cursor-pointer transition-all duration-300 flex items-center justify-center backdrop-blur-[10px] hover:bg-[rgba(79,172,254,0.2)] hover:scale-110 hover:shadow-[0_0_25px_rgba(79,172,254,0.5)] active:scale-95"
              onClick={isRunning ? pauseTimer : startTimer}
            >
              {isRunning ? '⏸' : '▶️'}
            </button>
            <button
              className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-full bg-white/5 border-2 border-[rgba(79,172,254,0.3)] text-white text-2xl sm:text-[28px] cursor-pointer transition-all duration-300 flex items-center justify-center backdrop-blur-[10px] hover:bg-[rgba(79,172,254,0.2)] hover:scale-110 hover:shadow-[0_0_25px_rgba(79,172,254,0.5)] active:scale-95"
              onClick={stopTimer}
            >
              ⏹
            </button>
            <button className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-full bg-white/5 border-2 border-[rgba(79,172,254,0.3)] text-white text-2xl sm:text-[28px] cursor-pointer transition-all duration-300 flex items-center justify-center backdrop-blur-[10px] hover:bg-[rgba(79,172,254,0.2)] hover:scale-110 hover:shadow-[0_0_25px_rgba(79,172,254,0.5)] active:scale-95">
              📝
            </button>
            <button
              className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-full bg-gradient-to-br from-[rgba(79,172,254,0.2)] to-[rgba(240,147,251,0.2)] border-2 border-[rgba(79,172,254,0.3)] text-white text-2xl sm:text-[28px] cursor-pointer transition-all duration-300 flex items-center justify-center backdrop-blur-[10px] hover:bg-[rgba(79,172,254,0.2)] hover:scale-110 hover:shadow-[0_0_25px_rgba(79,172,254,0.5)] active:scale-95"
              onClick={skipToNext}
            >
              ⏭
            </button>
          </div>

          {/* Live Focus Bar */}
          <div className="mb-6 sm:mb-8">
            <FocusTimeline blocks={liveBlocks} />
          </div>

          {/* Session Progress with Tags */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium">Session Progress</span>
              <span className="text-sm opacity-80">{Math.floor(seconds / 60)}/{Math.floor(seconds / 60)} min</span>
            </div>
            
            <div className="relative h-12 rounded-lg overflow-hidden"
                 style={{ background: 'linear-gradient(to right, rgba(16, 185, 129, 0.3), rgba(20, 217, 165, 0.4), rgba(24, 232, 184, 0.5))' }}>
              <div 
                className="absolute left-0 top-0 h-full transition-all duration-1000 rounded-lg"
                style={{ 
                  width: `${Math.min((seconds / (60 * 60)) * 100, 100)}%`,
                  background: 'linear-gradient(to right, #10B981, #14D9A5, #18E8B8)'
                }}
              ></div>
              
              <div className="absolute inset-0 flex items-center px-3">
                <span className="text-sm font-medium">
                  {getVibeEmoji()} {vibeSignature} Focus
                </span>
              </div>
            </div>
            
            {(selectedTags.length > 0 || costTags.length > 0) && (
              <div className="flex flex-wrap gap-2 mt-3">
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

          {/* Sync Panel */}
          <div className="bg-gradient-to-br from-[rgba(79,172,254,0.05)] to-[rgba(240,147,251,0.05)] border border-[rgba(79,172,254,0.3)] rounded-[20px] sm:rounded-[25px] p-4 sm:p-6 my-4 sm:my-5 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">🌐 Attention Resonance Map</h3>
              <p className="text-xs sm:text-sm text-white/70 mb-3 sm:mb-4">
                You're in sync with 6 users in this focus mode
              </p>
              <div className="flex gap-[-15px] my-4 sm:my-5">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full bg-gradient-to-br from-[#4facfe] to-[#f093fb] flex items-center justify-center text-lg sm:text-xl border-[2px] sm:border-[3px] border-[#0a0e27] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:z-10 animate-pulse"
                    style={{ marginLeft: i === 0 ? 0 : '-15px' }}
                  >
                    👤
                  </div>
                ))}
              </div>
              <div className="flex gap-2 sm:gap-2.5 mt-4 sm:mt-5">
                <button className="flex-1 py-2.5 sm:py-3 px-2.5 sm:px-3 bg-white/5 border border-[rgba(79,172,254,0.3)] rounded-[12px] sm:rounded-[15px] text-white text-[10px] sm:text-xs cursor-pointer transition-all duration-300 hover:bg-[rgba(79,172,254,0.2)] hover:-translate-y-0.5">
                  🔁 Sync Wallet
                </button>
                <button className="flex-1 py-2.5 sm:py-3 px-2.5 sm:px-3 bg-white/5 border border-[rgba(79,172,254,0.3)] rounded-[12px] sm:rounded-[15px] text-white text-[10px] sm:text-xs cursor-pointer transition-all duration-300 hover:bg-[rgba(79,172,254,0.2)] hover:-translate-y-0.5">
                  🤝 Invite to Room
                </button>
                <button className="flex-1 py-2.5 sm:py-3 px-2.5 sm:px-3 bg-white/5 border border-[rgba(79,172,254,0.3)] rounded-[12px] sm:rounded-[15px] text-white text-[10px] sm:text-xs cursor-pointer transition-all duration-300 hover:bg-[rgba(79,172,254,0.2)] hover:-translate-y-0.5">
                  👥 Join Pool
                </button>
              </div>
              <button className="w-full py-2.5 sm:py-3 px-2.5 sm:px-3 bg-white/5 border border-[rgba(79,172,254,0.3)] rounded-[12px] sm:rounded-[15px] text-white text-[10px] sm:text-xs cursor-pointer transition-all duration-300 hover:bg-[rgba(79,172,254,0.2)] hover:-translate-y-0.5 mt-2 sm:mt-2.5">
                📜 View Resonance History
              </button>
            </div>
          </div>

          {/* Quick Notes */}
          <div>
            <label className="block text-sm font-medium mb-2 opacity-90">Quick Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes during your session..."
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 resize-none focus:outline-none focus:border-white/50"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerScreen;
