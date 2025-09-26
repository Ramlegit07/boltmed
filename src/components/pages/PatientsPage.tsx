import React from 'react';
import { Users, Plus, Phone, Mail, Calendar } from 'lucide-react';

const patients = [
  { id: 1, name: 'John Doe', age: 45, phone: '+1 234-567-8901', email: 'john@example.com', lastVisit: '2025-01-15', condition: 'Hypertension' },
  { id: 2, name: 'Jane Smith', age: 32, phone: '+1 234-567-8902', email: 'jane@example.com', lastVisit: '2025-01-10', condition: 'Diabetes' },
  { id: 3, name: 'Bob Johnson', age: 58, phone: '+1 234-567-8903', email: 'bob@example.com', lastVisit: '2025-01-08', condition: 'Heart Disease' },
  { id: 4, name: 'Alice Brown', age: 28, phone: '+1 234-567-8904', email: 'alice@example.com', lastVisit: '2025-01-12', condition: 'Asthma' },
];

const PatientsPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Patient Management
          </h1>
          <p className="text-gray-600 mt-2">Manage patient information and medical history</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105">
          <Plus className="h-5 w-5" />
          <span>Add Patient</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{patient.name}</h3>
                <p className="text-gray-600">Age: {patient.age}</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{patient.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{patient.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Last visit: {patient.lastVisit}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Condition</p>
                  <p className="font-medium text-gray-900">{patient.condition}</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:shadow-md transition-all duration-200 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsPage;