
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

    async findByUsername(username: string): Promise<User | null> {
        const result = await this.db.request()
            .input('username', username)
            .query('SELECT * FROM [User] WHERE username = @username');
        return result.recordset[0] || null;
    }

    async updateProfile(username: string, email: string): Promise<User> {
        // Ejecutamos la consulta SQL para actualizar solo el email
        const result = await this.db.request()
            .input('username', username)
            .input('email', email)
            .query('UPDATE [User] SET email = @email WHERE username = @username');

        console.log('Rows affected by update:', result.rowsAffected); // Log para depuración

        if (result.rowsAffected[0] > 0) {
            // Si se actualizó el usuario, lo buscamos de nuevo para obtener los datos actualizados
            const updatedUser = await this.findByUsername(username);
            if (!updatedUser) {
                throw new Error("User not found after update");
            }
            return updatedUser;
        } else {
            throw new Error("User update failed");
        }
    }

    async updatePassword(username: string, newPassword: string): Promise<User> {
        const result = await this.db.request()
            .input('username', username)
            .input('newPassword', newPassword)
            .query('UPDATE [User] SET password = @newPassword WHERE username = @username');

        if (result.rowsAffected[0] > 0) {
            const updatedUser = await this.findByUsername(username);

            if (!updatedUser) {
                throw new Error("User not found after password update");
            }

            return updatedUser;
        }

        throw new Error("Password update failed");
    }
}