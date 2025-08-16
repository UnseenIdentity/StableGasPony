import React from 'react';

const OfflineIndicator = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="absolute top-[60px] sm:top-[70px] left-3 sm:left-5 bg-[rgba(243,156,18,0.2)] border border-[rgba(243,156,18,0.5)] rounded-[15px] sm:rounded-[20px] px-2 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-[11px] text-[#f39c12] animate-pulse">
      📶 Offline Mode
    </div>
  );
};

export default OfflineIndicator;
