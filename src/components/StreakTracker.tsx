import React from 'react';
import { Calendar } from 'lucide-react';

export const StreakTracker: React.FC = () => {
  // This would be calculated from actual user data in a real app
  const currentStreak = 5;
  const longestStreak = 12;
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Streaks</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-4">
            <Calendar className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-gray-600">Current Streak</p>
              <p className="text-3xl font-bold">{currentStreak} days</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-4">
            <Calendar className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-gray-600">Longest Streak</p>
              <p className="text-3xl font-bold">{longestStreak} days</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="grid grid-cols-7 gap-2">
          {[...Array(28)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg ${
                i % 3 === 0 ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}