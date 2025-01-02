import { OfferCity } from '../../types';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';

import React from 'react';


type CitiesFiterItemProps = {
  city: OfferCity;
  onClickCallback: React.MouseEventHandler;
}

export default function CitiesFiterItem({ city, onClickCallback }: CitiesFiterItemProps): JSX.Element {
  const isActive = city === useAppSelector((state) => state.currentCity);
  return (
    <li className="locations__item">
      <a className={cn('locations__item-link', 'tabs__item', { 'tabs__item--active': isActive })} onClick={onClickCallback}>
        <span>{city}</span>
      </a>
    </li>
  );
}
