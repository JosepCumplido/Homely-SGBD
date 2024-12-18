// ChatRepository.ts
import { ConnectionPool } from 'mssql';

export class ChatRepository {
    private db: ConnectionPool;

    constructor(db: ConnectionPool) {
        this.db = db;
    }

    async createChat(username1: string, username2: string) {
        const result = await this.db.request()
            .input('username1', username1)
            .input('username2', username2)
            .query('INSERT INTO Chat (user1, user2, createdAt) OUTPUT INSERTED.* VALUES (@username1, @username2, GETDATE())');
        return result.recordset[0];
    }

    async findChatByUsernames(username1: string, username2: string) {
        const result = await this.db.request()
            .input('username1', username1)
            .input('username2', username2)
            .query(`
                SELECT *
                FROM Chat
                WHERE (user1 = @username1 AND user2 = @username2)
                   OR (user1 = @username2 AND user2 = @username1)
            `);
        return result.recordset;
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
}
