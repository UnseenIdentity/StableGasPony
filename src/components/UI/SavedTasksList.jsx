import React from 'react';

const SavedTasksList = ({ 
  savedTasks, 
  onTaskSelect, 
  selectedTags, 
  costTags, 
  videoTags,
  onTagRemove, 
  onCostTagRemove,
  onVideoTagRemove 
}) => {
  const getVibeEmoji = (vibeSignature) => {
    const vibeEmojis = {
      'Calm': '😌',
      'Focus': '🎯',
      'Creative': '🎨',
      'Energetic': '⚡'
    };
    return vibeEmojis[vibeSignature] || '😌';
  };

  const getPlatformIcon = (platform) => {
    return platform === 'YouTube' ? '▶️' : '🎵';
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm">
          ✨
          <span className="font-medium">Saved List</span>
        </div>
      </div>

      {/* Saved Tasks Scroll Area */}
      <div className="max-h-52 overflow-y-auto space-y-2 saved-tasks-scroll">
        {savedTasks.map((task) => (
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
            
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-wrap gap-1">
                {task.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-white/20 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Video Tags Display */}
              {task.videoTags && task.videoTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {task.videoTags.map((video, index) => (
                    <div key={index} className="video-preview flex flex-col items-start gap-1 p-2 bg-purple-600/50 rounded-lg max-w-[150px] flex-shrink-0">
                      <div className="relative w-full">
                        <img 
                          src={video.thumbnailUrl} 
                          alt={video.title} 
                          className="w-full h-auto rounded object-cover mb-1"
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/120x90/607D8B/FFFFFF?text=Video';
                          }}
                        />
                        <div className="absolute top-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded-full">
                          {getPlatformIcon(video.platform)}
                        </div>
                      </div>
                      <span className="text-xs font-medium text-white line-clamp-2 leading-tight">
                        {video.title}
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {video.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs px-1.5 py-0.5 bg-purple-700/70 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-1 mt-auto">
              <span className="text-xs text-green-300">{task.intensity}</span>
              <span className="text-xs opacity-70">{task.vibeSignature}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Current Selected Tags Display */}
      {(selectedTags.length > 0 || costTags.length > 0 || videoTags.length > 0) && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <h4 className="font-medium text-sm mb-2">Your Selected Tags</h4>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-blue-500/30 text-white text-sm rounded-full flex items-center gap-1">
                {tag}
                <span 
                  className="cursor-pointer hover:text-red-300"
                  onClick={() => onTagRemove(tag)}
                >
                  ✖️
                </span>
              </span>
            ))}
            {costTags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-blue-500/80 text-white text-sm rounded-full flex items-center gap-1 font-medium">
                {tag}
                <span 
                  className="cursor-pointer hover:text-red-300"
                  onClick={() => onCostTagRemove(tag)}
                >
                  ✖️
                </span>
              </span>
            ))}
            {videoTags.map(video => (
              <div key={video.url} className="video-preview flex items-center gap-2 p-2 bg-purple-600/50 rounded-lg">
                <div className="relative">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    className="w-16 h-12 rounded object-cover"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/120x90/607D8B/FFFFFF?text=Video';
                    }}
                  />
                  <div className="absolute top-0 right-0 bg-black/70 text-white text-xs px-1 py-0.5 rounded-full">
                    {getPlatformIcon(video.platform)}
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <span className="text-xs font-medium">{video.title}</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {video.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-purple-700/70 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span 
                  className="cursor-pointer hover:text-red-300"
                  onClick={() => onVideoTagRemove(video.url)}
                >
                  ✖️
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedTasksList;
