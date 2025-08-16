import React, { useState } from 'react';

const TagEditor = ({ 
  showAddTags, 
  onToggleTags, 
  selectedTags, 
  onTagToggle, 
  costTags, 
  onCostTagAdd, 
  onCostTagRemove,
  videoTags,
  onVideoTagAdd,
  onVideoTagRemove,
  videoLinkInput,
  setVideoLinkInput,
  videoTitleInput,
  setVideoTitleInput,
  videoProductTagsInput,
  setVideoProductTagsInput
}) => {
  const [totalCostInput, setTotalCostInput] = useState('');

  const availableTags = [
    'Plan', 'Code', 'Test', 'Review', 'Design', 'Research', 'Write', 
    'Meeting', 'Learning', 'Practice', 'Analysis', 'Creative'
  ];

  const handleCostTagAdd = () => {
    if (totalCostInput) {
      onCostTagAdd(['$' + totalCostInput]);
      setTotalCostInput('');
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
            value={totalCostInput}
            onChange={(e) => setTotalCostInput(e.target.value)}
            placeholder="Total $" 
            className="px-3 py-2 text-sm bg-white/20 rounded-xl text-white placeholder-white/70 flex-1 focus:outline-none"
          />
          <button 
            onClick={handleCostTagAdd}
            className="px-4 py-2 text-sm bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Video/Media Links (YouTube/TikTok)</h4>
        <input
          type="text"
          value={videoLinkInput}
          onChange={(e) => setVideoLinkInput(e.target.value)}
          placeholder="Video URL (YouTube/TikTok)"
          className="w-full px-3 py-2 text-sm bg-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none"
        />
        <input
          type="text"
          value={videoTitleInput}
          onChange={(e) => setVideoTitleInput(e.target.value)}
          placeholder="Video Title"
          className="w-full px-3 py-2 text-sm bg-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none"
        />
        <input
          type="text"
          value={videoProductTagsInput}
          onChange={(e) => setVideoProductTagsInput(e.target.value)}
          placeholder="Product/Experience Tags (comma-separated)"
          className="w-full px-3 py-2 text-sm bg-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none"
        />
        <button
          onClick={onVideoTagAdd}
          className="w-full px-3 py-2 text-sm bg-purple-500 rounded-xl hover:bg-purple-600 transition-colors"
        >
          Add Video Link
        </button>
      </div>
    </div>
  );
};

export default TagEditor;
