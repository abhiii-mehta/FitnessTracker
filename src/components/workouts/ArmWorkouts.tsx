import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Exercise } from '../../types';

const exercises: Record<string, Exercise[]> = {
  bodyweight: [
    {
      id: 'chin-up',
      name: 'Chin-Up',
      category: 'strength',
      muscleGroup: 'biceps',
      equipment: 'bodyweight',
      description: 'Underhand grip pull-up also engaging lats.'
    },
    {
      id: 'negative-chin-up',
      name: 'Negative Chin-Up',
      category: 'strength',
      muscleGroup: 'biceps',
      equipment: 'bodyweight',
      description: 'Focus on eccentric lowering for biceps growth.'
    },
    {
      id: 'dips-triceps',
      name: 'Dips (Triceps Focused)',
      category: 'strength',
      muscleGroup: 'triceps',
      equipment: 'bodyweight',
      description: 'Performed with upright torso to target triceps.'
    },
    {
      id: 'close-grip-push-up',
      name: 'Close-Grip Push-Up',
      category: 'strength',
      muscleGroup: 'triceps',
      equipment: 'bodyweight',
      description: 'Push-up variation with hands closer together to emphasize triceps.'
    }
  ],
  barbell: [
    {
      id: 'barbell-curl',
      name: 'Barbell Curl',
      category: 'hypertrophy',
      muscleGroup: 'biceps',
      equipment: 'barbell',
      description: 'Classic bicep curl with EZ-bar or straight bar.'
    },
    {
      id: 'reverse-curl',
      name: 'Reverse Curl',
      category: 'hypertrophy',
      muscleGroup: 'biceps',
      equipment: 'barbell',
      description: 'Overhand grip curl also targeting forearms.'
    },
    {
      id: '21s',
      name: '21s',
      category: 'hypertrophy',
      muscleGroup: 'biceps',
      equipment: 'barbell',
      description: 'Bicep curl variation with partial ranges for increased tension.'
    },
    {
      id: 'close-grip-bench-press',
      name: 'Close-Grip Bench Press',
      category: 'strength',
      muscleGroup: 'triceps',
      equipment: 'barbell',
      description: 'Compound movement emphasizing triceps.'
    },
    {
      id: 'skullcrusher',
      name: 'Skullcrusher',
      category: 'hypertrophy',
      muscleGroup: 'triceps',
      equipment: 'barbell',
      description: 'Lying triceps extension, preferably with EZ-bar.'
    },
    {
      id: 'jm-press',
      name: 'JM Press',
      category: 'strength',
      muscleGroup: 'triceps',
      equipment: 'barbell',
      description: 'Hybrid of close-grip bench press and skullcrusher.'
    }
  ],
  dumbbell: [
    {
      id: 'dumbbell-biceps-curl',
      name: 'Dumbbell Biceps Curl',
      category: 'hypertrophy',
      muscleGroup: 'biceps',
      equipment: 'dumbbell',
      description: 'Classic dumbbell curl, standing or seated.'
    },
    {
      id: 'hammer-curl',
      name: 'Hammer Curl',
      category: 'hypertrophy',
      muscleGroup: 'biceps',
      equipment: 'dumbbell',
      description: 'Neutral grip curl targeting brachioradialis.'
    },
    {
      id: 'incline-db-curl',
      name: 'Incline Dumbbell Curl',
      category: 'hypertrophy',
      muscleGroup: 'biceps',
      equipment: 'dumbbell',
      description: 'Emphasizes the long head of the biceps.'
    },
    {
      id: 'concentration-curl',
      name: 'Concentration Curl',
      category: 'hypertrophy',
      muscleGroup: 'biceps',
      equipment: 'dumbbell',
      description: 'Strict form curl isolating the biceps.'
    },
    {
      id: 'db-skullcrusher',
      name: 'Dumbbell Skullcrusher',
      category: 'hypertrophy',
      muscleGroup: 'triceps',
      equipment: 'dumbbell',
      description: 'Lying triceps extension using dumbbells.'
    },
    {
      id: 'overhead-triceps-extension',
      name: 'Overhead Triceps Extension',
      category: 'hypertrophy',
      muscleGroup: 'triceps',
      equipment: 'dumbbell',
      description: 'Triceps isolation exercise performed overhead.'
    },
    {
      id: 'kickbacks',
      name: 'Triceps Kickbacks',
      category: 'hypertrophy',
      muscleGroup: 'triceps',
      equipment: 'dumbbell',
      description: 'Isolated movement focusing on the triceps.'
    }
  ],
  machine: [
    {
      id: 'preacher-curl-machine',
      name: 'Preacher Curl Machine',
      category: 'hypertrophy',
      muscleGroup: 'biceps',
      equipment: 'machine',
      description: 'Machine-based preacher curl for biceps isolation.'
    },
    {
      id: 'cable-curl',
      name: 'Cable Curl',
      category: 'hypertrophy',
      muscleGroup: 'biceps',
      equipment: 'machine',
      description: 'Cable variation of the biceps curl with constant tension.'
    },
    {
      id: 'spider-curl',
      name: 'Spider Curl',
      category: 'hypertrophy',
      muscleGroup: 'biceps',
      equipment: 'machine',
      description: 'Bench or machine-supported curl emphasizing constant tension.'
    },
    {
      id: 'cable-pressdown',
      name: 'Cable Pressdown',
      category: 'hypertrophy',
      muscleGroup: 'triceps',
      equipment: 'machine',
      description: 'Rope, straight bar, or V-bar attachment for triceps isolation.'
    },
    {
      id: 'cable-overhead-extension',
      name: 'Cable Overhead Triceps Extension',
      category: 'hypertrophy',
      muscleGroup: 'triceps',
      equipment: 'machine',
      description: 'Overhead cable movement focusing on triceps.'
    },
    {
      id: 'machine-dip',
      name: 'Machine Dip / Assisted Dip',
      category: 'hypertrophy',
      muscleGroup: 'triceps',
      equipment: 'machine',
      description: 'Assisted dip machine for controlled triceps activation.'
    }
  ],
  forearms: [
    {
      id: 'wrist-curls',
      name: 'Wrist Curls',
      category: 'strength',
      muscleGroup: 'forearms',
      equipment: 'barbell',
      description: 'Palms-up wrist curls for forearm flexors.'
    },
    {
      id: 'reverse-wrist-curls',
      name: 'Reverse Wrist Curls',
      category: 'strength',
      muscleGroup: 'forearms',
      equipment: 'barbell',
      description: 'Palms-down wrist curls targeting forearm extensors.'
    },
    {
      id: 'farmers-walk',
      name: "Farmer's Walk",
      category: 'strength',
      muscleGroup: 'forearms',
      equipment: 'dumbbell',
      description: 'Grip-intensive carry using dumbbells or implements.'
    },
    {
      id: 'plate-pinch-hold',
      name: 'Plate Pinch Hold',
      category: 'strength',
      muscleGroup: 'forearms',
      equipment: 'plate',
      description: 'Grip exercise focusing on pinching strength.'
    },
    {
      id: 'fat-grip-training',
      name: 'Fat Grip Training',
      category: 'strength',
      muscleGroup: 'forearms',
      equipment: 'barbell',
      description: 'Uses thick bars or fat grips to increase grip strength.'
    }
  ]
};

export const ArmWorkouts: React.FC = () => {
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