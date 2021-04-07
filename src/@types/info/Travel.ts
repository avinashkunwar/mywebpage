export interface PlaceInterface {
    title: string;
    longitude: number;
    latitude: number;
};

export interface PictureInterface {
    img: string;
    title: string;
    cols: number;
};

export interface TravelInterface {
    title: string;
    description: string;
    caption: string;
    places: Array<PlaceInterface>;
    mainPlaces: Array<PlaceInterface>;
    pictures: Array<PictureInterface>;
};