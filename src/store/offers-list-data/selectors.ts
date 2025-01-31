import { NameSpace, SortOptions } from '../../const';
import { OfferCity, OfferPreview } from '../../types';
import { State } from '../../types';
import { createSelector } from 'reselect';

export const getOffersList = (state: Pick<State, NameSpace.OfferPreview>): OfferPreview[] => state[NameSpace.OfferPreview].offersList;
export const getSortOption = (state: Pick<State, NameSpace.OfferPreview>): SortOptions => state[NameSpace.OfferPreview].sortBy;
export const getCurrentCity = (state: Pick<State, NameSpace.OfferPreview>): OfferCity => state[NameSpace.OfferPreview].currentCity;
export const getFilteredAndSortedOffers = createSelector(
  [getOffersList, getCurrentCity, getSortOption],
  (offersList, currentCity, sortBy) => {

    const filteredOffers = offersList.filter((offer) => offer.city.name === currentCity);
    switch (sortBy) {
      case SortOptions.PriceHighToLow:
        return filteredOffers.sort((a, b) => b.price - a.price);
      case SortOptions.PriceLowToHigh:
        return filteredOffers.sort((a, b) => a.price - b.price);
      case SortOptions.TopRrated:
        return filteredOffers.sort((a, b) => b.rating - a.rating);
      default:
        return filteredOffers;

    }
  }
);
