import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../modules/auth/authSlice';
import dashboardReducer from '../modules/dashboard/dashboardSlice';
import analyticsReducer from '../modules/analytics/analyticsSlice';
import patientsReducer from '../modules/patients/patientsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    analytics: analyticsReducer,
    patients: patientsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;