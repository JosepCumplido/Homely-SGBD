import {TokenPayload} from 'shared/models/tokenPayload'
import {jwtDecode} from "jwt-decode";

class SessionManager {
    private static tokenKey = 'authToken';

    static saveToken(token: string) {
        if (typeof window === "undefined") return; // Comprova si estàs al servidor
        localStorage.setItem(this.tokenKey, token);
    }

    static getToken(): string | null {
        if (typeof window === "undefined") return null; // Comprova si estàs al servidor
        return localStorage.getItem(this.tokenKey);
    }

    static removeToken() {
        if (typeof window === "undefined") return; // Comprova si estàs al servidor
        localStorage.removeItem(this.tokenKey);
    }
    
    static decodeToken(token: string): TokenPayload {
        return jwtDecode<TokenPayload>(token);
    }
}

export default SessionManager;