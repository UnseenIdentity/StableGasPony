import React, { useState } from 'react';
import { vibeOptions } from '../../data/mockData';

const VibeSignatureDropdown = ({ selectedVibe, onVibeSelect, isSyncActive, onSyncClick, aiEstimationPercentage }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedVibeData = vibeOptions.find(v => v.name === selectedVibe) || vibeOptions[0];

  return (
    <div className="space-y-3">
      <p className="text-sm opacity-90">Choose a Vibe Signature - or click Sync to let the AI autodetect:</p>
      <div className="flex items-center gap-4">
        {/* Vibe Signature Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full flex items-center gap-2 transition-all bg-teal-500 text-white scale-110 hover:scale-105"
          >
            <span className="text-lg sm:text-xl">{selectedVibeData.emoji}</span>
            <span className="font-medium">{selectedVibeData.name}</span>
            <span className="ml-2">{showDropdown ? '🔼' : '🔽'}</span>
          </button>
          
          {showDropdown && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl overflow-hidden z-10">
              {vibeOptions.map(option => (
                <button
                  key={option.name}
                  onClick={() => {
                    onVibeSelect(option.name);
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center gap-2 transition-colors"
                >
                  <span className="text-lg sm:text-xl">{option.emoji}</span>
                  <span>{option.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Sync Button */}
        <button
          onClick={onSyncClick}
          className={`relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-full flex items-center gap-2 transition-all ${
            isSyncActive 
              ? 'bg-yellow-500 text-white scale-110' 
              : 'bg-white/20 text-white/90 hover:bg-white/30'
          }`}
        >
          <span className="text-lg sm:text-xl">⚡</span>
          <span className="font-medium">Sync</span>
          {isSyncActive && (
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-bold">
              AI
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default VibeSignatureDropdown;
