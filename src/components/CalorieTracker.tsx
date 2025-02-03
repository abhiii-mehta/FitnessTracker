import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { CalorieLog } from '../types';

export const CalorieTracker: React.FC = () => {
  const [logs, setLogs] = useState<CalorieLog[]>([]);
  const [newFood, setNewFood] = useState('');
  const [newCalories, setNewCalories] = useState('');

  const addLog = () => {
    if (!newFood || !newCalories) return;

    const newLog: CalorieLog = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      food: newFood,
      calories: parseInt(newCalories),
      protein: 0, // These would be input by user in a real app
      carbs: 0,
      fats: 0
    };

    setLogs([...logs, newLog]);
    setNewFood('');
    setNewCalories('');
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Track Calories</h2>
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            value={newFood}
            onChange={(e) => setNewFood(e.target.value)}
            placeholder="Food item"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={newCalories}
            onChange={(e) => setNewCalories(e.target.value)}
            placeholder="Calories"
            className="w-32 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addLog}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{log.food}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(log.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">{log.calories} kcal</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}