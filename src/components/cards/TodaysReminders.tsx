import React from 'react';
import { Clock, Pill, Check } from 'lucide-react';

interface TodaysRemindersProps {
  reminders: Array<{
    id: string;
    name: string;
    dosage: string;
    time: string;
    taken: boolean;
  }>;
  onMarkTaken: (id: string) => void;
}

const TodaysReminders: React.FC<TodaysRemindersProps> = ({ reminders, onMarkTaken }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Today's Reminders</h2>
        <div className="p-2 bg-emerald-50 rounded-lg">
          <Clock className="h-5 w-5 text-emerald-600" />
        </div>
      </div>
      
      <div className="space-y-4">
        {reminders.map((reminder, index) => (
          <div 
            key={reminder.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${reminder.taken ? 'bg-emerald-100' : 'bg-orange-100'}`}>
                <Pill className={`h-4 w-4 ${reminder.taken ? 'text-emerald-600' : 'text-orange-600'}`} />
              </div>
              <div>
                <p className="font-medium text-gray-900">{reminder.name} {reminder.dosage}</p>
                <p className="text-sm text-gray-500">Scheduled for {reminder.time}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                reminder.taken 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-orange-100 text-orange-700'
              }`}>
                {reminder.taken ? 'Taken' : 'Pending'}
              </div>
              {!reminder.taken && (
                <button
                  onClick={() => onMarkTaken(reminder.id)}
                  className="p-1 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                  title="Mark as taken"
                >
                  <Check className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysReminders;