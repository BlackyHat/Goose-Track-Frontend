import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {

  updateUserProfile,
  authRegisterThunk,
  authLoginThunk,
  authCurrentThunk,
  authLogoutThunk,
} from './user-operations';
import { userInitialState } from './user.init-state';
import { STATUS } from 'constants/status.constants';

const handlePending = state => {
  state.status = STATUS.loading;
};

const handleRejected = (state, action) => {
  state.status = STATUS.error;
  state.error = action.payload;
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  extraReducers: builder => {
    builder
      .addCase(authLoginThunk.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(authRegisterThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.status = STATUS.success;
      })
      .addCase(authLogoutThunk.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.status = STATUS.success;
      })
      .addCase(authCurrentThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.status = STATUS.success;
      })
    
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
         
        state.user = payload.user;
        state.status = STATUS.success;
    
      })
      .addCase(authCurrentThunk.pending, state => {
        state.isRefreshing = true;
      })

      .addCase(updateUserProfile.pending, handlePending)
      .addCase(authLoginThunk.pending, handlePending)
      .addCase(authLogoutThunk.pending, handlePending)
      .addCase(authRegisterThunk.pending, handlePending)
      .addCase(updateUserProfile.rejected, handleRejected)
      .addCase(authLoginThunk.rejected, handleRejected)
      .addCase(authLogoutThunk.rejected, handleRejected)
      .addCase(authRegisterThunk.rejected, handleRejected)
      .addCase(authCurrentThunk.rejected, state => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
      });
  },
});

const persistConfig = {
  key: 'user',
  storage,
  // whitelist: ['token'],
};

export const userReducer = persistReducer(persistConfig, userSlice.reducer);
