import { NameSpace } from '../../const';
import { fetchOffer, fetchNearby, fetchReviews, pushNewReviews, pushIsFavoriteAction } from '../api-actions';
import { createSlice } from '@reduxjs/toolkit';
import { OfferPreview } from '../../types';
import { OfferFull } from '../../types';
import { Review } from '../../types';
import { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  offerFull: OfferFull | null;
  offersNearby: OfferPreview[];
  reviews: Review[];
}


const initialState: InitialState = {
  offerFull: null,
  offersNearby: [],
  reviews: [],
};




export const offerData = createSlice({
  name: NameSpace.OfferPreview,
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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffer.pending, (state) => {
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offerFull = action.payload;
      })
      .addCase(fetchOffer.rejected, (state) => {
      })

      .addCase(fetchNearby.pending, (state) => {
      })
      .addCase(fetchNearby.fulfilled, (state, action) => {
        state.offersNearby = action.payload.slice(0, 3);
      })
      .addCase(fetchNearby.rejected, (state) => {
      })

      .addCase(fetchReviews.pending, (state) => {
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state) => {
      })

      .addCase(pushNewReviews.pending, (state) => {
      })

      .addCase(pushNewReviews.fulfilled, (state, action) => {
      })

      .addCase(pushNewReviews.rejected, (state) => {
      })

      .addCase(pushIsFavoriteAction.pending, (state) => {
      })

      .addCase(pushIsFavoriteAction.fulfilled, (state, action) => {
      })

      .addCase(pushIsFavoriteAction.rejected, (state) => {
      });
    }
  }
);


export const { clearOffer, clearOfferNearBy, clearReviews } = offerData.actions;