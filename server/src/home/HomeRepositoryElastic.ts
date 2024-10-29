import client from '../config/elasticSearch';
import {Home} from "shared/models/home";
import {Client} from "@elastic/elasticsearch";

export class HomeRepositoryElastic {
    private client: Client

    constructor(client:Client) {
        this.client = client
    }

    async getAllHomes() {
        try {
            const response = await this.client.search({
                index: 'home',
                query: { match_all: {} }
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

    async populate(homes: Home[]): Promise<any> {
        const body = homes.flatMap(home => [
            { index: { _index: 'home' } },
            home
        ]);

        return await this.client.bulk({ refresh: true, body });
    }

    // filter by:
    //  - price range
    async searchHomes(priceRange: number[]) {
        try {
            const response = await this.client.search({
                index: 'home',
                query: {
                    bool: {
                        must: [
                            {
                                range: {
                                    pricePerNight: {
                                        gte: priceRange[0],
                                        lte: priceRange[1]
                                    }
                                }
                            }
                        ]
                    }
                }
            });
            const homes = response.hits.hits.map((hit) => hit._source);
            console.log('All Homes:', homes);
            return homes;
        } catch (error) {
            console.error('Error retrieving all homes:', error);
            return [];
        }
    }
}