import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: { loading: false },
  reducers: {},
});

export default dashboardSlice.reducer;