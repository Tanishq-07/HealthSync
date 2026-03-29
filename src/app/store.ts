import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../modules/auth/authSlice';
import dashboardReducer from '../modules/dashboard/dashboardSlice';
import analyticsReducer from '../modules/analytics/analyticsSlice';
import patientsReducer from '../modules/patients/patientsSlice';
import notificationsReducer from '../modules/notifications/notificationsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    analytics: analyticsReducer,
    patients: patientsReducer,
    notifications: notificationsReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;