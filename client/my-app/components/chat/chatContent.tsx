import * as React from "react";
import { useEffect, useState } from "react";
import { Chat } from "shared/models/chat";
import { Message } from "shared/models/message";
import { io } from "socket.io-client";
import useUsername from "@/hooks/useUsername";

const socket = io("http://localhost:4000"); // Conecta al servidor

export function ChatContent({ chat }: { chat: Chat | null }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const { loggedUsername } = useUsername();

    useEffect(() => {
        // Unirse a un chat específico
        if (chat?.chatId) {
            socket.emit("joinChat", chat.chatId);

            // Escuchar nuevos mensajes
            socket.on("newMessage", (message: Message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });
        }

        // Limpieza al desmontar el componente
        return () => {
            if (chat?.chatId) {
                socket.emit("leaveChat", chat.chatId);
                socket.off("newMessage");
            }
        };
    }, [chat]);

    useEffect(() => {
        // Cargar mensajes del chat desde el servidor
        const fetchMessages = async () => {
            if (!chat?.chatId) return;

            try {
                const response = await fetch(`http://localhost:4000/chat/${chat.chatId}/messages`);
                if (!response.ok) throw new Error('Error fetching messages');
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [chat]);

    const sendMessage = async () => {
        if (!newMessage.trim() || !chat?.chatId) return;

        // Enviar mensaje a través de WebSocket
        socket.emit("sendMessage", {
            chatId: chat.chatId,
            senderUsername: loggedUsername,
            content: newMessage,
        });

        setNewMessage(''); // Limpiar el campo de entrada
    };

    return (
        <main className="flex-1">
            <div className="flex flex-col h-full">
                {/* Lista de mensajes */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chat != null ? (
                        messages.map((message) => (
                            <div
                                key={message.messageId}
                                className={`flex ${
                                    message.senderUsername === loggedUsername ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                <div
                                    className={`max-w-xs p-3 rounded-lg ${
                                        message.senderUsername === loggedUsername
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-900'
                                    }`}
                                >
                                    <p className="text-xs font-bold mb-1">{message.senderUsername}</p>
                                    <p>{message.content}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">
                            <p>Selecciona un chat para empezar a conversar.</p>
                        </div>
                    )}
                </div>

                {/* Entrada de nuevo mensaje */}
                {chat != null && (
                    <div className="p-4 border-t">
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Escribe un mensaje..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1 border rounded p-2"
                            />
                            <button
                                onClick={sendMessage}
                                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
