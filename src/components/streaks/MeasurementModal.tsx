import React from 'react';
import { X } from 'lucide-react';
import type { BodyMeasurement } from '../../types';

interface MeasurementModalProps {
  show: boolean;
  onClose: () => void;
  measurement: Partial<BodyMeasurement>;
  onMeasurementChange: (measurement: Partial<BodyMeasurement>) => void;
  onSave: () => void;
  onUnitChange: (unit: 'metric' | 'us') => void;
}

export const MeasurementModal: React.FC<MeasurementModalProps> = ({
  show,
  onClose,
  measurement,
  onMeasurementChange,
  onSave,
  onUnitChange
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add Measurement</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex space-x-4">
            <button
              onClick={() => onUnitChange('metric')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                measurement.units === 'metric'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Metric (kg/cm)
            </button>
            <button
              onClick={() => onUnitChange('us')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                measurement.units === 'us'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              US (lb/in)
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight ({measurement.units === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              value={measurement.weight || ''}
              onChange={(e) => onMeasurementChange({
                ...measurement,
                weight: Number(e.target.value)
              })}
              step="0.1"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height ({measurement.units === 'metric' ? 'cm' : 'in'})
            </label>
            <input
              type="number"
              value={measurement.height || ''}
              onChange={(e) => onMeasurementChange({
                ...measurement,
                height: Number(e.target.value)
              })}
              step="0.1"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Body Fat % (optional)
            </label>
            <input
              type="number"
              value={measurement.bodyFat || ''}
              onChange={(e) => onMeasurementChange({
                ...measurement,
                bodyFat: Number(e.target.value)
              })}
              min="0"
              max="100"
              step="0.1"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              disabled={!measurement.weight}
            >
              Save Measurement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};