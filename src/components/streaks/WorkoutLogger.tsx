import React, { useState, useEffect } from 'react';
import { Hand as DragHandle, Plus, X, Scale, Trophy } from 'lucide-react';
import type { Workout, BodyMeasurement, PersonalRecord } from '../../types';
import { useWorkout } from '../../context/WorkoutContext';

interface WorkoutLoggerProps {
  onLogWorkout: (workout: Workout, date: string) => void;
  onLogMeasurement?: (measurement: BodyMeasurement) => void;
  onLogPR?: (pr: PersonalRecord) => void;
  selectedDate: string;
  onClose: () => void;
  show: boolean;
  existingData?: {
    workout?: Workout;
    measurement?: BodyMeasurement;
    personalRecords?: PersonalRecord[];
  };
}

export const WorkoutLogger: React.FC<WorkoutLoggerProps> = ({ 
  onLogWorkout, 
  onLogMeasurement,
  onLogPR,
  selectedDate,
  onClose,
  show,
  existingData
}) => {
  const { savedWorkouts } = useWorkout();
  const [activeTab, setActiveTab] = useState<'workout' | 'measurement' | 'pr'>('workout');
  const [customWorkoutName, setCustomWorkoutName] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [measurement, setMeasurement] = useState<Partial<BodyMeasurement>>({
    units: 'metric'
  });
  const [personalRecord, setPersonalRecord] = useState<Partial<PersonalRecord>>({
    units: 'metric'
  });

  useEffect(() => {
    if (existingData) {
      if (existingData.measurement) {
        setMeasurement(existingData.measurement);
      }
      if (existingData.personalRecords?.[0]) {
        setPersonalRecord(existingData.personalRecords[0]);
      }
    }
  }, [existingData]);

  if (!show) return null;

  const handleWorkoutSelect = (workoutId: string) => {
    const workout = savedWorkouts.find(w => w.id === workoutId);
    if (workout) {
      onLogWorkout({
        ...workout,
        id: Date.now().toString(),
        date: selectedDate
      }, selectedDate);
      onClose();
    }
  };

  const handleCustomWorkout = () => {
    if (!customWorkoutName.trim()) return;
    
    onLogWorkout({
      id: Date.now().toString(),
      name: customWorkoutName,
      date: selectedDate,
      exercises: []
    }, selectedDate);
    onClose();
  };

  const handleSaveMeasurement = () => {
    if (!measurement.weight || !onLogMeasurement) return;

    onLogMeasurement({
      date: selectedDate,
      weight: measurement.weight,
      height: measurement.height,
      bodyFat: measurement.bodyFat,
      units: measurement.units || 'metric'
    });
    onClose();
  };

  const handleSavePR = () => {
    if (!personalRecord.exerciseName || !personalRecord.weight || !personalRecord.reps || !onLogPR) return;

    onLogPR({
      id: Date.now().toString(),
      date: selectedDate,
      exerciseName: personalRecord.exerciseName,
      weight: personalRecord.weight,
      reps: personalRecord.reps,
      notes: personalRecord.notes,
      units: personalRecord.units || 'metric'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-semibold mb-4">Log Activity for {new Date(selectedDate).toLocaleDateString()}</h3>
        
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab('workout')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'workout' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Workout</span>
          </button>
          <button
            onClick={() => setActiveTab('measurement')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'measurement' ? 'bg-purple-500 text-white' : 'bg-gray-100'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Measurement</span>
          </button>
          <button
            onClick={() => setActiveTab('pr')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'pr' ? 'bg-yellow-500 text-white' : 'bg-gray-100'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>PR</span>
          </button>
        </div>

        {activeTab === 'workout' && (
          <>
            {showCustomInput ? (
              <div className="mb-6">
                <input
                  type="text"
                  value={customWorkoutName}
                  onChange={(e) => setCustomWorkoutName(e.target.value)}
                  placeholder="Enter workout name"
                  className="w-full px-4 py-2 border rounded-lg mb-2"
                  autoFocus
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleCustomWorkout}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex-1"
                    disabled={!customWorkoutName.trim()}
                  >
                    Add Custom Workout
                  </button>
                  <button
                    onClick={() => setShowCustomInput(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowCustomInput(true)}
                className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 mb-6 flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Custom Workout</span>
              </button>
            )}

            <div className="max-h-96 overflow-y-auto">
              <h4 className="font-medium text-gray-500 mb-2">Saved Workouts</h4>
              <div className="space-y-2">
                {savedWorkouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-white"
                    onClick={() => handleWorkoutSelect(workout.id)}
                  >
                    <div>
                      <h4 className="font-medium">{workout.name}</h4>
                      <p className="text-sm text-gray-600">
                        {workout.exercises.length} exercises
                      </p>
                    </div>
                    <DragHandle className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'measurement' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight ({measurement.units === 'metric' ? 'kg' : 'lbs'})
              </label>
              <input
                type="number"
                value={measurement.weight || ''}
                onChange={(e) => setMeasurement({ ...measurement, weight: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height ({measurement.units === 'metric' ? 'cm' : 'in'})
              </label>
              <input
                type="number"
                value={measurement.height || ''}
                onChange={(e) => setMeasurement({ ...measurement, height: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Body Fat %
              </label>
              <input
                type="number"
                value={measurement.bodyFat || ''}
                onChange={(e) => setMeasurement({ ...measurement, bodyFat: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
                step="0.1"
                min="0"
                max="100"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setMeasurement({ ...measurement, units: 'metric' })}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  measurement.units === 'metric'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100'
                }`}
              >
                Metric
              </button>
              <button
                onClick={() => setMeasurement({ ...measurement, units: 'us' })}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  measurement.units === 'us'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100'
                }`}
              >
                US
              </button>
            </div>

            <button
              onClick={handleSaveMeasurement}
              className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 mt-4"
              disabled={!measurement.weight}
            >
              Save Measurement
            </button>
          </div>
        )}

        {activeTab === 'pr' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exercise Name
              </label>
              <input
                type="text"
                value={personalRecord.exerciseName || ''}
                onChange={(e) => setPersonalRecord({ ...personalRecord, exerciseName: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="e.g., Bench Press"
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight ({personalRecord.units === 'metric' ? 'kg' : 'lbs'})
                </label>
                <input
                  type="number"
                  value={personalRecord.weight || ''}
                  onChange={(e) => setPersonalRecord({ ...personalRecord, weight: Number(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-lg"
                  step="0.5"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reps
                </label>
                <input
                  type="number"
                  value={personalRecord.reps || ''}
                  onChange={(e) => setPersonalRecord({ ...personalRecord, reps: Number(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (optional)
              </label>
              <textarea
                value={personalRecord.notes || ''}
                onChange={(e) => setPersonalRecord({ ...personalRecord, notes: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
                placeholder="Add any additional notes"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setPersonalRecord({ ...personalRecord, units: 'metric' })}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  personalRecord.units === 'metric'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100'
                }`}
              >
                Metric
              </button>
              <button
                onClick={() => setPersonalRecord({ ...personalRecord, units: 'us' })}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  personalRecord.units === 'us'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100'
                }`}
              >
                US
              </button>
            </div>

            <button
              onClick={handleSavePR}
              className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 mt-4"
              disabled={!personalRecord.exerciseName || !personalRecord.weight || !personalRecord.reps}
            >
              Save PR
            </button>
          </div>
        )}
      </div>
    </div>
  );
};