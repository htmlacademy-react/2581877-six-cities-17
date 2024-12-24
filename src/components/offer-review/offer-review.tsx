import { Review } from '../../types';
import { ratingToPercent } from '../../common';


type OfferReviewProps = {
  review: Review;
}

function OfferReview({review}: OfferReviewProps): JSX.Element {
  const reviewTimeFormat = (date: Date): string => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;


  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          Max
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${ratingToPercent(review.rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.text}</p>
        <time className="reviews__time" dateTime={reviewTimeFormat(review.date)}>{review.date.toLocaleDateString()}</time>
      </div>
    </li>
  );
}

export default OfferReview;
