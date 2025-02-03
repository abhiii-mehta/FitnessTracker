import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Exercise } from '../../types';

const exercises: Record<string, Exercise[]> = {
  bodyweight: [
    {
      id: 'push-up',
      name: 'Push-Up (Standard)',
      category: 'strength',
      muscleGroup: 'chest',
      equipment: 'bodyweight',
      description: 'Classic bodyweight exercise targeting chest, shoulders, and triceps.'
    },
    {
      id: 'wide-grip-push-up',
      name: 'Wide-Grip Push-Up',
      category: 'strength',
      muscleGroup: 'chest',
      equipment: 'bodyweight',
      description: 'Push-up variation emphasizing the outer chest.'
    },
    {
      id: 'close-grip-push-up',
      name: 'Close-Grip (Triangle) Push-Up',
      category: 'strength',
      muscleGroup: 'chest',
      equipment: 'bodyweight',
      description: 'Push-up variation focusing on inner chest and triceps.'
    },
    {
      id: 'incline-push-up',
      name: 'Incline Push-Up',
      category: 'strength',
      muscleGroup: 'chest',
      equipment: 'bodyweight',
      description: 'Push-ups with hands elevated, targeting lower chest.'
    },
    {
      id: 'decline-push-up',
      name: 'Decline Push-Up',
      category: 'strength',
      muscleGroup: 'chest',
      equipment: 'bodyweight',
      description: 'Push-ups with feet elevated to focus on the upper chest.'
    },
    {
      id: 'plyometric-push-up',
      name: 'Clapping / Plyometric Push-Up',
      category: 'strength',
      muscleGroup: 'chest',
      equipment: 'bodyweight',
      description: 'Explosive push-up variation to build power in the chest and arms.'
    },
    {
      id: 'chest-dips',
      name: 'Dips (Chest Emphasis)',
      category: 'strength',
      muscleGroup: 'chest',
      equipment: 'bodyweight',
      description: 'Performed on parallel bars leaning forward to target the chest.'
    }
  ],
  barbell: [
    {
      id: 'barbell-bench-press-flat',
      name: 'Barbell Bench Press (Flat)',
      category: 'strength',
      muscleGroup: 'chest',
      equipment: 'barbell',
      description: 'Classic compound movement for overall chest development.'
    },
    {
      id: 'barbell-bench-press-incline',
      name: 'Barbell Bench Press (Incline)',
      category: 'strength',
      muscleGroup: 'chest',
      equipment: 'barbell',
      description: 'Focuses on the upper portion of the chest.'
    },
    {
      id: 'barbell-bench-press-decline',
      name: 'Barbell Bench Press (Decline)',
      category: 'strength',
      muscleGroup: 'chest',
      equipment: 'barbell',
      description: 'Targets the lower chest.'
    },
    {
      id: 'close-grip-bench-press',
      name: 'Close-Grip Bench Press',
      category: 'strength',
      muscleGroup: 'chest',
      equipment: 'barbell',
      description: 'Emphasizes triceps along with the chest.'
    },
    {
      id: 'floor-press',
      name: 'Floor Press',
      category: 'strength',
      muscleGroup: 'chest',
      equipment: 'barbell',
      description: 'Limited range of motion press, good for lockout strength.'
    }
  ],
  dumbbell: [
    {
      id: 'dumbbell-bench-press',
      name: 'Dumbbell Bench Press (Flat)',
      category: 'hypertrophy',
      muscleGroup: 'chest',
      equipment: 'dumbbell',
      description: 'Flat bench press with dumbbells for balanced chest development.'
    },
    {
      id: 'dumbbell-bench-press-incline',
      name: 'Dumbbell Bench Press (Incline)',
      category: 'hypertrophy',
      muscleGroup: 'chest',
      equipment: 'dumbbell',
      description: 'Targets the upper chest with dumbbells.'
    },
    {
      id: 'dumbbell-bench-press-decline',
      name: 'Dumbbell Bench Press (Decline)',
      category: 'hypertrophy',
      muscleGroup: 'chest',
      equipment: 'dumbbell',
      description: 'Emphasizes the lower chest.'
    },
    {
      id: 'dumbbell-fly-flat',
      name: 'Dumbbell Fly (Flat)',
      category: 'hypertrophy',
      muscleGroup: 'chest',
      equipment: 'dumbbell',
      description: 'Isolation movement for chest stretch and contraction.'
    },
    {
      id: 'dumbbell-fly-incline',
      name: 'Dumbbell Fly (Incline)',
      category: 'hypertrophy',
      muscleGroup: 'chest',
      equipment: 'dumbbell',
      description: 'Targets the upper chest with a greater stretch.'
    },
    {
      id: 'dumbbell-pullover',
      name: 'Dumbbell Pullover',
      category: 'hypertrophy',
      muscleGroup: 'chest',
      equipment: 'dumbbell',
      description: 'Primarily targets the chest, with some lat involvement depending on form.'
    }
  ],
  machine: [
    {
      id: 'chest-press-machine',
      name: 'Chest Press Machine (Seated)',
      category: 'hypertrophy',
      muscleGroup: 'chest',
      equipment: 'machine',
      description: 'Machine-based pressing movement targeting the chest.'
    },
    {
      id: 'pec-deck',
      name: 'Pec Deck / Butterfly Machine',
      category: 'hypertrophy',
      muscleGroup: 'chest',
      equipment: 'machine',
      description: 'Machine fly movement for chest isolation.'
    },
    {
      id: 'cable-crossover',
      name: 'Cable Crossover',
      category: 'hypertrophy',
      muscleGroup: 'chest',
      equipment: 'machine',
      description: 'Cable-based fly movement from low, mid, or high pulley angles.'
    },
    {
      id: 'standing-cable-fly',
      name: 'Standing Cable Fly',
      category: 'hypertrophy',
      muscleGroup: 'chest',
      equipment: 'machine',
      description: 'Cable fly performed standing, with varied angles.'
    }
  ]
};

export const ChestWorkouts: React.FC = () => {
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