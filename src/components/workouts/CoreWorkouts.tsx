import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Exercise } from '../../types';

const exercises: Record<string, Exercise[]> = {
  bodyweight: [
    {
      id: 'crunches',
      name: 'Crunches / Sit-Ups',
      category: 'endurance',
      muscleGroup: 'abdominals',
      equipment: 'bodyweight',
      description: 'Basic variations focusing on upper and lower abs.'
    },
    {
      id: 'plank',
      name: 'Plank',
      category: 'endurance',
      muscleGroup: 'abdominals',
      equipment: 'bodyweight',
      description: 'Static hold to strengthen core; variations include high plank and forearm plank.'
    },
    {
      id: 'leg-raise',
      name: 'Leg Raise / Hanging Leg Raise',
      category: 'endurance',
      muscleGroup: 'abdominals',
      equipment: 'bodyweight',
      description: 'Targets lower abs; can be performed on floor or hanging.'
    },
    {
      id: 'flutter-kicks',
      name: 'Flutter Kicks / Scissor Kicks',
      category: 'endurance',
      muscleGroup: 'abdominals',
      equipment: 'bodyweight',
      description: 'Dynamic lower ab exercise.'
    },
    {
      id: 'v-ups',
      name: 'V-Ups',
      category: 'endurance',
      muscleGroup: 'abdominals',
      equipment: 'bodyweight',
      description: 'Engages both upper and lower abdominals simultaneously.'
    },
    {
      id: 'side-plank',
      name: 'Side Plank',
      category: 'endurance',
      muscleGroup: 'obliques',
      equipment: 'bodyweight',
      description: 'Targets obliques through static hold.'
    },
    {
      id: 'bicycle-crunch',
      name: 'Bicycle Crunch',
      category: 'endurance',
      muscleGroup: 'obliques',
      equipment: 'bodyweight',
      description: 'Dynamic oblique and abdominal engagement.'
    },
    {
      id: 'side-crunch',
      name: 'Side Crunch',
      category: 'endurance',
      muscleGroup: 'obliques',
      equipment: 'bodyweight',
      description: 'Isolated oblique crunch movement.'
    },
    {
      id: 'russian-twist',
      name: 'Russian Twist',
      category: 'endurance',
      muscleGroup: 'obliques',
      equipment: 'bodyweight',
      description: 'Rotational movement targeting obliques; can add weight.'
    }
  ],
  weighted: [
    {
      id: 'cable-crunch',
      name: 'Cable Crunch',
      category: 'hypertrophy',
      muscleGroup: 'abdominals',
      equipment: 'machine',
      description: 'Kneeling crunch using cable machine.'
    },
    {
      id: 'weighted-decline-situp',
      name: 'Weighted Decline Sit-Up',
      category: 'hypertrophy',
      muscleGroup: 'abdominals',
      equipment: 'dumbbell',
      description: 'Performed on decline bench with added resistance.'
    },
    {
      id: 'weighted-plank',
      name: 'Weighted Plank',
      category: 'hypertrophy',
      muscleGroup: 'abdominals',
      equipment: 'bodyweight',
      description: 'Plank variation with weight plate on back.'
    }
  ],
  machine: [
    {
      id: 'cable-woodchopper',
      name: 'Cable Woodchopper',
      category: 'hypertrophy',
      muscleGroup: 'obliques',
      equipment: 'machine',
      description: 'Rotational movement from high-to-low or low-to-high angles.'
    },
    {
      id: 'oblique-crunch-machine',
      name: 'Oblique Crunch Machine',
      category: 'hypertrophy',
      muscleGroup: 'obliques',
      equipment: 'machine',
      description: 'Machine-based oblique crunch.'
    },
    {
      id: 'pallof-press',
      name: 'Pallof Press',
      category: 'hypertrophy',
      muscleGroup: 'obliques',
      equipment: 'machine',
      description: 'Anti-rotation exercise using cables.'
    }
  ]
};

export const CoreWorkouts: React.FC = () => {
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