import React from 'react';
import { Scale, TrendingUp, TrendingDown } from 'lucide-react';
import type { BodyMeasurement } from '../../types';

interface WeightTrackerProps {
  measurements: BodyMeasurement[];
  onAddMeasurement: () => void;
}

export const WeightTracker: React.FC<WeightTrackerProps> = ({
  measurements,
  onAddMeasurement
}) => {
  const getLatestMeasurement = () => {
    if (!measurements?.length) return null;
    return measurements[measurements.length - 1];
  };

  const getWeightTrend = () => {
    if (!measurements?.length || measurements.length < 2) return null;
    
    const latest = measurements[measurements.length - 1];
    const previous = measurements[measurements.length - 2];
    
    // Convert to metric for comparison
    const latestWeight = latest.units === 'us' ? latest.weight * 0.453592 : latest.weight;
    const previousWeight = previous.units === 'us' ? previous.weight * 0.453592 : previous.weight;
    
    const change = latestWeight - previousWeight;
    // Convert change back to display units
    const changeInDisplayUnits = latest.units === 'us' ? change * 2.20462 : change;
    
    return {
      direction: change > 0 ? 'up' : 'down',
      amount: Math.abs(changeInDisplayUnits).toFixed(1),
      units: latest.units === 'metric' ? 'kg' : 'lbs'
    };
  };

  const latest = getLatestMeasurement();
  const trend = getWeightTrend();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Scale className="w-6 h-6 text-purple-500" />
          <h3 className="text-lg font-semibold">Weight Tracking</h3>
        </div>
        <button
          onClick={onAddMeasurement}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Add Measurement
        </button>
      </div>

      {latest ? (
        <div className="space-y-2">
          <p className="text-2xl font-bold">
            {latest.weight} {latest.units === 'metric' ? 'kg' : 'lbs'}
          </p>
          {trend && (
            <div className="flex items-center space-x-2 text-sm">
              {trend.direction === 'up' ? (
                <TrendingUp className="w-4 h-4 text-red-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-green-500" />
              )}
              <span className={trend.direction === 'up' ? 'text-red-500' : 'text-green-500'}>
                {trend.amount} {trend.units}
              </span>
              <span className="text-gray-500">since last measurement</span>
            </div>
          )}
          {latest.bodyFat && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">Body Fat</p>
              <p className="text-xl font-semibold">{latest.bodyFat}%</p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">No measurements recorded yet</p>
      )}
    </div>
  );
};