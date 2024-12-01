import * as React from "react";
import { Chat } from 'shared/models/chat';
import { Message } from "shared/models/message";
import { useEffect, useState } from "react";
import useUsername from "@/hooks/useUsername";

export function ChatContent({ chat }: { chat: Chat | null }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const { loggedUsername } = useUsername();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:4000/chat/${chat?.chatId}/messages`);
                if (!response.ok) throw new Error('Error fetching messages');
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        if (chat?.chatId) fetchMessages();
    }, [chat]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            await fetch(`http://localhost:4000/chat/${chat?.chatId}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newMessage, senderUsername: loggedUsername }),
            });

            setNewMessage('');
            const response = await fetch(`http://localhost:4000/chat/${chat?.chatId}/messages`);
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
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
                                    <p
                                        className="text-xs font-bold mb-1"
                                    >
                                        {message.senderUsername}
                                    </p>
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
