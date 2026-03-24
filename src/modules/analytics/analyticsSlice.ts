import { createSlice } from '@reduxjs/toolkit';

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: { loading: false },
  reducers: {},
});

export default analyticsSlice.reducer;