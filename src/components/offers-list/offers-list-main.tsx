import { Location } from '../../types';
import OfferCard from '../offer-card/offer-card';
import Map from '../map/map';
import { useAppSelector } from '../../hooks';
import OffersSortOptions from '../offers-sort-options/offers-sort-options';
import { OfferPreview } from '../../types';

type OffersListMainProps = {
  offersList: OfferPreview[];
  mapStartPosition: Location;
  activeOffer: OfferPreview | null;
  onHoverCallback: (activeOffer: OfferPreview | null) => void;
}


function OffersListMain({ offersList, mapStartPosition, activeOffer, onHoverCallback }: OffersListMainProps): JSX.Element {
  const currentCity = useAppSelector((state) => state.currentCity);
  return (

    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offersList.length} places to stay in {currentCity}</b>
          <OffersSortOptions />
          <div className="cities__places-list places__list tabs__content">
            {offersList.map((offer) => (
              <OfferCard offer={offer} key={offer.id} onHoverCallback={onHoverCallback} className="cities__card" />
            ))}
          </div>
        </section>
        <div className="cities__right-section">
          <Map startPosition={mapStartPosition} offersList={offersList} activeOffer={activeOffer} className='cities__map'></Map>
        </div>
      </div>
    </div>

  );

}

export default OffersListMain;
