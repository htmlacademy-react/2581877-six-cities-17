import { NameSpace } from '../../const';
import { fetchOffersList } from '../api-actions';
import { createSlice } from '@reduxjs/toolkit';
import { OfferFull, OfferPreview } from '../../types';
import { OfferCity } from '../../types';
import { SortBy } from '../../const';
import { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  currentCity: OfferCity;
  offersList: OfferPreview[];
  sortBy: SortBy;
}


const initialState: InitialState = {
  currentCity: 'Paris',
  offersList: [],
  sortBy: SortBy.Popular,
};

export const offersListData = createSlice({
  name: NameSpace.OfferPreview,
  initialState,
  reducers: {
    sortByAction: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },

    filterByCity: (state, action: PayloadAction<OfferCity>) => {
      state.currentCity = action.payload;
    },
    updateFavorites: (state, action: PayloadAction<OfferFull>) => {
      const offer = action.payload;
      const index = state.offersList.findIndex((element) => element.id === offer.id);
      if(index > -1) {
        state.offersList[index].isFavorite = offer.isFavorite;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersList.fulfilled, (state, action) => {
        state.offersList = action.payload;
      });
  }
});

export const { sortByAction, filterByCity, updateFavorites } = offersListData.actions;
