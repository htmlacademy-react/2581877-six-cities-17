import { NameSpace, SortOptions } from '../../const';
import { OfferCity } from '../../types';
import { makeFakeOfferPreview } from '../../utils/mocks';
import { getCurrentCity, getFilteredAndSortedOffers, getOffersList, getSortOption } from './selectors';

describe('OffersListData selectors', () => {

  it('should return offersList from state', () => {
    const offerCity: OfferCity = 'Paris';
    const fakeOffersList = [makeFakeOfferPreview()];
    const state = {
      [NameSpace.OfferPreview]: {
        currentCity: offerCity,
        offersList: fakeOffersList,
        sortBy: SortOptions.Popular,
      }
    };

    const result = getOffersList(state);
    expect(result).toEqual(fakeOffersList);

  });

  it('should return sortBy from state', () => {
    const offerCity: OfferCity = 'Paris';
    const sortBy = SortOptions.PriceLowToHigh;
    const state = {
      [NameSpace.OfferPreview]: {
        currentCity: offerCity,
        offersList: [],
        sortBy: sortBy,
      }
    };

    const result = getSortOption(state);
    expect(result).toBe(sortBy);

  });

  it('should return currentCity from state', () => {
    const offerCity: OfferCity = 'Cologne';
    const state = {
      [NameSpace.OfferPreview]: {
        currentCity: offerCity,
        offersList: [],
        sortBy: SortOptions.Popular,
      }
    };

    const result = getCurrentCity(state);
    expect(result).toBe(offerCity);

  });


  it('should return offersList sorted high to low from state', () => {
    const offerCity: OfferCity = 'Paris';
    const lowPriceOffer = makeFakeOfferPreview();
    lowPriceOffer.price = 666;
    const highPriceOffer = makeFakeOfferPreview();
    highPriceOffer.price = 777;

    const HighToLowOffersList = [highPriceOffer, lowPriceOffer];
    const LowToHighOffersList = [lowPriceOffer, highPriceOffer];

    const state = {
      [NameSpace.OfferPreview]: {
        currentCity: offerCity,
        offersList: LowToHighOffersList,
        sortBy: SortOptions.PriceHighToLow,
      }
    };
    const result = getFilteredAndSortedOffers(state);
    expect(result).toEqual(HighToLowOffersList);

  });

  it('should return offersList sorted low to high from state', () => {
    const offerCity: OfferCity = 'Paris';
    const lowPriceOffer = makeFakeOfferPreview();
    lowPriceOffer.price = 666;
    const highPriceOffer = makeFakeOfferPreview();
    highPriceOffer.price = 777;

    const HighToLowOffersList = [highPriceOffer, lowPriceOffer];
    const LowToHighOffersList = [lowPriceOffer, highPriceOffer];

    const state = {
      [NameSpace.OfferPreview]: {
        currentCity: offerCity,
        offersList: HighToLowOffersList,
        sortBy: SortOptions.PriceLowToHigh,
      }
    };
    const result = getFilteredAndSortedOffers(state);
    expect(result).toEqual(LowToHighOffersList);

  });

  it('should return offersList sorted by rating from state', () => {
    const offerCity: OfferCity = 'Paris';
    const lowRatedOffer = makeFakeOfferPreview();
    lowRatedOffer.rating = 1;
    const topRatedOffer = makeFakeOfferPreview();
    topRatedOffer.rating = 5;

    const lowRatesOffersList = [lowRatedOffer, topRatedOffer];
    const topRatesOffersList = [topRatedOffer, lowRatedOffer];

    const state = {
      [NameSpace.OfferPreview]: {
        currentCity: offerCity,
        offersList: lowRatesOffersList,
        sortBy: SortOptions.TopRrated,
      }
    };
    const result = getFilteredAndSortedOffers(state);
    expect(result).toEqual(topRatesOffersList);

  });

  it('should return offersList dafault sorted by popular from state', () => {
    const offerCity: OfferCity = 'Paris';
    const fakeOffersList = [makeFakeOfferPreview()];
    const state = {
      [NameSpace.OfferPreview]: {
        currentCity: offerCity,
        offersList: fakeOffersList,
        sortBy: SortOptions.Popular,
      }
    };

    const result = getFilteredAndSortedOffers(state);
    expect(result).toEqual(fakeOffersList);


  });
});

