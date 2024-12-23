export type HousingType = 'Apartament' | 'Room';


export type OfferLocation = {
  lat: number;
  lng: number;
}


export type OfferCity = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export type OfferСonvenience = 'Wi-Fi' | 'Washing machine' | 'Towels' |
  'Heating' | 'Coffee machine' | 'Baby seat' | 'Kitchen' | 'Dishwasher' | 'Cabel TV' | 'Fridge';

export type OfferConveniences = Set<OfferСonvenience>;

export type Review = {
  id: number;
  text: string;
  rating: number;
  date: Date;
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
  location: OfferLocation;
  images: string[];
  titleImage: string;
  conveniences: OfferConveniences;
  roomsCount: number;
  maxAdult: number;
}

export type MapStartPosition = {
  center: OfferLocation;
  zoom: number;
}
