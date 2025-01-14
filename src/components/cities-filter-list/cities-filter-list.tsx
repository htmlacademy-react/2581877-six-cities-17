import { ОfferCities } from '../../types';
import CitiesFiterItem from '../cities-filter-item/cities-filter-item';
import { filterByCity } from '../../store/offers-list-data/offers-list-data';
import { useAppDispatch } from '../../hooks';

export default function CitiesFilterList(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {ОfferCities.map((city) => (
                <CitiesFiterItem
                  city={city}
                  key={city}
                  onClickCallback={() => dispatch(filterByCity(city))}
                />
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
