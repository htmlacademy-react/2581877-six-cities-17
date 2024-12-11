import { AppRoute } from './const';

export const ratingToPercent = (rating: number, base: number = 5.0): number => rating * 100.0 / base;

export const getLinkToOffer = (id: number): string => AppRoute.Offer.replace(':id', id.toString());
