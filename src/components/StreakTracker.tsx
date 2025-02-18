import React, { useState, useEffect } from 'react';
import type { StreakData, Workout, BodyMeasurement } from '../types';
import { useWorkout } from '../context/WorkoutContext';
import { StreakStats } from './streaks/StreakStats';
import { WeightTracker } from './streaks/WeightTracker';
import { ActivityCalendar } from './streaks/ActivityCalendar';
import { MeasurementModal } from './streaks/MeasurementModal';
import { WorkoutLogger } from './streaks/WorkoutLogger';
import { ProgressGraph } from './streaks/ProgressGraph';

export const StreakTracker: React.FC = () => {
  const { savedWorkouts } = useWorkout();
  const [streakData, setStreakData] = useState<StreakData>(() => {
    const saved = localStorage.getItem('streakData');
    return saved ? JSON.parse(saved) : {
      currentStreak: 0,
      longestStreak: 0,
      totalWorkouts: 0,
      lastWorkoutDate: null,
      workoutDates: {},
      measurements: []
    };
  });

  const [showMeasurements, setShowMeasurements] = useState(false);
  const [showWorkoutLogger, setShowWorkoutLogger] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [newMeasurement, setNewMeasurement] = useState<Partial<BodyMeasurement>>({
    units: 'metric'
  });
  const [infoText, setInfoText] = useState('');

  useEffect(() => {
    localStorage.setItem('streakData', JSON.stringify(streakData));
  }, [streakData]);

  const handleUnitChange = (newUnit: 'metric' | 'us') => {
    if (newUnit === newMeasurement.units) return;

    setNewMeasurement(prev => {
      const updated = { ...prev, units: newUnit };
      if (prev.weight) {
        updated.weight = newUnit === 'us' 
          ? Math.round(prev.weight * 2.20462 * 10) / 10
          : Math.round(prev.weight * 0.453592 * 10) / 10;
      }
      if (prev.height) {
        updated.height = newUnit === 'us'
          ? Math.round(prev.height * 0.393701 * 10) / 10
          : Math.round(prev.height * 2.54 * 10) / 10;
      }
      return updated;
    });
  };

  const addMeasurement = () => {
    if (!newMeasurement.weight || !selectedDate) return;

    const measurement: BodyMeasurement = {
      date: selectedDate,
      weight: newMeasurement.weight,
      height: newMeasurement.height,
      bodyFat: newMeasurement.bodyFat,
      units: newMeasurement.units || 'metric'
    };

    setStreakData(prev => {
      const newData = { ...prev };
      const existingData = newData.workoutDates[selectedDate] || {};
      newData.workoutDates[selectedDate] = {
        ...existingData,
        measurements: measurement
      };
      return newData;
    });

    setNewMeasurement({ units: measurement.units });
    setShowMeasurements(false);
    setSelectedDate('');
  };

  const logWorkout = (workout: Workout, date: string) => {
    setStreakData(prev => {
      const newData = { ...prev };
      const existingData = newData.workoutDates[date] || {};
      newData.workoutDates[date] = {
        ...existingData,
        workout: {
          workoutName: workout.name,
          exercises: workout.exercises.map(e => e.exerciseName)
        }
      };
      
      // Update streak information
      const dates = Object.keys(newData.workoutDates)
        .filter(d => newData.workoutDates[d].workout)
        .sort();
      
      let currentStreak = 1;
      let i = dates.length - 1;
      
      while (i > 0) {
        const curr = new Date(dates[i]);
        const prev = new Date(dates[i - 1]);
        const diffDays = Math.floor((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          currentStreak++;
        } else {
          break;
        }
        i--;
      }

      newData.currentStreak = currentStreak;
      newData.longestStreak = Math.max(currentStreak, newData.longestStreak);
      newData.totalWorkouts = dates.length;
      newData.lastWorkoutDate = date;

      return newData;
    });
  };

  const handleEditWorkout = (date: string) => {
    setSelectedDate(date);
    setShowWorkoutLogger(true);
  };

  const handleDeleteWorkout = (date: string) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      setStreakData(prev => {
        const newData = { ...prev };
        const existingData = newData.workoutDates[date] || {};
        
        if (existingData.measurements) {
          // Keep measurements but remove workout
          newData.workoutDates[date] = {
            ...existingData,
            workout: undefined
          };
        } else {
          // Remove the entire date entry if no measurements
          delete newData.workoutDates[date];
        }

        // Recalculate streaks
        const dates = Object.keys(newData.workoutDates)
          .filter(d => newData.workoutDates[d].workout)
          .sort();

        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;

        for (let i = 0; i < dates.length; i++) {
          if (i === 0) {
            tempStreak = 1;
          } else {
            const curr = new Date(dates[i]);
            const prev = new Date(dates[i - 1]);
            const diffDays = Math.floor((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
              tempStreak++;
            } else {
              longestStreak = Math.max(longestStreak, tempStreak);
              tempStreak = 1;
            }
          }
        }

        longestStreak = Math.max(longestStreak, tempStreak);
        currentStreak = tempStreak;

        return {
          ...newData,
          currentStreak,
          longestStreak,
          totalWorkouts: dates.length,
          lastWorkoutDate: dates[dates.length - 1] || null
        };
      });
    }
  };

  const handleDeleteMeasurement = (date: string) => {
    if (window.confirm('Are you sure you want to delete this measurement?')) {
      setStreakData(prev => {
        const newData = { ...prev };
        const existingData = newData.workoutDates[date] || {};
        
        if (existingData.workout) {
          // Keep workout but remove measurements
          newData.workoutDates[date] = {
            ...existingData,
            measurements: undefined
          };
        } else {
          // Remove the entire date entry if no workout
          delete newData.workoutDates[date];
        }
        
        return newData;
      });
    }
  };

  const handleEditMeasurement = (date: string) => {
    const measurement = streakData.workoutDates[date]?.measurements;
    if (measurement) {
      setNewMeasurement(measurement);
      setSelectedDate(date);
      setShowMeasurements(true);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Progress Tracker</h2>
      
      <StreakStats streakData={streakData} />
      
      <div className="mt-8 space-y-6">
        <WeightTracker
          measurements={Object.entries(streakData.workoutDates)
            .filter(([_, data]) => data.measurements)
            .map(([date, data]) => ({
              date,
              ...data.measurements!
            }))}
          onAddMeasurement={() => {
            setSelectedDate(new Date().toISOString().split('T')[0]);
            setShowMeasurements(true);
          }}
        />

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Progress Graph</h3>
          <ProgressGraph
            measurements={Object.entries(streakData.workoutDates)
              .filter(([_, data]) => data.measurements)
              .map(([date, data]) => ({
                date,
                ...data.measurements!
              }))}
            type="weight"
          />
        </div>
      </div>

      <ActivityCalendar
        activityData={Object.entries(streakData.workoutDates).map(([date, data]) => ({
          date,
          workout: data.workout,
          measurements: data.measurements
        }))}
        onAddWorkout={(date) => {
          setSelectedDate(date);
          setShowWorkoutLogger(true);
        }}
        onEditWorkout={handleEditWorkout}
        onDeleteWorkout={handleDeleteWorkout}
        onAddMeasurement={(date) => {
          setSelectedDate(date);
          setShowMeasurements(true);
        }}
        onEditMeasurement={handleEditMeasurement}
        onDeleteMeasurement={handleDeleteMeasurement}
        onShowInfo={setInfoText}
      />

      {infoText && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg max-w-xs whitespace-pre-line">
          {infoText}
        </div>
      )}

      <WorkoutLogger
        show={showWorkoutLogger}
        selectedDate={selectedDate}
        onLogWorkout={logWorkout}
        onClose={() => {
          setShowWorkoutLogger(false);
          setSelectedDate('');
        }}
      />

      <MeasurementModal
        show={showMeasurements}
        onClose={() => {
          setShowMeasurements(false);
          setSelectedDate('');
        }}
        measurement={newMeasurement}
        onMeasurementChange={setNewMeasurement}
        onSave={addMeasurement}
        onUnitChange={handleUnitChange}
      />
    </div>
  );
};