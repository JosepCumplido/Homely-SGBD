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

    async createChat(req: Request, res: Response): Promise<void> {
        try {
            const { username1, username2 } = req.body;
            const existsChat = await this.chatRepository.findChatByUsernames(username1, username2)

            if (existsChat.length == 0) {
                const newChat = await this.chatRepository.createChat(username1, username2);
                res.status(201).send(newChat)
            } else res.status(401).send('Chat already exists');
        } catch (err) {
            res.status(500).send('Error sending message');
        }
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
            console.log("Chat id: " + chatId)
            const messages = await this.messageRepository.findMessagesByChatId(chatId);
            res.json(messages);
        } catch (err) {
            res.status(500).send(err + 'Error retrieving messages');
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
