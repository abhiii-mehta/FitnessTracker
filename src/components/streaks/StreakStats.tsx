import React from 'react';
import { Flame, Trophy, Star } from 'lucide-react';
import type { StreakData } from '../../types';

interface StreakStatsProps {
  streakData: StreakData;
}

export const StreakStats: React.FC<StreakStatsProps> = ({ streakData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <Flame className="w-8 h-8 text-orange-500" />
          <div>
            <p className="text-gray-600">Current Streak</p>
            <p className="text-3xl font-bold">{streakData.currentStreak} days</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <div>
            <p className="text-gray-600">Longest Streak</p>
            <p className="text-3xl font-bold">{streakData.longestStreak} days</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <Star className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-gray-600">Total Workouts</p>
            <p className="text-3xl font-bold">{streakData.totalWorkouts}</p>
          </div>
        </div>
      </div>
    </div>
  );
};