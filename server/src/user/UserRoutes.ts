import {Router} from "express";
import {UserController} from "./UserController";
import {UserRepository} from "./UserRepository";
import express from 'express';
import {ConnectionPool} from "mssql";

const router = express.Router();

export function userRoutes(db: ConnectionPool): Router {
  const router = Router();
  const userRepository = new UserRepository(db);
  const userController = new UserController(userRepository);

  router.get('/user', (req, res) => userController.getAllUsers(req, res));
  router.get('/user/:id', (req, res) => userController.getUserById(req, res));
  router.post('/user', (req, res) => userController.createUser(req, res));
  router.put('/user/:id', (req, res) => userController.updateUser(req, res));
  router.delete('/user/:id', (req, res) => userController.deleteUser(req, res));

  return router;
}
