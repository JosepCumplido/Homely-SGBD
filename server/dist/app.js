"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mssql_1 = require("mssql");
const UserRoutes_1 = require("./user/UserRoutes");
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const HomeRoutes_1 = require("./home/HomeRoutes");
const elasticsearch_1 = require("@elastic/elasticsearch");
const cors_1 = __importDefault(require("cors"));
const ChatRoutes_1 = require("./chat/ChatRoutes");
const http_1 = require("http"); // Importar para crear un servidor HTTP
const socket_io_1 = require("socket.io"); // Importar socket.io
const MessageRepository_1 = require("./chat/MessageRepository");
const ChatRepository_1 = require("./chat/ChatRepository"); // Repositorio de mensajes
const app = (0, express_1.default)();
const port = 4000;
// Configurar CORS
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Permetre connexions del client
}));
app.use(express_1.default.json());
const db = new mssql_1.ConnectionPool(dbConfig_1.default);
const client = new elasticsearch_1.Client({ node: 'http://localhost:9200' });
// Crear un servidor HTTP a partir de Express
const server = new http_1.Server(app);
// Crear el servidor de WebSockets con Socket.IO
const io = new socket_io_1.Server(server, {
    cors: { origin: 'http://localhost:3000' }, // Permitir conexiones desde el cliente
});
// Conexión a la base de datos
db.connect().then(() => {
    console.log('Connected to SQL Server');
    app.use('/user', (0, UserRoutes_1.userRoutes)(db, client));
    app.use('/home', (0, HomeRoutes_1.homeRoutes)(db, client));
    app.use('/chat', (0, ChatRoutes_1.chatRoutes)(db));
    // Configurar eventos de WebSocket
    io.on('connection', (socket) => {
        console.log('Cliente conectado:', socket.id);
        // Escuchar cuando un cliente se une a un chat
        socket.on('joinChat', (chatId) => {
            socket.join(`chat_${chatId}`);
            console.log(`Cliente se unió al chat: chat_${chatId}`);
        });
        // Escuchar y propagar mensajes enviados
        socket.on('sendMessage', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { chatId, senderUsername, content } = data;
            const messageRepository = new MessageRepository_1.MessageRepository(db);
            const chatRepository = new ChatRepository_1.ChatRepository(db);
            // Guarda el missatge a la base de dades
            const newMessage = yield messageRepository.createMessage(chatId, senderUsername, content);
            // Actualitza l'últim missatge del xat a la base de dades
            const updatedChat = yield chatRepository.updateLastMessage(chatId, content);
            // Notifica tots els usuaris al xat de l'arribada del nou missatge
            io.to(`chat_${chatId}`).emit('newMessage', newMessage);
            // Notifica als clients de l'actualització de la llista de xats
            io.emit('chatUpdated', updatedChat);
        }));
        // Desconexión del cliente
        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });
    // Iniciar el servidor HTTP + WebSocket
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((err) => {
    console.error('Database connection failed: ', err);
});
