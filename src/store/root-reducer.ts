import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import { offersListData } from './offers-list-data/offers-list-data';
import { offerData } from './offer-data/offer-data';


export const rootReducer = combineReducers({
  [NameSpace.OfferPreview]: offersListData.reducer,
  [NameSpace.OfferFull]: offerData.reducer,
  [NameSpace.User]: offerData.reducer,

});