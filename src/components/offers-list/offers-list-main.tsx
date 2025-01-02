import { Offer } from '../../types';
import OfferCard from '../offer-card/offer-card';
import Map from '../map/map';
import { MapStartPosition } from '../../types';
import { useAppSelector } from '../../hooks';

type OffersListMainProps = {
  offers: Offer[];
  mapStartPosition: MapStartPosition;
  activeOffer: Offer | null;
  changeHighlightCallback: (activeOffer: Offer | null) => void;
}


function OffersListMain({ offers, mapStartPosition, activeOffer, changeHighlightCallback }: OffersListMainProps): JSX.Element {
  const currentCity = useAppSelector((state) => state.currentCity);
  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {currentCity}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by&nbsp;</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={0}>Popular</li>
            <li className="places__option" tabIndex={0}>Price: low to high</li>
            <li className="places__option" tabIndex={0}>Price: high to low</li>
            <li className="places__option" tabIndex={0}>Top rated first</li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          {offers.map((offer) => (
            <OfferCard offer={offer} key={offer.id} changeHighlightCallback={changeHighlightCallback} className="cities__card" />
          ))}
        </div>
      </section>
      <div className="cities__right-section">
        <Map startPosition={mapStartPosition} offers={offers} activeOffer={activeOffer} className='cities__map'></Map>
      </div>
    </>
  );

}

export default OffersListMain;
