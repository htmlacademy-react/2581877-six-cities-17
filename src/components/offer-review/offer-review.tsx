import { Review } from '../../types';
import { ratingToPercent } from '../../common';


type OfferReviewProps = {
  review: Review;
}

function OfferReview({ review }: OfferReviewProps): JSX.Element {
  const dateFormatAttrubuteStyle = (date: Date): string => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getDate()}`;
  const dateFormatVisibleStyle = (date: Date): string => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const reviewDate = new Date(review.date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: ratingToPercent(review.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={dateFormatAttrubuteStyle(reviewDate)}>
          {dateFormatVisibleStyle(reviewDate)}
        </time>
      </div>
    </li>
  );
}

export default OfferReview;
