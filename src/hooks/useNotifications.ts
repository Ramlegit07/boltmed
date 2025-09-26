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
    const currentTime = now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    reminders.forEach(reminder => {
      const reminderTime = convertTo24Hour(reminder.time);
      
      // Check if it's time to take medicine
      if (currentTime === reminderTime && !reminder.taken) {
        showNotification(
          '💊 Medicine Reminder',
          `Time to take ${reminder.name} ${reminder.dosage}`,
          '💊'
        );
      }
      
      // Check if medicine was missed (15 minutes past due)
      const reminderDate = new Date();
      const [hours, minutes] = reminderTime.split(':').map(Number);
      reminderDate.setHours(hours, minutes + 15, 0, 0);
      
      if (now >= reminderDate && !reminder.taken) {
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

    // Check reminders every minute
    const interval = setInterval(checkReminders, 60000);

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