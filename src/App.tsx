import React from 'react';
import { Navigation } from './components/Navigation';
import { WorkoutTracker } from './components/WorkoutTracker';
import { CalorieTracker } from './components/CalorieTracker';
import { CalorieCalculator } from './components/CalorieCalculator';
import { StreakTracker } from './components/StreakTracker';
import { WorkoutProvider } from './context/WorkoutContext';

function App() {
  const [activeTab, setActiveTab] = React.useState('workouts');

  const renderContent = () => {
    switch (activeTab) {
      case 'workouts':
        return <WorkoutTracker />;
      case 'calories':
        return <CalorieTracker />;
      case 'calculator':
        return <CalorieCalculator />;
      case 'streaks':
        return <StreakTracker />;
      default:
        return null;
    }
  };

  return (
    <WorkoutProvider>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 pt-16 lg:pt-0">
          {renderContent()}
        </main>
      </div>
    </WorkoutProvider>
  );
}

export default App;