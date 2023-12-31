import * as jwtDecode from 'jwt-decode';
const APIPaths = {
    accessTokenKey: 'secpAuth'
}
export class TokenHelper {

    public static getAccessToken(): string {
        return localStorage.getItem(APIPaths.accessTokenKey);
    }

    public static setAccessToken(token: string): void {
        return localStorage.setItem(APIPaths.accessTokenKey, token);
    }

    public static setToken(token: any): void {
        this.setAccessToken(token);
        localStorage.setItem("image", token.img);
    }

    public static removeAccessToken(): void {
        return localStorage.removeItem(APIPaths.accessTokenKey);
    }

    public static getBearerToken() {
        const token = localStorage.getItem(APIPaths.accessTokenKey);
        return {
            Authorization: token ? 'Bearer ' + token : null
        };
    }
}
