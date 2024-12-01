import * as React from "react";
import { Chat } from "shared/models/chat";

export function ChatsList({ chatsList, currentUsername, onSelectChat }: { chatsList: Chat[], currentUsername: string | null, onSelectChat: (chat: Chat) => void }) {

    const handleChatClick = (chat: Chat) => {
        onSelectChat(chat);
    };

    return (
        <aside className="w-1/3 bg-gray-50 border-r">
            <div className="p-4 border-b flex items-center justify-between">
                <h1 className="text-2xl font-bold">Tus Chats</h1>
                <button
                    onClick={() => window.location.href = "http://localhost:3000/profile"}
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                    Volver
                </button>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-73px)]">
                {chatsList.length > 0 ? (
                    chatsList.map((chat) => {
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
