import {Home} from "./home";

export type Reservation = {
    id: number;
    username: string;
    home: Home;
    fromDate: Date,
    toDate: Date,
    nights: number,
    totalPrice: number,
    numberOfGuests: number
}

export type ReservationDAO = {
    id: number;
    username: string;
    homeId: number;
    fromDate: Date,
    toDate: Date,
    guests: number,
    totalPrice: number,
    createdAt: Date,
}