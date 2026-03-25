import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthUser } from '../../types';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  sessionChecked: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<AuthUser>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.sessionChecked = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.sessionChecked = true;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSessionChecked(state) {
      state.sessionChecked = true;
    },
  },
});

export const { loginSuccess, logout, setLoading, setSessionChecked } = authSlice.actions;
export default authSlice.reducer;