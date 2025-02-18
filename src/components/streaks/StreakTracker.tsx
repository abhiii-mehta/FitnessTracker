import React, { useState, useEffect } from 'react';
import type { StreakData, Workout, BodyMeasurement, PersonalRecord } from '../../types';
import { useWorkout } from '../../context/WorkoutContext';
import { StreakStats } from './StreakStats';
import { WeightTracker } from './WeightTracker';
import { ActivityCalendar } from './ActivityCalendar';
import { MeasurementModal } from './MeasurementModal';
import { WorkoutLogger } from './WorkoutLogger';
import { ProgressGraph } from './ProgressGraph';
import { PRTracker } from './PRTracker';

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

  const addPR = (pr: PersonalRecord) => {
    setStreakData(prev => {
      const newData = { ...prev };
      const existingData = newData.workoutDates[selectedDate] || {};
      const existingPRs = existingData.personalRecords || [];
      
      newData.workoutDates[selectedDate] = {
        ...existingData,
        personalRecords: [...existingPRs, pr]
      };
      
      return newData;
    });
  };

  const editPR = (prId: string, updatedPR: PersonalRecord) => {
    setStreakData(prev => {
      const newData = { ...prev };
      const existingData = newData.workoutDates[selectedDate] || {};
      const existingPRs = existingData.personalRecords || [];
      
      newData.workoutDates[selectedDate] = {
        ...existingData,
        personalRecords: existingPRs.map(pr => 
          pr.id === prId ? updatedPR : pr
        )
      };
      
      return newData;
    });
  };

  const deletePR = (prId: string) => {
    setStreakData(prev => {
      const newData = { ...prev };
      const existingData = newData.workoutDates[selectedDate] || {};
      const existingPRs = existingData.personalRecords || [];
      
      newData.workoutDates[selectedDate] = {
        ...existingData,
        personalRecords: existingPRs.filter(pr => pr.id !== prId)
      };
      
      return newData;
    });
  };

  // ... rest of the existing code ...

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

        <PRTracker
          personalRecords={Object.entries(streakData.workoutDates)
            .filter(([_, data]) => data.personalRecords)
            .flatMap(([date, data]) => data.personalRecords || [])}
          onAddPR={addPR}
          onEditPR={editPR}
          onDeletePR={deletePR}
          exercises={[]} // You'll need to pass the exercises list here
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
          measurements: data.measurements,
          personalRecords: data.personalRecords
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
        onAddPR={(date) => {
          setSelectedDate(date);
          // Show PR form
        }}
        onEditPR={(date, prId) => {
          setSelectedDate(date);
          // Show PR form with existing data
        }}
        onDeletePR={(date, prId) => {
          setSelectedDate(date);
          deletePR(prId);
        }}
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