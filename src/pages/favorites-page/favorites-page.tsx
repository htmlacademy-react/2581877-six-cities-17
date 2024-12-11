import { Helmet } from 'react-helmet-async';
import { Offer, OfferCity } from '../../types';
import FavoriteCard from '../../components/favorite-card/favorite-card';

type FavoritesPageProps = {
  offers: Offer[];
}

function FavoritesPage({ offers }: FavoritesPageProps): JSX.Element {

  //фильтруем предложения в закладках
  let markedOffers: Offer[] = offers.filter((offer: Offer) => offer.isMarked);

  //поднимаем премиум вверх
  markedOffers.sort((a: Offer, b: Offer) => Number(b.isPremium) - Number(a.isPremium))

  type CategorizedOffers = {
    [cityName in OfferCity]?: Offer[];
  };

  let categorizedOffers: CategorizedOffers = {};

  //разбиваем массив предложений на словарь OfferCity -> Offer[]
  markedOffers.forEach((offer: Offer) => {
    const offerCity: OfferCity = offer.city;
    if (categorizedOffers[offerCity] === undefined) {
      categorizedOffers[offerCity] = [];
    }
    if (offer.isMarked) {
      categorizedOffers[offerCity].push(offer);
    }
  })


  return (
    <>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link" href="main.html">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">3</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(categorizedOffers).map(([cityName, offers]: [string, Offer[]]) => (
                  <li className="favorites__locations-items" key={cityName}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{cityName}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {offers.map((offer: Offer) => (
                        <FavoriteCard offer={offer} key={offer.id} />
                      ))}
                    </div>
                  </li>

                ))}

              </ul>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </a>
        </footer>
      </div>
    </>
  );
}


export default FavoritesPage;
