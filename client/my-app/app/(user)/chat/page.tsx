'use client';

import {ChatsList} from "@/components/chat/chatsList";
import { Chat } from 'shared/models/chat';
import {useEffect, useState} from "react";
import useUsername from "@/hooks/useUsername";
import {ChatContent} from "@/components/chat/chatContent";

const ChatsPage = () => {

    const [chats, setChats] = useState<Chat[]>([]);
    const { loggedUsername } = useUsername();
    const [currentChat, setCurrentChat] = useState<Chat | null>(null);

    const onSelectChat = (chat: Chat) => {
        setCurrentChat(chat)
    }

    useEffect(() => {
        if (!loggedUsername) return;

        const fetchChats = async () => {
            try {
                const response = await fetch(`http://localhost:4000/chat?username=${loggedUsername}`);
                if (!response.ok) new Error('Error fetching chats');
                const data = await response.json();
                setChats(data);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchChats();
    }, [loggedUsername]);

    return (
        <div className="flex h-screen">
            {/* Panel Izquierdo: Lista de Chats */}
            <ChatsList chatsList={chats} currentUsername={loggedUsername} onSelectChat={onSelectChat} />
            {/* Panel Derecho: Contenido del chat */}
            <ChatContent chat={currentChat}/>
        </div>
    );
};

export default ChatsPage;
