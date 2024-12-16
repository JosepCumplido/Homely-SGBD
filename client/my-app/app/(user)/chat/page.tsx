'use client';

import {ChatsList} from "@/components/chat/chatsList";
import { Chat } from 'shared/models/chat';
import {useEffect, useState} from "react";
import useUsername from "@/hooks/useUsername";
import {ChatContent} from "@/components/chat/chatContent";
import {useAuth} from "@/context/authContext";
import {useRouter} from "next/navigation";

const ChatsPage = () => {

    const {token, user, login, isAuthenticated} = useAuth();
    const router = useRouter();

    const [chats, setChats] = useState<Chat[]>([]);
    const [currentChat, setCurrentChat] = useState<Chat | null>(null);

    const onSelectChat = (chat: Chat) => {
        setCurrentChat(chat)
    }

    useEffect(() => {
        console.log(`Logged username: ${user?.username}`)
        if (!isAuthenticated) return;

        const fetchChats = async () => {
            try {
                const response = await fetch(`http://localhost:4000/chat?username=${user?.username}`);
                if (!response.ok) new Error('Error fetching chats');
                const data = await response.json();
                console.log(`Chats: ${JSON.stringify(data)}`);
                setChats(data);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchChats();
    }, [user, isAuthenticated, router]);

    return (
        <div className="flex h-screen">
            {/* Panel Izquierdo: Lista de Chats */}
            <ChatsList chatsList={chats} currentUsername={user?.username} onSelectChat={onSelectChat} />
            {/* Panel Derecho: Contenido del chat */}
            <ChatContent chat={currentChat} loggedUsername={user?.username}/>
        </div>
    );
};

export default ChatsPage;
