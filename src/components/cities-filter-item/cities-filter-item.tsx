import { OfferCity } from '../../types';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentCity } from '../../store/offers-list-data/selectors';
import { filterByCity } from '../../store/offers-list-data/offers-list-data';


type CitiesFiterItemProps = {
  city: OfferCity;
}

export default function CitiesFiterItem({ city }: CitiesFiterItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const isActive = city === useAppSelector(getCurrentCity);
  return (
    <li className="locations__item">
      <a
        className={cn('locations__item-link', 'tabs__item', { 'tabs__item--active': isActive })}
        onClick={() => dispatch(filterByCity(city))}
      >
        <span>{city}</span>
      </a>
    </li>
  );
}
