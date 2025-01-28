import { AuthorizationStatus } from '../../const';
import { makeFakeOfferPreview, makeFakeUser } from '../../utils/mocks';
import { fetchAuthorizationStatus, fetchFavorites, logInAction, logOutAction } from '../api-actions';
import { updateFavorites, userProcess } from './user-process';

describe('userProcess slice', () => {

  it('should return initial state with empty action', () => {
    const emptyType = { 'type': '' };

    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
      favorites: []
    };

    const result = userProcess.reducer(undefined, emptyType);

    expect(result).toEqual(expectedState);
  });

  it('should add offerPreview item to favorites list state with updateFavorites action', () => {
    const fakeId = 'some-fake-uuid';

    const favoriteOfferPreview = makeFakeOfferPreview();
    favoriteOfferPreview.id = fakeId;
    favoriteOfferPreview.isFavorite = true;

    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
      favorites: []
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
      favorites: [favoriteOfferPreview]
    };
    const result = userProcess.reducer(initialState, updateFavorites(favoriteOfferPreview));

    expect(result).toEqual(expectedState);
  });

  it('should remove offerPreview item from favorites list state with updateFavorites action', () => {
    const fakeId = 'some-fake-uuid';

    const favoriteOfferPreview = makeFakeOfferPreview();
    favoriteOfferPreview.id = fakeId;
    favoriteOfferPreview.isFavorite = false;

    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
      favorites: [favoriteOfferPreview]
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
      favorites: []
    };
    const result = userProcess.reducer(initialState, updateFavorites(favoriteOfferPreview));

    expect(result).toEqual(expectedState);
  });

  it('should fill favorites list state with fetchFavorites.fulfilled action', () => {
    const favoriteOfferPreviewList = [makeFakeOfferPreview()];

    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
      favorites: favoriteOfferPreviewList
    };
    const result = userProcess.reducer(undefined, fetchFavorites.fulfilled(favoriteOfferPreviewList, '', undefined));

    expect(result).toEqual(expectedState);
  });


  it('should set authorizationStatus to Auth and user data with fetchAuthorizationStatus.fulfilled action', () => {
    const user = makeFakeUser();

    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: user,
      favorites: []
    };

    const result = userProcess.reducer(undefined, fetchAuthorizationStatus.fulfilled(user, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set authorizationStatus to NoAuth with logInAction.rejected action', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      favorites: []
    };

    const result = userProcess.reducer(undefined, logInAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set authorizationStatus to Auth and set user data with logInAction.fulfilled action', () => {
    const user = makeFakeUser();
    const authData = { email: '', password: '' };

    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: user,
      favorites: []
    };

    const result = userProcess.reducer(undefined, logInAction.fulfilled(user, '', authData));

    expect(result).toEqual(expectedState);
  });

  it('should set authorizationStatus to NoAuth with fetchAuthorizationStatus.rejected action', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      favorites: []
    };

    const result = userProcess.reducer(undefined, fetchAuthorizationStatus.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set authorizationStatus to NoAuth and clear user data and favorites list with logOutAction.fulfilled action', () => {
    const user = makeFakeUser();
    const favoriteOfferPreviewList = [makeFakeOfferPreview()];


    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: user,
      favorites: favoriteOfferPreviewList
    };

    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      favorites: []
    };

    const result = userProcess.reducer(initialState, logOutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });

});
