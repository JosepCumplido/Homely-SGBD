import {Home} from "shared/models/home";
import {Client} from "@elastic/elasticsearch";
import {SearchResponse} from "shared/data/searchRequest";

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

    async getHomeById(id: number): Promise<Home | null> {
        try {
            console.log('Home ID:', id);
            const response = await this.client.search<Home>({
                index: 'home',
                query: {
                    term: {
                        id: id, // Busca pel camp personalitzat 'id'
                    },
                },
            });
            if (response.hits.hits.length > 0) {
                const home = response.hits.hits[0]._source;
                console.log('Home by ID:', home);
                return home as Home;
            } else {
                console.log(`No home found with ID ${id}`);
                return null;
            }
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

    async searchHomes(page: number, size: number, city: string|null, guestsNumber: number|undefined, category: string|null, priceRange: number[], featuresList: string[], amenitiesList: string[]) {
        try {
            const filters = []

            if (city != null) filters.push({ term: { city } });

            if (guestsNumber != undefined) {
                filters.push({
                    range: {
                        maxGuests: {
                            gte: guestsNumber,
                        }
                    }
                });
            }

            if (category != "all" && category != null) filters.push({ term: { categories: category } });

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

            const from = (page) * size
            const response = await this.client.search({
                index: 'home',
                size: size,
                from: from,
                query: {
                    bool: {
                        must: filters
                    }
                }
            });

            const body = response.hits.hits.map(hit => hit._source);

            let homes: Home[] = []
            if (body as Home[]) homes = body as Home[]
            console.log('Homes search result:', homes);

            return new SearchResponse(page, size, homes.length, homes)
        } catch (error) {
            console.error('Error retrieving all homes:', error);
            return [];
        }
    }
}