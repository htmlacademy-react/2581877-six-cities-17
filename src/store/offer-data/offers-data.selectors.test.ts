import { NameSpace, NewReviewStatus } from '../../const';
import { makeFakeOfferFull, makeFakeOfferPreview, makeFakeOfferReview } from '../../utils/mocks';
import { getNewReviewStatus, getOffer, getOfferNearBy, getOfferReviews, getOfferReviewsSorted, hasOfferFetchError } from './selectors';

describe('OffersData selectoers', () => {

  it('should return offerFull from state', () => {
    const fakeOfferFull = makeFakeOfferFull();
    const state = {
      [NameSpace.OfferFull]: {
        offerFull: fakeOfferFull,
        hasFetchError: false,
        offersNearby: [],
        reviews: [],
        newReviewStatus: NewReviewStatus.Empty,
      }
    };

    const result = getOffer(state);
    expect(result).toEqual(fakeOfferFull);

  });

  it('should return offersNearby from state', () => {
    const fakeOffersPreview = [makeFakeOfferPreview()];
    const state = {
      [NameSpace.OfferFull]: {
        offerFull: null,
        hasFetchError: false,
        offersNearby: fakeOffersPreview,
        reviews: [],
        newReviewStatus: NewReviewStatus.Empty,
      }
    };

    const result = getOfferNearBy(state);
    expect(result).toEqual(fakeOffersPreview);

  });

  it('should return hasFetchError from state', () => {
    const state = {
      [NameSpace.OfferFull]: {
        offerFull: null,
        hasFetchError: true,
        offersNearby: [],
        reviews: [],
        newReviewStatus: NewReviewStatus.Empty,
      }
    };

    const result = hasOfferFetchError(state);
    expect(result).toBe(true);

  });

  it('should return reviews from state', () => {
    const fakeOffersReview = [makeFakeOfferReview()];
    const state = {
      [NameSpace.OfferFull]: {
        offerFull: null,
        hasFetchError: false,
        offersNearby: [],
        reviews: fakeOffersReview,
        newReviewStatus: NewReviewStatus.Empty,
      }
    };

    const result = getOfferReviews(state);
    expect(result).toEqual(fakeOffersReview);

  });

  it('should return newReviewStatus from state', () => {
    const newReviewStatus = NewReviewStatus.Pending;
    const state = {
      [NameSpace.OfferFull]: {
        offerFull: null,
        hasFetchError: false,
        offersNearby: [],
        reviews: [],
        newReviewStatus: newReviewStatus,
      }
    };

    const result = getNewReviewStatus(state);
    expect(result).toBe(newReviewStatus);

  });

  it('should return reviews sorted from late to early from state', () => {
    const fakeErlyReview = makeFakeOfferReview();
    fakeErlyReview.date = new Date(2000);
    const fakeLateReview = makeFakeOfferReview();
    fakeLateReview.date = new Date(2020);

    const reviewList = [fakeErlyReview, fakeLateReview];
    const expectedReviewList = [fakeLateReview, fakeErlyReview];

    const state = {
      [NameSpace.OfferFull]: {
        offerFull: null,
        hasFetchError: false,
        offersNearby: [],
        reviews: reviewList,
        newReviewStatus: NewReviewStatus.Empty,
      }
    };

    const result = getOfferReviewsSorted(state);
    expect(result).toEqual(expectedReviewList);

  });


});

