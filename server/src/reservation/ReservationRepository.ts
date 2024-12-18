
import { ConnectionPool } from 'mssql';
import {Reservation} from 'shared/models/reservation';
import {AddReservationRequest} from "shared/data/reservationsRequest";

export class ReservationRepository {
    private db: ConnectionPool;

    constructor(db: ConnectionPool) {
        this.db = db;
    }

    async create(reservation: AddReservationRequest): Promise<Reservation|null> {
        try{
            const result = await this.db.request()
                .input('username', reservation.username)
                .input('homeId', reservation.homeId)
                .input('fromDate', reservation.fromDate)
                .input('toDate', reservation.toDate)
                .input('guests', reservation.guests)
                .input('totalPrice', reservation.totalPrice)
                .query(`
                    INSERT INTO [Reservations] (username, homeId, fromDate, toDate, guests, totalPrice)
                    OUTPUT inserted.id
                    VALUES (@username, @homeId, @fromDate, @toDate, @guests, @totalPrice)
                `);
            return result.recordset[0]
        } catch (error) {
            console.log("Error inserting reservation: " + error);
            return null
        }
    }
}