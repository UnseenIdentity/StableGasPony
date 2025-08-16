import React from 'react';

const iPhoneContainer = ({ children }) => {
  return (
    <div className="relative w-[390px] h-[844px] sm:w-[390px] sm:h-[844px] bg-black rounded-[40px] sm:rounded-[50px] p-3 sm:p-[15px] shadow-[0_50px_100px_rgba(0,0,0,0.5),0_0_80px_rgba(79,172,254,0.2)] max-w-[95vw] max-h-[95vh]">
      <div className="w-full h-full bg-black rounded-[30px] sm:rounded-[35px] overflow-hidden relative">
        {children}
      </div>
    </div>
  );
};

export default iPhoneContainer;
