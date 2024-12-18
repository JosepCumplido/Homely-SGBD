// src/controllers/home.controller.ts
import {Request, Response} from 'express';
import {ReservationRepository} from './ReservationRepository';

export class ReservationController {
    private reservationRepository: ReservationRepository;

    constructor(reservationRepository: ReservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    async createReservation(req: Request, res: Response): Promise<void> {
        try {
            const newReservation = req.body;
            await this.reservationRepository.create(newReservation);
            res.status(201).send('Reservation created');
        } catch (err) {
            res.status(500).send('Error creating reservation');
        }
    }
}