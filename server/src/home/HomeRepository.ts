
import { ConnectionPool } from 'mssql';
import {Home} from 'shared/models/home';

export class HomeRepository {
    private db: ConnectionPool;

    constructor(db: ConnectionPool) {
        this.db = db;
    }

    /*async findAll(): Promise<Home[]> {
        const result = await this.db.request().query('SELECT * FROM [Home]');
        return result.recordset;
    }*/

    async findById(id: number): Promise<Home | null> {
        try {
            const result = await this.db.request()
                .input('id', id)
                .query('SELECT * FROM [Home] WHERE id = @id');

            if (result.recordset.length > 0) {
                const home = result.recordset[0];

                // Parsejar JSON per a imagesUrls si és una cadena
                const parseJson = (field: string | null): string[] =>
                    field ? JSON.parse(field) : [];

                return {
                    ...home,
                    imagesUrls: parseJson(home.imagesUrls),
                    features: home.features ? home.features.split(', ') : [],
                    amenities: home.amenities ? home.amenities.split(', ') : [],
                    categories: home.categories ? home.categories.split(', ') : [],
                } as Home;
            } else {
                return null;
            }
        } catch (error) {
            console.error(`Error retrieving home with ID ${id}:`, error);
            throw new Error('Error retrieving home');
        }
    }

    async create(home: Home): Promise<Home|null> {
        try{
            const result = await this.db.request()
                .input('city', home.city)
                .input('country', home.country)
                .input('imagesUrls', JSON.stringify(home.imagesUrls))  // Convertim a JSON
                .input('pricePerNight', home.pricePerNight)
                .input('score', home.score)
                .input('features', JSON.stringify(home.features))     // Convertim a JSON
                .input('amenities', JSON.stringify(home.amenities))   // Convertim a JSON
                .input('categories', JSON.stringify(home.categories))
                .input('hostUsername', home.hostUsername)
                .input('maxGuests', home.maxGuests)
                .query(`
                    INSERT INTO [Home] (city, country, imagesUrls, pricePerNight, score, features, amenities, categories, hostUsername, maxGuests)
                    OUTPUT INSERTED.*
                    VALUES (@city, @country, @imagesUrls, @pricePerNight, @score, @features, @amenities, @categories, @hostUsername, @maxGuests)
                `);
            return result.recordset[0]
        } catch (error) {
            console.log("Error inserting home: " + error);
            return null
        }
    }
/*
    async update(user: Home): Promise<void> {
        await this.db.request()
            .input('id', user.id)
            .input('name', user.name)
            .query(`UPDATE [Home] SET name = @name WHERE id = @id`);
    }

    async delete(id: number): Promise<void> {
        await this.db.request()
            .input('id', id)
            .query('DELETE FROM [Home] WHERE id = @id');
    }*/
}