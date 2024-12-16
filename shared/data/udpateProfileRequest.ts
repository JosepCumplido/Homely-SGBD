import {User} from "../models/user";

export class UpdateProfileRequest {
    constructor(
        public username: string,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
    ) {}
}

export class UpdateProfileResponse {
    constructor(
        public user: User
    ) {}
}