export enum HousingType {
    Apartament = 1,
    Room = 2,
}

export type OfferLocation = {
    lat: number;
    lon: number;
}

export type Offer = {
    id: number;
    title: string;
    price: number;
    rating: number;
    housingType: HousingType;
    isMarked: boolean;
    isPremium: boolean;
    location: OfferLocation;
    imageUrl: string;
}

