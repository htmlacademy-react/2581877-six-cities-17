import { makeFakeOfferFull, makeFakeOfferPreview, makeFakeOfferReview } from "../../utils/mocks";
import { clearOffer, clearOfferNearBy, clearReviews, offerData } from "./offer-data";

describe('OfferData slice', () => {

  it('should return initial state with empty action', () => {
    const emptyType = { 'type': '' };
    const expectedState = {
      offerFull: null,
      hasFetchError: false,
      offersNearby: [],
      reviews: [],
    };

    const result = offerData.reducer(expectedState, emptyType);

    expect(result).toEqual(expectedState);
  });


  it('should return initial state with empty action', () => {
    const emptyType = { 'type': '' };
    const expectedState = {
      offerFull: null,
      hasFetchError: false,
      offersNearby: [],
      reviews: [],
    };

    const result = offerData.reducer(expectedState, emptyType);

    expect(result).toEqual(expectedState);
  });


  it('should clear offerFull with clearOffer action', () => {
    const initialState = {
      offerFull: makeFakeOfferFull(),
      hasFetchError: false,
      offersNearby: [],
      reviews: [],
    };

    const expectedState = {
      offerFull: null,
      hasFetchError: false,
      offersNearby: [],
      reviews: [],
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
    };

    const expectedState = {
      offerFull: null,
      hasFetchError: false,
      offersNearby: [],
      reviews: [],
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
    };

    const expectedState = {
      offerFull: null,
      hasFetchError: false,
      offersNearby: [],
      reviews: [],
    };
    const result = offerData.reducer(initialState, clearReviews);

    expect(result).toEqual(expectedState);
  });  
});