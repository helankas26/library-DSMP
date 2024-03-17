import axios, {AxiosInstance} from "axios";
import BASE_URL from './api-config.ts';

const instance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type": "application/json"},
    responseType: "json",
    withCredentials: true
});

export default instance;