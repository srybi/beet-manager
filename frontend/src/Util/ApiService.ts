import {isJwtExpired} from "jwt-check-expiration";
import jwt_decode from "jwt-decode";

const BASE_URL = "http://localhost:3000";

function getEndpoint(resource: string): string {
    return `${BASE_URL}/${resource}`
}
function getOpenWeatherApi() :string {
    return "0aa7156867966223bb102e1bce696da2";
}

function getHeader(): HeadersInit | undefined {
    if (checkToken()) {
        const result: HeadersInit = new Headers()
        result.append("Content-Type", "application/json")
        result.append("Authorization", `Bearer ${localStorage.getItem("token")}`)
        return result;
    }

    localStorage.removeItem("token")
    window.history.pushState({}, "App", "/");
    window.location.reload();
    return;
}

function checkToken(): boolean {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
        return !isJwtExpired(storedToken);
    }
    return false;
}

function getDecodedAccessToken(token: string): any {
    try {
        return jwt_decode(token);
    } catch (Error) {
        return;
    }
}

function getToken(): string {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
        return "";
    }
    return savedToken;
}

export const apiService = {
    getDecodedAccessToken,
    getToken,
    checkToken,
    getEndpoint,
    getOpenWeatherApi,
    getHeader
}
