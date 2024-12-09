export type Reservation = {
    start_date: Date;
    end_date: Date;
    city: string,
    country: string,
    fromDate: Date,
    toDate: Date,
    imageUrl: string,
    pricePerNight: number,
    numberOfGuests: number
}