import dotenv from "dotenv";

dotenv.config();
const webServer = {
    host: process.env.WEB_SERVER_HOST,
    port: process.env.WEB_SERVER_PORT,
    protocol: process.env.WEB_SERVER_PROTOCOL,
    staticFilesPath: process.env.STATIC_FILES_PATH,
    enableCompression: process.env.ENABLE_COMPRESSION,
    enableCors: process.env.ENABLE_CORS,
    corsOptions: {
        origin: process.env.CORS_ORIGIN || [
            "http://localhost:8080",
            "http://localhost:3000",
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    },
};
export default webServer;
