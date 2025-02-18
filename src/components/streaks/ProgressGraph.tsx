import React from 'react';
import type { BodyMeasurement } from '../../types';

interface ProgressGraphProps {
  measurements: BodyMeasurement[];
  type: 'weight' | 'bodyFat';
}

export const ProgressGraph: React.FC<ProgressGraphProps> = ({ measurements, type }) => {
  if (!measurements.length) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">No data to display</p>
      </div>
    );
  }

  // Convert all measurements to metric for consistency in calculations
  const normalizedData = measurements.map(m => ({
    ...m,
    value: type === 'weight' 
      ? (m.units === 'us' ? m.weight * 0.453592 : m.weight)
      : (m.bodyFat || 0)
  }));

  const maxValue = Math.max(...normalizedData.map(m => m.value));
  const minValue = Math.min(...normalizedData.map(m => m.value));
  const range = maxValue - minValue || 1; // Prevent division by zero

  // Get unique dates to prevent duplicate keys
  const uniqueDates = Array.from(new Set(normalizedData.map(m => m.date)));
  const latestMeasurements = uniqueDates.map(date => {
    const measurementsForDate = normalizedData.filter(m => m.date === date);
    return measurementsForDate[measurementsForDate.length - 1];
  });

  return (
    <div className="h-64 relative">
      <div className="absolute inset-0 flex items-end">
        {latestMeasurements.map((measurement) => {
          const height = ((measurement.value - minValue) / range) * 100;
          return (
            <div
              key={`${measurement.date}-${measurement.value}`}
              className="flex-1 flex flex-col items-center"
            >
              <div
                className="w-4 bg-blue-500 rounded-t"
                style={{ height: `${Math.max(height, 1)}%` }}
              />
              <span className="text-xs text-gray-500 mt-1 transform -rotate-45 origin-top-left">
                {new Date(measurement.date).toLocaleDateString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};