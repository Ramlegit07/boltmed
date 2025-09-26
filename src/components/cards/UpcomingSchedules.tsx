import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const events = [
  { date: '2025-09-26', label: 'Painkiller', time: '8:00 AM' },
  { date: '2025-09-27', label: 'Cough Syrup', time: '10:00 AM' },
  { date: '2025-09-28', label: 'Multivitamin', time: '6:00 PM' },
];

const UpcomingSchedules: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Upcoming Schedules</h2>
        <div className="p-2 bg-blue-50 rounded-lg">
          <Calendar className="h-5 w-5 text-blue-600" />
        </div>
      </div>
      
      <div className="space-y-4">
        {events.map((event, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">
                    {new Date(event.date).getDate()}
                  </span>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {formatDate(event.date).split(',')[0]}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{event.label}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-sm text-gray-500">{event.time}</span>
                </div>
              </div>
            </div>
            <button className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full hover:bg-blue-700 transition-colors duration-200">
              Set Reminder
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSchedules;