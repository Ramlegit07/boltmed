import { useEffect, useCallback } from 'react';

export interface MedicineReminder {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

export const useNotifications = (reminders: MedicineReminder[]) => {
  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }, []);

  const playNotificationSound = useCallback(() => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  }, []);

  const showNotification = useCallback((title: string, body: string, icon?: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title, {
        body,
        icon: icon || '💊',
        badge: '💊',
        tag: 'medicine-reminder',
        requireInteraction: true,
        actions: [
          { action: 'taken', title: 'Mark as Taken' },
          { action: 'snooze', title: 'Snooze 5 min' }
        ]
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      playNotificationSound();
      
      return notification;
    }
    return null;
  }, [playNotificationSound]);

  const checkReminders = useCallback(() => {
    const now = new Date();

    reminders.forEach(reminder => {
      if (reminder.taken) return;
      
      const reminderTime = convertTo24Hour(reminder.time);
      const [hours, minutes] = reminderTime.split(':').map(Number);
      
      // Create reminder date for today
      const reminderDate = new Date();
      reminderDate.setHours(hours, minutes, 0, 0);
      
      // Create alert time (10 minutes before reminder)
      const alertTime = new Date(reminderDate.getTime() - 10 * 60 * 1000);
      
      // Check if it's time to send alert (10 minutes before)
      const timeDiff = Math.abs(now.getTime() - alertTime.getTime());
      if (timeDiff <= 30000) { // Within 30 seconds of alert time
        showNotification(
          '⏰ Medicine Alert',
          `Take ${reminder.name} ${reminder.dosage} in 10 minutes (at ${reminder.time})`,
          '💊'
        );
      }
      
      // Check if medicine was missed (15 minutes past the original time)
      const missedTime = new Date(reminderDate.getTime() + 15 * 60 * 1000);
      
      if (now >= missedTime) {
        showNotification(
          '⚠️ Missed Medicine Alert',
          `You missed taking ${reminder.name} ${reminder.dosage} at ${reminder.time}`,
          '⚠️'
        );
      }
    });
  }, [reminders, showNotification]);

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
    // Request notification permission on mount
    requestNotificationPermission();

    // Check reminders every 30 seconds for more precise timing
    const interval = setInterval(checkReminders, 30000);

    // Also check immediately
    checkReminders();

    return () => clearInterval(interval);
  }, [checkReminders, requestNotificationPermission]);

  return {
    requestNotificationPermission,
    showNotification,
    playNotificationSound
  };
};