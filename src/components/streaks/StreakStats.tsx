import React from 'react';
import { Flame, Trophy, Star } from 'lucide-react';
import type { StreakData } from '../../types';

interface StreakStatsProps {
  streakData: StreakData;
}

export const StreakStats: React.FC<StreakStatsProps> = ({ streakData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-xl shadow-lg text-white">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <p className="text-white/80 font-medium">Current Streak</p>
            <p className="text-3xl font-bold">{streakData.currentStreak} days</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-6 rounded-xl shadow-lg text-white">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <p className="text-white/80 font-medium">Longest Streak</p>
            <p className="text-3xl font-bold">{streakData.longestStreak} days</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-xl shadow-lg text-white">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <Star className="w-8 h-8" />
          </div>
          <div>
            <p className="text-white/80 font-medium">Total Workouts</p>
            <p className="text-3xl font-bold">{streakData.totalWorkouts}</p>
          </div>
        </div>
      </div>
    </div>
  );
};