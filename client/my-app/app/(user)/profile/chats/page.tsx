import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Chat {
    id: string;
    participants: string[];
    lastMessage: string;
    updatedAt: string;
}

const ChatsPage = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const router = useRouter();

    // Obté la llista de xats
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await fetch('http://localhost:4000/chats');
                if (!response.ok) throw new Error('Error fetching chats');
                const data = await response.json();
                setChats(data);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchChats();
    }, []);

    // Gestió de clic en un xat
    const handleChatClick = (chatId: string) => {
        router.push(`/profile/chats/${chatId}`); // Redirigeix a la pàgina de detall del xat
    };

    if (chats.length === 0) {
        return <div>Carregant els teus xats...</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Xats</h1>
            {chats.map((chat) => (
                <Card key={chat.id} className="mb-4" onClick={() => handleChatClick(chat.id)}>
                    <CardHeader>
                        <CardTitle>{chat.participants.join(', ')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{chat.lastMessage}</p>
                        <p className="text-xs text-gray-500">Últim missatge: {new Date(chat.updatedAt).toLocaleString()}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ChatsPage;
