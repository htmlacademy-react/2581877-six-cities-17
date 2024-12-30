
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Offer, OfferСonvenience } from '../../types';
import Page404 from '../page-404/page-404';
import { ratingToPercent } from '../../common';
import OfferReviewsList from '../../components/offer-reviews-list/offer-reviews-list';
import { AuthorizationStatus, mapStartPosition } from '../../const';
import cn from 'classnames';
import { MapStartPosition } from '../../types';
import OffersList from '../../components/offers-list/offers-list';
import { OfferListStyle } from '../../const';


type OfferPageProps = {
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;

}

function OfferPage({ offers, authorizationStatus }: OfferPageProps): JSX.Element {
  const { id } = useParams();

  const offer = offers.find((iteration: Offer) => iteration.id === Number(id));

  if (offer === undefined) {
    return (<Page404 />);
  }

  const offerConveniences: OfferСonvenience[] = Array.from(offer.conveniences);


  const offersNearby = offers.filter((iteration: Offer) => iteration.nearbyOffersId.includes(offer.id)).slice(0, 3);

  const mapPosition: MapStartPosition = {
    center: offer.location,
    zoom: mapStartPosition.zoom,
  };


  return (
    <>
      <Helmet>
        <title>6 cities: {offer.title}</title>
      </Helmet>
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link" href="main.html">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">3</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offer.images.map((image, key) => (
                  <div className="offer__image-wrapper" key={key}>
                    <img className="offer__image" src={image} alt="Photo studio" />
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {offer.isPremium && <div className="offer__mark"><span>Premium</span></div>}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offer.title}
                  </h1>
                  <button className={cn('offer__bookmark-button', 'button', { 'offer__bookmark-button--active': offer.isMarked })} type="button">
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${ratingToPercent(offer.rating).toString()}%` }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {offer.housingType}
                  </li>
                  {offer.housingType === 'Apartament' && <li className="offer__feature offer__feature--bedrooms">{offer.roomsCount} Bedrooms</li>}
                  <li className="offer__feature offer__feature--adults">
                    Max {offer.maxAdult} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{offer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                {offerConveniences.length > 0 && (
                  <div className="offer__inside">
                    <h2 className="offer__inside-title">What&apos;s inside</h2>
                    <ul className="offer__inside-list">
                      {Array.from(offerConveniences).map((convenience, key) => (
                        <li className="offer__inside-item" key={key}>{convenience}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">
                      Angelina
                    </span>
                    <span className="offer__user-status">
                      Pro
                    </span>
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                    </p>
                    <p className="offer__text">
                      An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                    </p>
                  </div>
                </div>
                <OfferReviewsList authorizationStatus={authorizationStatus} />
              </div>
            </div>

          </section>

          {offersNearby.length > 0 && <OffersList offers={offersNearby} mapStartPosition={mapPosition} offerListStyle={OfferListStyle.Nearby} />}

        </main >
      </div >
    </>
  );
}

export default OfferPage;
