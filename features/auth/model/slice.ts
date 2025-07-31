import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from './types';
import { Connector } from 'wagmi';

const initialState: AuthState = {
  user: null,
  connector: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    connectWalletRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    connectWalletSuccess: (
      state,
      action: PayloadAction<{ user: User; connector: Connector }>
    ) => {
      state.user = action.payload.user;
      state.connector = action.payload.connector as typeof state.connector;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    connectWalletFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.user = null;
      state.connector = null;
      state.isAuthenticated = false;
    },
    disconnectWallet: (state) => {
      state.user = null;
      state.connector = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  connectWalletRequest,
  connectWalletSuccess,
  connectWalletFailure,
  disconnectWallet,
} = authSlice.actions;

export default authSlice.reducer;
