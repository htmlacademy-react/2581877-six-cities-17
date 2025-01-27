import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types';
import { AppThunkDispatch, extractActionsTypes, makeFakeOfferFull, makeFakeOfferPreview } from '../utils/mocks';
import { APIRoutes } from '../const';
import { fetchAuthorizationStatus, fetchOffersList, fetchOffer, fetchNearby, logInAction, logOutAction } from './api-actions';
import { replaceApiPath } from '../common';
import * as tokenStorage from '../services/tokens';

describe('async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ USER: { user: null } });
  });

  describe('fetchAuthorisationStatus', () => {
    it('should dispatch "fetchAuthorizationStatus.pending" and "fetchAuthorizationStatus.fulfilled" with thunk "fetchAuthorizationStatus', async () => {
      mockAxiosAdapter.onGet(APIRoutes.Login).reply(200);

      await store.dispatch(fetchAuthorizationStatus());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchAuthorizationStatus.pending.type,
        fetchAuthorizationStatus.fulfilled.type,
      ]);
    });
  });


  it('should dispatch "fetchAuthorizationStatus.pending" and "fetchAuthorizationStatus.rejected" when server response 401', async () => {
    mockAxiosAdapter.onGet(APIRoutes.Login).reply(401);

    await store.dispatch(fetchAuthorizationStatus());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      fetchAuthorizationStatus.pending.type,
      fetchAuthorizationStatus.rejected.type,
    ]);
  });

  describe('fetchOffersList', () => {
    it('should dispatch "fetchOffersList.pending", "fetchOffersList.fulfilled", when server response 200', async () => {
      const mockOfferList = [makeFakeOfferPreview()];
      mockAxiosAdapter.onGet(APIRoutes.OffersList).reply(200, mockOfferList);

      await store.dispatch(fetchOffersList());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersListActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersList.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersList.pending.type,
        fetchOffersList.fulfilled.type,
      ]);

      expect(fetchOffersListActionFulfilled.payload)
        .toEqual(mockOfferList);
    });

    it('should dispatch "fetchOffersList.pending", "fetchOffersList.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoutes.OffersList).reply(400, []);

      await store.dispatch(fetchOffersList());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersList.pending.type,
        fetchOffersList.rejected.type,
      ]);
    });
  });

  describe('fetchOffer', () => {
    it('should dispatch "fetchOffer.pending", "fetchOffer.fulfilled", when server response 200', async () => {
      const mockOfferFull = makeFakeOfferFull();
      mockAxiosAdapter.onGet(replaceApiPath(APIRoutes.Offer, { offerId: mockOfferFull.id })).reply(200, mockOfferFull);

      await store.dispatch(fetchOffer({ id: mockOfferFull.id }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffer.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffer.pending.type,
        fetchOffer.fulfilled.type,
      ]);

      expect(fetchOfferActionFulfilled.payload)
        .toEqual(mockOfferFull);
    });

    it('should dispatch "fetchOffer.pending", "fetchOffer.rejected" when server response 404', async () => {
      mockAxiosAdapter.onGet(replaceApiPath(APIRoutes.Offer, { offerId: '' })).reply(404, []);

      await store.dispatch(fetchOffer({ id: '' }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffer.pending.type,
        fetchOffer.rejected.type,
      ]);
    });
  });

  describe('fetchNearby', () => {
    it('should dispatch "fetchNearby.pending", "fetchNearby.fulfilled", when server response 200', async () => {
      const mockNearByList = [makeFakeOfferPreview()];
      mockAxiosAdapter.onGet(replaceApiPath(APIRoutes.Nearby, { offerId: '' })).reply(200, mockNearByList);

      await store.dispatch(fetchNearby({ id: '' }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearby.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchNearby.pending.type,
        fetchNearby.fulfilled.type,
      ]);

      expect(fetchOfferActionFulfilled.payload)
        .toEqual(mockNearByList);
    });

    it('should dispatch "fetchNearby.pending", "fetchNearby.rejected" when server response 404', async () => {
      mockAxiosAdapter.onGet(replaceApiPath(APIRoutes.Nearby, { offerId: '' })).reply(404, []);

      await store.dispatch(fetchNearby({ id: '' }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearby.pending.type,
        fetchNearby.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async () => {
      const fakeUser = { email: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoutes.Login).reply(200, fakeServerReplay);

      await store.dispatch(logInAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logInAction.pending.type,
        logInAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser = { email: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoutes.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'setToken');

      await store.dispatch(logInAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });

  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoutes.Logout).reply(204);

      await store.dispatch(logOutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logOutAction.pending.type,
        logOutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoutes.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logOutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});
