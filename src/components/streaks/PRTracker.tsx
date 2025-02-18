import React, { useState } from 'react';
import { Trophy, Plus, X, Edit2, Trash2 } from 'lucide-react';
import type { PersonalRecord, Exercise } from '../../types';

interface PRTrackerProps {
  personalRecords: PersonalRecord[];
  onAddPR: (pr: PersonalRecord) => void;
  onEditPR: (id: string, pr: PersonalRecord) => void;
  onDeletePR: (id: string) => void;
  exercises: Exercise[];
}

export const PRTracker: React.FC<PRTrackerProps> = ({
  personalRecords,
  onAddPR,
  onEditPR,
  onDeletePR,
  exercises
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingPR, setEditingPR] = useState<PersonalRecord | null>(null);
  const [newPR, setNewPR] = useState<Partial<PersonalRecord>>({
    units: 'metric'
  });

  const handleSubmit = () => {
    if (!newPR.exerciseName || !newPR.weight || !newPR.reps) return;

    const pr: PersonalRecord = {
      id: editingPR?.id || Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      exerciseId: newPR.exerciseId,
      exerciseName: newPR.exerciseName,
      weight: newPR.weight,
      reps: newPR.reps,
      notes: newPR.notes,
      units: newPR.units || 'metric'
    };

    if (editingPR) {
      onEditPR(editingPR.id, pr);
    } else {
      onAddPR(pr);
    }

    setShowForm(false);
    setEditingPR(null);
    setNewPR({ units: pr.units });
  };

  const handleEdit = (pr: PersonalRecord) => {
    setEditingPR(pr);
    setNewPR(pr);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this PR?')) {
      onDeletePR(id);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h3 className="text-lg font-semibold">Personal Records</h3>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Add PR
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {editingPR ? 'Edit PR' : 'Add New PR'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingPR(null);
                  setNewPR({ units: newPR.units });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exercise
                </label>
                <select
                  value={newPR.exerciseId || ''}
                  onChange={(e) => {
                    const exercise = exercises.find(ex => ex.id === e.target.value);
                    setNewPR({
                      ...newPR,
                      exerciseId: e.target.value,
                      exerciseName: exercise?.name || ''
                    });
                  }}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select an exercise</option>
                  {exercises.map((exercise) => (
                    <option key={exercise.id} value={exercise.id}>
                      {exercise.name}
                    </option>
                  ))}
                </select>
              </div>

              {!newPR.exerciseId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Exercise Name
                  </label>
                  <input
                    type="text"
                    value={newPR.exerciseName || ''}
                    onChange={(e) => setNewPR({ ...newPR, exerciseName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter exercise name"
                  />
                </div>
              )}

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight ({newPR.units === 'metric' ? 'kg' : 'lbs'})
                  </label>
                  <input
                    type="number"
                    value={newPR.weight || ''}
                    onChange={(e) => setNewPR({ ...newPR, weight: Number(e.target.value) })}
                    className="w-full px-4 py-2 border rounded-lg"
                    step="0.5"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reps
                  </label>
                  <input
                    type="number"
                    value={newPR.reps || ''}
                    onChange={(e) => setNewPR({ ...newPR, reps: Number(e.target.value) })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (optional)
                </label>
                <textarea
                  value={newPR.notes || ''}
                  onChange={(e) => setNewPR({ ...newPR, notes: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={3}
                  placeholder="Add any additional notes"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingPR(null);
                    setNewPR({ units: newPR.units });
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  disabled={!newPR.exerciseName || !newPR.weight || !newPR.reps}
                >
                  {editingPR ? 'Update PR' : 'Save PR'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4 mt-4">
        {personalRecords.length === 0 ? (
          <p className="text-gray-500">No personal records yet</p>
        ) : (
          personalRecords.map((pr) => (
            <div
              key={pr.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div>
                <h4 className="font-medium">{pr.exerciseName}</h4>
                <p className="text-sm text-gray-600">
                  {pr.weight} {pr.units === 'metric' ? 'kg' : 'lbs'} × {pr.reps} reps
                </p>
                {pr.notes && (
                  <p className="text-sm text-gray-500 mt-1">{pr.notes}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(pr)}
                  className="p-1 text-blue-500 hover:text-blue-600"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(pr.id)}
                  className="p-1 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};