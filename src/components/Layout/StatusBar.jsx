import React from 'react';

const StatusBar = () => {
  return (
    <div className="bg-black/90 backdrop-blur-[20px] px-3 sm:px-5 py-2 sm:py-2.5 flex justify-between items-center text-white text-xs sm:text-sm absolute top-0 left-0 right-0 z-[1000]">
      <span>9:41</span>
      <span className="text-xs sm:text-sm">INFIPONY</span>
      <span>🔋 100%</span>
    </div>
  );
};

export default StatusBar;
