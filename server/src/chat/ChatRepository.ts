// ChatRepository.ts
import { ConnectionPool } from 'mssql';

export class ChatRepository {
    private db: ConnectionPool;

    constructor(db: ConnectionPool) {
        this.db = db;
    }

    // Obtener todos los chats con los participantes
    async findAll() {
        const result = await this.db.request().query('SELECT * FROM Chat');
        return result.recordset;
    }

    // Obtener los chats de un usuario específico basado en el username
    async findByUsername(username: string) {
        const result = await this.db.request()
            .input('username', username)
            .query(`
                SELECT * FROM Chat
                WHERE user1 = @username OR user2 = @username
            `);
        return result.recordset;
    }
    async updateLastMessage(chatId: number, lastMessage: string) {
        // Actualitzem l'últim missatge del xat
        await this.db.request()
            .input('chatId', chatId)
            .input('lastMessage', lastMessage)
            .query(`
            UPDATE Chat
            SET lastMessage = @lastMessage
            WHERE chatId = @chatId
        `);

        // Recuperem el xat actualitzat amb el nou missatge
        const result = await this.db.request()
            .input('chatId', chatId)
            .query(`
            SELECT * FROM Chat
            WHERE chatId = @chatId
        `);

        return result.recordset[0] || null; // Retornem el xat actualitzat
    }

    // Obtener un chat específico por ID
    async findById(id: number) {
        const result = await this.db.request()
            .input('id', id)
            .query('SELECT * FROM Chat WHERE chatId = @id');
        return result.recordset[0] || null;
    }

    // Crear un nuevo chat
    async create(user1: string, user2: string) {
        const result = await this.db.request()
            .input('user1', user1)
            .input('user2', user2)
            .query('INSERT INTO Chat (user1, user2, createdAt) OUTPUT INSERTED.chatId VALUES (@user1, @user2, GETDATE())');
        return result.recordset[0];
    }
}
