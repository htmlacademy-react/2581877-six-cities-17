import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../../components/header/header';
import './page-404.css';

function Page404(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <div className="page page--gray page--main">
        <Header/>

        <main className="page__main page__main--index page__main--index-empty">
          <h1 className="visually-hidden">404 Not Found</h1>
          <div className="cities">
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content" style={{backgroundImage:'none'}}>
                  <b className="cities__status">404 Not Found</b>
                  <p className="cities__status-description cities__status-description-undeline">Navigate to
                    {' '}<Link to={AppRoute.Root} className="cities__status-description-link">main page</Link>
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
