import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

type HeaderProps = {
  children?: JSX.Element | null;
}

export default function Header({ children = null }: HeaderProps): JSX.Element {
  const { pathname } = useLocation();
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {//TODO: header__logo-link--active только для главной страницы, и линк тоже
            }
            {pathname === AppRoute.Root as string ? (
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            ) : (
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Root}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            )}
          </div>
          {children}
        </div>
      </div>
    </header >

  );
}
