import {User} from "../models/user";

export class SignupRequest {
    constructor(
        public name: string,
        public surname: string,
        public username: string,
        public email: string,
        public password: string,
    ) {}
}

export class SignupResponse {
    constructor(
        public user: User|null
    ) {}
}