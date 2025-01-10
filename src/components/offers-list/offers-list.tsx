import { useState } from 'react';
import { OfferListStyle } from '../../const';
import OffersListMain from './offers-list-main';
import OffersListNearby from './offers-list-nearby';
import OfferListEmpty from '../offer-list-empty/offer-list-empty';
import { OfferPreview } from '../../types';
import { useAppSelector } from '../../hooks';
import Spinner from '../spinner/spinner';

type OffersListProps = {
  offersList: OfferPreview[];
  offerListStyle: OfferListStyle;
}

function OffersList({ offersList, offerListStyle }: OffersListProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<OfferPreview | null>(null);
  const isLoaded = useAppSelector((state) => state.offersPreview).length > 0;
  function onHoverCallback(offer: OfferPreview | null): void {
    setActiveOffer(offer);
  }


  switch (offerListStyle) {
    case OfferListStyle.Main:
      if (isLoaded) {
        if (offersList.length === 0) {
          return <OfferListEmpty />;
        } else {
          return <OffersListMain offersList={offersList} mapStartPosition={offersList[0].city.location} activeOffer={activeOffer} onHoverCallback={onHoverCallback} />;
        }
      } else {
        return <Spinner/>;
      }
    case OfferListStyle.Nearby:
      return <OffersListNearby offersList={offersList} mapStartPosition={offersList[0].city.location} activeOffer={activeOffer} onHoverCallback={onHoverCallback} />;
  }

}

export default OffersList;
