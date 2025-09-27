import React from 'react';
import TodaysReminders from './cards/TodaysReminders';
import UpcomingSchedules from './cards/UpcomingSchedules';
import AdherenceRate from './cards/AdherenceRate';
import RecentActivity from './cards/RecentActivity';
import NextDoseTimer from './NextDoseTimer';
import DeviceStatus from './DeviceStatus';

interface DashboardContentProps {
  reminders: Array<{
    id: string;
    name: string;
    dosage: string;
    time: string;
    taken: boolean;
  }>;
  onMarkTaken: (id: string) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ reminders, onMarkTaken }) => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <TodaysReminders reminders={reminders} onMarkTaken={onMarkTaken} />
        </div>
        <div>
          <NextDoseTimer reminders={reminders} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingSchedules />
        <AdherenceRate />
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>
      
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Device Status</h2>
        <DeviceStatus />
      </div>
    </div>
  );
};

export default DashboardContent;