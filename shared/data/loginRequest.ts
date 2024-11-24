import {User} from "../models/user";

export class LoginRequest {
    constructor(
        public username: string,
        public password: string,
    ) {}
}

export class LoginResponse {
    constructor(
        public user: User|null
    ) {}
}