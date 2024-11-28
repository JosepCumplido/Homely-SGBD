'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useUsername from '@/hooks/useUsername';

interface Chat {
    chatid: number;
    user1: string;
    user2: string;
    lastMessage: string;
    updatedAt: string;
}

export default function ChatLayout({ children }: { children: ReactNode }) {
    const [chats, setChats] = useState<Chat[]>([]);
    const { username } = useUsername();
    const router = useRouter();

    useEffect(() => {
        if (!username) return;

        const fetchChats = async () => {
            try {
                const response = await fetch(`http://localhost:4000/chat?username=${username}`);
                if (!response.ok) throw new Error('Error fetching chats');
                const data = await response.json();
                setChats(data);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchChats();
    }, [username]);

    const handleChatClick = (chatId: number) => {
        router.push(`/chat/${chatId}`);
    };

    return (
        <div className="flex h-screen">
            {/* Panel Izquierdo: Lista de Chats */}
            <aside className="w-1/3 bg-gray-50 border-r">
                <div className="p-4 border-b">
                    <h1 className="text-2xl font-bold">Tus Chats</h1>
                </div>
                <div className="overflow-y-auto h-[calc(100vh-73px)]">
                    {chats.length > 0 ? (
                        chats.map((chat) => {
                            const otherUser = chat.user1 === username ? chat.user2 : chat.user1;

                            return (
                                <div
                                    key={chat.chatid}
                                    className="p-4 border-b cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleChatClick(chat.chatid)}
                                >
                                    <p className="font-semibold">{otherUser}</p>
                                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center text-gray-500 p-4">No tienes chats aún.</p>
                    )}
                </div>
            </aside>

            {/* Panel Derecho: Contenido del chat */}
            <main className="flex-1">{children}</main>
        </div>
    );
}
