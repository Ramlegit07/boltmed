import React, { useState, useEffect } from 'react';
import { Bell, X, Check, Clock } from 'lucide-react';

interface NotificationBannerProps {
  reminders: Array<{
    id: string;
    name: string;
    dosage: string;
    time: string;
    taken: boolean;
  }>;
  onMarkTaken: (id: string) => void;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ reminders, onMarkTaken }) => {
  const [currentAlerts, setCurrentAlerts] = useState<Array<{
    id: string;
    type: 'due' | 'missed';
    reminder: any;
  }>>([]);

  const convertTo24Hour = (time12h: string): string => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
      hours = '00';
    }
    
    if (modifier === 'PM') {
      hours = String(parseInt(hours, 10) + 12);
    }
    
    return `${hours.padStart(2, '0')}:${minutes}`;
  };

  useEffect(() => {
    const checkAlerts = () => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      });

      const alerts: Array<{ id: string; type: 'due' | 'missed'; reminder: any }> = [];

      reminders.forEach(reminder => {
        if (reminder.taken) return;

        const reminderTime = convertTo24Hour(reminder.time);
        const reminderDate = new Date();
        const [hours, minutes] = reminderTime.split(':').map(Number);
        reminderDate.setHours(hours, minutes, 0, 0);

        // Check if it's time to take medicine (within 5 minutes)
        const timeDiff = now.getTime() - reminderDate.getTime();
        const minutesDiff = timeDiff / (1000 * 60);

        if (minutesDiff >= 0 && minutesDiff <= 5) {
          alerts.push({ id: reminder.id, type: 'due', reminder });
        } else if (minutesDiff > 15) {
          alerts.push({ id: reminder.id, type: 'missed', reminder });
        }
      });

      setCurrentAlerts(alerts);
    };

    checkAlerts();
    const interval = setInterval(checkAlerts, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [reminders]);

  const dismissAlert = (alertId: string) => {
    setCurrentAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  if (currentAlerts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {currentAlerts.map(alert => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg shadow-lg border-l-4 bg-white animate-slide-in ${
            alert.type === 'due' 
              ? 'border-emerald-500' 
              : 'border-red-500'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                alert.type === 'due' 
                  ? 'bg-emerald-100' 
                  : 'bg-red-100'
              }`}>
                {alert.type === 'due' ? (
                  <Bell className={`h-4 w-4 ${
                    alert.type === 'due' ? 'text-emerald-600' : 'text-red-600'
                  }`} />
                ) : (
                  <Clock className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div className="flex-1">
                <h4 className={`font-medium ${
                  alert.type === 'due' ? 'text-emerald-800' : 'text-red-800'
                }`}>
                  {alert.type === 'due' ? 'Medicine Due' : 'Medicine Missed'}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {alert.reminder.name} {alert.reminder.dosage}
                </p>
                <p className="text-xs text-gray-500">
                  Scheduled for {alert.reminder.time}
                </p>
              </div>
            </div>
            <button
              onClick={() => dismissAlert(alert.id)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          </div>
          
          <div className="flex space-x-2 mt-3">
            <button
              onClick={() => {
                onMarkTaken(alert.id);
                dismissAlert(alert.id);
              }}
              className="flex items-center space-x-1 px-3 py-1 bg-emerald-600 text-white text-xs font-medium rounded-full hover:bg-emerald-700 transition-colors"
            >
              <Check className="h-3 w-3" />
              <span>Mark Taken</span>
            </button>
            <button
              onClick={() => dismissAlert(alert.id)}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationBanner;