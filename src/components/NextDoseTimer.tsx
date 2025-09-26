import React, { useState, useEffect } from 'react';
import { Clock, Pill } from 'lucide-react';

interface NextDoseTimerProps {
  reminders: Array<{
    id: string;
    name: string;
    dosage: string;
    time: string;
    taken: boolean;
  }>;
}

const NextDoseTimer: React.FC<NextDoseTimerProps> = ({ reminders }) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    nextMedicine: string;
    nextTime: string;
  } | null>(null);

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
    const calculateNextDose = () => {
      const now = new Date();
      const currentTime = now.getTime();
      
      // Find the next upcoming reminder
      const upcomingReminders = reminders
        .filter(reminder => !reminder.taken)
        .map(reminder => {
          const reminderTime = convertTo24Hour(reminder.time);
          const [hours, minutes] = reminderTime.split(':').map(Number);
          
          const reminderDate = new Date();
          reminderDate.setHours(hours, minutes, 0, 0);
          
          // If the time has passed today, set it for tomorrow
          if (reminderDate.getTime() <= currentTime) {
            reminderDate.setDate(reminderDate.getDate() + 1);
          }
          
          return {
            ...reminder,
            nextTime: reminderDate.getTime(),
            displayTime: reminder.time
          };
        })
        .sort((a, b) => a.nextTime - b.nextTime);

      if (upcomingReminders.length > 0) {
        const nextReminder = upcomingReminders[0];
        const timeDiff = nextReminder.nextTime - currentTime;
        
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        setTimeLeft({
          hours,
          minutes,
          seconds,
          nextMedicine: `${nextReminder.name} ${nextReminder.dosage}`,
          nextTime: nextReminder.displayTime
        });
      } else {
        setTimeLeft(null);
      }
    };

    calculateNextDose();
    const interval = setInterval(calculateNextDose, 1000);

    return () => clearInterval(interval);
  }, [reminders]);

  if (!timeLeft) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-200/50 p-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-green-100 rounded-full">
            <Pill className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-green-800">All Done!</h3>
            <p className="text-sm text-green-600">No pending reminders</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-lg border border-blue-200/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Next Dose</h3>
        <div className="p-2 bg-blue-100 rounded-lg">
          <Clock className="h-5 w-5 text-blue-600" />
        </div>
      </div>
      
      <div className="text-center mb-4">
        <p className="text-sm text-gray-600 mb-2">Coming up:</p>
        <p className="font-bold text-gray-900 text-lg">{timeLeft.nextMedicine}</p>
        <p className="text-sm text-gray-500">Scheduled for {timeLeft.nextTime}</p>
      </div>
      
      <div className="flex justify-center space-x-4">
        <div className="text-center">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200/50 min-w-[60px]">
            <span className="text-2xl font-bold text-blue-600">{timeLeft.hours.toString().padStart(2, '0')}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Hours</p>
        </div>
        <div className="text-center">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200/50 min-w-[60px]">
            <span className="text-2xl font-bold text-indigo-600">{timeLeft.minutes.toString().padStart(2, '0')}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Minutes</p>
        </div>
        <div className="text-center">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200/50 min-w-[60px]">
            <span className="text-2xl font-bold text-purple-600">{timeLeft.seconds.toString().padStart(2, '0')}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Seconds</p>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-white/50 rounded-xl border border-white/50">
        <p className="text-xs text-center text-gray-600">
          {timeLeft.hours === 0 && timeLeft.minutes <= 15 ? (
            <span className="text-orange-600 font-medium">⚠️ Reminder coming soon!</span>
          ) : (
            "Stay consistent with your medication schedule"
          )}
        </p>
      </div>
    </div>
  );
};

export default NextDoseTimer;