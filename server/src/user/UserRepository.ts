
import { ConnectionPool } from 'mssql';
import {User} from 'shared/models/user';

export class UserRepository {
    private db: ConnectionPool;

    constructor(db: ConnectionPool) {
        this.db = db;
    }

    async findAll(): Promise<User[]> {
        const result = await this.db.request().query('SELECT * FROM [User]');
        return result.recordset;
    }

    async findById(id: number): Promise<User | null> {
        const result = await this.db.request()
            .input('id', id)
            .query('SELECT * FROM [User] WHERE id = @id');
        return result.recordset[0] || null;
    }

    async create(user: User): Promise<void> {
        await this.db.request()
            .input('name', user.name)
            .query(`INSERT INTO [User] (name) VALUES (@name)`);
    }

    async update(user: User): Promise<void> {
        await this.db.request()
            .input('id', user.id)
            .input('name', user.name)
            .query(`UPDATE [User] SET name = @name WHERE id = @id`);
    }

    async delete(id: number): Promise<void> {
        await this.db.request()
            .input('id', id)
            .query('DELETE FROM [User] WHERE id = @id');
    }
}