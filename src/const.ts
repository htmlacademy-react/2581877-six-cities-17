export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}


export enum OfferListStyle {
  Main = 'MAIN',
  Nearby = 'NEARBY',
}

export enum SortBy {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRrated = 'Top rated first',
}

export const APIRoutes = {
  root: '/',
  offersList: '/offers',
  login: '/login',
  logout: '/logout'
};

export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_ACTIVE = '/img/pin-active.svg';