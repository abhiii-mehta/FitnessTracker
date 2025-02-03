import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { WorkoutTracker } from './components/WorkoutTracker';
import { CalorieTracker } from './components/CalorieTracker';
import { CalorieAdvice } from './components/CalorieAdvice';
import { StreakTracker } from './components/StreakTracker';

function App() {
  const [activeTab, setActiveTab] = useState('workouts');

  const renderContent = () => {
    switch (activeTab) {
      case 'workouts':
        return <WorkoutTracker />;
      case 'calories':
        return <CalorieTracker />;
      case 'advice':
        return <CalorieAdvice />;
      case 'streaks':
        return <StreakTracker />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;