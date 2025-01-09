
import { useState } from 'react';
import React from 'react';
import { Review } from '../../types';
import { User } from '../../types';
import { useAppDispatch } from '../../hooks';
import { pushNewReviewsAction } from '../../store/api-actions';
import { v4 as uuid } from 'uuid';

type OfferReviewSubmitProps = {
  user: User;
  offerId: string;
}

function OfferReviewSubmit({offerId, user}: OfferReviewSubmitProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(-1);

  const handleRtingFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ratingValue = Number(event.target.value);
    setRating(ratingValue);
  };

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const commentValue = event.target.value;
    setComment(commentValue);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    const newReview: Review = {
      id: uuid(),
      comment: comment.replace(/\s+/g, ' ').trim(),
      rating,
      date: new Date().toISOString(),
      user,
    };
    event.preventDefault();
    dispatch(pushNewReviewsAction({review: newReview, offerId}));
    setComment('');
    setRating(-1);
  };

  const formIsValid = (): boolean => (comment.length > 50) && (comment.length < 300) && (rating > 0);
  const getRadionLabelId = (labelRating: number): string => `${labelRating}-star`;

  const RatingStar = (props: { rating: number }) => (
    <React.Fragment>
      <input onChange={handleRtingFieldChange} checked={props.rating === rating} className="form__rating-input visually-hidden" name="rating" value={props.rating} id={getRadionLabelId(props.rating)} type="radio" />
      <label htmlFor={getRadionLabelId(props.rating)} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </React.Fragment>

  );


  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <RatingStar rating={5} />
        <RatingStar rating={4} />
        <RatingStar rating={3} />
        <RatingStar rating={2} />
        <RatingStar rating={1} />
      </div>
      <textarea onChange={handleTextFieldChange} value={comment} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button onClick={handleFormSubmit} className="reviews__submit form__submit button" type="submit" disabled={formIsValid() === false}>Submit</button>
      </div>
    </form>
  );
}

export default OfferReviewSubmit;
