import OfferCard from '../offer-card/offer-card';
import Map from '../map/map';
import { OfferPreview } from '../../types';
import { Location } from '../../types';
import { useAppSelector } from '../../hooks';
import { getOffer } from '../../store/offer-data/selectors';

type OffersListNearbyProps = {
  offersList: OfferPreview[];
  mapStartPosition: Location;
}


function OffersListNearby({ offersList, mapStartPosition }: OffersListNearbyProps): JSX.Element {
  const currentOffer = useAppSelector(getOffer);
  return (
    <>
      {offersList.length > 0 && <Map startPosition={mapStartPosition} offersList={offersList} currentOffer={currentOffer} className='offer__map'></Map>}
      <div className="container" >
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {offersList.map((offer) => (
              <OfferCard offer={offer} key={offer.id} onHoverCallback={() => { }} className="near-places__card" />
            ))}
          </div>
        </section >
      </div>
    </>
  );
}

export default OffersListNearby;
