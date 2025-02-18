import React, { useState } from 'react';
import { Plus, X, Save, Dumbbell, Trash2 } from 'lucide-react';
import type { Workout, WorkoutSet } from '../types';
import { useWorkout } from '../context/WorkoutContext';

export const WorkoutPlanner: React.FC = () => {
  const { currentWorkout, setCurrentWorkout, savedWorkouts, setSavedWorkouts } = useWorkout();

  const removeExercise = (index: number) => {
    setCurrentWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }));
  };

  const addSet = (exerciseIndex: number) => {
    setCurrentWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) =>
        i === exerciseIndex
          ? {
              ...exercise,
              sets: [...exercise.sets, { reps: 0, weight: 0 }]
            }
          : exercise
      )
    }));
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    setCurrentWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) =>
        i === exerciseIndex
          ? {
              ...exercise,
              sets: exercise.sets.filter((_, si) => si !== setIndex)
            }
          : exercise
      )
    }));
  };

  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: keyof WorkoutSet,
    value: number
  ) => {
    setCurrentWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) =>
        i === exerciseIndex
          ? {
              ...exercise,
              sets: exercise.sets.map((set, si) =>
                si === setIndex ? { ...set, [field]: value } : set
              )
            }
          : exercise
      )
    }));
  };

  const saveWorkout = () => {
    if (!currentWorkout.name.trim()) {
      alert('Please enter a workout name');
      return;
    }

    if (currentWorkout.exercises.length === 0) {
      alert('Please add at least one exercise');
      return;
    }

    setSavedWorkouts(prev => [...prev, { ...currentWorkout, id: Date.now().toString() }]);
    setCurrentWorkout({
      id: Date.now().toString(),
      name: '',
      date: new Date().toISOString().split('T')[0],
      exercises: []
    });
  };

  const deleteWorkout = () => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      setCurrentWorkout({
        id: Date.now().toString(),
        name: '',
        date: new Date().toISOString().split('T')[0],
        exercises: []
      });
    }
  };

  const deleteSavedWorkout = (workoutId: string) => {
    if (window.confirm('Are you sure you want to delete this saved workout?')) {
      setSavedWorkouts(prev => prev.filter(workout => workout.id !== workoutId));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            value={currentWorkout.name}
            onChange={(e) => setCurrentWorkout(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Workout Name"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={currentWorkout.date}
            onChange={(e) => setCurrentWorkout(prev => ({ ...prev, date: e.target.value }))}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {currentWorkout.exercises.map((exercise, exerciseIndex) => (
          <div key={exercise.exerciseId} className="mb-6 p-4 border rounded-lg">
            <div className="flex items-center space-x-4 mb-4">
              <h3 className="font-medium">{exercise.exerciseName}</h3>
              <button
                onClick={() => removeExercise(exerciseIndex)}
                className="text-red-500 hover:text-red-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {exercise.sets.map((set, setIndex) => (
                <div key={setIndex} className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-500">Set {setIndex + 1}</span>
                  <input
                    type="number"
                    value={set.weight || ''}
                    onChange={(e) => updateSet(exerciseIndex, setIndex, 'weight', Number(e.target.value))}
                    placeholder="Weight"
                    min="0"
                    className="w-24 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    value={set.reps || ''}
                    onChange={(e) => updateSet(exerciseIndex, setIndex, 'reps', Number(e.target.value))}
                    placeholder="Reps"
                    min="0"
                    className="w-24 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => removeSet(exerciseIndex, setIndex)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addSet(exerciseIndex)}
                className="text-blue-500 hover:text-blue-600 text-sm font-medium"
              >
                + Add Set
              </button>
            </div>
          </div>
        ))}

        <div className="flex space-x-4">
          <button
            onClick={saveWorkout}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Save Workout</span>
          </button>
          
          {currentWorkout.exercises.length > 0 && (
            <button
              onClick={deleteWorkout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              <span>Delete Workout</span>
            </button>
          )}
        </div>
      </div>

      {/* Saved Workouts */}
      {savedWorkouts.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Saved Workouts</h3>
          <div className="space-y-4">
            {savedWorkouts.map((workout) => (
              <div key={workout.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold">{workout.name}</h4>
                    <p className="text-sm text-gray-500">{workout.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Dumbbell className="w-6 h-6 text-blue-500" />
                    <button
                      onClick={() => deleteSavedWorkout(workout.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {workout.exercises.map((exercise) => (
                    <div key={exercise.exerciseId} className="border-t pt-4">
                      <h5 className="font-medium mb-2">{exercise.exerciseName}</h5>
                      <div className="grid grid-cols-3 gap-4">
                        {exercise.sets.map((set, index) => (
                          <div key={index} className="text-sm text-gray-600">
                            Set {index + 1}: {set.weight}kg × {set.reps} reps
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};