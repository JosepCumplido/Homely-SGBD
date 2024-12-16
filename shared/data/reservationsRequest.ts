import {Reservation} from "../models/reservation";

export class ReservationsRequest {
    constructor() {}
}

export class ReservationsResponse {
    constructor(
        public upcomingReservations: Reservation[],
        public pastReservations: Reservation[],
    ) {}
}