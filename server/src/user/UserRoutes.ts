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
  router.post('/login', (req, res) => userController.login(req, res));

  router.get('/user/profile/:username', (req, res) => { userController.getUserProfile(req, res) });
  router.put('/user/profile/:username', (req, res) => { userController.updateProfile(req, res) });
  router.put('/user/profile/:username/change-password', (req, res) => { userController.changePassword(req, res) });

  return router;
}
