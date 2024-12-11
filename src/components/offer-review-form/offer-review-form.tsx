
import { useState } from 'react';
import React from 'react';
import { Review } from '../../types';

const emprtyReview: Review = {
  text: '',
  rating: 0,
  date: new Date(0),
  id: -1,
};


type OfferReviewSubmitProps = {
  addReviewCallback: (newReview: Review) => void;
}

function OfferReviewSubmit({ addReviewCallback }: OfferReviewSubmitProps): JSX.Element {
  const [newReview, setNewReview] = useState(emprtyReview);

  const handleRtingFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rating = Number(event.target.value);
    setNewReview({ ...newReview, rating });
  };

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    setNewReview({ ...newReview, text });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let { text, date} = newReview;
    date = new Date();
    text = text.replace(/\s+/g, ' ').trim();
    addReviewCallback({...newReview, date, text});
    setNewReview(emprtyReview);
  };

  const formIsValid = (): boolean => (newReview.text.length > 50) && (newReview.rating > 0);
  const getRadionLabelId = (rating: number): string => `${rating}-star`;

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((rating: number, key: number) => (
          <React.Fragment key={key} >
            <input onChange={handleRtingFieldChange} checked={newReview.rating === rating} className="form__rating-input visually-hidden" name="rating" value={rating} id={getRadionLabelId(rating)} type="radio" />
            <label htmlFor={getRadionLabelId(rating)} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}

      </div>
      <textarea onChange={handleTextFieldChange} value={newReview.text} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
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
