import { NewReviewStatus } from '../../const';
import { makeFakeOfferFull, makeFakeOfferPreview, makeFakeOfferReview } from '../../utils/mocks';
import { fetchOffer } from '../api-actions';
import { clearOffer, clearOfferNearBy, clearReviews, offerData, updateFavorites } from './offer-data';

describe('OfferData slice', () => {

  it('should return initial state with empty action', () => {
    const emptyType = { 'type': '' };
    const expectedState = {
      offerFull: null,
      hasFetchError: false,
      offersNearby: [],
      reviews: [],
      newReviewStatus: NewReviewStatus.Empty,
    };

    const result = offerData.reducer(undefined, emptyType);

    expect(result).toEqual(expectedState);
  });


  it('should clear offerFull with clearOffer action', () => {
    const initialState = {
      offerFull: makeFakeOfferFull(),
      hasFetchError: false,
      offersNearby: [],
      reviews: [],
      newReviewStatus: NewReviewStatus.Empty,
    };

    const expectedState = {
      offerFull: null,
      hasFetchError: false,
      offersNearby: [],
      reviews: [],
      newReviewStatus: NewReviewStatus.Empty,
    };
    const result = offerData.reducer(initialState, clearOffer);

    expect(result).toEqual(expectedState);
  });

  it('should clear offersNearby with action clearOfferNearBy', () => {
    const initialState = {
      offerFull: null,
      hasFetchError: false,
      offersNearby: [makeFakeOfferPreview()],
      reviews: [],
      newReviewStatus: NewReviewStatus.Empty,
    };

    const expectedState = {
      offerFull: null,
      hasFetchError: false,
      offersNearby: [],
      reviews: [],
      newReviewStatus: NewReviewStatus.Empty,
    };
    const result = offerData.reducer(initialState, clearOfferNearBy);

    expect(result).toEqual(expectedState);
  });

  it('should clear reviews with clearReviews action', () => {
    const initialState = {
      offerFull: null,
      hasFetchError: false,
      offersNearby: [],
      reviews: [makeFakeOfferReview()],
      newReviewStatus: NewReviewStatus.Empty,
    };

    const expectedState = {
      offerFull: null,
      hasFetchError: false,
      offersNearby: [],
      reviews: [],
      newReviewStatus: NewReviewStatus.Empty,
    };
    const result = offerData.reducer(initialState, clearReviews);

    expect(result).toEqual(expectedState);
  });

  it('should set isFavcorite to true witch updateFavorites action', () => {
    const fakeId = 'some-fake-uuid';

    const offerFull = makeFakeOfferFull();

    const unfavoriteOfferFull = { ...offerFull };
    unfavoriteOfferFull.id = fakeId;
    unfavoriteOfferFull.isFavorite = false;

    const favoriteOfferFull = { ...offerFull };
    favoriteOfferFull.id = fakeId;
    favoriteOfferFull.isFavorite = true;

    const offerPreview = makeFakeOfferPreview();

    const unfavoriteOfferPreview = { ...offerPreview };
    unfavoriteOfferPreview.id = fakeId;
    unfavoriteOfferPreview.isFavorite = false;

    const favoriteOfferPreview = { ...offerPreview };
    favoriteOfferPreview.id = fakeId;
    favoriteOfferPreview.isFavorite = true;

    const initialState = {
      offerFull: unfavoriteOfferFull,
      hasFetchError: false,
      offersNearby: [unfavoriteOfferPreview],
      reviews: [],
      newReviewStatus: NewReviewStatus.Empty,
    };

    const expectedState = {
      offerFull: favoriteOfferFull,
      hasFetchError: false,
      offersNearby: [favoriteOfferPreview],
      reviews: [],
      newReviewStatus: NewReviewStatus.Empty,
    };
    const result = offerData.reducer(initialState, updateFavorites({ offerId: fakeId, isFavorite: true }));

    expect(result).toEqual(expectedState);

  });

  it('should set isFavcorite to false witch updateFavorites action', () => {
    const fakeId = 'some-fake-uuid';

    const offerFull = makeFakeOfferFull();

    const unfavoriteOfferFull = { ...offerFull };
    unfavoriteOfferFull.id = fakeId;
    unfavoriteOfferFull.isFavorite = false;

    const favoriteOfferFull = { ...offerFull };
    favoriteOfferFull.id = fakeId;
    favoriteOfferFull.isFavorite = true;

    const offerPreview = makeFakeOfferPreview();

    const unfavoriteOfferPreview = { ...offerPreview };
    unfavoriteOfferPreview.id = fakeId;
    unfavoriteOfferPreview.isFavorite = false;

    const favoriteOfferPreview = { ...offerPreview };
    favoriteOfferPreview.id = fakeId;
    favoriteOfferPreview.isFavorite = true;

    const initialState = {
      offerFull: favoriteOfferFull,
      hasFetchError: false,
      offersNearby: [favoriteOfferPreview],
      reviews: [],
      newReviewStatus: NewReviewStatus.Empty,
    };

    const expectedState = {
      offerFull: unfavoriteOfferFull,
      hasFetchError: false,
      offersNearby: [unfavoriteOfferPreview],
      reviews: [],
      newReviewStatus: NewReviewStatus.Empty,
    };
    const result = offerData.reducer(initialState, updateFavorites({ offerId: fakeId, isFavorite: false }));

    expect(result).toEqual(expectedState);

  });

  it('should set hasFetchError to false with fetchOffer.pending action', () => {
    const offer = makeFakeOfferFull();

    const initialState = {
      offerFull: offer,
      hasFetchError: true,
      offersNearby: [],
      reviews: [],
      newReviewStatus: NewReviewStatus.Empty,
    };
    const expectedState = {
      offerFull: offer,
      hasFetchError: false,
      offersNearby: [],
      reviews: [],
      newReviewStatus: NewReviewStatus.Empty,
    };
    const result = offerData.reducer(initialState, fetchOffer.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set offerFull with fetchOffer.fullfield action', () => {
    const offerFull = makeFakeOfferFull();

    const expectedState = {
      offerFull: offerFull,
      hasFetchError: false,
      offersNearby: [],
      reviews: [],
      newReviewStatus: NewReviewStatus.Empty,
    };
    const result = offerData.reducer(undefined, fetchOffer.fulfilled(
      offerFull, '', { id: '' }
    ));

    expect(result).toEqual(expectedState);
  });

  it('should set hasFetchError to true with fetchOffer.rejected action', () => {

    const expectedState = {
      offerFull: null,
      hasFetchError: true,
      offersNearby: [],
      reviews: [],
      newReviewStatus: NewReviewStatus.Empty,
    };
    const result = offerData.reducer(undefined, fetchOffer.rejected);

    expect(result).toEqual(expectedState);
  });

});
