import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { logInAction } from '../../store/api-actions';
import { AuthorizationStatus } from '../../const';
import { useNavigate } from 'react-router-dom';
import { getCurrentCity } from '../../store/offers-list-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { useEffect } from 'react';

function LoginPage(): JSX.Element {
  const currentCity = useAppSelector(getCurrentCity);
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordIsValid = (pass: string): boolean => {
    const hasLetter = /\w/.test(pass);
    const hasDigit = /\d/.test(pass);
    return hasLetter && hasDigit;
  };

  const handleEmailFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (passwordIsValid(password)) {
      dispatch(logInAction({ email, password }));
    }
    event.preventDefault();
  };


  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  }, [authorizationStatus, navigate]);

  return (
    <>
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>

      <div className="page page--gray page--login">
        <Header />
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action="#" method="post">
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input onChange={handleEmailFieldChange} className="login__input form__input" type="email" name="email" placeholder="Email" required />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input onChange={handlePasswordFieldChange} className="login__input form__input" type="password" name="password" placeholder="Password" required />
                </div>
                <button onClick={handleFormSubmit} className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to={AppRoute.Root}>
                  <span>{currentCity}</span>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default LoginPage;
