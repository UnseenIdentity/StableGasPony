import React from 'react';

const BottomNavigation = ({ currentScreen, onScreenChange }) => {
  const navItems = [
    { id: 'welcome-screen', icon: '🏠', label: 'Home' },
    { id: 'task-setup-screen', icon: '📝', label: 'Plan' },
    { id: 'timer-screen', icon: '⏱', label: 'Timer' },
    { id: 'insights-screen', icon: '📊', label: 'Insights' },
    { id: 'social', icon: '👥', label: 'Social' }
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-[rgba(10,14,39,0.95)] backdrop-blur-[20px] p-3 sm:p-4 flex justify-around border-t border-[rgba(79,172,254,0.2)]">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`bg-transparent border-none text-white/50 text-xl sm:text-2xl cursor-pointer p-2 sm:p-2.5 transition-all duration-300 relative hover:text-[#4facfe] hover:-translate-y-0.5 ${
            currentScreen === item.id ? 'text-[#4facfe] -translate-y-0.5' : ''
          }`}
          onClick={() => onScreenChange(item.id)}
        >
          {item.icon}
          {currentScreen === item.id && (
            <div className="absolute -bottom-1 sm:-bottom-1.5 left-1/2 transform -translate-x-1/2 w-[20px] sm:w-[30px] h-[2px] sm:h-[3px] bg-gradient-to-r from-[#4facfe] to-[#f093fb] rounded-[2px]"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;
