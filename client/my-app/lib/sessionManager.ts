import {TokenPayload} from 'shared/models/tokenPayload'
import {jwtDecode} from "jwt-decode";

class SessionManager {
    private static tokenKey = 'authToken';

    static saveToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    static getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    static removeToken(): void {
        localStorage.removeItem(this.tokenKey);
    }
    
    static decodeToken(token: string): TokenPayload {
        return jwtDecode<TokenPayload>(token);
    }
}

export default SessionManager;