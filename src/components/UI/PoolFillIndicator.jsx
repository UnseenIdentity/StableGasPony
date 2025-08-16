import React from 'react';

const PoolFillIndicator = ({ percentage = 73, activeUsers = 73, timeFrame = 'Last 24h' }) => {
  return (
    <div className="bg-white/5 rounded-[15px] sm:rounded-[20px] p-3 sm:p-4 mb-4 sm:mb-5 border border-[rgba(46,213,115,0.3)]">
      <h3 className="text-xs sm:text-sm mb-2 sm:mb-2.5">Preview Streak Matches</h3>
      <div className="h-1.5 sm:h-2 bg-white/10 rounded overflow-hidden my-2 sm:my-2.5">
        <div 
          className="h-full bg-gradient-to-r from-[#2ed573] to-[#3498db] rounded transition-all duration-500 shadow-[0_0_15px_rgba(46,213,115,0.5)]"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-[10px] sm:text-xs text-white/60">
        <span className="text-[9px] sm:text-xs">{activeUsers} active users with similar streaks</span>
        <span className="text-[9px] sm:text-xs">{timeFrame}</span>
      </div>
    </div>
  );
};

export default PoolFillIndicator;
