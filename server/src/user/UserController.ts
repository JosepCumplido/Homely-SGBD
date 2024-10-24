// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { UserRepository } from './UserRepository';

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
}