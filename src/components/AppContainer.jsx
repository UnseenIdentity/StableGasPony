import React from 'react';
import { useAppContext } from '../context/AppContext';
import iPhoneContainer from './Layout/iPhoneContainer';
import StatusBar from './Layout/StatusBar';
import BottomNavigation from './Layout/BottomNavigation';
import LEDIndicator from './UI/LEDIndicator';
import OfflineIndicator from './UI/OfflineIndicator';
import WelcomeScreen from './Screens/WelcomeScreen';
import TaskSetupScreen from './Screens/TaskSetupScreen';
import TimerScreen from './Screens/TimerScreen';
import CompletionScreen from './Screens/CompletionScreen';
import InsightsScreen from './Screens/InsightsScreen';

const AppContainer = () => {
  const { currentScreen, changeScreen, isOffline } = useAppContext();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome-screen':
        return <WelcomeScreen onScreenChange={changeScreen} />;
      case 'task-setup-screen':
        return <TaskSetupScreen onScreenChange={changeScreen} />;
      case 'timer-screen':
        return <TimerScreen onScreenChange={changeScreen} />;
      case 'completion-screen':
        return <CompletionScreen onScreenChange={changeScreen} />;
      case 'insights-screen':
        return <InsightsScreen />;
      default:
        return <WelcomeScreen onScreenChange={changeScreen} />;
    }
  };

  const getLEDIntensity = () => {
    if (currentScreen === 'timer-screen') {
      // This would be connected to the timer's current intensity
      return 'light-blue';
    }
    return 'light-blue';
  };

  return (
    <iPhoneContainer>
      <StatusBar />
      <LEDIndicator intensity={getLEDIntensity()} />
      <OfflineIndicator isActive={isOffline} />
      
      <div className="bg-gradient-to-b from-[#0a0e27] to-[#151933] overflow-y-auto pt-[40px] sm:pt-[50px] pb-[80px] sm:pb-[100px] text-white relative scroll-smooth" 
        style={{ minHeight: 'calc(100vh - 80px)', maxHeight: 'calc(100vh - 80px)' }}>
        {renderScreen()}
      </div>
      
      <BottomNavigation 
        currentScreen={currentScreen} 
        onScreenChange={changeScreen} 
      />
    </iPhoneContainer>
  );
};

export default AppContainer;
