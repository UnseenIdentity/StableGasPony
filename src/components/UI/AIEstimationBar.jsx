import React from 'react';
import ProgressBar from './ProgressBar';

const AIEstimationBar = ({ vibeSignature, vibeEmoji, aiEstimationPercentage, expectedDuration }) => {
  return (
    <div className="space-y-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
      <h3 className="font-medium text-center">Your Visual Consciousness AI Estimation</h3>
      <p className="text-xs text-center opacity-80">
        🧠 Your average {vibeSignature.toLowerCase()} action streak reaches {aiEstimationPercentage}% of the anticipated duration.
      </p>
      
      <div className="relative">
        <ProgressBar 
          progressPercentage={aiEstimationPercentage}
          expectedDuration={expectedDuration}
          height="48px"
          children={
            <div className="absolute right-2 top-0 h-full flex items-center">
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-xs font-medium flex items-center gap-1">
                  <span className="text-base">{vibeEmoji}</span>
                  <span>{vibeSignature}</span>
                </span>
              </div>
            </div>
          }
        />
        
        {/* <div className="absolute right-2 top-0 h-full flex items-center">
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-medium flex items-center gap-1">
              <span className="text-base">{vibeEmoji}</span>
              <span>{vibeSignature}</span>
            </span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AIEstimationBar;
