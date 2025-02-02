
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

export enum SortOptions {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRrated = 'Top rated first',
}


export enum NewReviewStatus {
  Empty = 'empty',
  Pending = 'pending',
  Success = 'success',
  Error = 'error',
}


export enum APIRoute {
  OffersList = '/offers',
  Login = '/login',
  Logout = '/logout',
  Offer = '/offers/{offerId}',
  Nearby = '/offers/{offerId}/nearby',
  Review = '/comments/{offerId}',
  FavoriteStatus = '/favorite/{offerId}/{status}',
  Favorite = '/favorite',
}

export enum NameSpace {
  User = 'USER',
  OfferPreview = 'OFFERPREVIEW',
  OfferFull = 'OFFERFULL',
}

export const MarkerUrl = {
  Default: '/img/pin.svg',
  Active: '/img/pin-active.svg',
} as const;

export const CommentLenght = {
  Min: 50,
  Max: 300,
} as const;

export const GALLERY_IMAGES_MAX_COUNT = 6;
export const OFFERS_NEARBY_LIST_MAX_COUNT = 3;
export const OFFER_REVIEWS_MAX_COUNT = 10;
