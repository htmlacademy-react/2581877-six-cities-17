import { OfferCity, ОfferCities } from '../../types';
import { Offer } from '../../types';
import CitiesFiterItem from '../cities-filter-item/cities-filter-item';
import { filterByCityAction, fillOffersAction } from '../../store/actions';
import { useAppDispatch } from '../../hooks';

type CitiesFilterListProps = {
  offers: Offer[];
}


export default function CitiesFilterList({ offers }: CitiesFilterListProps): JSX.Element {
  const dispatch = useAppDispatch();
  function switchCity(city: OfferCity): void {
    dispatch(fillOffersAction(offers));
    dispatch(filterByCityAction(city));
  }

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {ОfferCities.map((city) => <CitiesFiterItem city={city} key={city} onClickCallback={() => switchCity(city)} />)}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
