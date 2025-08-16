import React from 'react';

const AIEstimationBar = ({ vibeSignature, vibeEmoji, aiEstimationPercentage, expectedDuration }) => {
  return (
    <div className="space-y-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
      <h3 className="font-medium text-center">Your Visual Consciousness AI Estimation</h3>
      <p className="text-xs text-center opacity-80">
        🧠 Your average {vibeSignature.toLowerCase()} action streak reaches {aiEstimationPercentage}% of the anticipated duration.
      </p>
      
      <div className="relative">
        <div className="flex justify-between text-xs mb-1 opacity-70">
          <span>0m</span>
          <span>{Math.round(expectedDuration * 0.2)}m</span>
          <span>{Math.round(expectedDuration * 0.4)}m</span>
          <span>{Math.round(expectedDuration * 0.6)}m</span>
          <span>{Math.round(expectedDuration * 0.8)}m</span>
          <span>{expectedDuration}m</span>
        </div>
        
        <div className="relative h-12 rounded-lg overflow-hidden"
             style={{ background: 'linear-gradient(to right, rgba(16, 185, 129, 0.3), rgba(20, 217, 165, 0.4), rgba(24, 232, 184, 0.5))' }}>
          <div 
            className="absolute left-0 top-0 h-full rounded-lg flex items-center transition-all duration-500"
            style={{ 
              width: `${aiEstimationPercentage}%`,
              background: 'linear-gradient(to right, #10B981, #14D9A5, #18E8B8)'
            }}
          >
            <div className="absolute right-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-xs font-medium flex items-center gap-1">
                <span className="text-base">{vibeEmoji}</span>
                <span>{vibeSignature}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIEstimationBar;
