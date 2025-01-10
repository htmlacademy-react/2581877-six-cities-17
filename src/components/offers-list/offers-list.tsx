import { Offer } from '../../types';
import { useState } from 'react';
import { OfferListStyle } from '../../const';
import OffersListMain from './offers-list-main';
import OffersListNearby from './offers-list-nearby';
import { citiesMapStartPosition } from '../../mocks/mapPosition';
import { useAppSelector } from '../../hooks';
import OfferListEmpty from '../offer-list-empty/offer-list-empty';

type OffersListProps = {
  offers: Offer[];
  offerListStyle: OfferListStyle;
}

function OffersList({ offers, offerListStyle }: OffersListProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  function changeHighlightOfferCard(offer: Offer | null): void {
    setActiveOffer(offer);
  }

  const currentCity = useAppSelector((state) => state.currentCity);

  switch (offerListStyle) {
    case OfferListStyle.Main:
      if (offers.length === 0) {
        return <OfferListEmpty />;
      } else {
        return <OffersListMain offers={offers} mapStartPosition={citiesMapStartPosition[currentCity]} activeOffer={activeOffer} changeHighlightCallback={changeHighlightOfferCard} />;
      }
    case OfferListStyle.Nearby:
      return <OffersListNearby offers={offers} mapStartPosition={citiesMapStartPosition[currentCity]} activeOffer={activeOffer} changeHighlightCallback={changeHighlightOfferCard} />;
  }

}

export default OffersList;
