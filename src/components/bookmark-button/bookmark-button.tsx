import cn from 'classnames';
import { useAppDispatch } from '../../hooks';
import { pushIsFavoriteAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';

type BookmarkButtonProps = {
  offerId: string;
  isFavorite: boolean;
  elementStyle: 'place-card' | 'offer';
}

export default function BookmarkButton({ offerId, isFavorite, elementStyle }: BookmarkButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(pushIsFavoriteAction({
        id: offerId,
        isFavorite: !isFavorite,
      }));
    } else {
      navigate(AppRoute.Login);
    }
  };

  type Dimensions = {
    width: number;
    height: number;
  }
  const dimensions: Dimensions = elementStyle === 'offer' ? {
    width: 31,
    height: 33,
  } : {
    width: 18,
    height: 19,
  };

  const classPrefix = elementStyle as string;

  return (
    <button
      onClick={handleFavoriteClick} className={cn(
        'button',
        `${classPrefix}__bookmark-button`,
        { [`${classPrefix}__bookmark-button--active`]: isFavorite },
      )}
      type="button"
    >
      <svg
        className={cn(
          `${classPrefix}__bookmark-icon`,
          { [`${classPrefix}__bookmark-icon--active`]: isFavorite }
        )}
        {...dimensions}
      >
        <use xlinkHref="#icon-bookmark"> </use>
      </svg>
      < span className="visually-hidden"> To bookmarks </span>
    </button>
  );
}
