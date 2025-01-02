import { useState } from 'react';
import cn from 'classnames';
import OffersSortOption from '../offers-sort-option/offers-sort-option';
import { useAppSelector } from '../../hooks';
import { useAppDispatch } from '../../hooks';
import { SortBy } from '../../const';
import { sortByAction } from '../../store/actions';

export default function OffersSortOptions(): JSX.Element {
  const [mouseHover, setMouseHover] = useState(false);
  const sortBy = useAppSelector((state) => state.sortBy);
  const dispatch = useAppDispatch();

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
        <OffersSortOption onClickHandle={() => {}} sortBy={SortBy.Popular} />
        <OffersSortOption onClickHandle={() => dispatch(sortByAction.priceHighToLow()) } sortBy={SortBy.PriceHighToLow} />
        <OffersSortOption onClickHandle={() => dispatch(sortByAction.priceLowToHigh()) } sortBy={SortBy.PriceLowToHigh} />
        <OffersSortOption onClickHandle={() => dispatch(sortByAction.topRated()) } sortBy={SortBy.TopRrated} />
      </ul>
    </form>
  );
}
