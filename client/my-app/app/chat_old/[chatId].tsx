'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ChatLayout from './layout';

interface Message {
    messageId: number;
    chatId: number;
    senderUsername: string;
    content: string;
    createdAt: string;
}

export default function ChatDetailPage() {
    const router = useRouter();
    const { chatId } = router.query;
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:4000/chat/${chatId}/messages`);
                if (!response.ok) throw new Error('Error fetching messages');
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        if (chatId) fetchMessages();
    }, [chatId]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            await fetch(`http://localhost:4000/chat/${chatId}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newMessage, senderUsername: username }),
            });

            setNewMessage('');
            const response = await fetch(`http://localhost:4000/chat/${chatId}/messages`);
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Lista de mensajes */}
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                    <div key={message.messageId} className="mb-4">
                        <p
                            className={`font-bold ${
                                message.senderUsername === username ? 'text-blue-600' : ''
                            }`}
                        >
                            {message.senderUsername}
                        </p>
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>

            {/* Entrada de nuevo mensaje */}
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
        </div>
    );
}

// Layout para esta página
ChatDetailPage.getLayout = function getLayout(page: React.ReactNode) {
    return <ChatLayout>{page}</ChatLayout>;
};
