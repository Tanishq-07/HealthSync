import { Dispatch } from '@reduxjs/toolkit';
import { addNotification, NotifType } from '../modules/notifications/notificationsSlice';

let _dispatch: Dispatch | null = null;
export const setNotificationDispatch = (dispatch: Dispatch) => {
  _dispatch = dispatch;
};

const dispatchToStore = (type: NotifType, title: string, body: string, patientId?: string) => {
  if (_dispatch) {
    _dispatch(addNotification({ type, title, body, patientId }));
  }
};

export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!('serviceWorker' in navigator)) return null;
  try {
    const reg = await navigator.serviceWorker.register('/sw.js');
    await navigator.serviceWorker.ready;
    return reg;
  } catch (err) {
    console.error('[SW] Registration failed:', err);
    return null;
  }
};

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!('Notification' in window)) return 'denied';
  if (Notification.permission === 'granted') return 'granted';
  return await Notification.requestPermission();
};

export const showLocalNotification = async (
  title: string,
  options: NotificationOptions & { _type?: NotifType; _patientId?: string } = {}
): Promise<void> => {
  const { _type = 'info', _patientId, ...notifOptions } = options;

  dispatchToStore(_type, title, notifOptions.body as string ?? '', _patientId);

  const permission = await requestNotificationPermission();
  if (permission !== 'granted') return;

  const finalOptions: NotificationOptions = { icon: '/vite.svg', ...notifOptions };

  try {
    if ('serviceWorker' in navigator) {
      const reg = await Promise.race([
        navigator.serviceWorker.ready,
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 2000)),
      ]);
      if (reg && 'showNotification' in (reg as ServiceWorkerRegistration)) {
        await (reg as ServiceWorkerRegistration).showNotification(title, finalOptions);
        return;
      }
    }
  } catch (err) {
    console.error('[SW] showNotification failed, using fallback:', err);
  }

  new Notification(title, finalOptions);
};

export const notifyPatientCritical = (patientName: string, patientId?: string) =>
  showLocalNotification('⚠️ Critical Alert', {
    body: `${patientName}'s status changed to Critical. Immediate attention required.`,
    tag: 'patient-critical',
    requireInteraction: true,
    _type: 'critical',
    _patientId: patientId,
  });

export const notifyPatientAdmitted = (patientName: string, patientId?: string) =>
  showLocalNotification('New Active Patient', {
    body: `${patientName} has been marked as Active.`,
    tag: 'patient-admitted',
    _type: 'admitted',
    _patientId: patientId,
  });