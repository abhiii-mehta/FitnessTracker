import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Workout, Exercise } from '../types';

interface WorkoutContextType {
  currentWorkout: Workout;
  setCurrentWorkout: React.Dispatch<React.SetStateAction<Workout>>;
  savedWorkouts: Workout[];
  setSavedWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
  addExerciseToWorkout: (exercise: Exercise) => void;
  showNotification: (message: string) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const initialWorkout: Workout = {
  id: Date.now().toString(),
  name: '',
  date: getCurrentDate(),
  exercises: []
};

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved workouts from localStorage on initial render
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>(() => {
    const saved = localStorage.getItem('savedWorkouts');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentWorkout, setCurrentWorkout] = useState<Workout>(() => {
    const saved = localStorage.getItem('currentWorkout');
    return saved ? JSON.parse(saved) : initialWorkout;
  });

  const [notification, setNotification] = useState<string | null>(null);

  // Save workouts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('savedWorkouts', JSON.stringify(savedWorkouts));
  }, [savedWorkouts]);

  useEffect(() => {
    localStorage.setItem('currentWorkout', JSON.stringify(currentWorkout));
  }, [currentWorkout]);

  const addExerciseToWorkout = (exercise: Exercise) => {
    const exerciseExists = currentWorkout.exercises.some(
      e => e.exerciseId === exercise.id
    );

    if (exerciseExists) {
      showNotification(`${exercise.name} is already in your workout`);
      return;
    }

    setCurrentWorkout(prev => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        {
          exerciseId: exercise.id,
          exerciseName: exercise.name,
          sets: [{ reps: 0, weight: 0 }]
        }
      ]
    }));
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <WorkoutContext.Provider
      value={{
        currentWorkout,
        setCurrentWorkout,
        savedWorkouts,
        setSavedWorkouts,
        addExerciseToWorkout,
        showNotification
      }}
    >
      {children}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up z-50">
          {notification}
        </div>
      )}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};