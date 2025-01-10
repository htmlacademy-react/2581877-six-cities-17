import { store } from './store';

export type HousingType = 'Apartament' | 'Room';

export type OfferLocation = {
  lat: number;
  lng: number;
}

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  name: string;
  location: Location;
}

export const ОfferCities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
export type OfferCity = typeof ОfferCities[number];

export type OfferСonvenience = 'Wi-Fi' | 'Washing machine' | 'Towels' | 'Heating' | 'Coffee machine' | 'Baby seat' | 'Kitchen' | 'Dishwasher' | 'Cabel TV' | 'Fridge';
export type OfferConveniences = OfferСonvenience[];

export type Review = {
  id: number;
  text: string;
  rating: number;
  date: Date;
}

export type OfferPreview = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export type Offer = {
  id: number;
  city: OfferCity;
  title: string;
  price: number;
  rating: number;
  housingType: HousingType;
  isMarked: boolean;
  isPremium: boolean;
  location: Location;
  images: string[];
  titleImage: string;
  conveniences: OfferConveniences;
  roomsCount: number;
  maxAdult: number;
  nearbyOffersId: number[];
}

export type MapStartPosition = {
  center: Location;
  zoom: number;
}

export type CitiesMapStartPosition = {
  [K in typeof ОfferCities[number]]: MapStartPosition
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
