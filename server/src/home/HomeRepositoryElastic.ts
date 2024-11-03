import client from '../config/elasticSearch';
import {Home} from "shared/models/home";
import {Client} from "@elastic/elasticsearch";

export class HomeRepositoryElastic {
    private client: Client

    constructor(client: Client) {
        this.client = client
    }

    async getAllHomes() {
        try {
            const response = await this.client.search({
                index: 'home',
                size: 1000,
                query: {match_all: {}}
            });
            const homes = response.hits.hits.map((hit) => hit._source);
            console.log('All Homes:', homes);
            return homes;
        } catch (error) {
            console.error('Error retrieving all homes:', error);
            return [];
        }
    }

    async getHomeById(id: string) {
        try {
            const response = await this.client.get({
                index: 'home',
                id: id
            });
            console.log('Home by ID:', response._source);
            return response._source;
        } catch (error) {
            console.error(`Error retrieving home with ID ${id}:`, error);
            return null;
        }
    }

    async createHome(home: Home) {
        try {
            const response = await this.client.index({
                index: 'home',
                document: home
            });
            console.log('Document added:', response);
        } catch (error) {
            console.error('Error adding document:', error);
        }
    }

    // exemple de crida: await updateHome(id, { pricePerNight: 200 });
    async updateHome(id: string, updatedHome: Partial<Home>) {
        try {
            const response = await this.client.update({
                index: 'home',
                id: id,
                doc: updatedHome
            });
            console.log('Home updated:', response);
        } catch (error) {
            console.error(`Error updating home with ID ${id}:`, error);
        }
    }

    async deleteHome(id: string) {
        try {
            const response = await this.client.delete({
                index: 'home',
                id: id
            });
            console.log('Home deleted:', response);
        } catch (error) {
            console.error(`Error deleting home with ID ${id}:`, error);
        }
    }

    async populate(homes: any[]): Promise<any> {
        const body = homes.flatMap(home => [
            {index: {_index: 'home'}},
            home
        ]);

        return await this.client.bulk({refresh: true, body});
    }

    // filter by:
    //  - price range
    async searchHomes(city: string|null, country: string|null, priceRange: number[], score: number|null, featuresList: string[], amenitiesList: string[]) {
        try {
            const filters = []

            if (city != null) filters.push({ term: { city } });
            if (country != null) filters.push({ term: { country } });

            if (priceRange && priceRange.length === 2 && priceRange[0] <= priceRange[1]) {
                filters.push({
                    range: {
                        pricePerNight: {
                            gte: priceRange[0],
                            lte: priceRange[1]
                        }
                    }
                });
            }

            console.log("Filters: " + JSON.stringify(filters))

            if (score != null) filters.push({term: {score: score}});

            if (featuresList && featuresList.length > 0) {
                featuresList.map((feature) => (
                    filters.push({term:{features: feature}})
                ))
            }

            if (amenitiesList && amenitiesList.length > 0) {
                amenitiesList.map((amenity) => (
                    filters.push({term:{amenities: amenity}})
                ))
            }

            // Executa la consulta
            const body = await this.client.search({
                index: 'home', // Nom de la taula/índex
                size: 1000,
                query: {
                    bool: {
                        must: filters
                    }
                }
            });

            const homes = body.hits.hits.map(hit => hit._source);
            console.log('Homes search result:', homes);
            return homes;
        } catch (error) {
            console.error('Error retrieving all homes:', error);
            return [];
        }
    }
}