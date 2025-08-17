// Mock Data for Group Payment App
// This file centralizes all default mock data for easier management

// Vibe Options for task setup
export const vibeOptions = [
  { name: 'Calm', emoji: '😌' },
  { name: 'Focus', emoji: '🎯' },
  { name: 'Creative', emoji: '🎨' },
  { name: 'Energetic', emoji: '⚡' }
];

// Available tags for tasks
export const availableTags = [
  'Plan', 'Code', 'Test', 'Review', 'Design', 'Research', 'Write', 
  'Meeting', 'Learning', 'Practice', 'Analysis', 'Creative'
];

// Default preset chips
export const defaultChips = [
  'Morning', 'Short Burst', 'Solo Mode', 'Audio Editing', '20min', 'Deep Work'
];

// Default focus timeline blocks
export const defaultFocusBlocks = [
  { id: 1, type: 'light-blue', label: 'Ease-In', sync: 3, width: '25%', left: '0%' },
  { id: 2, type: 'green', label: 'Active Flow', sync: 7, width: '30%', left: '25%' },
  { id: 3, type: 'orange', label: 'High Focus', sync: 5, width: '25%', left: '55%' },
  { id: 4, type: 'red', label: 'Ultra', sync: 2, width: '20%', left: '80%' }
];

// Saved tasks examples
export const savedTasks = [
  {
    id: 1,
    name: 'Creative Brief Draft',
    tags: ['Plan', 'Design', 'Creative'],
    costTags: ['$2/min', '$100'],
    videoTags: [],
    intensity: 'High',
    vibeSignature: 'Calm',
    time: '1:30'
  },
  {
    id: 2,
    name: 'Code Review Session',
    tags: ['Code', 'Review', 'Analysis'],
    costTags: ['$3/min', '$150'],
    videoTags: [],
    intensity: 'Medium',
    vibeSignature: 'Focus',
    time: '2:00'
  },
  {
    id: 3,
    name: 'Research Phase',
    tags: ['Research', 'Analysis', 'Learning'],
    costTags: ['$1.5/min', '$80'],
    videoTags: [],
    intensity: 'Low',
    vibeSignature: 'Calm',
    time: '0:45'
  },
  // Demo Tasks with Video Links
  {
    id: 4,
    name: 'Home Decor Inspiration',
    tags: ['Design', 'Creative'],
    costTags: ['$1/min'],
    videoTags: [
      {
        url: 'https://www.youtube.com/watch?v=AOZulahHWSk',
        title: 'Modern Home Decor Ideas',
        thumbnailUrl: 'https://img.youtube.com/vi/AOZulahHWSk/hqdefault.jpg',
        tags: ['Home Decor', 'DIY', 'Interior Design'],
        platform: 'YouTube'
      }
    ],
    intensity: 'High',
    vibeSignature: 'Energetic',
    time: '1:15'
  },
  {
    id: 5,
    name: 'Dream Travel Planning',
    tags: ['Plan', 'Research', 'Adventure'],
    costTags: [],
    videoTags: [
      {
        url: 'https://www.youtube.com/watch?v=kZ06nOhdr6Q',
        title: 'Epic Travel Destinations',
        thumbnailUrl: 'https://img.youtube.com/vi/kZ06nOhdr6Q/hqdefault.jpg',
        tags: ['Travel', 'Adventure', 'Vlog'],
        platform: 'YouTube'
      }
    ],
    intensity: 'Medium',
    vibeSignature: 'Creative',
    time: '2:30'
  },
  {
    id: 6,
    name: 'Productivity App Review',
    tags: ['Learning', 'Tech'],
    costTags: [],
    videoTags: [
      {
        url: 'https://www.youtube.com/watch?v=aHk0dK4L_Ok',
        title: 'Best Productivity Apps',
        thumbnailUrl: 'https://img.youtube.com/vi/aHk0dK4L_Ok/hqdefault.jpg',
        tags: ['Apps', 'Productivity', 'Tech Review'],
        platform: 'YouTube'
      }
    ],
    intensity: 'Low',
    vibeSignature: 'Focus',
    time: '0:45'
  },
  {
    id: 7,
    name: 'Pet Playtime & Training',
    tags: ['Pets', 'Training'],
    costTags: [],
    videoTags: [
      {
        url: 'https://www.tiktok.com/@bshtrio/video/7273262814976953643',
        title: 'Funny Dog Feeding Habits',
        thumbnailUrl: 'https://placehold.co/120x90/E91E63/FFFFFF?text=TikTok+Video',
        tags: ['Pets', 'Dog Tricks', 'Cute Animals'],
        platform: 'TikTok'
      },
      {
        url: 'https://www.tiktok.com/@krity_s/video/7278708418293108010',
        title: 'Cat\'s Playtime Adventures',
        thumbnailUrl: 'https://placehold.co/120x90/E91E63/FFFFFF?text=TikTok+Video',
        tags: ['Pets', 'Cat Lovers', 'Funny'],
        platform: 'TikTok'
      }
    ],
    intensity: 'Medium',
    vibeSignature: 'Calm',
    time: '1:00'
  }
];

// Welcome screen features
export const welcomeFeatures = [
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

// Insights screen data
export const insightCards = [
  {
    icon: '🎨',
    title: 'Creative Flow',
    desc: '3 sessions • 2.5hrs total'
  },
  {
    icon: '📊',
    title: 'Admin Loop',
    desc: '2 sessions • 1hr total'
  },
  {
    icon: '☁️',
    title: 'Midday Drifting',
    desc: '2 sessions • 45min total'
  }
];

export const weekSchedule = [
  { day: 'MON', tasks: ['Deep Work', 'Admin'] },
  { day: 'TUE', tasks: ['Creative'] },
  { day: 'WED', tasks: ['Review'] },
  { day: 'THU', tasks: [] },
  { day: 'FRI', tasks: [] },
  { day: 'SAT', tasks: [] },
  { day: 'SUN', tasks: [] }
];

// Completion screen data
export const completionStats = [
  { label: 'Total Time Focused:', value: '37 min', isLarge: true },
  { label: 'Time Earned:', value: '+4.2 Presence Tokens' },
  { label: 'Sync Rating:', value: 'High Resonance (8 users)' },
  { label: 'Vibe Signature:', value: 'Calm' }
];

export const actionStreaks = [
  { type: 'light-blue', label: '5m', width: '15%', left: '0%' },
  { type: 'green', label: '15m', width: '40%', left: '15%' },
  { type: 'orange', label: '12m', width: '30%', left: '55%' },
  { type: 'red', label: '5m', width: '15%', left: '85%' }
];

// Focus block color mapping
export const focusBlockColors = {
  'light-blue': 'bg-gradient-to-br from-[#4facfe] to-[#00f2fe] text-white',
  'green': 'bg-gradient-to-br from-[#43e97b] to-[#38f9d7] text-white',
  'orange': 'bg-gradient-to-br from-[#fa709a] to-[#fee140] text-white',
  'red': 'bg-gradient-to-br from-[#f83600] to-[#fe8c00] text-white'
};

// Vibe emoji mapping
export const vibeEmojis = {
  'Calm': '😌',
  'Focus': '🎯',
  'Creative': '🎨',
  'Energetic': '⚡'
};

// Video platform detection helper
export const getVideoInfo = (url) => {
  let type = 'Unknown';
  let thumbnailUrl = 'https://placehold.co/120x90/607D8B/FFFFFF?text=Video';

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    type = 'YouTube';
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
    if (videoIdMatch && videoIdMatch[1]) {
      thumbnailUrl = `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg`;
    }
  } else if (url.includes('tiktok.com')) {
    type = 'TikTok';
    thumbnailUrl = 'https://placehold.co/120x90/E91E63/FFFFFF?text=TikTok+Video';
  }
  return { type, thumbnailUrl };
};
