import React, { useState } from 'react';
import { Clock, Plus, CreditCard as Edit, Trash2, Bell } from 'lucide-react';

interface RemindersPageProps {
  reminders: Array<{
    id: string;
    name: string;
    dosage: string;
    time: string;
    taken: boolean;
  }>;
  onMarkTaken: (id: string) => void;
}

const RemindersPage: React.FC<RemindersPageProps> = ({ reminders, onMarkTaken }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Medicine Reminders
          </h1>
          <p className="text-gray-600 mt-2">Manage your medication schedule</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          <span>Add Reminder</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${reminder.taken ? 'bg-green-100' : 'bg-orange-100'}`}>
                <Bell className={`h-6 w-6 ${reminder.taken ? 'text-green-600' : 'text-orange-600'}`} />
              </div>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{reminder.name}</h3>
            <p className="text-gray-600 mb-2">{reminder.dosage}</p>
            <p className="text-lg font-semibold text-blue-600 mb-4">{reminder.time}</p>
            
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                reminder.taken 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-orange-100 text-orange-700'
              }`}>
                {reminder.taken ? 'Completed' : 'Pending'}
              </span>
              
              {!reminder.taken && (
                <button
                  onClick={() => onMarkTaken(reminder.id)}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:shadow-md transition-all duration-200 text-sm font-medium"
                >
                  Mark Taken
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Reminder</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medicine Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter medicine name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="e.g., 500mg, 1 tablet"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                >
                  Add Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemindersPage;