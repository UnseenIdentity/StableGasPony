import React from 'react';

const ProgressBar = ({ 
  progressPercentage, 
  totalWidth = '100%', 
  height = '48px',
  showTimeMarkers = true,
  expectedDuration,
  className = '',
  children,
  showCursor = false,
  cursorPosition = 0
}) => {
  return (
    <div className={`relative ${className}`}>
      {showTimeMarkers && expectedDuration && (
        <div className="flex justify-between text-xs mb-1 opacity-70">
          <span>0m</span>
          <span>{Math.round(expectedDuration * 0.2)}m</span>
          <span>{Math.round(expectedDuration * 0.4)}m</span>
          <span>{Math.round(expectedDuration * 0.6)}m</span>
          <span>{Math.round(expectedDuration * 0.8)}m</span>
          <span>{expectedDuration}m</span>
        </div>
      )}
      
      <div 
        className="relative rounded-lg overflow-hidden"
        style={{ 
          background: 'linear-gradient(to right, rgba(16, 185, 129, 0.3), rgba(20, 217, 165, 0.4), rgba(24, 232, 184, 0.5))',
          height: height,
          width: totalWidth
        }}
      >
        <div 
          className="absolute left-0 top-0 h-full rounded-lg flex items-center transition-all duration-500"
          style={{ 
            width: `${progressPercentage}%`,
            background: 'linear-gradient(to right, #10B981, #14D9A5, #18E8B8)'
          }}
        >
          {children}
        </div>
        
        {/* White vertical cursor inside the progress bar */}
        {showCursor && (
          <div 
            className="absolute top-0 h-full w-1 bg-white shadow-lg transition-all duration-1000 ease-out z-10"
            style={{ 
              left: `${cursorPosition}%`,
              transform: 'translateX(-50%)',
              height: height
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
