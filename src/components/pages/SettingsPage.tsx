import React from 'react';
import { Settings, Bell, Shield, User, Palette, Globe } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-600 mt-2">Customize your medicine reminder experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Bell className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-600">Receive alerts for medicine reminders</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Sound Alerts</p>
                <p className="text-sm text-gray-600">Play sound with notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Reminders</p>
                <p className="text-sm text-gray-600">Send daily summary via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-green-100 rounded-xl">
              <User className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Profile</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                defaultValue="john@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                defaultValue="+1 234-567-8901"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Palette className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Appearance</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 border-2 border-emerald-500 rounded-xl bg-emerald-50 text-emerald-700 font-medium">
                  Light
                </button>
                <button className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  Dark
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Accent Color</label>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-full border-2 border-emerald-600 cursor-pointer"></div>
                <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-transparent hover:border-blue-600 cursor-pointer"></div>
                <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-transparent hover:border-purple-600 cursor-pointer"></div>
                <div className="w-8 h-8 bg-pink-500 rounded-full border-2 border-transparent hover:border-pink-600 cursor-pointer"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-red-100 rounded-xl">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Security</h2>
          </div>
          
          <div className="space-y-4">
            <button className="w-full text-left p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <p className="font-medium text-gray-900">Change Password</p>
              <p className="text-sm text-gray-600">Update your account password</p>
            </button>
            <button className="w-full text-left p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </button>
            <button className="w-full text-left p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <p className="font-medium text-gray-900">Privacy Settings</p>
              <p className="text-sm text-gray-600">Manage your data and privacy</p>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105 font-medium">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;