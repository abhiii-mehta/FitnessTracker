import React, { useState } from 'react';
import type { UserStats } from '../types';

export const CalorieCalculator: React.FC = () => {
  const [stats, setStats] = useState<UserStats>({
    weight: 70,
    height: 170,
    age: 30,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintain',
    weightChangePeriod: 'week',
    units: 'metric'
  });

  const [useBodyFat, setUseBodyFat] = useState(false);

  // Conversion functions
  const lbsToKg = (lbs: number) => lbs * 0.453592;
  const kgToLbs = (kg: number) => kg * 2.20462;
  const inchesToCm = (inches: number) => inches * 2.54;
  const cmToInches = (cm: number) => cm / 2.54;
  const ftToInches = (ft: number, inches: number = 0) => ft * 12 + inches;

  const handleUnitChange = (newUnit: 'metric' | 'us') => {
    if (newUnit === stats.units) return;

    setStats(prev => {
      const newStats = { ...prev, units: newUnit };
      if (newUnit === 'us') {
        // Convert to US units
        newStats.weight = Math.round(kgToLbs(prev.weight) * 10) / 10;
        newStats.height = Math.round(cmToInches(prev.height) * 10) / 10;
      } else {
        // Convert to metric
        newStats.weight = Math.round(lbsToKg(prev.weight) * 10) / 10;
        newStats.height = Math.round(inchesToCm(prev.height) * 10) / 10;
      }
      return newStats;
    });
  };

  const calculateBMR = () => {
    // Convert to metric for calculations if needed
    const weightInKg = stats.units === 'us' ? lbsToKg(stats.weight) : stats.weight;
    const heightInCm = stats.units === 'us' ? inchesToCm(stats.height) : stats.height;

    if (useBodyFat && stats.bodyFat !== undefined) {
      // Katch-McArdle Formula: BMR = 370 + (21.6 * LBM)
      const leanBodyMass = weightInKg * (1 - stats.bodyFat / 100);
      return 370 + (21.6 * leanBodyMass);
    } else {
      // Mifflin-St Jeor Equation
      if (stats.gender === 'male') {
        return 10 * weightInKg + 6.25 * heightInCm - 5 * stats.age + 5;
      }
      return 10 * weightInKg + 6.25 * heightInCm - 5 * stats.age - 161;
    }
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
    
    if (stats.goal === 'maintain') {
      return tdee;
    }

    // Convert weight change rate to weekly if it's monthly
    const weeklyRate = stats.weightChangeRate 
      ? (stats.weightChangePeriod === 'month' 
        ? stats.weightChangeRate / 4 
        : stats.weightChangeRate)
      : 0.5; // Default to 0.5kg per week if not specified

    // Convert to kg if using US units
    const weeklyRateKg = stats.units === 'us' ? lbsToKg(weeklyRate) : weeklyRate;

    // 1kg of fat = 7700 calories
    const calorieAdjustment = Math.round(weeklyRateKg * 7700 / 7);

    return stats.goal === 'lose' 
      ? tdee - calorieAdjustment 
      : tdee + calorieAdjustment;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Calorie Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          {/* Units Toggle */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => handleUnitChange('metric')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                stats.units === 'metric'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Metric (kg/cm)
            </button>
            <button
              onClick={() => handleUnitChange('us')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                stats.units === 'us'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              US (lb/ft)
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight ({stats.units === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              value={stats.weight}
              onChange={(e) => setStats({ ...stats, weight: Number(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
              step="0.1"
            />
          </div>

          <div>
            {stats.units === 'metric' ? (
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
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height (ft & in)
                </label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="number"
                      value={Math.floor(stats.height / 12)}
                      onChange={(e) => {
                        const feet = Number(e.target.value);
                        const inches = stats.height % 12;
                        setStats({ ...stats, height: ftToInches(feet, inches) });
                      }}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="ft"
                      min="0"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      value={Math.round(stats.height % 12)}
                      onChange={(e) => {
                        const feet = Math.floor(stats.height / 12);
                        const inches = Number(e.target.value);
                        setStats({ ...stats, height: ftToInches(feet, inches) });
                      }}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="in"
                      min="0"
                      max="11"
                    />
                  </div>
                </div>
              </div>
            )}
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

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={useBodyFat}
                onChange={(e) => {
                  setUseBodyFat(e.target.checked);
                  if (!e.target.checked) {
                    const { bodyFat, ...rest } = stats;
                    setStats(rest);
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>I know my body fat percentage</span>
            </label>
          </div>

          {useBodyFat && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Body Fat %
              </label>
              <input
                type="number"
                value={stats.bodyFat || ''}
                onChange={(e) => setStats({ ...stats, bodyFat: Number(e.target.value) })}
                min="1"
                max="100"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          )}
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
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Light Exercise (1-3 days/week)</option>
              <option value="moderate">Moderate Exercise (3-5 days/week)</option>
              <option value="very">Very Active (6-7 days/week)</option>
              <option value="extra">Extra Active (very active + physical job)</option>
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

          {stats.goal !== 'maintain' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Desired weight change
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    value={stats.weightChangeRate || ''}
                    onChange={(e) => setStats({ ...stats, weightChangeRate: Number(e.target.value) })}
                    step="0.1"
                    min="0"
                    max={stats.weightChangePeriod === 'week' ? 
                      (stats.units === 'metric' ? 1 : 2.2) : // 1kg/week or 2.2lbs/week
                      (stats.units === 'metric' ? 4 : 8.8)   // 4kg/month or 8.8lbs/month
                    }
                    placeholder={stats.goal === 'lose' ? "Weight to lose" : "Weight to gain"}
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                  <select
                    value={stats.weightChangePeriod}
                    onChange={(e) => setStats({ ...stats, weightChangePeriod: e.target.value as 'week' | 'month' })}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="week">per week</option>
                    <option value="month">per month</option>
                  </select>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.goal === 'lose' 
                    ? `Recommended: ${stats.units === 'metric' ? '0.5-1kg' : '1-2lbs'} per week for healthy weight loss`
                    : `Recommended: ${stats.units === 'metric' ? '0.25-0.5kg' : '0.5-1lb'} per week for lean muscle gain`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Your Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">BMR</p>
            <p className="text-2xl font-bold">{Math.round(calculateBMR())} kcal</p>
            <p className="text-xs text-gray-500 mt-1">
              Using {useBodyFat ? 'Katch-McArdle' : 'Mifflin-St Jeor'} Formula
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">TDEE</p>
            <p className="text-2xl font-bold">{calculateTDEE()} kcal</p>
            <p className="text-xs text-gray-500 mt-1">
              Daily calories to maintain weight
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600">Recommended Daily Calories</p>
            <p className="text-2xl font-bold text-blue-600">{getRecommendedCalories()} kcal</p>
            <p className="text-xs text-blue-500 mt-1">
              {stats.goal === 'maintain' 
                ? "To maintain your current weight"
                : `To ${stats.goal} ${stats.weightChangeRate || 0.5}${stats.units === 'metric' ? 'kg' : 'lbs'} per ${stats.weightChangePeriod}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};