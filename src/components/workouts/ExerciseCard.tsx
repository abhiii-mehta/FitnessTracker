import React from 'react';
import { Plus } from 'lucide-react';
import type { Exercise } from '../../types';
import { useWorkout } from '../../context/WorkoutContext';

interface ExerciseCardProps {
  exercise: Exercise;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  isSelected,
  onSelect,
  onDeselect
}) => {
  const { addExerciseToWorkout, showNotification } = useWorkout();

  const handleAddToWorkout = () => {
    addExerciseToWorkout(exercise);
    showNotification(`Added ${exercise.name} to your workout`);
  };

  return (
    <div className="p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{exercise.name}</h3>
        <button
          onClick={handleAddToWorkout}
          className="text-green-500 hover:text-green-600 transition-colors"
          title="Add to current workout"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-2">{exercise.description}</p>
      <div className="mt-2 flex space-x-2">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            exercise.category === 'strength'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-purple-100 text-purple-800'
          }`}
        >
          {exercise.category}
        </span>
      </div>
    </div>
  );
};