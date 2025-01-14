import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { SortBy } from '../../const';
import { sortByAction } from '../../store/offers-list-data/offers-list-data';
import { getSortOption } from '../../store/offers-list-data/selectors';

type OffersSortOptionProps = {
  sortBy: SortBy;
}

export default function OffersSortOption({ sortBy }: OffersSortOptionProps): JSX.Element {
  const isActive = useAppSelector(getSortOption);
  const dispatch = useAppDispatch();

  return (
    <li
      className={cn('places__option', { 'places__option--active': isActive })}
      tabIndex={0}
      onClick={() => dispatch(sortByAction(sortBy))}
    >
      {sortBy}
    </li>
  );
}

