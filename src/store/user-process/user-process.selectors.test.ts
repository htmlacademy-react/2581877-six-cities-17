import { AuthorizationStatus, NameSpace } from '../../const';
import { CategorizedOffers } from '../../types';
import { makeFakeOfferPreview, makeFakeUser } from '../../utils/mocks';
import { getAuthorizationStatus, getCategorizedFavorites, getFavorites, getFavoritesCount, getUser } from './selectors';

describe('UserProcess selectors', () => {

  it('should return authorizationStatus from state', () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    const state = {
      [NameSpace.User]: {
        authorizationStatus: authorizationStatus,
        user: null,
        favorites: []
      }
    };

    const result = getAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);

  });

  it('should return user from state', () => {
    const fakeUser = makeFakeUser();
    const state = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUser,
        favorites: []
      }
    };

    const result = getUser(state);
    expect(result).toEqual(fakeUser);

  });

  it('should return favorites list from state', () => {
    const fakeFavoritesList = [makeFakeOfferPreview()];
    const state = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
        favorites: fakeFavoritesList
      }
    };

    const result = getFavorites(state);
    expect(result).toEqual(fakeFavoritesList);

  });

  it('should return facorites count from state', () => {
    const fakeFavoritesList = [makeFakeOfferPreview()];
    const state = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
        favorites: fakeFavoritesList
      }
    };

    const result = getFavoritesCount(state);
    expect(result).toBe(1);

  });

  it('should return categorized favorites list from state', () => {
    const parisOffer = makeFakeOfferPreview();
    parisOffer.city.name = 'Paris';

    const brusselsOffer = makeFakeOfferPreview();
    brusselsOffer.city.name = 'Brussels';

    const state = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
        favorites: [parisOffer, brusselsOffer]
      }
    };

    const categorizedOffers: CategorizedOffers = {
      Paris: [parisOffer],
      Brussels: [brusselsOffer],

    };

    const result = getCategorizedFavorites(state);
    expect(result).toEqual(categorizedOffers);

  });

});


