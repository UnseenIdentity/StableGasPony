import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import PrimaryButton from '../UI/PrimaryButton';
import InputField from '../UI/InputField';
import VibeSignatureDropdown from '../UI/VibeSignatureDropdown';
import DurationSlider from '../UI/DurationSlider';
import AIEstimationBar from '../UI/AIEstimationBar';
import SavedTasksList from '../UI/SavedTasksList';
import TagEditor from '../UI/TagEditor';
import { getVideoInfo, savedTasks, vibeEmojis } from '../../data/mockData';

const TaskSetupScreen = ({ onScreenChange }) => {
  const {
    taskName,
    setTaskName,
    vibeSignature,
    setVibeSignature,
    expectedDuration,
    setExpectedDuration,
    selectedTags,
    setSelectedTags,
    costTags,
    setCostTags,
    videoTags,
    setVideoTags,
    aiEstimationPercentage,
    setAiEstimationPercentage,
    resetTaskSetup
  } = useAppContext();

  const [showAddTags, setShowAddTags] = useState(false);
  const [isSyncActive, setIsSyncActive] = useState(false);
  const [videoLinkInput, setVideoLinkInput] = useState('');
  const [videoTitleInput, setVideoTitleInput] = useState('');
  const [videoProductTagsInput, setVideoProductTagsInput] = useState('');

  const addVideoTag = () => {
    if (videoLinkInput && videoTitleInput) {
      const { type, thumbnailUrl } = getVideoInfo(videoLinkInput);
      const newVideoTag = {
        url: videoLinkInput,
        title: videoTitleInput,
        thumbnailUrl: thumbnailUrl,
        platform: type,
        tags: videoProductTagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      };
      setVideoTags(prev => [...prev, newVideoTag]);
      setVideoLinkInput('');
      setVideoTitleInput('');
      setVideoProductTagsInput('');
    }
  };

  const removeVideoTag = (urlToRemove) => {
    setVideoTags(prev => prev.filter(video => video.url !== urlToRemove));
  };

  const handleVibeSelect = (vibe) => {
    setVibeSignature(vibe);
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const handleSyncClick = () => {
    setIsSyncActive(true);
    // Simulate AI estimation
    setTimeout(() => {
      setAiEstimationPercentage(Math.floor(Math.random() * 30) + 70);
      setIsSyncActive(false);
    }, 500);
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleTagRemove = (tag) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  const handleCostTagAdd = (newCostTags) => {
    setCostTags(prev => [...prev, ...newCostTags]);
  };

  const handleCostTagRemove = (tag) => {
    setCostTags(prev => prev.filter(t => t !== tag));
  };

  const handleTaskSelect = (task) => {
    setTaskName(task.name);
    setSelectedTags([...task.tags]);
    setCostTags([...task.costTags]);
    setVideoTags([...task.videoTags]);
    setVibeSignature(task.vibeSignature);
  };

  const handleStartGrouping = () => {
    if (taskName) {
      onScreenChange('wallet-screen');
    }
  };

  const getVibeEmoji = () => {
    return vibeEmojis[vibeSignature] || '😌';
  };

  return (
    <div className="screen h-full flex flex-col">
      {/* Main Content Area - Scrollable with proper height constraint */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-5 pt-4 pb-4">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="text-3xl">🔍</div>
            <h1 className="text-xl font-medium">What are you wishing to do?</h1>
          </div>

          {/* Task Input */}
          <div>
            <InputField
              label=""
              placeholder="e.g., Creative Brief Draft"
              value={taskName}
              onChange={setTaskName}
              className="mb-0"
            />
          </div>

          {/* Vibe Signature Selection */}
          <VibeSignatureDropdown
            selectedVibe={vibeSignature}
            onVibeSelect={handleVibeSelect}
            isSyncActive={isSyncActive}
            onSyncClick={handleSyncClick}
            aiEstimationPercentage={aiEstimationPercentage}
          />

          {/* Expected Duration */}
          <DurationSlider
            expectedDuration={expectedDuration}
            onDurationChange={setExpectedDuration}
          />

          {/* Visual Consciousness AI Estimation */}
          <AIEstimationBar
            vibeSignature={vibeSignature}
            vibeEmoji={getVibeEmoji()}
            aiEstimationPercentage={aiEstimationPercentage}
            expectedDuration={expectedDuration}
          />

          {/* Saved List and Tags */}
          <SavedTasksList
            savedTasks={savedTasks}
            onTaskSelect={handleTaskSelect}
            selectedTags={selectedTags}
            costTags={costTags}
            videoTags={videoTags}
            onTagRemove={handleTagRemove}
            onCostTagRemove={handleCostTagRemove}
            onVideoTagRemove={removeVideoTag}
          />

          {/* Add/Edit Tags Button */}
          <button
            onClick={() => setShowAddTags(!showAddTags)}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
          >
            ➕
            Add/Edit Tags
          </button>

          {/* Tag Editor */}
          <TagEditor
            showAddTags={showAddTags}
            onToggleTags={() => setShowAddTags(!showAddTags)}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            costTags={costTags}
            onCostTagAdd={handleCostTagAdd}
            onCostTagRemove={handleCostTagRemove}
            videoTags={videoTags}
            onVideoTagAdd={addVideoTag}
            onVideoTagRemove={removeVideoTag}
            videoLinkInput={videoLinkInput}
            setVideoLinkInput={setVideoLinkInput}
            videoTitleInput={videoTitleInput}
            setVideoTitleInput={setVideoTitleInput}
            videoProductTagsInput={videoProductTagsInput}
            setVideoProductTagsInput={setVideoProductTagsInput}
          />

          {/* Start Grouping Button */}
          <button
            onClick={handleStartGrouping}
            disabled={!taskName}
            className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
              taskName 
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg' 
                : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
            }`}
          >
            {taskName ? '🚀' : '⏸️'}
            {taskName ? 'Start Grouping' : 'Enter Task Name'}
          </button>
        </div>
      </div>

      {/* Bottom Navigation - Fixed at bottom */}
      <div className="flex justify-around py-4 bg-white/10 backdrop-blur-sm border-t border-white/10">
        <button className="flex flex-col items-center gap-1 text-white/70">
          ⏰
          <span className="text-xs">Flow Check</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-white/70">
          🎯
          <span className="text-xs">Action Pools</span>
        </button>
      </div>
    </div>
  );
};

export default TaskSetupScreen;
