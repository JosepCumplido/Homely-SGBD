import {Router} from "express";
import {UserController} from "./UserController";
import {UserRepository} from "./UserRepository";
import express from 'express';
import {ConnectionPool} from "mssql";
import {authenticate} from '../config/auth'
import {HomeRepositoryElastic} from "../home/HomeRepositoryElastic";
import {Client} from "@elastic/elasticsearch";
import {HomeRepository} from "../home/HomeRepository";

const router = express.Router();

export function userRoutes(db: ConnectionPool, client: Client): Router {
  const router = Router();
  const userRepository = new UserRepository(db);
  const homeRepository = new HomeRepository(db)
  const userController = new UserController(userRepository, homeRepository);

  router.get('/', authenticate, (req, res) => userController.getAllUsers(req, res));
  router.get('/:id', authenticate, (req, res) => userController.getUserById(req, res));
  router.post('/', authenticate, (req, res) => userController.createUser(req, res));
  router.put('/:username', authenticate, (req, res) => userController.updateUser(req, res));
  router.delete('/:id', authenticate, (req, res) => userController.deleteUser(req, res));
  router.post('/login', (req, res) => userController.login(req, res));
  router.post('/signup', (req, res) => userController.signup(req, res));

  router.put('/profile/:username', authenticate, (req, res) => { userController.updateProfile(req, res) });
  router.put('/profile/:username/change-password', authenticate, (req, res) => { userController.changePassword(req, res) });

  router.get('/reservations/:username', (req, res) => { userController.getAllReservations(req, res) });

  return router;
}
