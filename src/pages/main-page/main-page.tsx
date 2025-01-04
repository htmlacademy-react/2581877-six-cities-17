import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import OffersList from '../../components/offers-list/offers-list';
import { OfferListStyle } from '../../const';
import CitiesFilterList from '../../components/cities-filter-list/cities-filter-list';
import { useAppSelector } from '../../hooks';
import cn from 'classnames';
import { OfferCity } from '../../types';
import { SortBy } from '../../const';
import { OfferPreview } from '../../types';

const sortOffers = (offersList: OfferPreview[], sortBy: SortBy): OfferPreview[] => {
  switch (sortBy) {
    case SortBy.PriceHighToLow:
      return offersList.sort((a, b) => b.price - a.price);
    case SortBy.PriceLowToHigh:
      return offersList.sort((a, b) => a.price - b.price);
    case SortBy.TopRrated:
      return offersList.sort((a, b) => b.rating - a.rating);
    default:
      return offersList;
  }
};

const filterOffers = (offersList: OfferPreview[], city: OfferCity): OfferPreview[] =>
  offersList.filter((offer) => offer.city.name === city);


function MainPage(): JSX.Element {
  const currentCity = useAppSelector((state) => state.currentCity);
  const sortBy = useAppSelector((state) => state.sortBy);
  let offersList = useAppSelector((state) => state.offersPreview);
  offersList = filterOffers(offersList, currentCity);
  offersList = sortOffers(offersList, sortBy);

  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link header__logo-link--active" to="/">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </Link>
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
        <main className={cn('page__main page__main--index', { 'page__main--index-empty': offersList.length === 0 })}>
          <h1 className="visually-hidden">Cities</h1>
          <CitiesFilterList />
          <OffersList offersList={offersList} offerListStyle={OfferListStyle.Main} />
        </main>
      </div>
    </>
  );
}

export default MainPage;
