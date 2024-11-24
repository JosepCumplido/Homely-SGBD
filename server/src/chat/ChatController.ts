// ChatController.ts
import { Request, Response } from 'express';
import { ChatRepository } from './ChatRepository';
import { MessageRepository } from './MessageRepository';

export class ChatController {
    private chatRepository: ChatRepository;
    private messageRepository: MessageRepository;

    constructor(chatRepository: ChatRepository, messageRepository: MessageRepository) {
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
    }

    // Obtener los chats de un usuario específico
    async getChatsByUser(req: Request, res: Response): Promise<Response> {
        try {
            const username = req.query.username as string;
            if (!username) {
                return res.status(400).send('Username is required');
            }

            const chats = await this.chatRepository.findByUsername(username);
            return res.json(chats); // Asegúrate de retornar una respuesta
        } catch (err) {
            return res.status(500).send('Error retrieving chats');
        }
    }

    // Obtener los mensajes de un chat específico
    async getMessagesByChatId(req: Request, res: Response): Promise<void> {
        try {
            const chatId = Number(req.params.chatId);
            const messages = await this.messageRepository.findMessagesByChatId(chatId);
            res.json(messages);
        } catch (err) {
            res.status(500).send('Error retrieving messages');
        }
    }

    // Crear un nuevo mensaje
    async sendMessage(req: Request, res: Response): Promise<void> {
        try {
            const { content, senderUsername } = req.body;
            const chatId = Number(req.params.chatId);

            const newMessage = await this.messageRepository.createMessage(chatId, senderUsername, content);
            res.status(201).json(newMessage);
        } catch (err) {
            res.status(500).send('Error sending message');
        }
    }
}
