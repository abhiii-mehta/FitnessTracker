import React, { useState } from 'react';
import type { UserStats } from '../types';

export const CalorieAdvice: React.FC = () => {
  const [stats, setStats] = useState<UserStats>({
    weight: 70,
    height: 170,
    age: 30,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintain'
  });

  const calculateBMR = () => {
    // Mifflin-St Jeor Equation
    if (stats.gender === 'male') {
      return 10 * stats.weight + 6.25 * stats.height - 5 * stats.age + 5;
    }
    return 10 * stats.weight + 6.25 * stats.height - 5 * stats.age - 161;
  };

  const calculateTDEE = () => {
    const bmr = calculateBMR();
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
      extra: 1.9
    };
    return Math.round(bmr * activityMultipliers[stats.activityLevel]);
  };

  const getRecommendedCalories = () => {
    const tdee = calculateTDEE();
    switch (stats.goal) {
      case 'lose':
        return tdee - 500;
      case 'gain':
        return tdee + 500;
      default:
        return tdee;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Calorie Advice</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              value={stats.weight}
              onChange={(e) => setStats({ ...stats, weight: Number(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              value={stats.height}
              onChange={(e) => setStats({ ...stats, height: Number(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              value={stats.age}
              onChange={(e) => setStats({ ...stats, age: Number(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              value={stats.gender}
              onChange={(e) => setStats({ ...stats, gender: e.target.value as 'male' | 'female' })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Activity Level
            </label>
            <select
              value={stats.activityLevel}
              onChange={(e) => setStats({ ...stats, activityLevel: e.target.value as UserStats['activityLevel'] })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="sedentary">Sedentary</option>
              <option value="light">Light Exercise</option>
              <option value="moderate">Moderate Exercise</option>
              <option value="very">Very Active</option>
              <option value="extra">Extra Active</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Goal
            </label>
            <select
              value={stats.goal}
              onChange={(e) => setStats({ ...stats, goal: e.target.value as 'lose' | 'maintain' | 'gain' })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="lose">Lose Weight</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain">Gain Weight</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Your Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">BMR</p>
            <p className="text-2xl font-bold">{Math.round(calculateBMR())} kcal</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">TDEE</p>
            <p className="text-2xl font-bold">{calculateTDEE()} kcal</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600">Recommended Daily Calories</p>
            <p className="text-2xl font-bold text-blue-600">{getRecommendedCalories()} kcal</p>
          </div>
        </div>
      </div>
    </div>
  );
}