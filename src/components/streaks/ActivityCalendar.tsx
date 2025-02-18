import React, { useState } from 'react';
import { Plus, Info, Calendar, Edit2, Trash2 } from 'lucide-react';
import type { PersonalRecord } from '../../types';

interface ActivityCalendarProps {
  activityData: Array<{
    date: string;
    workout?: {
      workoutName: string;
      exercises: string[];
      notes?: string;
      duration?: number;
    };
    measurements?: {
      weight: number;
      height?: number;
      bodyFat?: number;
      units: 'metric' | 'us';
    };
    personalRecords?: PersonalRecord[];
  }>;
  onAddActivity: (date: string) => void;
  onEditWorkout: (date: string) => void;
  onDeleteWorkout: (date: string) => void;
  onEditMeasurement: (date: string) => void;
  onDeleteMeasurement: (date: string) => void;
  onEditPR: (date: string, prId: string) => void;
  onDeletePR: (date: string, prId: string) => void;
  onShowInfo: (info: string) => void;
}

export const ActivityCalendar: React.FC<ActivityCalendarProps> = ({
  activityData,
  onAddActivity,
  onEditWorkout,
  onDeleteWorkout,
  onEditMeasurement,
  onDeleteMeasurement,
  onEditPR,
  onDeletePR,
  onShowInfo
}) => {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  const getDateInfo = (date: string, workout?: any, measurements?: any, personalRecords?: PersonalRecord[]) => {
    const parts = [];
    if (workout) {
      parts.push(`Workout: ${workout.workoutName}`);
      if (workout.exercises.length > 0) {
        parts.push(`Exercises: ${workout.exercises.join(', ')}`);
      }
    }
    if (measurements) {
      parts.push(`Weight: ${measurements.weight}${measurements.units === 'metric' ? 'kg' : 'lbs'}`);
      if (measurements.height) {
        parts.push(`Height: ${measurements.height}${measurements.units === 'metric' ? 'cm' : 'in'}`);
      }
      if (measurements.bodyFat) {
        parts.push(`Body Fat: ${measurements.bodyFat}%`);
      }
    }
    if (personalRecords && personalRecords.length > 0) {
      parts.push('Personal Records:');
      personalRecords.forEach(pr => {
        parts.push(`${pr.exerciseName}: ${pr.weight}${pr.units === 'metric' ? 'kg' : 'lbs'} × ${pr.reps} reps`);
      });
    }
    return parts.join('\n');
  };

  const generateCalendarDays = () => {
    const days = [];
    const startDate = new Date();
    startDate.setDate(1);
    const today = new Date();
    
    let currentDate = new Date(startDate);
    
    while (currentDate <= today) {
      const dateString = currentDate.toISOString().split('T')[0];
      const activity = activityData.find(a => a.date === dateString);
      
      days.push({
        date: dateString,
        workout: activity?.workout,
        measurements: activity?.measurements,
        personalRecords: activity?.personalRecords
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Activity Calendar</h3>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {calendarDays.map(({ date, workout, measurements, personalRecords }) => {
          const hasData = workout || measurements || (personalRecords && personalRecords.length > 0);
          const isHovered = hoveredDate === date;
          const currentDate = new Date(date);
          
          return (
            <div
              key={date}
              className={`aspect-square rounded-lg relative group ${
                hasData ? 'bg-blue-500' : 'bg-gray-200'
              }`}
              onMouseEnter={() => {
                setHoveredDate(date);
                if (hasData) {
                  onShowInfo(getDateInfo(date, workout, measurements, personalRecords));
                }
              }}
              onMouseLeave={() => {
                setHoveredDate(null);
                onShowInfo('');
              }}
            >
              <div className="absolute top-1 left-1 text-xs text-white">
                {currentDate.getDate()}
              </div>

              {/* Activity Indicators */}
              {hasData && (
                <div className="absolute top-1 right-1 flex space-x-1">
                  {workout && (
                    <div className="w-2 h-2 rounded-full bg-green-400" title="Workout logged" />
                  )}
                  {measurements && (
                    <div className="w-2 h-2 rounded-full bg-purple-400" title="Measurements logged" />
                  )}
                  {personalRecords && personalRecords.length > 0 && (
                    <div className="w-2 h-2 rounded-full bg-yellow-400" title="PR logged" />
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity rounded-lg
                ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                {!hasData ? (
                  <button
                    onClick={() => onAddActivity(date)}
                    className="p-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Add Activity"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                ) : (
                  <div className="flex gap-2">
                    {workout && (
                      <button
                        onClick={() => onEditWorkout(date)}
                        className="p-2 bg-white text-blue-500 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Edit Workout"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                    )}
                    {measurements && (
                      <button
                        onClick={() => onEditMeasurement(date)}
                        className="p-2 bg-white text-purple-500 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Edit Measurements"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                    )}
                    {personalRecords?.map(pr => (
                      <button
                        key={pr.id}
                        onClick={() => onEditPR(date, pr.id)}
                        className="p-2 bg-white text-yellow-500 rounded-lg hover:bg-gray-100 transition-colors"
                        title={`Edit PR: ${pr.exerciseName}`}
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        if (workout) onDeleteWorkout(date);
                        if (measurements) onDeleteMeasurement(date);
                        if (personalRecords) personalRecords.forEach(pr => onDeletePR(date, pr.id));
                      }}
                      className="p-2 bg-white text-red-500 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Delete Activities"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};