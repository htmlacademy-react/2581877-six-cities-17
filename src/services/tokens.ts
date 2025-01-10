const AUTH_TOKEN_NAME = 'six-cities-token';

export type Token = string | null;

export const getToken = (): Token =>
  localStorage.getItem(AUTH_TOKEN_NAME) ?? null;

export const setToken = (token: Token): void => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_NAME, token);
  }
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_NAME);
};
