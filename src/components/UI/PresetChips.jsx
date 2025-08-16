import React from 'react';

const PresetChips = ({ selectedChips = [], onChipToggle, onAddTag }) => {
  const defaultChips = [
    'Morning', 'Short Burst', 'Solo Mode', 'Audio Editing', '20min', 'Deep Work'
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-2.5 my-3 sm:my-4">
      {defaultChips.map((chip) => (
        <span
          key={chip}
          className={`bg-[rgba(79,172,254,0.2)] border border-[rgba(79,172,254,0.4)] px-3 sm:px-4 py-1.5 sm:py-2 rounded-[15px] sm:rounded-[20px] text-xs sm:text-sm cursor-pointer transition-all duration-300 hover:bg-[rgba(79,172,254,0.3)] hover:-translate-y-0.5 hover:shadow-[0_3px_12px_rgba(79,172,254,0.3)] ${
            selectedChips.includes(chip)
              ? 'bg-[#4facfe] border-[#4facfe] shadow-[0_3px_15px_rgba(79,172,254,0.5)]'
              : ''
          }`}
          onClick={() => onChipToggle(chip)}
        >
          {chip}
        </span>
      ))}
      <span
        className="bg-transparent border-2 border-dashed border-[rgba(79,172,254,0.4)] text-[#4facfe] px-3 sm:px-4 py-1.5 sm:py-2 rounded-[15px] sm:rounded-[20px] text-xs sm:text-sm cursor-pointer transition-all duration-300 hover:bg-[rgba(79,172,254,0.1)]"
        onClick={onAddTag}
      >
        + Add Tag
      </span>
    </div>
  );
};

export default PresetChips;
