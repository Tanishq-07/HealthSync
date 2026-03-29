import { useState, useEffect } from 'react';
import {
  registerServiceWorker,
  requestNotificationPermission,
  showLocalNotification,
  notifyPatientAdmitted,
  notifyPatientCritical,
} from '../utils/notificationService';

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );

  useEffect(() => {
    registerServiceWorker();
  }, []);

  const requestPermission = async () => {
    const result = await requestNotificationPermission();
    setPermission(result);
    if (result === 'granted') {
      showLocalNotification('HealthSync Notifications Enabled', {
        body: 'You will now receive patient and appointment alerts.',
      });
    }
    return result;
  };

  return {
    permission,
    requestPermission,
    showLocalNotification,
    notifyPatientAdmitted,
    notifyPatientCritical,
  };
};