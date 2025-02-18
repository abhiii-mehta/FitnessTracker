import React, { useState } from 'react';
import { ChestWorkouts } from './workouts/ChestWorkouts';
import { BackWorkouts } from './workouts/BackWorkouts';
import { ShoulderWorkouts } from './workouts/ShoulderWorkouts';
import { ArmWorkouts } from './workouts/ArmWorkouts';
import { LegWorkouts } from './workouts/LegWorkouts';
import { CoreWorkouts } from './workouts/CoreWorkouts';
import { NeckTrapsWorkouts } from './workouts/NeckWorkouts';
import { WorkoutPlanner } from './WorkoutPlanner';

export const WorkoutTracker: React.FC = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<string>('chest');
  const [view, setView] = useState<'exercises' | 'planner'>('exercises');
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
    <div className="p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Workout Tracker</h2>
        <div className="flex space-x-4 w-full sm:w-auto">
          <button
            onClick={() => setView('exercises')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors ${
              view === 'exercises'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Exercise Library
          </button>
          <button
            onClick={() => setView('planner')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors ${
              view === 'planner'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Workout Planner
          </button>
        </div>
      </div>

      {view === 'exercises' ? (
        <>
          {/* Muscle Group Tabs */}
          <div className="mb-6 border-b border-gray-200 -mx-4 px-4 lg:mx-0 lg:px-0">
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {muscleGroups.map((muscle) => (
                <button
                  key={muscle}
                  onClick={() => setSelectedMuscle(muscle)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap
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
        </>
      ) : (
        <WorkoutPlanner />
      )}
    </div>
  );
};