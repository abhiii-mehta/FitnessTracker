import type { Exercise } from '../../types';

export const backExercises: Record<string, Exercise[]> = {
  bodyweight: [
    {
      id: 'pull-ups',
      name: 'Pull-ups',
      category: 'strength',
      muscleGroup: 'back',
      equipment: 'bodyweight',
      description: 'Classic bodyweight exercise for back development'
    }
  ],
  dumbbell: [
    {
      id: 'db-row',
      name: 'Dumbbell Row',
      category: 'strength',
      muscleGroup: 'back',
      equipment: 'dumbbell',
      description: 'Single-arm back exercise for muscle development'
    }
  ],
  barbell: [
    {
      id: 'barbell-row',
      name: 'Barbell Row',
      category: 'strength',
      muscleGroup: 'back',
      equipment: 'barbell',
      description: 'Compound movement for back thickness'
    }
  ],
  machine: [
    {
      id: 'lat-pulldown',
      name: 'Lat Pulldown',
      category: 'hypertrophy',
      muscleGroup: 'back',
      equipment: 'machine',
      description: 'Machine-based vertical pulling movement'
    }
  ]
};