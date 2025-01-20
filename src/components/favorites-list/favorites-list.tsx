import { Helmet } from 'react-helmet-async';
import { OfferCity, OfferPreview } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCategorizedFavorites } from '../../store/user-process/selectors';
import OfferCard from '../../components/offer-card/offer-card';
import { useNavigate } from 'react-router-dom';
import { filterByCity } from '../../store/offers-list-data/offers-list-data';
import { AppRoute } from '../../const';

export default function FavoritesList(): JSX.Element {
  const categorizedOffers = useAppSelector(getCategorizedFavorites);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const onCityLabelClick = (cityString: string) => {
    const cityName: OfferCity = cityString as OfferCity;
    dispatch(filterByCity(cityName));
    navigate(AppRoute.Root);
  };

  return (
    <>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(categorizedOffers).map(([cityName, offersInCity]: [string, OfferPreview[]]) => (
                <li className="favorites__locations-items" key={cityName}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" onClick={() => onCityLabelClick(cityName)}>
                        <span>{cityName}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {offersInCity.map((offer: OfferPreview) => (
                      <OfferCard key={offer.id} offer={offer} onHoverCallback={() => { }} cardStyle={'favorites'} />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}

