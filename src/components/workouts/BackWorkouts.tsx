import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Exercise } from '../../types';

const exercises: Record<string, Exercise[]> = {
  bodyweight: [
    {
      id: 'pull-up',
      name: 'Pull-ups',
      category: 'strength',
      muscleGroup: 'back',
      equipment: 'bodyweight',
      description: 'Overhand grip exercise primarily targeting lats and upper back.'
    },
    {
      id: 'chin-up',
      name: 'Chin-ups',
      category: 'strength',
      muscleGroup: 'back',
      equipment: 'bodyweight',
      description: 'Underhand grip variation focusing on lats and biceps.'
    },
    {
      id: 'neutral-grip-pull-up',
      name: 'Neutral-Grip Pull-ups',
      category: 'strength',
      muscleGroup: 'back',
      equipment: 'bodyweight',
      description: 'Neutral grip pull-up, easier on shoulders, targeting lats.'
    },
    {
      id: 'inverted-row',
      name: 'Inverted Row',
      category: 'strength',
      muscleGroup: 'back',
      equipment: 'bodyweight',
      description: 'Body row using a bar or rings, focusing on back thickness.'
    }
  ],
  barbell: [
    {
      id: 'deadlift',
      name: 'Deadlift',
      category: 'strength',
      muscleGroup: 'back',
      equipment: 'barbell',
      description: 'Compound lift targeting the entire posterior chain.'
    },
    {
      id: 'rack-pull',
      name: 'Rack Pull',
      category: 'strength',
      muscleGroup: 'back',
      equipment: 'barbell',
      description: 'Partial deadlift from knee or mid-shin level, focusing on lockout strength.'
    },
    {
      id: 'barbell-bent-over-row',
      name: 'Barbell Bent-Over Row',
      category: 'strength',
      muscleGroup: 'back',
      equipment: 'barbell',
      description: 'Rowing movement with overhand or underhand grip for back thickness.'
    },
    {
      id: 'pendlay-row',
      name: 'Pendlay Row',
      category: 'strength',
      muscleGroup: 'back',
      equipment: 'barbell',
      description: 'Strict form row from the floor, focusing on upper back strength.'
    },
    {
      id: 't-bar-row',
      name: 'T-Bar Row',
      category: 'strength',
      muscleGroup: 'back',
      equipment: 'barbell',
      description: 'Rowing movement using landmine attachment or T-Bar machine.'
    }
  ],
  dumbbell: [
    {
      id: 'dumbbell-row',
      name: 'Single-Arm Dumbbell Row',
      category: 'hypertrophy',
      muscleGroup: 'back',
      equipment: 'dumbbell',
      description: 'Unilateral back exercise for correcting muscle imbalances.'
    },
    {
      id: 'dumbbell-seal-row',
      name: 'Dumbbell Seal Row',
      category: 'hypertrophy',
      muscleGroup: 'back',
      equipment: 'dumbbell',
      description: 'Face-down rowing movement on a bench targeting the upper back.'
    },
    {
      id: 'renegade-row',
      name: 'Renegade Row',
      category: 'hypertrophy',
      muscleGroup: 'back',
      equipment: 'dumbbell',
      description: 'Plank row combining core stabilization with back activation.'
    },
    {
      id: 'dumbbell-deadlift',
      name: 'Dumbbell Deadlift',
      category: 'strength',
      muscleGroup: 'back',
      equipment: 'dumbbell',
      description: 'Less common deadlift variation, good for beginners and unilateral work.'
    }
  ],
  machine: [
    {
      id: 'lat-pulldown',
      name: 'Lat Pulldown',
      category: 'hypertrophy',
      muscleGroup: 'back',
      equipment: 'machine',
      description: 'Vertical pulling movement using wide, close, or neutral grips.'
    },
    {
      id: 'seated-cable-row',
      name: 'Seated Cable Row',
      category: 'hypertrophy',
      muscleGroup: 'back',
      equipment: 'machine',
      description: 'Cable-based horizontal rowing movement targeting mid-back.'
    },
    {
      id: 'machine-row',
      name: 'Machine Row',
      category: 'hypertrophy',
      muscleGroup: 'back',
      equipment: 'machine',
      description: 'Rowing movement using Hammer Strength, plate-loaded, or cable machines.'
    },
    {
      id: 'low-cable-row',
      name: 'Low Cable Row',
      category: 'hypertrophy',
      muscleGroup: 'back',
      equipment: 'machine',
      description: 'Cable-based row focusing on lower and mid-back.'
    }
  ]
};

export const BackWorkouts: React.FC = () => {
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
                }`
              }>
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