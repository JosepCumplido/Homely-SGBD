import * as React from "react";
import { Chat } from "shared/models/chat";
import { io } from "socket.io-client";

// Conexió al servidor Socket.IO
const socket = io("http://localhost:4000");

export function ChatsList({chatsList, currentUsername ,onSelectChat}: {
    chatsList: Chat[];
    currentUsername: string | undefined;
    onSelectChat: (chat: Chat) => void;
}) {
    // Estat per a la llista de xats, inicialitzat amb chatsList si està disponible
    const [chats, setChats] = React.useState<Chat[]>(chatsList);

    // Funció per a seleccionar un xat
    const handleChatClick = (chat: Chat) => {
        onSelectChat(chat);
    };

    // Socket.IO: escoltar per les actualitzacions dels xats
    React.useEffect(() => {
        // Si la llista de xats és buida al principi, assegura't que estigui inicialitzada
        setChats(chatsList);

        // Escoltar el missatge d'actualització del xat
        socket.on("chatUpdated", (updatedChat: Chat) => {
            console.log("Chat actualitzat:", updatedChat);

            // Actualitzar l'últim missatge del xat a la llista
            setChats((prevChats) =>
                prevChats.map((chat) =>
                    chat.chatId === updatedChat.chatId ? updatedChat : chat
                )
            );
        });

        // Netejar l'escoltador quan el component es desmunta
        return () => {
            socket.off("chatUpdated");
        };
    }, [chatsList]); // Assegura't que l'efecte es reexecuti si `chatsList` canvia

    return (
        <aside className="w-1/3 bg-gray-50 border-r">
            <div className="p-4 border-b flex items-center justify-between">
                <h1 className="text-2xl font-bold">Tus Chats</h1>
                {/*<button
                    onClick={() => (window.location.href = "http://localhost:3000/profile")}
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                    Volver
                </button>*/}
            </div>
            <div className="overflow-y-auto h-[calc(100vh-73px)]">
                {chats.length > 0 ? (
                    chats.map((chat) => {
                        const otherUser = chat.user1 === currentUsername ? chat.user2 : chat.user1;

                        return (
                            <div
                                key={chat.chatId}
                                className="p-4 border-b cursor-pointer hover:bg-gray-100"
                                onClick={() => handleChatClick(chat)}
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
    );
}
