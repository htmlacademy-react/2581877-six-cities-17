import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import { SortBy } from '../../const';

type OffersSortOptionProps = {
  sortBy: SortBy;
  onClickHandle: React.MouseEventHandler<HTMLLIElement>;
}

export default function OffersSortOption({ sortBy, onClickHandle}: OffersSortOptionProps): JSX.Element {
  const isActive = useAppSelector((state) => state.sortBy === sortBy);

  return (
    <li
      className={cn('places__option', { 'places__option--active': isActive })}
      tabIndex={0}
      onClick={onClickHandle}
    >
      {sortBy}
    </li>
  );
}

