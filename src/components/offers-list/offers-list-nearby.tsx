import { Offer } from '../../types';
import OfferCard from '../offer-card/offer-card';
import Map from '../map/map';
import { MapStartPosition } from '../../types';

type OffersListNearbyProps = {
  offers: Offer[];
  mapStartPosition: MapStartPosition;
  activeOffer: Offer | null;
  changeHighlightCallback: (activeOffer: Offer | null) => void;
}


function OffersListNearby({ offers, mapStartPosition, activeOffer, changeHighlightCallback }: OffersListNearbyProps): JSX.Element {
  return (

    <>
      {offers.length > 0 && <Map circleRadius={10000} startPosition={mapStartPosition} offers={offers} activeOffer={activeOffer} className='offer__map'></Map>}
      <div className="container" >
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>

          <div className="near-places__list places__list">
            {offers.map((offer) => (
              <OfferCard offer={offer} key={offer.id} changeHighlightCallback={changeHighlightCallback} className="near-places__card" />
            ))}
          </div>
        </section >
      </div>
    </>
  );
}

export default OffersListNearby;
