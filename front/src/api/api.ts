import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getToken } from "./token";

const BACKEND_URL = 'http://localhost:3000';
const REQUEST_TIMEOUT = 5000;


export const createAPI = (): AxiosInstance => {
    const api = axios.create({
        baseURL: BACKEND_URL,
        timeout: REQUEST_TIMEOUT
    });

    api.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = getToken();
            config.headers['x-auth-token'] = token;
            
            return config;
        }
    );

    return api;
};