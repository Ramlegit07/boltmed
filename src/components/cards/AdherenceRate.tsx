import React from 'react';
import { TrendingUp } from 'lucide-react';

const AdherenceRate: React.FC = () => {
  const adherenceData = {
    taken: 85,
    missed: 15
  };

  const circumference = 2 * Math.PI * 45;
  const takenOffset = circumference - (adherenceData.taken / 100) * circumference;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Adherence Rate</h2>
        <div className="p-2 bg-green-50 rounded-lg">
          <TrendingUp className="h-5 w-5 text-green-600" />
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-8">
        <div className="relative">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="#2d6a4f"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={takenOffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-900">{adherenceData.taken}%</span>
              <p className="text-xs text-gray-500">Adherence</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-emerald-600 rounded-full"></div>
            <div>
              <p className="font-medium text-gray-900">Taken</p>
              <p className="text-sm text-gray-500">{adherenceData.taken}%</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-red-400 rounded-full"></div>
            <div>
              <p className="font-medium text-gray-900">Missed</p>
              <p className="text-sm text-gray-500">{adherenceData.missed}%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <p className="text-sm text-green-800">
          <span className="font-medium">Great job!</span> You're maintaining excellent adherence to your medication schedule.
        </p>
      </div>
    </div>
  );
};

export default AdherenceRate;