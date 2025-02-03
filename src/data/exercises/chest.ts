import type { Exercise } from '../../types';

export const chestExercises: Record<string, Exercise[]> = {
  bodyweight: [
    {
      id: 'pushups',
      name: 'Push-ups',
      category: 'strength',
      muscleGroup: 'chest',
      equipment: 'bodyweight',
      description: 'Classic bodyweight exercise for chest, shoulders, and triceps'
    },
    // ... rest of bodyweight exercises
  ],
  dumbbell: [
    {
      id: 'db-bench-press',
      name: 'Dumbbell Bench Press',
      category: 'hypertrophy',
      muscleGroup: 'chest',
      equipment: 'dumbbell',
      description: 'Flat bench press with dumbbells'
    },
    // ... rest of dumbbell exercises
  ],
  barbell: [
    {
      id: 'bench-press',
      name: 'Barbell Bench Press',
      category: 'strength',
      muscleGroup: 'chest',
      equipment: 'barbell',
      description: 'Classic compound movement for chest development'
    },
    // ... rest of barbell exercises
  ],
  machine: [
    {
      id: 'chest-press',
      name: 'Machine Chest Press',
      category: 'hypertrophy',
      muscleGroup: 'chest',
      equipment: 'machine',
      description: 'Machine-based pressing movement'
    },
    // ... rest of machine exercises
  ]
};