
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
        return result.recordset[0] || null;  // Devuelve el primer usuario encontrado o null si no se encuentra
    }

    async updateProfile(username: string, newUsername: string, email: string): Promise<User> {
        // Ejecutamos la consulta SQL de actualización
        const result = await this.db.request()
            .input('username', username)
            .input('newUsername', newUsername)
            .input('email', email)
            .query('UPDATE [User] SET username = @newUsername, email = @email WHERE username = @username');

        // Comprobamos cuántas filas fueron afectadas
        console.log('Rows affected by update:', result.rowsAffected);  // Muestra las filas afectadas por la actualización
        if (result.rowsAffected[0] > 0) {
            // Si se actualizó el usuario, lo buscamos de nuevo para obtener los datos actualizados
            const updatedUser = await this.findByUsername(newUsername);
            if (!updatedUser) {
                // Si no se encontró el usuario actualizado, lanzamos un error
                throw new Error("User not found after update");
            }
            return updatedUser;  // Retornamos el usuario actualizado
        } else {
            // Si no se actualizó ningún usuario, lanzamos un error
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