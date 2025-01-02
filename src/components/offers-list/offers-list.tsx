import { Offer } from '../../types';
import { useState } from 'react';
import { OfferListStyle } from '../../const';
import OffersListMain from './offers-list-main';
import OffersListNearby from './offers-list-nearby';
import { citiesMapStartPosition } from '../../mocks/mapPosition';
import { useAppSelector } from '../../hooks';

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
      return (
        <div className="cities">
          <div className="cities__places-container container">
            <OffersListMain offers={offers} mapStartPosition={citiesMapStartPosition[currentCity]} activeOffer={activeOffer} changeHighlightCallback={changeHighlightOfferCard} />
          </div>
        </div>
      );
    case OfferListStyle.Nearby:
      return <OffersListNearby offers={offers} mapStartPosition={citiesMapStartPosition[currentCity]} activeOffer={activeOffer} changeHighlightCallback={changeHighlightOfferCard} />;
  }

}

export default OffersList;
