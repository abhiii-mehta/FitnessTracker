import React, { useState } from 'react';
import { Plus, Info, Calendar, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [currentDate, setCurrentDate] = useState(new Date());

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
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Create a date object for the first day of the current month
    const firstDayOfMonth = new Date(year, month, 1);
    // Get the last day of the current month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayWeekday = firstDayOfMonth.getDay();
    
    // Add padding days from previous month
    for (let i = 0; i < firstDayWeekday; i++) {
      const paddingDate = new Date(year, month, -i);
      days.push({
        date: paddingDate.toISOString().split('T')[0],
        isPadding: true
      });
    }
    days.reverse(); // Reverse the padding days to get correct order
    
    // Add current month days
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const currentDate = new Date(year, month, day);
      const dateString = currentDate.toISOString().split('T')[0];
      const activity = activityData.find(a => a.date === dateString);
      
      days.push({
        date: dateString,
        workout: activity?.workout,
        measurements: activity?.measurements,
        personalRecords: activity?.personalRecords,
        isPadding: false
      });
    }
    
    // Add padding days for next month
    const lastDayWeekday = lastDayOfMonth.getDay();
    const remainingDays = 6 - lastDayWeekday;
    for (let i = 1; i <= remainingDays; i++) {
      const paddingDate = new Date(year, month + 1, i);
      days.push({
        date: paddingDate.toISOString().split('T')[0],
        isPadding: true
      });
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const calendarDays = generateCalendarDays();
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Activity Calendar</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-medium">{monthName}</span>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {calendarDays.map(({ date, workout, measurements, personalRecords, isPadding }) => {
          const hasData = workout || measurements || (personalRecords && personalRecords.length > 0);
          const isHovered = hoveredDate === date;
          const dateObj = new Date(date);
          const isToday = new Date().toISOString().split('T')[0] === date;
          
          return (
            <div
              key={date}
              className={`aspect-square rounded-lg relative group ${
                isPadding 
                  ? 'bg-gray-100'
                  : hasData 
                    ? 'bg-blue-500' 
                    : isToday
                      ? 'bg-blue-100'
                      : 'bg-gray-200'
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
              <div className={`absolute top-1 left-1 text-xs ${
                isPadding 
                  ? 'text-gray-400' 
                  : hasData 
                    ? 'text-white' 
                    : isToday
                      ? 'text-blue-600 font-bold'
                      : 'text-gray-600'
              }`}>
                {dateObj.getDate()}
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
              {!isPadding && (
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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};