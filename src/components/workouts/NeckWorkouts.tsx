import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Exercise } from '../../types';

const exercises: Record<string, Exercise[]> = {
  bodyweight: [
    {
      id: 'neck-flexion',
      name: 'Neck Flexion',
      category: 'strength',
      muscleGroup: 'neck',
      equipment: 'bodyweight',
      description: 'Forward movement of the head using neck muscles.'
    },
    {
      id: 'neck-extension',
      name: 'Neck Extension',
      category: 'strength',
      muscleGroup: 'neck',
      equipment: 'bodyweight',
      description: 'Backward movement of the head to strengthen neck extensors.'
    },
    {
      id: 'lateral-neck-flexion',
      name: 'Lateral Neck Flexion',
      category: 'strength',
      muscleGroup: 'neck',
      equipment: 'bodyweight',
      description: 'Side-to-side movement of the head to engage lateral neck muscles.'
    }
  ],
  resistance_band: [
    {
      id: 'band-neck-flexion',
      name: 'Neck Flexion (Resistance Band)',
      category: 'strength',
      muscleGroup: 'neck',
      equipment: 'resistance band',
      description: 'Using a resistance band to strengthen neck flexors.'
    },
    {
      id: 'band-neck-extension',
      name: 'Neck Extension (Resistance Band)',
      category: 'strength',
      muscleGroup: 'neck',
      equipment: 'resistance band',
      description: 'Backward head movement with resistance band for neck extensors.'
    },
    {
      id: 'band-lateral-neck-flexion',
      name: 'Lateral Neck Flexion (Resistance Band)',
      category: 'strength',
      muscleGroup: 'neck',
      equipment: 'resistance band',
      description: 'Side-to-side neck movement with band resistance.'
    }
  ],
  specialized_harness: [
    {
      id: 'harness-neck-flexion',
      name: 'Neck Flexion (Harness)',
      category: 'strength',
      muscleGroup: 'neck',
      equipment: 'specialized harness',
      description: 'Neck flexion performed using a specialized neck harness.'
    },
    {
      id: 'harness-neck-extension',
      name: 'Neck Extension (Harness)',
      category: 'strength',
      muscleGroup: 'neck',
      equipment: 'specialized harness',
      description: 'Neck extension with a specialized harness for added resistance.'
    },
    {
      id: 'harness-lateral-neck-flexion',
      name: 'Lateral Neck Flexion (Harness)',
      category: 'strength',
      muscleGroup: 'neck',
      equipment: 'specialized harness',
      description: 'Side-to-side neck movement using a harness for resistance.'
    }
  ],
  barbell: [
    {
      id: 'barbell-shrugs',
      name: 'Barbell Shrugs',
      category: 'hypertrophy',
      muscleGroup: 'traps',
      equipment: 'barbell',
      description: 'Classic trap isolation exercise using a barbell.'
    }
  ],
  dumbbell: [
    {
      id: 'dumbbell-shrugs',
      name: 'Dumbbell Shrugs',
      category: 'hypertrophy',
      muscleGroup: 'traps',
      equipment: 'dumbbell',
      description: 'Trap isolation exercise using dumbbells for a greater range of motion.'
    }
  ],
  trap_bar: [
    {
      id: 'trap-bar-shrugs',
      name: 'Trap Bar Shrugs',
      category: 'hypertrophy',
      muscleGroup: 'traps',
      equipment: 'trap bar',
      description: 'Shrugging movement using a trap bar for balanced loading.'
    }
  ]
};

export const NeckTrapsWorkouts: React.FC = () => {
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
              {equipment.charAt(0).toUpperCase() + equipment.slice(1).replace('_', ' ')}
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