import React from 'react';
import PrimaryButton from '../UI/PrimaryButton';
import { insightCards, weekSchedule } from '../../data/mockData';

const InsightsScreen = () => {

  return (
    <div className="screen p-5 pb-20">
      <h1 className="text-2xl mb-5 text-white">🧠 Your Conscious Flow Dashboard</h1>
      
      <h3 className="text-base mb-2.5 text-white">Your Intent Vibes: Last 7 Sessions</h3>
      <div className="flex overflow-x-auto gap-4 py-1.5 my-5 scrollbar-hide" style={{ scrollSnapType: 'x mandatory' }}>
        {insightCards.map((insight, index) => (
          <div
            key={index}
            className="min-w-[200px] bg-gradient-to-br from-[rgba(79,172,254,0.1)] to-[rgba(240,147,251,0.1)] border border-[rgba(79,172,254,0.3)] rounded-[20px] p-5"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="text-3xl mb-2.5">{insight.icon}</div>
            <div className="text-sm text-[#4facfe] mb-1.5 font-semibold">{insight.title}</div>
            <div className="text-xs text-white/60">{insight.desc}</div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 rounded-[20px] p-5 my-5">
        <h3 className="text-base mb-4 text-white">Recommendations:</h3>
        <p className="text-sm text-white/80 mb-2.5">
          "Reclaim afternoon clarity with a 15-min Immersive Reset."
        </p>
        <p className="text-sm text-white/80">
          "Your energy is best used for group writing at 9–11AM. 
          <a href="#" className="text-[#4facfe] ml-1">Match Now?</a>"
        </p>
      </div>

      <div className="bg-[rgba(79,172,254,0.1)] rounded-[15px] p-4 my-5">
        <p className="text-sm text-white/90">
          💡 <strong>Guidance Tip:</strong> When your vibe alternates between Deep Creation and Light Admin, your output increases 1.7x.
        </p>
      </div>

      <PrimaryButton className="mb-8">
        🔁 Reprice My Time Allocation
      </PrimaryButton>

      <div className="bg-white/5 rounded-[20px] p-5 my-5">
        <h3 className="text-base mb-4 text-white">📅 Simulate Future Schedule</h3>
        <div className="grid grid-cols-7 gap-2.5 my-5">
          {weekSchedule.map((day, index) => (
            <div
              key={index}
              className="bg-white/[0.03] rounded-[10px] p-2.5 min-h-[150px] border border-dashed border-[rgba(79,172,254,0.2)]"
            >
              <div className="text-[10px] text-center text-white/60 mb-2.5">{day.day}</div>
              {day.tasks.map((task, taskIndex) => (
                <div
                  key={taskIndex}
                  className="bg-gradient-to-br from-[rgba(79,172,254,0.3)] to-[rgba(240,147,251,0.3)] rounded text-[10px] p-1.5 my-1.5 cursor-move"
                >
                  {task}
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="text-xs text-white/60 mt-2.5">
          Drag tasks to preview token costs and sync opportunities
        </p>
      </div>
    </div>
  );
};

export default InsightsScreen;
