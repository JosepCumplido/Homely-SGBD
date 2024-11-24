// src/controllers/home.controller.ts
import {Request, Response} from 'express';
import {HomeRepository} from './HomeRepository';
import {HomeRepositoryElastic} from "./HomeRepositoryElastic";
import {Home} from "shared/models/home";
import {SearchRequest, SearchResponse} from 'shared/data/searchRequest';

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
        try {
            const home = await this.homeRepository.findById(Number(req.params.id));
            if (home) {
                res.json(home);
            } else {
                res.status(404).send('Home not found');
            }
        } catch (err) {
            res.status(500).send('Error retrieving home');
        }
    }

    async createHome(req: Request, res: Response): Promise<void> {
        try {
            const newHome = req.body;
            await this.homeRepository.create(newHome);
            res.status(201).send('Home created');
        } catch (err) {
            res.status(500).send('Error creating home');
        }

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

        const {index, id} = req.params;
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

        const {id} = req.params;
        try {
            const response = await this.homeRepositoryElastic.deleteHome(id);
            res.json(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async bulkCreateHomes(req: Request, res: Response): Promise<any> {
        /*const homes: Home[] = req.body;*/

        const cities = ["New York", "Barcelona", "Tokyo", "Berlin", "London", "Paris", "Rome", "Los Angeles", "Sydney", "Dubai"];
        const countries = ["USA", "Spain", "Japan", "Germany", "UK", "France", "Italy", "Australia", "UAE"];

        const featureTypes = [
            {
                label: "Kitchen",
                features: ["Oven", "Microwave", "Dishwasher", "Refrigerator", "Freezer", "Utensils and dishware", "Electric kettle", "Toaster", "Coffee machine"]
            },
            {
                label: "Bathroom",
                features: ["Hairdryer", "Shower", "Bathtub", "Towel warmer", "Towels included", "Accessible bathroom", "Bidet", "Toiletries"]
            },
            {label: "Bedroom", features: ["King-size bed", "Individual beds"]},
            {
                label: "Living areas",
                features: ["TV", "Dedicated workspace", "Hardwood flooring", "Carpet flooring", "Balcony", "Terrace", "Private garden"]
            },
        ];

        const amenityTypes = [
            {label: "Comfort", amenities: ["Air conditioning", "Heating", "Soundproofing", "Fireplace"]},
            {
                label: "Conveniences",
                amenities: ["Wi-Fi", "High-speed internet", "Satellite TV", "Washer", "Dryer", "Ironing board", "Vacuum and cleaning tools", "Private parking available", "Elevator"]
            },
            {
                label: "Security and safety",
                amenities: ["Reception or concierge", "Surveillance or cameras", "Alarm", "Smoke detector", "Monoxide detector", "Fire extinguisher", "First aid kit"]
            },
            {
                label: "Additional services",
                amenities: ["Gym", "Pool", "Spa or sauna", "BBQ area", "Meal service", "Green spaces", "Children's play area", "Crib"]
            },
        ];

        // Funció per generar un número aleatori entre dos valors
        function randomInt(min: number, max: number) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Funció per seleccionar elements aleatoris d'una llista
        function randomSelection(array: string[], count: number) {
            const selected: string[] = [];
            while (selected.length < count) {
                const item = array[randomInt(0, array.length - 1)];
                if (!selected.includes(item)) selected.push(item);
            }
            return selected;
        }

        // Funció per generar un objecte aleatori `Home`
        function generateRandomHome(id: number) {
            return {
                city: cities[randomInt(0, cities.length - 1)],
                country: countries[randomInt(0, countries.length - 1)],
                pricePerNight: randomInt(50, 500),
                score: /*parseFloat((Math.random() * 5).toFixed(1)),*/ id,
                features: featureTypes.flatMap(ft => randomSelection(ft.features, randomInt(1, ft.features.length))),
                amenities: amenityTypes.flatMap(at => randomSelection(at.amenities, randomInt(1, at.amenities.length))),
            };
        }

        // Genera una llista de 50 objectes `Home` i imprimeix-la en format JSON
        const homes = Array.from({length: 30}, (_, index) => generateRandomHome(index));

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
        try {
            const request = req.body as SearchRequest
            const page: number = request.page
            const size: number|null = request.size
            const city: string | null = request.city
            const country: string | null = request.country
            const priceRange: number[] = request.priceRange
            const score: number | null = request.score
            const featuresList: string[] = request.featuresList
            const amenitiesList: string[] = request.amenitiesList

            const _size: number = size==null ? 1000 : size
            console.log("Page: " + page)
            console.log("Size: " + _size)
            console.log("City: " + city)
            console.log("Country: " + country)
            console.log("PriceRange: " + priceRange)
            console.log("Score: " + score)
            console.log("FeaturesList: " + featuresList)

            if (!Array.isArray(priceRange) || priceRange.length != 2) return res.status(400).send('Invalid price range: price range must be an array of two numbers.')
            if (priceRange[0] > priceRange[1]) return res.status(400).send('Invalid price range: starting price cannot be greater than ending price.')

            return this.homeRepositoryElastic.searchHomes(page, _size, city, country, priceRange, score, featuresList, amenitiesList)
                .then(response => res.status(200).json(response))
                .catch(error => res.status(error.status).send(error.error))

        } catch (e) {
            console.log("Bad request format:" + e)
            return res.status(400).send("Bad request format")
        }
    }
}