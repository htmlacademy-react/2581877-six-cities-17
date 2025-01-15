import { ОfferCities } from '../../types';
import CitiesFiterItem from '../cities-filter-item/cities-filter-item';

export default function CitiesFilterList(): JSX.Element {

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
                />
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
