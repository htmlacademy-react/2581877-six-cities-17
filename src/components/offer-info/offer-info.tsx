import { OfferFull } from '../../types';
import OfferReviewsList from '../offer-reviews-list/offer-reviews-list';
import BookmarkButton from '../bookmark-button/bookmark-button';
import cn from 'classnames';
import RatingStar from '../rating-star/rating-star';

type OfferInfoProps = {
  offer: OfferFull;
}

export default function OfferInfo({ offer }: OfferInfoProps): JSX.Element {
  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {offer.images.slice(0, 6).map((image) => (
            <div className="offer__image-wrapper" key={image}>
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
            <BookmarkButton offerId={offer.id} isFavorite={offer.isFavorite} buttonStyle={'offer'} />

          </div>
          <div className="offer__rating rating">
            <RatingStar rating={offer.rating} componentStyle='place' />
            <span className="offer__rating-value rating__value">{offer.rating}</span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              {offer.type}
            </li>
            <li className="offer__feature offer__feature--bedrooms">{offer.bedrooms} {offer.bedrooms === 0 ? 'Bedroom' : 'Bedrooms'}</li>
            <li className="offer__feature offer__feature--adults">
              Max {offer.maxAdults} {offer.maxAdults > 0 ? 'adults' : 'adult'}
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">&euro;{offer.price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          {offer.goods.length > 0 && (
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {Array.from(offer.goods).map((good) => (
                  <li className="offer__inside-item" key={good}>{good}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div
                className={
                  cn(
                    'offer__avatar-wrapper',
                    'user__avatar-wrapper',
                    { ['offer__avatar-wrapper--pro ']: offer.host.isPro }
                  )
                }
              >
                <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
              </div>
              <span className="offer__user-name">
                {offer.host.name}
              </span>
              {offer.host.isPro && (
                <span className="offer__user-status">
                  Pro
                </span>
              )}
            </div>
            <div className="offer__description">
              {offer.description.split('\n').map((paragraph) => (
                <p className="offer__text" key={Math.random()}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <OfferReviewsList offerId={offer.id} />
        </div>
      </div>

    </section>

  );
}
