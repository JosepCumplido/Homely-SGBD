
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
    }

    async findById(id: number): Promise<Home | null> {
        const result = await this.db.request()
            .input('id', id)
            .query('SELECT * FROM [Home] WHERE id = @id');
        return result.recordset[0] || null;
    }

    async create(user: Home): Promise<void> {
        await this.db.request()
            .input('name', user.name)
            .query(`INSERT INTO [Home] (name) VALUES (@name)`);
    }

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