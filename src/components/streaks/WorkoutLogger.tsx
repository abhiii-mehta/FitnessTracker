import React, { useState } from 'react';
import { Hand as DragHandle, Plus, X } from 'lucide-react';
import type { Workout } from '../../types';
import { useWorkout } from '../../context/WorkoutContext';

interface WorkoutLoggerProps {
  onLogWorkout: (workout: Workout, date: string) => void;
  selectedDate: string;
  onClose: () => void;
  show: boolean;
}

export const WorkoutLogger: React.FC<WorkoutLoggerProps> = ({ 
  onLogWorkout, 
  selectedDate,
  onClose,
  show
}) => {
  const { savedWorkouts } = useWorkout();
  const [customWorkoutName, setCustomWorkoutName] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-semibold mb-4">Log Workout for {new Date(selectedDate).toLocaleDateString()}</h3>
        
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
      </div>
    </div>
  );
};