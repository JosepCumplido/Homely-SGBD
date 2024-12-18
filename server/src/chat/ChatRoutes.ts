// ChatRoutes.ts
import { Router } from 'express';
import { ChatController } from './ChatController';
import { ChatRepository } from './ChatRepository';
import { MessageRepository } from './MessageRepository';
import { ConnectionPool } from 'mssql';

const router = Router();

export function chatRoutes(db: ConnectionPool): Router {
    const chatRepository = new ChatRepository(db);
    const messageRepository = new MessageRepository(db);
    const chatController = new ChatController(chatRepository, messageRepository);

    // Ruta para obtener los chats de un usuario específico
    router.get('/', (req, res, next) => {
        // Envolver la llamada al controlador
        chatController.getChatsByUser(req, res).catch(next);
    });

    router.put('/', (req, res) => chatController.createChat(req, res));

    // Rutas para obtener mensajes de un chat
    router.get('/:chatId/messages', (req, res) => chatController.getMessagesByChatId(req, res));

    // Ruta para enviar un mensaje
    router.post('/:chatId/messages', (req, res) => chatController.sendMessage(req, res));


    return router;
}
