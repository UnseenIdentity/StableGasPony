import React from 'react';

const DurationSlider = ({ expectedDuration, onDurationChange }) => {
  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const progressPercentage = ((expectedDuration - 15) / (240 - 15)) * 100;

  return (
    <div className="space-y-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
      <div className="flex justify-between items-center">
        <span className="font-medium">Expected Duration</span>
        <span className="text-xs opacity-70">{formatDuration(expectedDuration)} · 0m</span>
      </div>
      
      <div className="text-center">
        <div className="text-2xl sm:text-3xl font-bold mb-3">{expectedDuration} minutes</div>
        
        <div className="relative px-4">
          <input
            type="range"
            min="15"
            max="240"
            value={expectedDuration}
            onChange={(e) => onDurationChange(parseInt(e.target.value))}
            className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #10B981 0%, #10B981 ${progressPercentage}%, rgba(255,255,255,0.3) ${progressPercentage}%, rgba(255,255,255,0.3) 100%)`
            }}
          />
          <div className="flex justify-between text-xs mt-2 opacity-70">
            <span>15min</span>
            <span>2h</span>
            <span>4h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DurationSlider;
