import {NameSpace, SortBy} from '../../const';
import { OfferCity, OfferPreview } from '../../types';
import { State } from '../../types';


export const getOffersList = (state: Pick<State, NameSpace.OfferPreview>): OfferPreview[] => state[NameSpace.OfferPreview].offersList;
export const getSortOption = (state: Pick<State, NameSpace.OfferPreview>): SortBy => state[NameSpace.OfferPreview].sortBy;
export const getCurrentCity = (state: Pick<State, NameSpace.OfferPreview>): OfferCity => state[NameSpace.OfferPreview].currentCity;
