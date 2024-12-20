import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types';
import { useState } from 'react';
import Map from '../map/map';
import { mapStartPosition } from '../../const';

type OffersListProps = {
  offers: Offer[];
}

function OffersList({ offers }: OffersListProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);

  function changeHighlightOfferCard(offer : Offer | null): void {
    setActiveOffer(offer);
  }

  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in Amsterdam</b>
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
            <OfferCard offer={offer} key={offer.id} callback={changeHighlightOfferCard} />
          ))}
        </div>
      </section>
      <div className="cities__right-section">
        <Map startPosition={mapStartPosition} offers={offers} activeOffer={activeOffer}></Map>
      </div>
    </>
  );
}

export default OffersList;
