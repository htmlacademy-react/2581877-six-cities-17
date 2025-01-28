import {NameSpace, NewReviewStatus} from '../../const';
import { OfferFull, OfferPreview, Review } from '../../types';
import { State } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const getOffer = (state: Pick<State, NameSpace.OfferFull>): OfferFull | null => state[NameSpace.OfferFull].offerFull;
export const getOfferNearBy = (state: Pick<State, NameSpace.OfferFull>): OfferPreview[] => state[NameSpace.OfferFull].offersNearby;
export const hasOfferFetchError = (state: Pick<State, NameSpace.OfferFull>): boolean => state[NameSpace.OfferFull].hasFetchError;
export const getOfferReviews = (state: Pick<State, NameSpace.OfferFull>): Review[] => state[NameSpace.OfferFull].reviews;
export const getNewReviewStatus = (state: Pick<State, NameSpace.OfferFull>): NewReviewStatus => state[NameSpace.OfferFull].newReviewStatus;


export const getOfferReviewsSorted = createSelector(
  [getOfferReviews],
  (offerReviews) => {
    const offerReviewsSorted = [...offerReviews];
    return offerReviewsSorted.slice(0, 10).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
);

