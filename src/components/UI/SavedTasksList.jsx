import React from 'react';

const SavedTasksList = ({ savedTasks, onTaskSelect, selectedTags, costTags, onTagRemove, onCostTagRemove }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm">
          ✨
          <span className="font-medium">Saved List</span>
        </div>
      </div>

      {/* Saved Tasks Scroll Area */}
      <div className="max-h-32 overflow-y-auto space-y-2 saved-tasks-scroll">
        {savedTasks.map(task => (
          <div 
            key={task.id}
            onClick={() => onTaskSelect(task)}
            className="bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium">{task.name}</span>
              <div className="flex gap-1">
                {task.costTags.map((costTag, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-blue-500/80 text-white rounded-full font-medium">
                    {costTag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {task.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-white/20 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-green-300">{task.intensity}</span>
                <span className="text-xs opacity-70">{task.vibeSignature}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Tags Display */}
      <div className="space-y-3 mt-3">
        <h4 className="text-sm font-medium">Your Selected Tags</h4>
        <div className="flex flex-wrap gap-2">
          {selectedTags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-blue-500/30 text-white text-sm rounded-full flex items-center gap-1">
              {tag}
              <span 
                className="cursor-pointer hover:text-red-300"
                onClick={() => onTagRemove(tag)}
              >✖</span>
            </span>
          ))}
          {costTags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-blue-500/80 text-white text-sm rounded-full flex items-center gap-1 font-medium">
              {tag}
              <span 
                className="cursor-pointer hover:text-red-300"
                onClick={() => onCostTagRemove(tag)}
              >✖</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedTasksList;
