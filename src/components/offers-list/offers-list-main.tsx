import { Offer } from '../../types';
import OfferCard from '../offer-card/offer-card';
import Map from '../map/map';
import { MapStartPosition } from '../../types';
import { useAppSelector } from '../../hooks';
import OffersSortOptions from '../offers-sort-options/offers-sort-options';

type OffersListMainProps = {
  offers: Offer[];
  mapStartPosition: MapStartPosition;
  activeOffer: Offer | null;
  changeHighlightCallback: (activeOffer: Offer | null) => void;
}


function OffersListMain({ offers, mapStartPosition, activeOffer, changeHighlightCallback }: OffersListMainProps): JSX.Element {
  const currentCity = useAppSelector((state) => state.currentCity);
  return (

    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {currentCity}</b>
          <OffersSortOptions />
          <div className="cities__places-list places__list tabs__content">
            {offers.map((offer) => (
              <OfferCard offer={offer} key={offer.id} changeHighlightCallback={changeHighlightCallback} className="cities__card" />
            ))}
          </div>
        </section>
        <div className="cities__right-section">
          <Map startPosition={mapStartPosition} offers={offers} activeOffer={activeOffer} className='cities__map'></Map>
        </div>
      </div> 
    </div>

  );

}

export default OffersListMain;
