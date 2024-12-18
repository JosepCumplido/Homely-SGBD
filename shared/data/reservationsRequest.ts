import {Reservation} from "../models/reservation";

export class AddReservationRequest {
    constructor(
        public username: string,
        public homeId: number,
        public fromDate: Date,
        public toDate: Date,
        public guests: number,
        public totalPrice: number,
    ) {
    }
}

export class AddReservationResponse {
    constructor(
        public home: Reservation | null
    ) {
    }
}

export class ReservationsRequest {
    constructor() {}
}

export class ReservationsResponse {
    constructor(
        public upcomingReservations: Reservation[],
        public pastReservations: Reservation[],
    ) {}
}