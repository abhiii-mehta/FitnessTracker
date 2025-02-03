import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Exercise } from '../../types';

const exercises: Record<string, Exercise[]> = {
  bodyweight: [
    {
      id: 'pike-pushup',
      name: 'Pike Push-up',
      category: 'strength',
      muscleGroup: 'shoulders',
      equipment: 'bodyweight',
      description: 'Targets front and medial delts.'
    },
    {
      id: 'handstand-pushup',
      name: 'Handstand Push-up',
      category: 'strength',
      muscleGroup: 'shoulders',
      equipment: 'bodyweight',
      description: 'Advanced exercise targeting front and medial delts, plus traps.'
    }
  ],
  dumbbell: [
    {
      id: 'seated-db-press',
      name: 'Seated Dumbbell Shoulder Press',
      category: 'hypertrophy',
      muscleGroup: 'shoulders',
      equipment: 'dumbbell',
      description: 'Dumbbell variant of overhead press for stability.'
    },
    {
      id: 'standing-db-press',
      name: 'Standing Dumbbell Shoulder Press',
      category: 'hypertrophy',
      muscleGroup: 'shoulders',
      equipment: 'dumbbell',
      description: 'Standing variation of the dumbbell shoulder press.'
    },
    {
      id: 'arnold-press',
      name: 'Arnold Press',
      category: 'hypertrophy',
      muscleGroup: 'shoulders',
      equipment: 'dumbbell',
      description: 'Rotational pressing movement targeting all heads of the deltoid.'
    },
    {
      id: 'lateral-raise',
      name: 'Lateral Raise',
      category: 'hypertrophy',
      muscleGroup: 'shoulders',
      equipment: 'dumbbell',
      description: 'Isolation exercise for medial deltoids.'
    },
    {
      id: 'front-raise',
      name: 'Front Raise',
      category: 'hypertrophy',
      muscleGroup: 'shoulders',
      equipment: 'dumbbell',
      description: 'Isolation exercise for anterior deltoids.'
    },
    {
      id: 'rear-delt-fly',
      name: 'Rear Delt Fly',
      category: 'hypertrophy',
      muscleGroup: 'shoulders',
      equipment: 'dumbbell',
      description: 'Isolation exercise for posterior deltoids.'
    },
    {
      id: 'db-shrugs',
      name: 'Dumbbell Shrugs',
      category: 'hypertrophy',
      muscleGroup: 'traps',
      equipment: 'dumbbell',
      description: 'Targets the trapezius muscles.'
    }
  ],
  barbell: [
    {
      id: 'overhead-press',
      name: 'Overhead Press / Military Press',
      category: 'strength',
      muscleGroup: 'shoulders',
      equipment: 'barbell',
      description: 'Compound pressing movement for shoulder development.'
    },
    {
      id: 'behind-neck-press',
      name: 'Behind-the-Neck Press',
      category: 'strength',
      muscleGroup: 'shoulders',
      equipment: 'barbell',
      description: 'Advanced pressing movement, be careful with shoulder mobility.'
    },
    {
      id: 'push-press',
      name: 'Push Press',
      category: 'strength',
      muscleGroup: 'shoulders',
      equipment: 'barbell',
      description: 'Uses leg drive to press overhead.'
    },
    {
      id: 'barbell-shrugs',
      name: 'Barbell Shrugs',
      category: 'hypertrophy',
      muscleGroup: 'traps',
      equipment: 'barbell',
      description: 'Targets the trapezius muscles.'
    },
    {
      id: 'upright-row',
      name: 'Upright Row',
      category: 'hypertrophy',
      muscleGroup: 'shoulders',
      equipment: 'barbell',
      description: 'Compound movement for shoulders and traps.'
    }
  ],
  machine: [
    {
      id: 'machine-shoulder-press',
      name: 'Machine Shoulder Press',
      category: 'hypertrophy',
      muscleGroup: 'shoulders',
      equipment: 'machine',
      description: 'Plate-loaded or pin-loaded pressing movement for shoulders.'
    },
    {
      id: 'cable-lateral-raise',
      name: 'Cable Lateral Raise',
      category: 'hypertrophy',
      muscleGroup: 'shoulders',
      equipment: 'machine',
      description: 'Single-arm or bilateral cable exercise for medial delts.'
    },
    {
      id: 'cable-front-raise',
      name: 'Cable Front Raise',
      category: 'hypertrophy',
      muscleGroup: 'shoulders',
      equipment: 'machine',
      description: 'Single-arm or bilateral cable exercise for anterior delts.'
    },
    {
      id: 'face-pull',
      name: 'Face Pulls',
      category: 'hypertrophy',
      muscleGroup: 'shoulders',
      equipment: 'machine',
      description: 'Rear deltoid and rotator cuff exercise using cables.'
    }
  ]
};

export const ShoulderWorkouts: React.FC = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<string>('bodyweight');
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  const addExercise = (exerciseId: string) => {
    setSelectedExercises([...selectedExercises, exerciseId]);
  };

  const removeExercise = (exerciseId: string) => {
    setSelectedExercises(selectedExercises.filter(id => id !== exerciseId));
  };

  return (
    <div>
      {/* Equipment Type Tabs */}
      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto">
          {Object.keys(exercises).map((equipment) => (
            <button
              key={equipment}
              onClick={() => setSelectedEquipment(equipment)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap
                ${selectedEquipment === equipment
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100 border'
                }`}
            >
              {equipment.charAt(0).toUpperCase() + equipment.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exercises[selectedEquipment]?.map((exercise) => (
          <div
            key={exercise.id}
            className="p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{exercise.name}</h3>
              {selectedExercises.includes(exercise.id) ? (
                <button
                  onClick={() => removeExercise(exercise.id)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => addExercise(exercise.id)}
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-2">{exercise.description}</p>
            <div className="mt-2 flex space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs
                ${exercise.category === 'strength'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-purple-100 text-purple-800'
                }`}>
                {exercise.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Exercises Summary */}
      {selectedExercises.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Selected Exercises</h3>
          <div className="space-y-2">
            {selectedExercises.map((id) => {
              const exercise = Object.values(exercises)
                .flat()
                .find(e => e.id === id);
              return exercise && (
                <div key={id} className="flex justify-between items-center">
                  <span>{exercise.name}</span>
                  <button
                    onClick={() => removeExercise(id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};