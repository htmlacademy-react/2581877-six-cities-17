import { Link } from 'react-router-dom';
import { ratingToPercent, getLinkToOffer } from '../../common';
import cn from 'classnames';
import { OfferPreview } from '../../types';
import BookmarkButton from '../bookmark-button/bookmark-button';
import React from 'react';

type OfferCardProps = {
  offer: OfferPreview;
  onHoverCallback: (activeOffer: OfferPreview | null) => void;
  className: string;
}

const OfferCard = React.memo(({ offer, onHoverCallback, className } : OfferCardProps): JSX.Element => {
  const linkToOffer: string = getLinkToOffer(offer.id);

  return (
    <article className={cn('place-card',className)}
      onMouseEnter={() => onHoverCallback(offer)}
      onMouseLeave={() => onHoverCallback(null)}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={linkToOffer}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price.toString()}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton offerId={offer.id} isFavorite={offer.isFavorite} elementStyle={'place-card'} />

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingToPercent(offer.rating).toString()}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={linkToOffer}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>

  );
});

OfferCard.displayName = 'OfferCard';
export default OfferCard;
