import express from 'express';
import { ConnectionPool } from 'mssql';
import { userRoutes } from './user/UserRoutes';
import config from './config/dbConfig';
import { homeRoutes } from "./home/HomeRoutes";
import { Client } from "@elastic/elasticsearch";
import cors from 'cors';
import { chatRoutes } from "./chat/ChatRoutes";
import { Server as HttpServer } from 'http'; // Importar para crear un servidor HTTP
import { Server as SocketIOServer } from 'socket.io'; // Importar socket.io
import { MessageRepository } from './chat/MessageRepository';
import {ChatRepository} from "./chat/ChatRepository";
import {reservationRoutes} from "./reservation/ReservationRoutes"; // Repositorio de mensajes

const app = express();
const port = 4000;

// Configurar CORS
app.use(cors());

app.use(express.json());

const db = new ConnectionPool(config);
const client = new Client({node: 'http://194.164.72.178:9200'}); // servidor Joel

// Crear un servidor HTTP a partir de Express
const server = new HttpServer(app);
// Crear el servidor de WebSockets con Socket.IO
const io = new SocketIOServer(server);

// Conexión a la base de datos
db.connect().then(() => {
    console.log('Connected to SQL Server');

    app.use('/user', userRoutes(db, client));
    app.use('/home', homeRoutes(db, client));
    app.use('/chat', chatRoutes(db));
    app.use('/reservation', reservationRoutes(db));

    // Configurar eventos de WebSocket
    io.on('connection', (socket) => {
        console.log('Cliente conectado:', socket.id);

        // Escuchar cuando un cliente se une a un chat
        socket.on('joinChat', (chatId) => {
            socket.join(`chat_${chatId}`);
            console.log(`Cliente se unió al chat: chat_${chatId}`);
        });

        // Escuchar y propagar mensajes enviados
        socket.on('sendMessage', async (data) => {
            const { chatId, senderUsername, content } = data;
            const messageRepository = new MessageRepository(db);
            const chatRepository = new ChatRepository(db);

            // Guarda el missatge a la base de dades
            const newMessage = await messageRepository.createMessage(chatId, senderUsername, content);

            // Actualitza l'últim missatge del xat a la base de dades
            const updatedChat = await chatRepository.updateLastMessage(chatId, content);

            // Notifica tots els usuaris al xat de l'arribada del nou missatge
            io.to(`chat_${chatId}`).emit('newMessage', newMessage);

            // Notifica als clients de l'actualització de la llista de xats
            io.emit('chatUpdated', updatedChat);
        });

        // Desconexión del cliente
        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });

    // Iniciar el servidor HTTP + WebSocket
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

}).catch((err: any) => {
    console.error('Database connection failed: ', err);
});