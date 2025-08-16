import React from 'react';

const LEDIndicator = ({ intensity = 'light-blue' }) => {
  const getIntensityClass = () => {
    switch (intensity) {
      case 'green':
        return 'bg-[#43e97b] shadow-[0_0_30px_rgba(67,233,123,0.8),inset_0_0_10px_rgba(255,255,255,0.3)]';
      case 'orange':
        return 'bg-[#fa709a] shadow-[0_0_30px_rgba(250,112,154,0.8),inset_0_0_10px_rgba(255,255,255,0.3)]';
      case 'red':
        return 'bg-[#f83600] shadow-[0_0_30px_rgba(248,54,0,0.8),inset_0_0_10px_rgba(255,255,255,0.3)]';
      default:
        return 'bg-[#4facfe] shadow-[0_0_30px_rgba(79,172,254,0.8),inset_0_0_10px_rgba(255,255,255,0.3)]';
    }
  };

  return (
    <div className={`absolute top-[50px] sm:top-[60px] right-3 sm:right-5 w-5 h-5 sm:w-6 sm:h-6 rounded-full ${getIntensityClass()} animate-pulse z-[100]`}></div>
  );
};

export default LEDIndicator;
