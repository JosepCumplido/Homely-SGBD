export type Chat = {
    chatId: number,        // Identificador único del chat
    user1: string,         // Nombre de usuario del primer participante
    user2: string,         // Nombre de usuario del segundo participante
    createdAt: string,     // Fecha y hora de creación del chat
    lastMessage: string,   // Último mensaje en el chat (opcional, depende de cómo lo manejes)
    updatedAt: string,     // Fecha y hora de la última actualización del chat
};
