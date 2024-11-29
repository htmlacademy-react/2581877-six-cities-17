import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Offer, HousingType } from './types';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const offers: Offer[] = [
  {
    id: 1,
    title: 'Beautiful & luxurious apartment at great location',
    price: 120,
    rating: 80,
    housingType: HousingType.Apartament,
    isMarked: false,
    isPremium: true,
    location: {lat: 0, lon: 0},
    imageUrl: 'img/apartment-01.jpg',
  },
  {
    id: 2,
    title: 'Wood and stone place',
    price: 80,
    rating: 80,
    housingType: HousingType.Room,
    isMarked: true,
    isPremium: false,
    location: {lat: 0, lon: 0},
    imageUrl: 'img/room.jpg',
  },
  {
    id: 3,
    title: 'Canal View Prinsengracht',
    price: 132,
    rating: 80,
    housingType: HousingType.Apartament,
    isMarked: false,
    isPremium: false,
    location: {lat: 0, lon: 0},
    imageUrl: 'img/apartment-02.jpg',
  },
  {
    id: 4,
    title: 'Nice, cozy, warm big bed apartment',
    price: 180,
    rating: 100,
    housingType: HousingType.Apartament,
    isMarked: false,
    isPremium: true,
    location: {lat: 0, lon: 0},
    imageUrl: 'img/apartment-03.jpg',
  },
  {
    id :5,
    title: 'Wood and stone place',
    price: 80,
    rating: 80,
    housingType: HousingType.Room,
    isMarked: true,
    isPremium: false,
    location: {lat: 0, lon: 0},
    imageUrl: 'img/room.jpg',
  },
];

root.render(
  <React.StrictMode>
    <App offers={offers}/>
  </React.StrictMode>
);
