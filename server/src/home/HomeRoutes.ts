import {Router} from "express";
import {HomeController} from "./HomeController";
import {HomeRepository} from "./HomeRepository";
import express from 'express';
import {ConnectionPool} from "mssql";
import {HomeRepositoryElastic} from "./HomeRepositoryElastic";
import {Client} from "@elastic/elasticsearch";


const router = express.Router();

export function homeRoutes(db: ConnectionPool, client: Client): Router {
  const router = Router();
  const homeRepository = new HomeRepository(db);
  const homeRepositoryElastic = new HomeRepositoryElastic(client);
  const homeController = new HomeController(homeRepository, homeRepositoryElastic);

  router.get('/', (req, res) => homeController.getAllHomes(req, res));
  router.get('/:id', (req, res) => homeController.getHomeById(req, res));
  router.post('/', (req, res) => homeController.createHome(req, res));
  router.put('/:id', (req, res) => homeController.updateHome(req, res));
  router.delete('/:id', (req, res) => homeController.deleteHome(req, res));

  router.post('/populate', (req, res) => homeController.bulkCreateHomes(req, res))
  router.post('/search', (req, res) => homeController.searchHomes(req, res))

  return router;
}
