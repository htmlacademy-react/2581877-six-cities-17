import { Helmet } from 'react-helmet-async';
import OffersList from '../../components/offers-list/offers-list';
import { OfferListStyle } from '../../const';
import CitiesFilterList from '../../components/cities-filter-list/cities-filter-list';
import { useAppSelector } from '../../hooks';
import cn from 'classnames';
import Header from '../../components/header/header';
import UserStatus from '../../components/user-status/user-status';
import { getFilteredAndSortedOffers } from '../../store/offers-list-data/selectors';

function MainPage(): JSX.Element {
  const offersList = useAppSelector(getFilteredAndSortedOffers);

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
