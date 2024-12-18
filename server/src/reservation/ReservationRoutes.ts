import {Router} from "express";
import {ReservationRepository} from "./ReservationRepository";
import {ReservationController} from "./ReservationController";
import express from 'express';
import {ConnectionPool} from "mssql";

const router = express.Router();

export function reservationRoutes(db: ConnectionPool): Router {
    const router = Router();
    const reservationRepository = new ReservationRepository(db);
    const reservationController = new ReservationController(reservationRepository);

    router.post('/', (req, res) => reservationController.createReservation(req, res));

    return router;
}
