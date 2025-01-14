import { Helmet } from 'react-helmet-async';
import OffersList from '../../components/offers-list/offers-list';
import { OfferListStyle } from '../../const';
import CitiesFilterList from '../../components/cities-filter-list/cities-filter-list';
import { useAppSelector } from '../../hooks';
import cn from 'classnames';
import { OfferCity } from '../../types';
import { SortBy } from '../../const';
import { OfferPreview } from '../../types';
import Header from '../../components/header/header';
import UserStatus from '../../components/user-status/user-status';
import { getCurrentCity, getOffersList, getSortOption } from '../../store/offers-list-data/selectors';

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
  const currentCity = useAppSelector(getCurrentCity);
  const sortBy = useAppSelector(getSortOption);
  let offersList = useAppSelector(getOffersList);
  
  offersList = filterOffers(offersList, currentCity);
  offersList = sortOffers(offersList, sortBy);

  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <div className="page page--gray page--main">
        <Header>
          <UserStatus />
        </Header>
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
