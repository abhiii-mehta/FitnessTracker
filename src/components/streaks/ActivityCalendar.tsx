import React, { useState } from 'react';
import { Plus, Info, Calendar, Edit2, Trash2 } from 'lucide-react';
import { WorkoutLogger } from './WorkoutLogger';

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
  }>;
  onAddWorkout: (date: string) => void;
  onEditWorkout: (date: string) => void;
  onDeleteWorkout: (date: string) => void;
  onAddMeasurement: (date: string) => void;
  onEditMeasurement: (date: string) => void;
  onDeleteMeasurement: (date: string) => void;
  onShowInfo: (info: string) => void;
}

export const ActivityCalendar: React.FC<ActivityCalendarProps> = ({
  activityData,
  onAddWorkout,
  onEditWorkout,
  onDeleteWorkout,
  onAddMeasurement,
  onEditMeasurement,
  onDeleteMeasurement,
  onShowInfo
}) => {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  const generateCalendarDays = () => {
    const days = [];
    const startDate = new Date('2025-02-18');
    const today = new Date();
    
    let currentDate = new Date(startDate);
    
    while (currentDate <= today) {
      const dateString = currentDate.toISOString().split('T')[0];
      const activity = activityData.find(a => a.date === dateString);
      
      days.push({
        date: dateString,
        workout: activity?.workout,
        measurements: activity?.measurements
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  const getDateInfo = (date: string, workout?: any, measurements?: any) => {
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
    return parts.join('\n');
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Activity Calendar</h3>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {calendarDays.map(({ date, workout, measurements }) => {
          const hasData = workout || measurements;
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
                  onShowInfo(getDateInfo(date, workout, measurements));
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
              <div className="absolute inset-0 flex items-center justify-center">
                {!hasData ? (
                  <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                    <button
                      onClick={() => onAddWorkout(date)}
                      className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      title="Add Workout"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onAddMeasurement(date)}
                      className="p-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                      title="Add Measurements"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                    {workout && (
                      <>
                        <button
                          onClick={() => onEditWorkout(date)}
                          className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          title="Edit Workout"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteWorkout(date)}
                          className="p-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          title="Delete Workout"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {measurements && (
                      <>
                        <button
                          onClick={() => onEditMeasurement(date)}
                          className="p-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                          title="Edit Measurements"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteMeasurement(date)}
                          className="p-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          title="Delete Measurements"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
              {hasData && (
                <div className="absolute bottom-1 right-1">
                  <Info className="w-3 h-3 text-white opacity-50" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};