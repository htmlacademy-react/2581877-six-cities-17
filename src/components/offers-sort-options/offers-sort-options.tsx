import { useState } from 'react';
import cn from 'classnames';
import OffersSortOption from '../offers-sort-option/offers-sort-option';
import { useAppSelector } from '../../hooks';
import { SortBy } from '../../const';
import { getSortOption } from '../../store/offers-list-data/selectors';
import React from 'react';

const OffersSortOptions = React.memo((): JSX.Element => {
  const [mouseHover, setMouseHover] = useState(false);
  const sortBy = useAppSelector(getSortOption);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span className="places__sorting-type" tabIndex={0} onMouseEnter={() => setMouseHover(true)} >
        {sortBy}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={cn('places__options', 'places__options--custom', { 'places__options--opened': mouseHover })}
        onMouseLeave={() => setMouseHover(false)}
        onClick={() => setMouseHover(false)}
      >
        <OffersSortOption sortBy={SortBy.Popular} />
        <OffersSortOption sortBy={SortBy.PriceHighToLow} />
        <OffersSortOption sortBy={SortBy.PriceLowToHigh} />
        <OffersSortOption sortBy={SortBy.TopRrated} />
      </ul>
    </form>
  );
});

OffersSortOptions.displayName = 'OffersSortOptions';
export default OffersSortOptions;
