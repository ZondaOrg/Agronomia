import { jwtDecode, type JwtPayload } from "jwt-decode";
import { TOKEN_KEY } from "./token-key";

/* 
    PROPÓSITO: Guarda un token JWT en localStorage
*/
export function setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
}

/* 
    PROPÓSITO: Obtiene un token JWT en localStorage
*/
export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

/* 
    PROPÓSITO: Indica si el usuario tiene token y si no expiró
*/
export function isAuthenticate(): boolean {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? !isExpirate(token) : false;
}

/* 
    PROPÓSITO: Elimina el token JWT de localStorage
*/
export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

/* 
    PROPÓSITO: Obtiene el claim sub del payload de un token JWT.
    PRECONDICIÓN: El usuario debe estar authenticado
*/
export function getSubject(): string {
    const token = localStorage.getItem(TOKEN_KEY);
    const { sub } = jwtDecode<JwtPayload>(token!);
    return sub!;
}

function isExpirate(token: string): boolean {
    const { exp } = jwtDecode<JwtPayload>(token);
    return Date.now() > exp! * 1000;
}

