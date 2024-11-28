import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


enum HousingType {
  Apartament = 1,
  Room = 2,
}

type OfferLocation {
  lat: Number;
  lon: Number;
}

type Offer = {
  title: String;
  price: Number;
  rating: Number;
  housingType: HousingType;
  marked: boolean;
  location: OfferLocation;
}

let offers: Offer[] = [
  {
    title: 'Beautiful & luxurious apartment at great location',
    price: 120,
    rating: 4,
    housingType: HousingType.Apartament,
    marked: false,
    location: {lat: 0, lon: 0},
  
  },
  {
    title: 'Wood and stone place',
    price: 380,
    rating: 4,
    housingType: HousingType.Room,
    marked: false,
    location: {lat: 0, lon: 0},
  },
  {
    title: 'Canal View Prinsengracht',
    price: 132,
    rating: 4,
    housingType: HousingType.Apartament,
    marked: false,
    location: {lat: 0, lon: 0},
  },
  {
    title: 'Nice, cozy, warm big bed apartment',
    price: 180,
    rating: 5,
    housingType: HousingType.Apartament,
    marked: false,
    location: {lat: 0, lon: 0},
  },
  {
    title: 'Wood and stone place',
    price: 80,
    rating: 4,
    housingType: HousingType.Room,
    marked: false,
    location: {lat: 0, lon: 0},
  },
]

root.render(
  <React.StrictMode>
    <App offers = {offers} />
  </React.StrictMode>
);
