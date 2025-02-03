import React, { useState } from 'react';
import { ChestWorkouts } from './workouts/ChestWorkouts';
import { BackWorkouts } from './workouts/BackWorkouts';
import { ShoulderWorkouts } from './workouts/ShoulderWorkouts';
import { ArmWorkouts } from './workouts/ArmWorkouts';
import { LegWorkouts } from './workouts/LegWorkouts';
import { CoreWorkouts } from './workouts/CoreWorkouts';
import { NeckTrapsWorkouts } from './workouts/NeckWorkouts';

export const WorkoutTracker: React.FC = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<string>('chest');
  const muscleGroups = ['chest', 'back', 'shoulders', 'arms', 'legs', 'core', 'neck'];

  const renderWorkout = () => {
    switch (selectedMuscle) {
      case 'chest':
        return <ChestWorkouts />;
      case 'back':
        return <BackWorkouts />;
      case 'shoulders':
        return <ShoulderWorkouts />;
      case 'arms':
        return <ArmWorkouts />;
      case 'legs':
        return <LegWorkouts />;
      case 'core':
        return <CoreWorkouts />;
      case 'neck':
        return <NeckTrapsWorkouts />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Workout Tracker</h2>
      
      {/* Muscle Group Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-2 overflow-x-auto">
          {muscleGroups.map((muscle) => (
            <button
              key={muscle}
              onClick={() => setSelectedMuscle(muscle)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap
                ${selectedMuscle === muscle
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Workout Content */}
      {renderWorkout()}
    </div>
  );
};