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
            const user = await this.userRepository.update(updatedUser);
            res.status(201).send(user);
        } catch (err) {
            console.log(err);
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

    async getUserByUsername(req: Request, res: Response): Promise<Response> {
        const {username} = req.params;

        try {
            if (!username) {
                return res.status(400).json({error: "Username is required"});
            }

            const user = await this.userRepository.findByUsername(username);
            if (!user) {
                return res.status(404).json({error: "User not found"});
            }

            return res.json(user)
        } catch (error) {
            console.error("Error retrieving user:", error);
            return res.status(500).json({error: "Error retrieving user"});
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

    async updateProfile(req: Request, res: Response): Promise<Response> {
        const {username} = req.params;
        const {email} = req.body;

        try {
            const user = await this.userRepository.findByUsername(username);

            if (!user) {
                return res.status(404).json({error: "User not found"});
            }

            const updatedUser = await this.userRepository.updateProfile(username, email);

            return res.status(200).json({
                message: "Profile updated successfully",
                updatedUser
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: "Error updating profile"});
        }
    }

    async login(req: Request, res: Response): Promise<any> {
        console.log("login")
        const {username, password} = req.body;

        if (!username || !password) {
            return res.status(400).json({message: 'Username and password are required'});
        }

        try {
            const result: User | null = await this.userRepository.findByUsername(username);

            if (!result) {
                return res.status(401).json({message: 'Invalid username or password'});
            }

            const user: User = result;
            if (password !== user.password) {
                return res.status(401).json({message: 'Invalid username or password'});
            }

            const token = jwt.sign({user: user}, 'your_secret_key', {expiresIn: '10000h'});

            res.status(200).json({
                message: 'Login successful',
                token: token,
            });

        } catch (error) {
            console.error('Error al consultar la base de datos:', error);
            res.status(500).json({message: 'Server error'});
        }
    }

    async signup(req: Request, res: Response): Promise<any> {
        console.log("signup")
        const {username, email, password} = req.body;

        if (!username || !password) {
            return res.status(400).json({message: 'Username and password are required'});
        }

        try {
            const userByUsername: User | null = await this.userRepository.findByUsername(username);
            if (userByUsername) {
                return res.status(401).json({message: 'Username already in use.'});
            }

            const userByEmail: User | null = await this.userRepository.findByEmail(email);
            if (userByEmail) {
                return res.status(401).json({message: 'Email already in use.'});
            }

            const user: User = {
                id: null,
                username: req.body.username,
                email: req.body.email,
                name: req.body.name,
                surname: req.body.surname,
                password: req.body.password,
                avatarUrl: ""
            }

            await this.userRepository.create(user)

            const token = jwt.sign({user: user}, 'your_secret_key', {expiresIn: '10000h'});

            res.status(200).json({
                message: 'Signup successful',
                token: token,
            });

        } catch (error) {
            console.error('Error al consultar la base de datos:', error);
            res.status(500).json({message: 'Server error'});
        }
    }

    async getUpcomingTravel(req: Request, res: Response): Promise<Response> {
        try {
            // Obtener el próximo viaje desde el repositorio
            const upcomingTravel = await this.userRepository.getUpcomingTravel();

            if (!upcomingTravel) {
                return res.status(404).json({message: "No upcoming travel found"});
            }

            return res.status(200).json(upcomingTravel);
        } catch (error) {
            console.error("Error fetching upcoming travel:", error);
            return res.status(500).json({error: "Error fetching upcoming travel"});
        }
    }

    async getPastTravels(req: Request, res: Response): Promise<Response> {
        try {
            // Obtener los viajes pasados desde el repositorio
            const pastTravels = await this.userRepository.getPastTravels();

            return res.status(200).json(pastTravels);
        } catch (error) {
            console.error("Error fetching past travels:", error);
            return res.status(500).json({error: "Error fetching past travels"});
        }
    }

}