import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NotifType = 'critical' | 'admitted' | 'status' | 'info';

export interface AppNotification {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  timestamp: number;
  read: boolean;
  patientId?: string;
}

interface NotificationsState {
  list: AppNotification[];
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: { list: [] } as NotificationsState,
  reducers: {
    addNotification(state, action: PayloadAction<Omit<AppNotification, 'id' | 'timestamp' | 'read'>>) {
      state.list.unshift({
        ...action.payload,
        id: `notif-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        timestamp: Date.now(),
        read: false,
      });
      if (state.list.length > 50) state.list = state.list.slice(0, 50);
    },
    markAllRead(state) {
      state.list.forEach(n => { n.read = true; });
    },
    markRead(state, action: PayloadAction<string>) {
      const n = state.list.find(n => n.id === action.payload);
      if (n) n.read = true;
    },
    clearAll(state) {
      state.list = [];
    },
  },
});

export const { addNotification, markAllRead, markRead, clearAll } = notificationsSlice.actions;
export default notificationsSlice.reducer;