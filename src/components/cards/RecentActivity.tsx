import React from 'react';
import { Activity, CheckCircle, XCircle } from 'lucide-react';

const activities = [
  { date: '2025-09-25', medicine: 'Paracetamol', status: 'Taken' },
  { date: '2025-09-24', medicine: 'Vitamin C', status: 'Missed' },
  { date: '2025-09-23', medicine: 'Amoxicillin', status: 'Taken' },
  { date: '2025-09-22', medicine: 'Vitamin D', status: 'Taken' },
  { date: '2025-09-21', medicine: 'Iron Supplement', status: 'Missed' },
];

const RecentActivity: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
        <div className="p-2 bg-purple-50 rounded-lg">
          <Activity className="h-5 w-5 text-purple-600" />
        </div>
      </div>
      
      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Date</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Medicine</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr 
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-3 px-2">
                  <span className="text-sm text-gray-600">{formatDate(activity.date)}</span>
                </td>
                <td className="py-3 px-2">
                  <span className="text-sm font-medium text-gray-900">{activity.medicine}</span>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center space-x-2">
                    {activity.status === 'Taken' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      activity.status === 'Taken' ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full py-2 px-4 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;