import { AppRoute } from './const';

export const ratingToPercent = (rating: number, base: number = 5.0): string => `${Math.round(rating) * 100.0 / base}%`;
export const getLinkToOffer = (id: string): string => AppRoute.Offer.replace(':id', id);
export const replaceApiPath = (where: string, replacements: { [key: string]: string }): string =>
  Object.keys(replacements).reduce((acc, key) => (
    acc.replace(`{${key}}`, replacements[key])
  ), where);

