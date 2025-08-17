import axios from "axios";
import { getAuthToken, getUserName } from "./util";

export default () => {
    const authToken = getAuthToken();
    const token = authToken.token;

    const apiClient = axios.create({
        baseURL: `http://localhost:3000`,
    });

    apiClient.defaults.withCredentials = true;
    apiClient.defaults.headers.common["Content-Type"] = "application/json";
    apiClient.defaults.headers.common["Accept"] = "application/json";

    if (token && token.length > 0) {
        const userName = getUserName();
        apiClient.defaults.headers.common["Username"] = `username ${userName}`;
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return apiClient;
};
