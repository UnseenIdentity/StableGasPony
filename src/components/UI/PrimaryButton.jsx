import React from 'react';

const PrimaryButton = ({ children, onClick, className = '', variant = 'default' }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-gradient-to-br from-[#43e97b] to-[#38f9d7]';
      case 'warning':
        return 'bg-gradient-to-br from-[#f093fb] to-[#f5576c]';
      default:
        return 'bg-gradient-to-br from-[#4facfe] to-[#00f2fe]';
    }
  };

  return (
    <button
      className={`${getVariantClasses()} text-white py-4 sm:py-[18px] px-6 sm:px-10 rounded-[25px] sm:rounded-[30px] border-none text-base sm:text-lg font-semibold cursor-pointer mx-auto my-4 sm:my-5 block transition-all duration-300 shadow-[0_8px_25px_rgba(79,172,254,0.3),0_0_30px_rgba(79,172,254,0.2)] hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(79,172,254,0.4),0_0_50px_rgba(79,172,254,0.3)] active:scale-95 relative overflow-hidden w-full max-w-[280px] sm:max-w-none ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
