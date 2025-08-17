import bodyParser from "body-parser";
import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";

import homeRouter from "./routers/home.js";
import bankRouter from "./routers/bank.js";
import accountRouter from "./routers/account.js";
import investmentRouter from "./routers/investment.js";
import investmentTypesRouter from "./routers/investmentTypes.js";
import instrumentTypesRouter from "./routers/instrumentTypes.js";
import customerRouter from "./routers/customer.js";
import webServer from "../config/web-server.js";
import { CustomError } from "../util/CustomError.js";
import authenticateRouter, { authenticate } from "./routers/authentication.js";

const hostname = webServer.host;
const port = webServer.port;

const app = express();

app.use(cookieParser());

export const initialize = () => {
    return new Promise((resolve, reject) => {
        const allowedOrigins = [
            "http://localhost:8080",
            "http://localhost:3000",
            "http://localhost",
        ];
        app.use(
            cors({
                origin: function (origin, callback) {
                    if (!origin) return callback(null, true);
                    if (allowedOrigins.indexOf(origin) === -1) {
                        const msg =
                            "The CORS policy for this resource doesn't allow access from the specified Origin.";
                        return callback(new CustomError(msg, 401), false);
                    }
                    return callback(null, true);
                },
                credentials: true, // Allow cookies to be sent with requests
                methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
                allowedHeaders: ["Content-Type", "Authorization", "Username"], // Allow specific headers
                preflightContinue: false, // Handle preflight requests automatically
            })
        );

        app.use(bodyParser.json());

        // Parse incoming JSON requests and revive JSON.
        app.use(
            express.json({
                reviver: reviveJson,
            })
        );

        app.use(homeRouter);

        app.use(authenticateRouter);

        app.use(authenticate);

        app.use(bankRouter);

        app.use(accountRouter);

        app.use(investmentRouter);

        app.use(customerRouter);

        app.use(investmentTypesRouter);

        app.use(instrumentTypesRouter);

        app.use((error, _, res, next) => {
            next(error);
        });

        app.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
            resolve();
        }).on("error", (err) => {
            reject(err);
        });
    });
};

export function close() {
    return new Promise((resolve, reject) => {
        const server = app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

        process.on("SIGTERM", () => {
            server.close((err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        });
    });
}

const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

function reviveJson(key, value) {
    // revive ISO 8601 date strings to instances of Date
    if (typeof value === "string" && iso8601RegExp.test(value)) {
        return new Date(value);
    } else {
        return value;
    }
}
