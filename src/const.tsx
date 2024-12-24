import { MapStartPosition } from './types';

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


export const mapStartPosition: MapStartPosition = {
  center: { lat: 52.3809553943508, lng: 4.8936781654840 },
  zoom: 10,
};

export enum OfferListStyle {
  Main = 'MAIN',
  Nearby = 'NEARBY',
}

export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_ACTIVE = '/img/pin-active.svg';
