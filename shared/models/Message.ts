export type Message = {
    messageId: number;    // Identificador único del mensaje
    chatId: number;       // El chat al que pertenece el mensaje
    senderUsername: string; // Nombre de usuario del remitente
    content: string;      // El contenido del mensaje
    createdAt: string;    // Fecha y hora de la creación del mensaje
};
