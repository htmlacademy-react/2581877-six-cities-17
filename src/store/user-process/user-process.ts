import { NameSpace } from '../../const';
import { fetchAuthorizationStatus, logInAction, logOutAction } from '../api-actions';
import { createSlice } from '@reduxjs/toolkit';

import { AuthorizationStatus } from '../../const';
import { User } from '../../types';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
}


const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};



export const offersListData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAuthorizationStatus.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(fetchAuthorizationStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })

      .addCase(logInAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(logInAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      })

      .addCase(logOutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      });
  }
});


