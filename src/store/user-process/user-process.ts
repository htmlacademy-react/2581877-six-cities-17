import { NameSpace } from '../../const';
import { fetchAuthorizationStatus, fetchFavorites, logInAction, logOutAction } from '../api-actions';
import { createSlice } from '@reduxjs/toolkit';

import { AuthorizationStatus } from '../../const';
import { OfferPreview, User } from '../../types';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
  favorites: OfferPreview[];
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  favorites: []
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAuthorizationStatus.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(fetchAuthorizationStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
        state.favorites = [];
      })
      .addCase(logInAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(logInAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
        state.favorites = [];
      })
      .addCase(logOutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
        state.favorites = [];
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  }
});


