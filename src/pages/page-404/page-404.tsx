import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function Page404(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </a>
              </div>
            </div>
          </div>
        </header>

        <main className="page__main page__main--index page__main--index-empty">
          <h1 className="visually-hidden">404 Not Found</h1>
          <div className="cities">
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content" style={{backgroundImage:'none'}}>
                  <b className="cities__status">404 Not Found</b>
                  <p className="cities__status-description">Navigate to
                    {' '}<Link to={AppRoute.Root} style={{textDecoration: 'underline dotted'}}>main page</Link>
                  </p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          </div>
        </main>

      </div>
    </>
  );
}

export default Page404;
