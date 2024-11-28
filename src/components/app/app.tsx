import MainPage from '../../pages/main-page/main-page';
//import FavoritesPage from "../../pages/favorites-page/favorites-page";
//import LoginPage from "../../pages/login-page/login-page";
//import OfferPage from "../../pages/offer-page/offer-page";

import { Offer } from '../../types';


type AppProps = {
  offers: Offer[];
}

function App({ offers }: AppProps): JSX.Element {
  return (
    <MainPage offers={offers} />
  );
}

export default App;
