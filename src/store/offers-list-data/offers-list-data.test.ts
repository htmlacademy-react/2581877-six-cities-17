import { makeFakeOfferPreview } from '../../utils/mocks';
import { fetchOffersList } from '../api-actions';
import { filterByCity, offersListData, sortByAction, updateFavorites } from './offers-list-data';
import { OfferCity } from '../../types';
import { SortBy } from '../../const';

describe('OfferDataList slice', () => {


  it('should return initial state with empty action', () => {
    const emptyType = { 'type': '' };

    const cityName: OfferCity = 'Paris';
    const expectedState = {
      currentCity: cityName,
      offersList: [],
      sortBy: SortBy.Popular,
    };

    const result = offersListData.reducer(undefined, emptyType);

    expect(result).toEqual(expectedState);
  });

  it('should set  currentCity to "Amsterdam" initial state with filterByCity action', () => {
    const cityName: OfferCity = 'Amsterdam';
    const expectedState = {
      currentCity: cityName,
      offersList: [],
      sortBy: SortBy.Popular,
    };

    const result = offersListData.reducer(undefined, filterByCity(cityName));

    expect(result).toEqual(expectedState);
  });


  it('should set  sortBy to SortBy.TopRrated initial state with sortByAction action', () => {
    const cityName: OfferCity = 'Paris';
    const expectedState = {
      currentCity: cityName,
      offersList: [],
      sortBy: SortBy.TopRrated,
    };

    const result = offersListData.reducer(undefined, sortByAction(SortBy.TopRrated));

    expect(result).toEqual(expectedState);
  });


  it('should set isFavcorite to true witch updateFavorites action', () => {
    const cityName: OfferCity = 'Paris';
    const fakeId = 'some-fake-uuid';

    const offerPreview = makeFakeOfferPreview();

    const unfavoriteOfferPreview = { ...offerPreview };
    unfavoriteOfferPreview.id = fakeId;
    unfavoriteOfferPreview.isFavorite = false;

    const favoriteOfferPreview = { ...offerPreview };
    favoriteOfferPreview.id = fakeId;
    favoriteOfferPreview.isFavorite = true;

    const initialState = {
      currentCity: cityName,
      offersList: [unfavoriteOfferPreview],
      sortBy: SortBy.Popular,
    };
    const expectedState = {
      currentCity: cityName,
      offersList: [favoriteOfferPreview],
      sortBy: SortBy.Popular,
    };

    const result = offersListData.reducer(initialState, updateFavorites({ offerId: fakeId, isFavorite: true }));

    expect(result).toEqual(expectedState);
  });

  it('should set isFavcorite to false witch updateFavorites action', () => {
    const cityName: OfferCity = 'Paris';
    const fakeId = 'some-fake-uuid';

    const offerPreview = makeFakeOfferPreview();

    const unfavoriteOfferPreview = { ...offerPreview };
    unfavoriteOfferPreview.id = fakeId;
    unfavoriteOfferPreview.isFavorite = false;

    const favoriteOfferPreview = { ...offerPreview };
    favoriteOfferPreview.id = fakeId;
    favoriteOfferPreview.isFavorite = true;

    const initialState = {
      currentCity: cityName,
      offersList: [favoriteOfferPreview],
      sortBy: SortBy.Popular,
    };
    const expectedState = {
      currentCity: cityName,
      offersList: [unfavoriteOfferPreview],
      sortBy: SortBy.Popular,
    };

    const result = offersListData.reducer(initialState, updateFavorites({ offerId: fakeId, isFavorite: false }));

    expect(result).toEqual(expectedState);
  });


  it('should fill offersList with fetchOffersList.fullfield action', () => {
    const cityName: OfferCity = 'Paris';
    const offerPreviewList = [makeFakeOfferPreview()];

    const expectedState = {
      currentCity: cityName,
      offersList: offerPreviewList,
      sortBy: SortBy.Popular,
    };

    const result = offersListData.reducer(undefined, fetchOffersList.fulfilled(offerPreviewList, '', undefined));

    expect(result).toEqual(expectedState);
  });

});
