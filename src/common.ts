import { AppRoute } from './const';

export const getLinkToOffer = (id: string): string => AppRoute.Offer.replace(':id', id);
export const replaceApiPath = (where: string, replacements: { [key: string]: string }): string =>
  Object.keys(replacements).reduce((acc, key) => (
    acc.replace(`{${key}}`, replacements[key])
  ), where);
export const upperCaseFirstLatter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
