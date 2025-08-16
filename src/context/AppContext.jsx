import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('welcome-screen');
  const [isOffline, setIsOffline] = useState(false);
  const [sessions, setSessions] = useState([]);
  
  // Enhanced Task Setup State
  const [taskName, setTaskName] = useState('');
  const [vibeSignature, setVibeSignature] = useState('Calm');
  const [expectedDuration, setExpectedDuration] = useState(60);
  const [selectedTags, setSelectedTags] = useState([]);
  const [costTags, setCostTags] = useState([]);
  const [videoTags, setVideoTags] = useState([]);
  const [aiEstimationPercentage, setAiEstimationPercentage] = useState(70);

  useEffect(() => {
    // Check for offline sessions on load
    const storedSessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    setSessions(storedSessions);
    
    if (storedSessions.length > 0) {
      console.log('Offline sessions available:', storedSessions);
    }
  }, []);

  const changeScreen = (screenId) => {
    setCurrentScreen(screenId);
  };

  const addSession = (sessionData) => {
    const newSessions = [...sessions, sessionData];
    if (newSessions.length > 3) {
      newSessions.shift(); // Keep only last 3
    }
    setSessions(newSessions);
    localStorage.setItem('sessions', JSON.stringify(newSessions));
  };

  const resetTaskSetup = () => {
    setTaskName('');
    setVibeSignature('Calm');
    setExpectedDuration(60);
    setSelectedTags([]);
    setCostTags([]);
    setVideoTags([]);
    setAiEstimationPercentage(70);
  };

  const value = {
    currentScreen,
    changeScreen,
    isOffline,
    setIsOffline,
    sessions,
    addSession,
    // Enhanced Task Setup State
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
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
