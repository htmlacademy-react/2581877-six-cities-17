import cn from 'classnames';
import './rating-star.css';

type RatingStarProps = {
  componentStyle: 'place' | 'card' | 'review';
  rating: number;
}


export default function RatingStar({ componentStyle, rating }: RatingStarProps): JSX.Element {
  const ratingRounded = Math.round(rating);

  return (
    <div className=
      {
        cn('rating__stars', {
          ['place-card__stars']: componentStyle === 'card',
          ['offer__stars']: componentStyle === 'place',
          ['reviews__stars']: componentStyle === 'review',
        })
      }
    >
      <span className=
        {
          cn({
            ['star-0']: ratingRounded === 0,
            ['star-1']: ratingRounded === 1,
            ['star-2']: ratingRounded === 2,
            ['star-3']: ratingRounded === 3,
            ['star-4']: ratingRounded === 4,
            ['star-5']: ratingRounded === 5,
          })
        }
      >
      </span>
      <span className="visually-hidden">Rating</span>
    </div>
  );
}
