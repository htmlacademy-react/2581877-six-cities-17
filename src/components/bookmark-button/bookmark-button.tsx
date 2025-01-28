import cn from 'classnames';
import { useAppDispatch } from '../../hooks';
import { pushIsFavoriteAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type Dimensions = {
  width: number;
  height: number;
}

type BookmarkButtonProps = {
  offerId: string;
  isFavorite: boolean;
  buttonStyle: 'main' | 'nearby' | 'favorites' | 'offer';
}

export default function BookmarkButton({ offerId, isFavorite, buttonStyle }: BookmarkButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

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

  const dimensions: Dimensions = buttonStyle === 'offer' ? {
    width: 31,
    height: 33,
  } : {
    width: 18,
    height: 19,
  };

  const classPrefix = (buttonStyle === 'offer' ? 'offer' : 'place-card');

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
      < span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}
