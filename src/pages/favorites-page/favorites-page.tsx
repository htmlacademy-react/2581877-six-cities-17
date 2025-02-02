import { useAppSelector } from '../../hooks';
import { getFavoritesCount } from '../../store/user-process/selectors';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FavoritesList from '../../components/favorites-list/favorites-list';
import FavoritesListEmpty from '../../components/favorites-list-empty/favorites-list-empty';
import cn from 'classnames';

export default function FavoritesPage(): JSX.Element {
  const favoritsCount = useAppSelector(getFavoritesCount);

  return (
    <div className={cn('page', { ['page--favorites-empty']: favoritsCount === 0 })}>
      <Header />
      {favoritsCount > 0 ? <FavoritesList /> : <FavoritesListEmpty />}
      <Footer />
    </div>
  );
}

