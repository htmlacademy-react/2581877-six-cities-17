import { Action } from 'redux';
import { createAPI } from '../services/api';
import { OfferFull, OfferCity, OfferType, OfferPreview, Host, Location, Review, User } from '../types';
import { internet, lorem, datatype, date } from 'faker';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeHost = (): Host => ({
  name: internet.userName(),
  avatarUrl: internet.avatar(),
  isPro: false,
});

export const makeFakeUser = (): User => ({
  ...makeFakeHost(),
  email: internet.email(),
  token: '',
});

export const makeFakeLocation = (): Location => ({
  latitude: 0,
  longitude: 0,
  zoom: 15,
});

export const makeFakeOfferFull = (): OfferFull => {
  const city: OfferCity = 'Paris';
  const offerType: OfferType = 'room';
  return {
    id: datatype.uuid(),
    title: lorem.words(5),
    type: offerType,
    price: 0,
    city: {
      name: city,
      location: makeFakeLocation(),
    },
    location: makeFakeLocation(),
    isFavorite: false,
    isPremium: false,
    rating: 3,
    description: lorem.paragraphs(3),
    bedrooms: 3,
    goods: [],
    host: makeFakeHost(),
    images: [],
    maxAdults: 5,
  };
};

export const makeFakeOfferPreview = (): OfferPreview => {
  const city: OfferCity = 'Paris';
  const offerType: OfferType = 'room';
  return {
    id: datatype.uuid(),
    title: lorem.words(5),
    type: offerType,
    price: 0,
    city: {
      name: city,
      location: makeFakeLocation(),
    },
    location: makeFakeLocation(),
    isFavorite: false,
    isPremium: false,
    rating: 0,
    previewImage: '',
  };
};

export const makeFakeOfferReview = (): Review => ({
  id: datatype.uuid(),
  date: date.past(),
  user: makeFakeHost(),
  comment: lorem.words(50),
  rating: 0,
});


