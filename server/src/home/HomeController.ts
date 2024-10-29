// src/controllers/home.controller.ts
import { Request, Response } from 'express';
import { HomeRepository } from './HomeRepository';
import {HomeRepositoryElastic} from "./HomeRepositoryElastic";
import {Home} from "shared/models/home";

export class HomeController {
    private homeRepository: HomeRepository;
    private homeRepositoryElastic: HomeRepositoryElastic

    constructor(homeRepository: HomeRepository, homeRepositoryElastic: HomeRepositoryElastic) {
        this.homeRepository = homeRepository;
        this.homeRepositoryElastic = homeRepositoryElastic;
    }

    async getAllHomes(req: Request, res: Response): Promise<void> {
        /*try {
            const homes = await this.homeRepository.findAll();
            res.json(homes);
        } catch (err) {
            res.status(500).send('Error retrieving homes');
        }*/

        try {
            const response = await this.homeRepositoryElastic.getAllHomes();
            res.json(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getHomeById(req: Request, res: Response): Promise<void> {
        /*try {
            const home = await this.homeRepository.findById(Number(req.params.id));
            if (home) {
                res.json(home);
            } else {
                res.status(404).send('Home not found');
            }
        } catch (err) {
            res.status(500).send('Error retrieving home');
        }*/

        /*const { index, id } = req.params;
        try {
            const response = await this.homeRepositoryElastic.getHome(index, id);
            res.json(response);
        } catch (error) {
            res.status(500).send(error);
        }*/
    }

    async createHome(req: Request, res: Response): Promise<void> {
        /*try {
            const newHome = req.body;
            await this.homeRepository.create(newHome);
            res.status(201).send('Home created');
        } catch (err) {
            res.status(500).send('Error creating home');
        }*/

        try {
            const response = await this.homeRepositoryElastic.createHome(req.body);
            res.json(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async updateHome(req: Request, res: Response): Promise<void> {
        /*try {
            const updatedHome = req.body;
            await this.homeRepository.update(updatedHome);
            res.send('Home updated');
        } catch (err) {
            res.status(500).send('Error updating home');
        }*/

        const { index, id } = req.params;
        try {
            const response = await this.homeRepositoryElastic.updateHome(id, req.body);
            res.json(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async deleteHome(req: Request, res: Response): Promise<void> {
        /*try {
            await this.homeRepository.delete(Number(req.params.id));
            res.send('Home deleted');
        } catch (err) {
            res.status(500).send('Error deleting home');
        }*/

        const { id } = req.params;
        try {
            const response = await this.homeRepositoryElastic.deleteHome(id);
            res.json(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async bulkCreateHomes(req: Request, res: Response): Promise<any> {
        const homes: Home[] = req.body;

        if (!Array.isArray(homes) || homes.length === 0) {
            return res.status(400).send('Request body must be an array of homes');
        }

        try {
            const response = await this.homeRepositoryElastic.populate(homes);
            return res.status(201).json(response);
        } catch (error) {
            return res.status(500).send('Error creating homes in bulk');
        }
    }

    async searchHomes(req: Request, res: Response): Promise<any> {
        const priceRange: number[] = req.body

        if(!Array.isArray(priceRange) || priceRange.length != 2) return res.status(400).send('Invalid price range: price range must be an array of two numbers.')
        if(priceRange[0] > priceRange[1]) return res.status(400).send('Invalid price range: starting price cannot be greater than ending price.')
        try {
            const response = await this.homeRepositoryElastic.searchHomes(priceRange)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).send('Error searching homes')
        }
    }
}