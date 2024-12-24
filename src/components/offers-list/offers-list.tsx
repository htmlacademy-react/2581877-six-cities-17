import { Offer } from '../../types';
import { useState } from 'react';
import { OfferListStyle } from '../../const';
import { MapStartPosition } from '../../types';
import OffersListMain from './offers-list-main';
import OffersListNearby from './offers-list-nearby';

type OffersListProps = {
  offers: Offer[];
  mapStartPosition: MapStartPosition;
  offerListStyle: OfferListStyle;
}

function OffersList({ offers, mapStartPosition, offerListStyle }: OffersListProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  function changeHighlightOfferCard(offer: Offer | null): void {
    setActiveOffer(offer);
  }

  switch (offerListStyle) {
    case OfferListStyle.Main:
      return <OffersListMain offers={offers} mapStartPosition={mapStartPosition} activeOffer={activeOffer} changeHighlightCallback={changeHighlightOfferCard} />;
    case OfferListStyle.Nearby:
      return <OffersListNearby offers={offers} mapStartPosition={mapStartPosition} activeOffer={activeOffer} changeHighlightCallback={changeHighlightOfferCard} />;
  }

}

export default OffersList;
