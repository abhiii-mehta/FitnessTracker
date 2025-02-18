export interface Exercise {
  id: string;
  name: string;
  category: 'strength' | 'hypertrophy';
  muscleGroup: string;
  subGroup?: string;
  equipment: 'bodyweight' | 'dumbbell' | 'barbell' | 'machine' | 'resistance band' | 'specialized harness' | 'trap bar' | 'plate';
  description: string;
}

export interface WorkoutSet {
  reps: number;
  weight: number;
  notes?: string;
}

export interface WorkoutExercise {
  exerciseId: string;
  exerciseName: string;
  sets: WorkoutSet[];
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutLog {
  id: string;
  date: string;
  exercises: {
    exerciseId: string;
    sets: Array<{
      reps: number;
      weight: number;
    }>;
  }[];
}

export interface CalorieLog {
  id: string;
  date: string;
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface UserStats {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  bodyFat?: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
  goal: 'lose' | 'maintain' | 'gain';
  weightChangeRate?: number;
  weightChangePeriod: 'week' | 'month';
  units: 'metric' | 'us';
}