import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import type { CalorieLog } from '../types';

export const CalorieTracker: React.FC = () => {
  const [logs, setLogs] = useState<CalorieLog[]>(() => {
    const saved = localStorage.getItem('calorieLogs');
    return saved ? JSON.parse(saved) : [];
  });
  const [newFood, setNewFood] = useState('');
  const [newCalories, setNewCalories] = useState('');

  useEffect(() => {
    localStorage.setItem('calorieLogs', JSON.stringify(logs));
  }, [logs]);

  const addLog = () => {
    if (!newFood || !newCalories) return;

    const newLog: CalorieLog = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      food: newFood,
      calories: parseInt(newCalories),
      protein: 0,
      carbs: 0,
      fats: 0
    };

    setLogs([...logs, newLog]);
    setNewFood('');
    setNewCalories('');
  };

  const removeLog = (id: string) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Track Calories</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              value={newFood}
              onChange={(e) => setNewFood(e.target.value)}
              placeholder="Food item"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
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
        </div>

        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-4 border rounded-lg flex justify-between items-center animate-fade-in-up"
            >
              <div>
                <h3 className="font-semibold">{log.food}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(log.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <p className="font-bold">{log.calories} kcal</p>
                <button
                  onClick={() => removeLog(log.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};