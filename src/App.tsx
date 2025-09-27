import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardContent from './components/DashboardContent';
import RemindersPage from './components/pages/RemindersPage';
import MedicinesPage from './components/pages/MedicinesPage';
import PatientsPage from './components/pages/PatientsPage';
import SettingsPage from './components/pages/SettingsPage';
import DevicePage from './components/pages/DevicePage';
import NotificationBanner from './components/NotificationBanner';
import { useNotifications } from './hooks/useNotifications';

export type ActiveTab = 'dashboard' | 'reminders' | 'medicines' | 'patients' | 'settings' | 'device';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [reminders, setReminders] = useState([
    { id: '1', name: 'Paracetamol', dosage: '500mg', time: '8:00 AM', taken: false },
    { id: '2', name: 'Vitamin D', dosage: 'Capsule', time: '1:00 PM', taken: false },
    { id: '3', name: 'Antibiotic', dosage: '(Amoxicillin)', time: '7:30 PM', taken: false },
  ]);

  // Initialize notification system
  useNotifications(reminders);

  const handleMarkTaken = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id ? { ...reminder, taken: true } : reminder
      )
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent reminders={reminders} onMarkTaken={handleMarkTaken} />;
      case 'reminders':
        return <RemindersPage reminders={reminders} onMarkTaken={handleMarkTaken} />;
      case 'medicines':
        return <MedicinesPage />;
      case 'patients':
        return <PatientsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'device':
        return <DevicePage />;
      default:
        return <DashboardContent reminders={reminders} onMarkTaken={handleMarkTaken} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
      
      <NotificationBanner 
        reminders={reminders} 
        onMarkTaken={handleMarkTaken} 
      />
    </div>
  );
}

export default App;