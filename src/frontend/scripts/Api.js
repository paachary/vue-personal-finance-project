import axios from "axios";
import { getAuthToken, getUserName } from "./util";

const API_SERVER_NAME = process.env.VUE_APP_BACKEND_SERVER_NAME;
const API_SERVER_PORT = process.env.VUE_APP_BACKEND_SERVER_PORT;

export default () => {
    const authToken = getAuthToken();
    const token = authToken.token;

    const apiClient = axios.create({
        baseURL: `http://${API_SERVER_NAME}:${API_SERVER_PORT}`,
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
