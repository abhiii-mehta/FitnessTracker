import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Exercise } from '../../types';

const exercises: Record<string, Exercise[]> = {
  bodyweight: [
    {
      id: 'bodyweight-squat',
      name: 'Bodyweight Squat',
      category: 'strength',
      muscleGroup: 'quadriceps',
      equipment: 'bodyweight',
      description: 'Basic squat using body weight for resistance.'
    },
    {
      id: 'wall-sit',
      name: 'Wall Sit',
      category: 'endurance',
      muscleGroup: 'quadriceps',
      equipment: 'bodyweight',
      description: 'Isometric hold against a wall to strengthen quads.'
    },
    {
      id: 'walking-lunges',
      name: 'Walking Lunges',
      category: 'strength',
      muscleGroup: 'quadriceps',
      equipment: 'bodyweight',
      description: 'Dynamic lunging movement to engage quads and glutes.'
    },
    {
      id: 'static-lunges',
      name: 'Static Lunges',
      category: 'strength',
      muscleGroup: 'quadriceps',
      equipment: 'bodyweight',
      description: 'Stationary lunges focusing on quad and glute activation.'
    }
  ],
  barbell: [
    {
      id: 'back-squat',
      name: 'Back Squat',
      category: 'strength',
      muscleGroup: 'quadriceps',
      equipment: 'barbell',
      description: 'High-bar or low-bar squat for overall leg development.'
    },
    {
      id: 'front-squat',
      name: 'Front Squat',
      category: 'strength',
      muscleGroup: 'quadriceps',
      equipment: 'barbell',
      description: 'Barbell squat with front rack position targeting quads.'
    },
    {
      id: 'hack-squat-barbell',
      name: 'Hack Squat (Barbell)',
      category: 'strength',
      muscleGroup: 'quadriceps',
      equipment: 'barbell',
      description: 'Old-school barbell squat variation focusing on quads.'
    },
    {
      id: 'split-squat',
      name: 'Split Squat / Bulgarian Split Squat',
      category: 'strength',
      muscleGroup: 'quadriceps',
      equipment: 'barbell',
      description: 'Rear foot elevated squat emphasizing quads and glutes.'
    },
    {
      id: 'deadlift',
      name: 'Deadlift',
      category: 'strength',
      muscleGroup: 'hamstrings',
      equipment: 'barbell',
      description: 'Key posterior chain exercise targeting hamstrings and glutes.'
    },
    {
      id: 'romanian-deadlift',
      name: 'Romanian Deadlift (RDL)',
      category: 'strength',
      muscleGroup: 'hamstrings',
      equipment: 'barbell',
      description: 'Hip-hinge movement emphasizing hamstrings and glutes.'
    },
    {
      id: 'good-morning',
      name: 'Good Morning',
      category: 'strength',
      muscleGroup: 'hamstrings',
      equipment: 'barbell',
      description: 'Hip hinge exercise also targeting lower back.'
    },
    {
      id: 'hip-thrust',
      name: 'Hip Thrust',
      category: 'strength',
      muscleGroup: 'glutes',
      equipment: 'barbell',
      description: 'Barbell hip thrust focusing on glute development.'
    },
    {
      id: 'barbell-calf-raise',
      name: 'Barbell Calf Raise',
      category: 'strength',
      muscleGroup: 'calves',
      equipment: 'barbell',
      description: 'Standing calf raise using a barbell for resistance.'
    }
  ],
  dumbbell: [
    {
      id: 'goblet-squat',
      name: 'Goblet Squat',
      category: 'strength',
      muscleGroup: 'quadriceps',
      equipment: 'dumbbell',
      description: 'Squat holding a dumbbell under the chin for quad activation.'
    },
    {
      id: 'dumbbell-lunges',
      name: 'Dumbbell Lunges',
      category: 'strength',
      muscleGroup: 'quadriceps',
      equipment: 'dumbbell',
      description: 'Walking or stationary lunges holding dumbbells.'
    },
    {
      id: 'step-ups',
      name: 'Step-Ups',
      category: 'strength',
      muscleGroup: 'quadriceps',
      equipment: 'dumbbell',
      description: 'Stepping onto a raised surface while holding dumbbells.'
    },
    {
      id: 'dumbbell-rdl',
      name: 'Romanian Deadlift (RDL)',
      category: 'strength',
      muscleGroup: 'hamstrings',
      equipment: 'dumbbell',
      description: 'Hip-hinge movement with dumbbells for hamstrings.'
    },
    {
      id: 'single-leg-rdl',
      name: 'Single-Leg Romanian Deadlift',
      category: 'strength',
      muscleGroup: 'hamstrings',
      equipment: 'dumbbell',
      description: 'Unilateral RDL focusing on balance and hamstring strength.'
    },
    {
      id: 'glute-bridge',
      name: 'Glute Bridge',
      category: 'strength',
      muscleGroup: 'glutes',
      equipment: 'dumbbell',
      description: 'Hip lift movement with a dumbbell on hips for glutes.'
    },
    {
      id: 'dumbbell-calf-raise',
      name: 'Dumbbell Calf Raise',
      category: 'strength',
      muscleGroup: 'calves',
      equipment: 'dumbbell',
      description: 'Standing calf raise holding dumbbells at sides.'
    }
  ],
  machine: [
    {
      id: 'leg-press',
      name: 'Leg Press',
      category: 'strength',
      muscleGroup: 'quadriceps',
      equipment: 'machine',
      description: 'Machine-based pressing movement for legs.'
    },
    {
      id: 'hack-squat-machine',
      name: 'Hack Squat Machine',
      category: 'strength',
      muscleGroup: 'quadriceps',
      equipment: 'machine',
      description: 'Machine variation of the squat focusing on quads.'
    },
    {
      id: 'leg-extension',
      name: 'Leg Extension',
      category: 'hypertrophy',
      muscleGroup: 'quadriceps',
      equipment: 'machine',
      description: 'Isolation machine exercise for quads.'
    },
    {
      id: 'lying-leg-curl',
      name: 'Lying Leg Curl',
      category: 'hypertrophy',
      muscleGroup: 'hamstrings',
      equipment: 'machine',
      description: 'Machine exercise focusing on hamstring curls.'
    },
    {
      id: 'seated-leg-curl',
      name: 'Seated Leg Curl',
      category: 'hypertrophy',
      muscleGroup: 'hamstrings',
      equipment: 'machine',
      description: 'Machine-based hamstring curl performed seated.'
    },
    {
      id: 'glute-drive',
      name: 'Glute Drive / Hip Thrust Machine',
      category: 'strength',
      muscleGroup: 'glutes',
      equipment: 'machine',
      description: 'Machine-based hip thrust for glute activation.'
    },
    {
      id: 'standing-calf-raise-machine',
      name: 'Standing Calf Raise Machine',
      category: 'strength',
      muscleGroup: 'calves',
      equipment: 'machine',
      description: 'Machine exercise for standing calf raises.'
    },
    {
      id: 'donkey-calf-raise-machine',
      name: 'Donkey Calf Raise Machine',
      category: 'strength',
      muscleGroup: 'calves',
      equipment: 'machine',
      description: 'Less common but effective calf raise machine variation.'
    }
  ]
};

export const LegWorkouts: React.FC = () => {
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