import React from 'react';
import { Search, Bell, CircleUser as UserCircle, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200 hover:shadow-md"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Medicine Reminder Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">Stay healthy, stay consistent</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200 group hover:shadow-md">
            <Search className="h-5 w-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
          </button>
          
          <button className="relative p-2 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200 group hover:shadow-md">
            <Bell className="h-5 w-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
          </button>
          
          <button className="p-1 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200 hover:shadow-md">
            <UserCircle className="h-8 w-8 text-gray-600 hover:text-gray-900 transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;