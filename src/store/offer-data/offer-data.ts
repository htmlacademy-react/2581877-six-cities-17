import { NameSpace } from '../../const';
import { fetchOffer, fetchNearby, fetchReviews, pushNewReviews } from '../api-actions';
import { createSlice } from '@reduxjs/toolkit';
import { OfferPreview } from '../../types';
import { OfferFull } from '../../types';
import { Review } from '../../types';
import { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  offerFull: OfferFull | null;
  hasFetchError: boolean;
  offersNearby: OfferPreview[];
  reviews: Review[];
}


const initialState: InitialState = {
  offerFull: null,
  hasFetchError: false,
  offersNearby: [],
  reviews: [],
};

export const offerData = createSlice({
  name: NameSpace.OfferFull,
  initialState,
  reducers: {
    clearOffer: (state) => {
      state.offerFull = null;
    },
    clearOfferNearBy: (state) => {
      state.offersNearby = [];
    },
    clearReviews: (state) => {
      state.reviews = [];
    },
    updateFavorites: (state, action: PayloadAction<OfferFull>) => {
      const offer = action.payload;
      const index = state.offersNearby.findIndex((element) => element.id === offer.id);
      if (index > -1) {
        state.offersNearby[index].isFavorite = offer.isFavorite;
      }
      if (state.offerFull) {
        state.offerFull.isFavorite = offer.isFavorite;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffer.pending, (state) => {
        state.hasFetchError = false;
      })

      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offerFull = action.payload;
      })

      .addCase(fetchOffer.rejected, (state) => {
        state.hasFetchError = true;
      })

      .addCase(fetchNearby.fulfilled, (state, action) => {
        state.offersNearby = action.payload.slice(0, 3);
      })

      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })

      .addCase(pushNewReviews.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });

  }
});


export const { clearOffer, clearOfferNearBy, clearReviews, updateFavorites } = offerData.actions;
