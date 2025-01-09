import { Review } from '../../types';
import { AuthorizationStatus } from '../../const';
import OfferReviewForm from '../offer-review-form/offer-review-form';
import OfferReview from '../offer-review/offer-review';
import { useAppSelector } from '../../hooks';
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { fetchReviewsAction } from '../../store/api-actions';
import { loadReviewsAction } from '../../store/actions';

type OfferReviewsListProps = {
  offerId: string;
}

function OfferReviewsList({offerId}: OfferReviewsListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);


  let reviewsList: Review[] = [];
  useEffect(() => {
    dispatch(fetchReviewsAction({ id: offerId }));
    return () => {
      dispatch(loadReviewsAction([]));
    };
  }, [dispatch, offerId]);
  reviewsList = useAppSelector((state) => state.reviews);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsList.length}</span></h2>
      <ul className="reviews__list">
        {reviewsList.map((review: Review) => (
          <OfferReview review={review} key={review.id} />
        ))}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth && user && <OfferReviewForm user={user} offerId={offerId}/>}
    </section>
  );
}

export default OfferReviewsList;
