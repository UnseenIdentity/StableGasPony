import React, { useEffect, useRef } from 'react';
import PrimaryButton from '../UI/PrimaryButton';

const WelcomeScreen = ({ onScreenChange }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      let scrollAmount = 0;
      const interval = setInterval(() => {
        if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
          scrollAmount = 0;
        } else {
          scrollAmount += 295;
        }
        carousel.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }, 4000);

      return () => clearInterval(interval);
    }
  }, []);

  const features = [
    {
      icon: '🎯',
      title: 'Duplicate Focus Blocks',
      desc: 'Speed up planning with quick duplication'
    },
    {
      icon: '👥',
      title: 'Resonance History',
      desc: 'View past syncs & favorite users'
    },
    {
      icon: '📊',
      title: 'Schedule Simulator',
      desc: 'Preview 7-day token projections'
    },
    {
      icon: '💳',
      title: 'Guest Quick Pay',
      desc: 'Join pools without full account'
    }
  ];

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
          <div 
            ref={carouselRef}
            className="overflow-x-auto scroll-smooth flex gap-3 sm:gap-4 py-1 sm:py-1.5 mb-6 sm:mb-8 scrollbar-hide w-full"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="min-w-[240px] sm:min-w-[280px] bg-gradient-to-br from-[rgba(79,172,254,0.1)] to-[rgba(240,147,251,0.1)] border border-[rgba(79,172,254,0.3)] rounded-[15px] sm:rounded-[20px] p-3 sm:p-5 transition-all duration-300 hover:scale-105 hover:border-[rgba(79,172,254,0.5)] hover:shadow-[0_8px_25px_rgba(79,172,254,0.2)] flex-shrink-0"
                style={{ scrollSnapAlign: 'center' }}
              >
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-2.5">{feature.icon}</div>
                <div className="text-sm sm:text-base font-semibold text-[#4facfe] mb-1 sm:mb-1.5">{feature.title}</div>
                <div className="text-xs sm:text-sm text-white/60">{feature.desc}</div>
              </div>
            ))}
          </div>

          <a 
            href="#" 
            className="text-white/50 text-xs sm:text-sm no-underline mt-4 sm:mt-5 inline-block hover:text-white/70 transition-colors duration-200"
            onClick={(e) => {
              e.preventDefault();
              onScreenChange('task-setup-screen');
            }}
          >
            Skip to Planning →
          </a>

          <PrimaryButton onClick={() => onScreenChange('task-setup-screen')}>
            ➡️ Plan My Session
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
