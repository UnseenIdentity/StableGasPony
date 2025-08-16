import React, { useState } from 'react';

const TagEditor = ({ 
  showAddTags, 
  onToggleTags, 
  selectedTags, 
  onTagToggle, 
  costTags, 
  onCostTagAdd,
  onCostTagRemove 
}) => {
  const [perMinuteInput, setPerMinuteInput] = useState('');
  const [totalCostInput, setTotalCostInput] = useState('');

  const availableTags = [
    'Plan', 'Code', 'Test', 'Review', 'Design', 'Research', 'Write', 
    'Meeting', 'Learning', 'Practice', 'Analysis', 'Creative'
  ];

  const handleAddCostTags = () => {
    const newCostTags = [];
    if (perMinuteInput) {
      newCostTags.push('$' + perMinuteInput + '/min');
      setPerMinuteInput('');
    }
    if (totalCostInput) {
      newCostTags.push('$' + totalCostInput);
      setTotalCostInput('');
    }
    if (newCostTags.length > 0) {
      onCostTagAdd(newCostTags);
    }
  };

  if (!showAddTags) return null;

  return (
    <div className="space-y-3 mt-3 bg-white/10 p-4 rounded-xl">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Available Action Tags</h4>
        <div className="flex flex-wrap gap-2">
          {availableTags.map(tag => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-3 py-1 text-sm rounded-full transition-all ${
                selectedTags.includes(tag)
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/20 text-white/90 hover:bg-white/30'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Cost Tags</h4>
        <div className="flex gap-2">
          <input 
            type="number" 
            value={perMinuteInput}
            onChange={(e) => setPerMinuteInput(e.target.value)}
            placeholder="$/min" 
            className="px-3 py-1 text-sm bg-white/20 rounded-full text-white placeholder-white/70 w-20 focus:outline-none"
          />
          <input 
            type="number" 
            value={totalCostInput}
            onChange={(e) => setTotalCostInput(e.target.value)}
            placeholder="Total $" 
            className="px-3 py-1 text-sm bg-white/20 rounded-full text-white placeholder-white/70 w-20 focus:outline-none"
          />
          <button 
            onClick={handleAddCostTags}
            className="px-3 py-1 text-sm bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagEditor;
