import { NameSpace } from '../../const';
import { fetchOffersList } from '../api-actions';
import { createSlice } from '@reduxjs/toolkit';
import { OfferPreview } from '../../types';
import { OfferCity } from '../../types';
import { SortOptions } from '../../const';
import { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  currentCity: OfferCity;
  offersList: OfferPreview[];
  sortBy: SortOptions;
}


const initialState: InitialState = {
  currentCity: 'Paris',
  offersList: [],
  sortBy: SortOptions.Popular,
};

export const offersListData = createSlice({
  name: NameSpace.OfferPreview,
  initialState,
  reducers: {
    sortByAction: (state, action: PayloadAction<SortOptions>) => {
      state.sortBy = action.payload;
    },

    filterByCity: (state, action: PayloadAction<OfferCity>) => {
      state.currentCity = action.payload;
    },
    updateFavorites: (state, action: PayloadAction<{offerId:string; isFavorite: boolean}>) => {
      const {offerId, isFavorite} = action.payload;
      const index = state.offersList.findIndex((element) => element.id === offerId);
      if(index > -1) {
        state.offersList[index].isFavorite = isFavorite;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersList.fulfilled, (state, action) => {
        state.offersList = action.payload;
      });
  }
});

export const { sortByAction, filterByCity, updateFavorites } = offersListData.actions;
