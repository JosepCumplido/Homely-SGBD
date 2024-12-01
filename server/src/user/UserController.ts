// src/controllers/user.controller.ts
import {Request, Response} from 'express';
import {UserRepository} from './UserRepository';
import {User} from "shared/models/user";
import jwt from 'jsonwebtoken';

export class UserController {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userRepository.findAll();
            res.json(users);
        } catch (err) {
            res.status(500).send('Error retrieving users');
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userRepository.findById(Number(req.params.id));
            if (user) {
                res.json(user);
            } else {
                res.status(404).send('User not found');
            }
        } catch (err) {
            res.status(500).send('Error retrieving user');
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const newUser = req.body;
            await this.userRepository.create(newUser);
            res.status(201).send('User created');
        } catch (err) {
            res.status(500).send('Error creating user');
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const updatedUser = req.body;
            await this.userRepository.update(updatedUser);
            res.send('User updated');
        } catch (err) {
            res.status(500).send('Error updating user');
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            await this.userRepository.delete(Number(req.params.id));
            res.send('User deleted');
        } catch (err) {
            res.status(500).send('Error deleting user');
        }
    }

    async getUserProfile(req: Request, res: Response): Promise<Response> {
        const { username } = req.params;

        try {
            if (!username) {
                return res.status(400).json({ error: "Username is required" });
            }

            const user = await this.userRepository.findByUsername(username);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // Devuelve todos los datos relevantes
            return res.json({
                username: user.username,
                email: user.email,
                avatarUrl: user.avatarUrl, // Si necesitas esto
            });
        } catch (error) {
            console.error("Error retrieving user:", error);
            return res.status(500).json({ error: "Error retrieving user" });
        }
    }

    async changePassword(req: Request, res: Response): Promise<void> {
        const {username} = req.params;
        const {currentPassword, newPassword} = req.body;

        try {
            if (!currentPassword || !newPassword) {
                res.status(400).json({error: "Both current and new passwords are required"});
                return;
            }

            const user = await this.userRepository.findByUsername(username);
            if (!user) {
                res.status(404).json({error: "User not found"});
                return;
            }

            if (user.password !== currentPassword) {
                res.status(401).json({error: "Current password is incorrect"});
                return;
            }

            await this.userRepository.updatePassword(username, newPassword);

            res.status(200).json({message: "Password changed successfully"});
        } catch (error) {
            console.error("Error changing password:", error);
            res.status(500).json({error: "Server error changing password"});
        }
    }

    // Función para actualizar el perfil de un usuario
    async updateProfile(req: Request, res: Response): Promise<Response> {
        const { username } = req.params; // `username` sigue viniendo de los parámetros de la URL
        const { email } = req.body; // Solo permitimos actualizar el `email`

        try {
            // Verificar si el usuario con el username actual existe
            const user = await this.userRepository.findByUsername(username);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // Actualizar solo el email en el perfil del usuario
            const updatedUser = await this.userRepository.updateProfile(username, email);

            // Responder con éxito
            return res.status(200).json({
                message: "Profile updated successfully",
                updatedUser
            });
        } catch (error) {
            console.error(error);  // Log para depuración
            return res.status(500).json({ error: "Error updating profile" });
        }
    }



    async login(req: Request, res: Response): Promise<any> {
        console.log("login")
        const {username, password} = req.body;

        // Asegúrate de que se proporcionan ambos campos
        if (!username || !password) {
            return res.status(400).json({message: 'Username and password are required'});
        }

        try {
            // Realizar la consulta a la base de datos para obtener el usuario
            const result: User | null = await this.userRepository.findByUsername(username);

            // Verificar si el usuario existe
            if (!result) {
                return res.status(401).json({message: 'Invalid username or password'});
            }

            const user: User = result;

            // Comparar la contraseña ingresada con la almacenada
            if (password !== user.password) {
                return res.status(401).json({message: 'Invalid username or password'});
            }

            // Si las credenciales son correctas, generar un token JWT
            const token = jwt.sign(
                {username: user.username}, // Información que quieras incluir en el token
                'your_secret_key', // Tu clave secreta para firmar el token (debería estar en una variable de entorno)
                {expiresIn: '2h'} // Opcional: El tiempo de expiración del token (1 hora)
            );

            // Enviar el token al frontend
            res.status(200).json({
                message: 'Login successful',
                token: token,  // Enviar el token al frontend
            });

        } catch (error) {
            console.error('Error al consultar la base de datos:', error);
            res.status(500).json({message: 'Server error'});
        }
    }
}