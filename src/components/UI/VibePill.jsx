import React from 'react';

const VibePill = ({ icon, label, isSelected, onClick }) => {
  return (
    <div
      className={`bg-white/5 border-2 border-white/10 rounded-[20px] sm:rounded-[25px] p-3 sm:p-5 text-center cursor-pointer transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(79,172,254,0.3)] ${
        isSelected
          ? 'bg-gradient-to-br from-[rgba(79,172,254,0.2)] to-[rgba(240,147,251,0.2)] border-[#4facfe] shadow-[0_0_25px_rgba(79,172,254,0.3),inset_0_0_15px_rgba(79,172,254,0.1)]'
          : ''
      }`}
      onClick={onClick}
    >
      <div className="text-2xl sm:text-3xl mb-2 sm:mb-2.5">{icon}</div>
      <div className="text-xs sm:text-sm text-white font-medium leading-tight">{label}</div>
    </div>
  );
};

export default VibePill;
