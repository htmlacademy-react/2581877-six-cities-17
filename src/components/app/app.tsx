import { Routes, Route, BrowserRouter } from 'react-router-dom';

import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import Page404 from '../../pages/page-404/page-404';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { fetchOffersList } from '../../store/api-actions';
import { fetchAuthorizationStatus } from '../../store/api-actions';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import Spinner from '../spinner/spinner';


function App(): JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(fetchOffersList());
  dispatch(fetchAuthorizationStatus());
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if(authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner/>;
  }

  return (
    <>
      <ToastContainer />
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Root}>
              <Route index element={<MainPage />} />
              <Route path={AppRoute.Favorites}
                element={
                  <PrivateRoute>
                    <FavoritesPage />
                  </PrivateRoute>
                }
              />
              <Route path={AppRoute.Offer} element={<OfferPage />} />
            </Route>
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
}

export default App;
