import {NameSpace} from '../../const';
import { OfferFull, OfferPreview, Review } from '../../types';
import { State } from '../../types';


export const getOffer = (state: Pick<State, NameSpace.OfferFull>): OfferFull | null => state[NameSpace.OfferFull].offerFull;
export const getOfferNearBy = (state: Pick<State, NameSpace.OfferFull>): OfferPreview[] => state[NameSpace.OfferFull].offersNearby;
export const getOfferReviews = (state: Pick<State, NameSpace.OfferFull>): Review[] => state[NameSpace.OfferFull].reviews;
export const hasOfferFetchError = (state: Pick<State, NameSpace.OfferFull>): boolean => state[NameSpace.OfferFull].hasFetchError;
