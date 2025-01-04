import OfferCard from '../offer-card/offer-card';
import Map from '../map/map';
import { OfferPreview } from '../../types';
import { Location } from '../../types';

type OffersListNearbyProps = {
  offersList: OfferPreview[];
  mapStartPosition: Location;
  activeOffer: OfferPreview | null;
  onHoverCallback: (activeOffer: OfferPreview | null) => void;
}


function OffersListNearby({ offersList, mapStartPosition, activeOffer, onHoverCallback }: OffersListNearbyProps): JSX.Element {
  return (

    <>
      {offersList.length > 0 && <Map startPosition={mapStartPosition} offersList={offersList} activeOffer={activeOffer} className='offer__map'></Map>}
      <div className="container" >
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>

          <div className="near-places__list places__list">
            {offersList.map((offer) => (
              <OfferCard offer={offer} key={offer.id} onHoverCallback={onHoverCallback} className="near-places__card" />
            ))}
          </div>
        </section >
      </div>
    </>
  );
}

export default OffersListNearby;
