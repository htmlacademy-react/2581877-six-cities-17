import { useState } from 'react';
import { OfferListStyle } from '../../const';
import OffersListMain from './offers-list-main';
import OffersListNearby from './offers-list-nearby';
import OfferListEmpty from '../offer-list-empty/offer-list-empty';
import { OfferPreview } from '../../types';
import { useAppSelector } from '../../hooks';
import Spinner from '../spinner/spinner';
import { getOffersList } from '../../store/offers-list-data/selectors';
import { useCallback } from 'react';

type OffersListProps = {
  offersList: OfferPreview[];
  offerListStyle: OfferListStyle;
}

function OffersList({ offersList, offerListStyle }: OffersListProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<OfferPreview | null>(null);
  const isLoaded = useAppSelector(getOffersList).length > 0;

  const handleOnHover = useCallback((offer: OfferPreview | null): void => {
    setActiveOffer(offer);
  }, []);

  switch (offerListStyle) {
    case OfferListStyle.Main:
      if (isLoaded) {
        if (offersList.length === 0) {
          return <OfferListEmpty />;
        } else {
          return <OffersListMain offersList={offersList} mapStartPosition={offersList[0].city.location} activeOffer={activeOffer} handleOnHover={handleOnHover} />;
        }
      } else {
        return <Spinner/>;
      }
    case OfferListStyle.Nearby:
      return <OffersListNearby offersList={offersList} mapStartPosition={offersList[0].city.location} />;
  }

}

export default OffersList;
