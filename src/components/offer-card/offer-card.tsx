import { Link } from 'react-router-dom';
import { getLinkToOffer } from '../../common';
import cn from 'classnames';
import { OfferPreview } from '../../types';
import BookmarkButton from '../bookmark-button/bookmark-button';
import React from 'react';
import RatingStar from '../rating-star/rating-star';

type OfferCardProps = {
  offer: OfferPreview;
  handleOnHover?: (activeOffer: OfferPreview | null) => void;
  cardStyle: 'main' | 'nearby' | 'favorites';
}

const OfferCard = React.memo(({ offer, handleOnHover, cardStyle }: OfferCardProps): JSX.Element => {
  const linkToOffer: string = getLinkToOffer(offer.id);
  const imageSize = cardStyle === 'favorites' ? {
    width: 150,
    height: 110,
  } : {
    width: 260,
    height: 200,
  };

  return (
    <article
      className={
        cn('place-card',
          { ['cities__card']: cardStyle === 'main' },
          { ['near-places__card']: cardStyle === 'nearby' },
          { ['favorites__card']: cardStyle === 'favorites' },
        )
      }
      onMouseEnter={() => handleOnHover && handleOnHover(offer)}
      onMouseLeave={() => handleOnHover && handleOnHover(null)}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={
          cn('place-card__image-wrapper',
            { ['cities__image-wrapper']: cardStyle === 'main' },
            { ['near-places__image-wrapper']: cardStyle === 'nearby' },
            { ['favorites__image-wrapper']: cardStyle === 'favorites' },
          )
        }
      >
        <Link to={linkToOffer}>
          <img className="place-card__image" src={offer.previewImage} {...imageSize} alt="Place image" />
        </Link>
      </div>
      <div
        className={
          cn('place-card__info',
            { ['favorites__card-info']: cardStyle === 'favorites' }
          )
        }
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price.toString()}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton offerId={offer.id} isFavorite={offer.isFavorite} buttonStyle={cardStyle} />

        </div>
        <div className="place-card__rating rating">
          <RatingStar rating={offer.rating} componentStyle='card' />
        </div>
        <h2 className="place-card__name">
          <Link to={linkToOffer}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article >

  );
});

OfferCard.displayName = 'OfferCard';
export default OfferCard;
