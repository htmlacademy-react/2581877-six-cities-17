
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Page404 from '../page-404/page-404';
import { OfferListStyle } from '../../const';
import { useAppSelector } from '../../hooks';
import { useAppDispatch } from '../../hooks';
import { fetchNearbyAction, fetchOfferAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { OfferFull, OfferPreview } from '../../types';
import Header from '../../components/header/header';
import UserStatus from '../../components/user-status/user-status';
import { loadNearbyAction, loadOfferAction } from '../../store/actions';
import OfferInfo from '../../components/offer-info/offer-info';
import Spinner from '../../components/spinner/spinner';
import OffersList from '../../components/offers-list/offers-list';

function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();


  let offer: OfferFull | null | undefined = null;
  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction({ id }));
    }
    return () => {
      dispatch(loadOfferAction(null));
    };
  }, [dispatch, id]);
  offer = useAppSelector((state) => state.offerFull);

  let offersNearby: OfferPreview[] = [];
  useEffect(() => {
    if (id) {
      dispatch(fetchNearbyAction({ id }));
    }
    return () => {
      dispatch(loadNearbyAction([]));
    };
  }, [dispatch, id]);
  offersNearby = useAppSelector((state) => state.offersNearby);

  if (id === undefined || offer === undefined) {
    return (<Page404 />);
  }




  return (
    <>
      <Helmet>
        <title>6 cities: {offer?.title || 'loading'}</title>
      </Helmet>
      <div className="page">
        <Header>
          <UserStatus />
        </Header>

        <main className="page__main page__main--offer">
          {offer === null ? <Spinner /> : <OfferInfo offer={offer} />}
          {offersNearby.length > 0 && <OffersList offersList={offersNearby} offerListStyle={OfferListStyle.Nearby} />}
        </main >
      </div >
    </>
  );
}

export default OfferPage;
