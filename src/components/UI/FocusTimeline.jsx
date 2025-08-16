import React from 'react';

const FocusTimeline = ({ blocks = [], onBlockChange }) => {
  const defaultBlocks = [
    { id: 1, type: 'light-blue', label: 'Ease-In', sync: 3, width: '25%', left: '0%' },
    { id: 2, type: 'green', label: 'Active Flow', sync: 7, width: '30%', left: '25%' },
    { id: 3, type: 'orange', label: 'High Focus', sync: 5, width: '25%', left: '55%' },
    { id: 4, type: 'red', label: 'Ultra', sync: 2, width: '20%', left: '80%' }
  ];

  const displayBlocks = blocks.length > 0 ? blocks : defaultBlocks;

  const getBlockClasses = (type) => {
    const baseClasses = 'absolute h-full rounded-[12px] sm:rounded-[15px] flex flex-col items-center justify-center text-[10px] sm:text-[11px] font-semibold cursor-move transition-all duration-300 shadow-[0_3px_12px_rgba(0,0,0,0.3)] hover:scale-y-110 hover:brightness-110 hover:z-10 hover:shadow-[0_5px_18px_rgba(0,0,0,0.4),0_0_30px_currentColor]';
    
    switch (type) {
      case 'light-blue':
        return `${baseClasses} bg-gradient-to-br from-[#4facfe] to-[#00f2fe] text-white`;
      case 'green':
        return `${baseClasses} bg-gradient-to-br from-[#43e97b] to-[#38f9d7] text-white`;
      case 'orange':
        return `${baseClasses} bg-gradient-to-br from-[#fa709a] to-[#fee140] text-white`;
      case 'red':
        return `${baseClasses} bg-gradient-to-br from-[#f83600] to-[#fe8c00] text-white`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className="bg-white/[0.03] rounded-[15px] sm:rounded-[20px] p-3 sm:p-5 mb-4 sm:mb-5 border border-[rgba(79,172,254,0.2)]">
      <p className="text-white/60 mb-2 sm:mb-2.5 text-xs sm:text-sm">
        Drag blocks to adjust timing • Tap to edit • Hover for options
      </p>
      <div className="h-16 sm:h-20 bg-black/30 rounded-[12px] sm:rounded-[15px] relative overflow-visible my-4 sm:my-5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
        {displayBlocks.map((block) => (
          <div
            key={block.id}
            className={getBlockClasses(block.type)}
            style={{
              left: block.left,
              width: block.width
            }}
          >
            <div className="mb-1 text-[9px] sm:text-[10px]">{block.label}</div>
            <div className="text-[8px] sm:text-[10px] opacity-90">🔗 {block.sync} synced</div>
            <div className="absolute w-2 sm:w-2.5 h-full cursor-ew-resize opacity-0 transition-opacity duration-300 hover:opacity-100 left-0 bg-gradient-to-r from-white/30 to-transparent"></div>
            <div className="absolute w-2 sm:w-2.5 h-full cursor-ew-resize opacity-0 transition-opacity duration-300 hover:opacity-100 right-0 bg-gradient-to-r from-transparent to-white/30"></div>
            <button className="absolute -top-2 sm:-top-2.5 -right-2 sm:-right-2.5 bg-[#4facfe] text-white border-none rounded-full w-5 h-5 sm:w-6 sm:h-6 text-sm sm:text-base cursor-pointer hidden hover:flex items-center justify-center shadow-[0_2px_8px_rgba(79,172,254,0.5)]">
              +
            </button>
          </div>
        ))}
      </div>
      <p className="text-[10px] sm:text-xs text-white/60 mt-2 sm:mt-2.5">
        Start: 10:15 AM | End: 10:45 AM | Total: 30 minutes
      </p>
    </div>
  );
};

export default FocusTimeline;
