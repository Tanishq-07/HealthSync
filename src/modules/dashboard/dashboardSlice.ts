import { createSlice } from '@reduxjs/toolkit';
import { DashboardStats } from '../../types';
import { mockStats } from '../../utils/mockData';

interface DashboardState { stats: DashboardStats; loading: boolean }

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: { stats: mockStats, loading: false } as DashboardState,
  reducers: {},
});

export default dashboardSlice.reducer;