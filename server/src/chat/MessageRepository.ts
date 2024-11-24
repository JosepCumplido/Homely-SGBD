import { ConnectionPool } from 'mssql';

export class MessageRepository {
    private db: ConnectionPool;

    constructor(db: ConnectionPool) {
        this.db = db;
    }

    // Obtener todos los mensajes de un chat por su chatId
    async findMessagesByChatId(chatId: number) {
        const result = await this.db.request()
            .input('chatId', chatId)
            .query('SELECT * FROM messages WHERE chatId = @chatId ORDER BY createdAt ASC');
        return result.recordset;
    }

    // Crear un nuevo mensaje
    async createMessage(chatId: number, senderUsername: string, content: string) {
        const result = await this.db.request()
            .input('chatId', chatId)
            .input('senderUsername', senderUsername)
            .input('content', content)
            .query('INSERT INTO messages (chatId, senderUsername, content, createdAt) OUTPUT INSERTED.* VALUES (@chatId, @senderUsername, @content, GETDATE())');
        return result.recordset[0];
    }
}
