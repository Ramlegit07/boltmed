import React from 'react';
import { Home, Clock, Pill, Users, Settings, X } from 'lucide-react';
import { ActiveTab } from '../App';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', key: 'dashboard' as ActiveTab },
  { icon: Clock, label: 'Reminders', key: 'reminders' as ActiveTab },
  { icon: Pill, label: 'Medicines', key: 'medicines' as ActiveTab },
  { icon: Users, label: 'Patients', key: 'patients' as ActiveTab },
  { icon: Settings, label: 'Settings', key: 'settings' as ActiveTab },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeTab, onTabChange }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-gray-200/50 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200/50 bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="flex items-center space-x-3">
            <div className="text-2xl animate-pulse">💊</div>
            <span className="font-bold text-xl text-white">MedRemind</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-white/20 transition-colors text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.key;
              return (
                <li key={index}>
                  <button
                    onClick={() => {
                      onTabChange(item.key);
                      onClose();
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group
                      ${isActive 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg transform scale-105' 
                        : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-gray-900 hover:shadow-md'
                      }
                    `}
                  >
                    <IconComponent className={`h-5 w-5 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200/50">
            <p className="text-xs text-blue-600 font-medium">Health Tip</p>
            <p className="text-sm text-blue-800 mt-1">Take medicines with water for better absorption</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;