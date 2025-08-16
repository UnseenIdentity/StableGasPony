import React from 'react';
import { AppProvider } from './context/AppContext';
import AppContainer from './components/AppContainer';

function App() {
  return (
    <AppProvider>
      <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex justify-center items-center p-4 overflow-hidden">
        <AppContainer />
      </div>
    </AppProvider>
  );
}

export default App;