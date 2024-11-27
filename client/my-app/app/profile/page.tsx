'use client';

import {useState, useEffect, ChangeEvent} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/hooks/useAuth';
import jwt from 'jsonwebtoken';
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PasswordInput from "@/components/ui/password-input";
import {User} from "shared/models/user";

const defaultUser: User = {
    id: 0,
    username: '',
    email: '',
    name: '',
    surname: '',
    password: '',
    avatarUrl: '',
};

const ProfilePage = () => {
    const {isAuthenticated} = useAuth(); // Hook que verifica si el usuario está autenticado
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [newUser, setNewUser] = useState<User>(defaultUser);

    // Inicialitzem user
    useEffect(() => {
        if (userInfo !== null) {
            setNewUser(userInfo);
        }
    }, [userInfo]);

    const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [currentPassword, setCurrentPassword] = useState<string>('');  // Contraseña actual
    const [newPassword, setNewPassword] = useState<string>('');  // Nueva contraseña

    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decodedToken = jwt.decode(token) as { username: string };
                fetchUserProfile(decodedToken.username);
            } catch (error) {
                console.error('Error al decodificar el token:', error);
            }
        } else { router.push("/login")}

    }, [isAuthenticated, router]); // Solo se ejecuta una vez al montar el componente

    const fetchUserProfile = async (username: string) => {
        try {
            const response = await fetch(`http://localhost:4000/userByUsername/${username}`);
            if (!response.ok) throw new Error('Failed to fetch profile');
            const data = await response.json();
            setUserInfo(data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleChats = () => {
        router.push('/chats'); // Redirigeix a la pàgina de xats
    };

    /*return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6">
            {/!* Avatar grande *!/}
            <div>
                <Avatar className="w-32 h-32">
                    <AvatarImage src={avatarUrl || "default-avatar.png"} alt="User Avatar"/>
                    <AvatarFallback>{username ? username[0] : 'U'}</AvatarFallback>
                </Avatar>
            </div>

            {/!* Username *!/}
            <h1 className="text-3xl font-semibold">{userInfo.username}</h1>

            {/!* Botones de acción *!/}
            <div className="flex flex-col items-center space-y-4">

                <Button variant="outline" onClick={handleChats} className="w-40">
                    Xats
                </Button>

                {/!* Botón de Editar Perfil *!/}
                <Button variant="outline" onClick={handleEditProfile} className="w-40">
                    Editar Perfil
                </Button>

                {/!* Botón de Logout *!/}
                <Button variant="outline" onClick={handleLogout} className="w-40">
                    Logout
                </Button>
            </div>º
        </div>
    );*/

    return (
        <div className="w-[50vw] m-auto flex-1 lg:max-w-2xl overflow-y-scroll h-full pb-10 px-4">
            <form className="space-y-8">
                <div>
                    <h3 className="text-lg font-medium">Hi, Josep!</h3>
                    <p className="text-sm text-muted-foreground">
                        This is how others will see you on the site.
                    </p>
                </div>
                <div className={"flex flex-row gap-16 w-full"}>
                    <div className={"flex flex-col space-y-2"}>
                        <Avatar className="w-28 h-28">
                            <AvatarImage src={userInfo?.avatarUrl || "default-avatar.png"} alt="User Avatar"/>
                            <AvatarFallback>{userInfo?.username ? userInfo.username[0].toUpperCase() : 'U'}</AvatarFallback>
                        </Avatar>
                        <Button variant={"ghost"}>Upload image</Button>
                    </div>
                    <div className="space-y-2 w-full">
                        <Label htmlFor="username">Username</Label>
                        <Input disabled id="username" defaultValue={userInfo?.username ?? ""}/>
                    </div>
                </div>

                <div className={"flex flex-row gap-6"}>
                    <div className="space-y-2 w-full">
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" name="name" value={newUser.name ?? ""} onChange={handleUserChange}/>
                    </div>
                    <div className="space-y-2 w-full">
                        <Label htmlFor="surname">Surname</Label>
                        <Input type="text" id="surname" name="surname" value={newUser.surname ?? ""} onChange={handleUserChange}/>
                    </div>
                </div>

                <div className="space-y-2 w-full">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" name="email" value={newUser.email ?? ""} onChange={handleUserChange}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                        id="bio"
                        defaultValue="Hi!"
                        className="resize-none"
                    />
                    <p className="text-sm text-muted-foreground">
                        You can @mention other users and organizations to link to them.
                    </p>
                </div>
                <div className={"flex flex-row gap-4"}>
                    <Button type="submit">Save changes</Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Change password</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create new password</DialogTitle>
                                <DialogDescription>
                                    Input new password. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2 w-full">
                                    <Label htmlFor="password">Current password</Label>
                                    <Input id="password" placeholder={"Your current password"}/>
                                </div>
                                <div className="space-y-2 w-full">
                                    <PasswordInput/>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Change password</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </form>
        </div>
    )
};

export default ProfilePage;
