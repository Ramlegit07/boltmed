import React from 'react';
import { Pill, Plus, Search, Filter } from 'lucide-react';

const medicines = [
  { id: 1, name: 'Paracetamol', type: 'Tablet', strength: '500mg', stock: 20, expiry: '2025-12-31' },
  { id: 2, name: 'Vitamin D', type: 'Capsule', strength: '1000 IU', stock: 15, expiry: '2025-10-15' },
  { id: 3, name: 'Amoxicillin', type: 'Capsule', strength: '250mg', stock: 8, expiry: '2025-08-20' },
  { id: 4, name: 'Ibuprofen', type: 'Tablet', strength: '400mg', stock: 25, expiry: '2026-01-10' },
  { id: 5, name: 'Vitamin C', type: 'Tablet', strength: '1000mg', stock: 30, expiry: '2025-11-25' },
];

const MedicinesPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Medicine Inventory
          </h1>
          <p className="text-gray-600 mt-2">Track your medicine stock and expiry dates</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105">
          <Plus className="h-5 w-5" />
          <span>Add Medicine</span>
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search medicines..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/95 backdrop-blur-xl"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors bg-white/95 backdrop-blur-xl">
          <Filter className="h-5 w-5 text-gray-600" />
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Medicine</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Type</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Strength</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Stock</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Expiry Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine, index) => {
                const expiryDate = new Date(medicine.expiry);
                const today = new Date();
                const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                const isExpiringSoon = daysUntilExpiry <= 30;
                const isLowStock = medicine.stock <= 10;

                return (
                  <tr key={medicine.id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Pill className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900">{medicine.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{medicine.type}</td>
                    <td className="py-4 px-6 text-gray-600">{medicine.strength}</td>
                    <td className="py-4 px-6">
                      <span className={`font-medium ${isLowStock ? 'text-red-600' : 'text-gray-900'}`}>
                        {medicine.stock}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`${isExpiringSoon ? 'text-orange-600' : 'text-gray-600'}`}>
                        {medicine.expiry}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        {isLowStock && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                            Low Stock
                          </span>
                        )}
                        {isExpiringSoon && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                            Expiring Soon
                          </span>
                        )}
                        {!isLowStock && !isExpiringSoon && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            Good
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MedicinesPage;