import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
    id: string;
    sender: string;
    content: string;
    createdAt: string;
}

const ChatDetailPage = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const router = useRouter();
    const { chatId } = router.query;

    // Carregar missatges del xat
    useEffect(() => {
        if (!chatId) return;

        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://88.223.95.53:4000/chats/${chatId}`);
                if (!response.ok) throw new Error('Error fetching messages');
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [chatId]);

    // Enviar un missatge nou
    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const response = await fetch(`http://88.223.95.53:4000/chats/${chatId}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newMessage }),
            });

            if (response.ok) {
                const sentMessage = await response.json();
                setMessages((prevMessages) => [...prevMessages, sentMessage]);
                setNewMessage('');
            } else {
                console.error('Error sending message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Missatges</h1>
            <div className="mb-6">
                {messages.map((message) => (
                    <div key={message.id} className="mb-4">
                        <p>
                            <strong>{message.sender}:</strong> {message.content}
                        </p>
                        <p className="text-xs text-gray-500">{new Date(message.createdAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
            <div className="flex">
                <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escriu un missatge"
                />
                <Button onClick={handleSendMessage}>Enviar</Button>
            </div>
        </div>
    );
};

export default ChatDetailPage;
