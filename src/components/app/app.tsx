import { Routes, Route, BrowserRouter } from 'react-router-dom';

import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import Page404 from '../../pages/page-404/page-404';

import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { fetchOffersList } from '../../store/api-actions';
import { fetchAuthorizationStatus } from '../../store/api-actions';
import { ToastContainer } from 'react-toastify';


store.dispatch(fetchOffersList());
store.dispatch(fetchAuthorizationStatus());

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ToastContainer/>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Root}>
              <Route index element={<MainPage />} />
              <Route path={AppRoute.Favorites}
                element={
                  <PrivateRoute>
                    <FavoritesPage/>
                  </PrivateRoute>
                }
              />
              <Route path={AppRoute.Offer} element={<OfferPage/>} />
            </Route>
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route path='*' element={<Page404 />} />

          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
