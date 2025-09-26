import React from 'react';
import TodaysReminders from './cards/TodaysReminders';
import UpcomingSchedules from './cards/UpcomingSchedules';
import AdherenceRate from './cards/AdherenceRate';
import RecentActivity from './cards/RecentActivity';
import NextDoseTimer from './NextDoseTimer';

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
        <RecentActivity />
      </div>
    </div>
  );
};

export default DashboardContent;