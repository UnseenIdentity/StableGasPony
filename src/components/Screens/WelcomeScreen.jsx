import React, { useEffect, useState } from 'react';
import PrimaryButton from '../UI/PrimaryButton';
import { welcomeFeatures } from '../../data/mockData';

const WelcomeScreen = ({ onScreenChange }) => {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prevIndex) => 
        (prevIndex + 1) % welcomeFeatures.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="screen">
      {/* Main Content Area - Scrollable with proper height and width */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-5 pt-4 pb-4 w-full" style={{ height: 'calc(100vh - 80px)' }}>
        <div className="text-center py-6 sm:py-8 w-full">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-br from-[#4facfe] via-[#00f2fe] to-[#f093fb] bg-clip-text text-transparent animate-pulse">
              👋 Welcome back, Eva!
            </h1>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-[#4facfe] via-[#00f2fe] to-[#f093fb] bg-clip-text text-transparent animate-pulse">
              Ready to flow?
            </h1>
          </div>
          
          <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 px-2">
            Set your vibe, align your focus, and unlock time-based sync energy with others like you.
          </p>

          {/* What's New Carousel */}
          <div className="relative mb-6 sm:mb-8">
            <div className="overflow-hidden w-full">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentFeatureIndex * (100 / welcomeFeatures.length)}%)`,
                  width: `${welcomeFeatures.length * 100}%`
                }}
              >
                {welcomeFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="w-full px-2 sm:px-4"
                    style={{ flex: `0 0 ${100 / welcomeFeatures.length}%` }}
                  >
                    <div className="w-full max-w-[260px] sm:max-w-[280px] mx-auto bg-gradient-to-br from-[rgba(79,172,254,0.1)] to-[rgba(240,147,251,0.1)] border border-[rgba(79,172,254,0.3)] rounded-[20px] p-4 sm:p-5 transition-all duration-300 hover:scale-105 hover:border-[rgba(79,172,254,0.5)] hover:shadow-[0_8px_25px_rgba(79,172,254,0.2)]">
                      <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{feature.icon}</div>
                      <div className="text-sm sm:text-base font-semibold text-[#4facfe] mb-1 sm:mb-2">{feature.title}</div>
                      <div className="text-xs sm:text-sm text-white/60 leading-tight">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {welcomeFeatures.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeatureIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentFeatureIndex 
                      ? 'bg-[#4facfe] w-6' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          <a 
            href="#" 
            className="text-white/50 text-xs sm:text-sm no-underline mt-4 sm:mt-5 inline-block hover:text-white/70 transition-colors duration-200"
            onClick={(e) => {
              e.preventDefault();
              console.log('Skip to Planning clicked, changing to task-setup-screen');
              onScreenChange('task-setup-screen');
            }}
          >
            Skip to Planning →
          </a>

          <PrimaryButton onClick={() => {
            console.log('Plan My Session clicked, changing to task-setup-screen');
            onScreenChange('task-setup-screen');
          }}>
            ➡️ Plan My Session
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
