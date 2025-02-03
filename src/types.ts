export interface Exercise {
  id: string;
  name: string;
  category: 'strength' | 'hypertrophy';
  muscleGroup: string;
  subGroup?: string; // For arms (biceps/triceps) and core (abs/obliques)
  equipment: 'bodyweight' | 'dumbbell' | 'barbell' | 'machine';
  description: string;
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
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
  goal: 'lose' | 'maintain' | 'gain';
}