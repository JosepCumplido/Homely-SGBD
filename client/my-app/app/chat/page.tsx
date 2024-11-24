'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useUsername from '@/hooks/useUsername';

interface Chat {
    chatid: string;
    user1: string;
    user2: string;
    lastMessage: string;
    updatedAt: string;
}

const ChatsPage = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const router = useRouter();
    const { username } = useUsername(); // Obtenemos el username del hook
    console.log("Usuario2: " + username);

    // Verifica que `username` esté disponible antes de continuar
    useEffect(() => {
        if (!username) return; // Si no hay username, no hacemos nada

        const fetchChats = async () => {
            try {
                const response = await fetch(`http://localhost:4000/chat?username=${username}`);
                if (!response.ok) throw new Error('Error fetching chats');
                const data = await response.json();
                setChats(data); // Guardamos los chats obtenidos
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchChats(); // Llamamos a la función que obtiene los chats
    }, [username]); // Se ejecuta cada vez que `username` cambia

    const handleChatClick = (chatId: string) => {
        router.push(`/chat/${chatId}`);
    };

    if (chats.length === 0) {
        return <div>Carregant els teus xats...</div>; // Muestra un mensaje mientras se cargan los chats
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Xats</h1>
            {chats.map((chat) => {
                // Filtra el participante que no es el usuario logueado
                const otherUser = chat.user1 === username ? chat.user2 : chat.user1;

                return (
                    <Card key={chat.chatid} className="mb-4" onClick={() => handleChatClick(chat.chatid)}>
                        <CardHeader>
                            <CardTitle>{otherUser}</CardTitle> {/* Muestra solo el otro usuario */}
                        </CardHeader>
                        <CardContent>
                            <p>{chat.lastMessage}</p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default ChatsPage;
