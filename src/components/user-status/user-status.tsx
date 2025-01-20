import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import { logOutAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';
import { AppRoute } from '../../const';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getUser } from '../../store/user-process/selectors';
import { getAuthorizationStatus, getFavoritesCount } from '../../store/user-process/selectors';

export default function UserStatus(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(getUser);
  const favoritesCount = useAppSelector(getFavoritesCount);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authorizationStatus === AuthorizationStatus.Auth ? (
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">{user?.email}</span>
                <span className="header__favorite-count">{favoritesCount}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <a className="header__nav-link" href="#"
                onClick={
                  (e) => {
                    dispatch(logOutAction());
                    e.preventDefault();
                  }
                }
              >
                <span className="header__signout">Sign out</span>
              </a>
            </li>
          </>
        ) : (
          <li className="header__nav-item user">
            <a className="header__nav-link header__nav-link--profile" href="#"
              onClick={
                (e) => {
                  navigate(AppRoute.Login);
                  e.preventDefault();
                }
              }
            >
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </a>
          </li>
        )}
      </ul>
    </nav >

  );
}
