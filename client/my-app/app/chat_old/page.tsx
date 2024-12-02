import ChatLayout from './layout';

export default function ChatsPage() {
    return (
        <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Selecciona un chat para empezar a conversar.</p>
        </div>
    );
}

// Layout para esta página
ChatsPage.getLayout = function getLayout(page: React.ReactNode) {
    return <ChatLayout>{page}</ChatLayout>;
};
