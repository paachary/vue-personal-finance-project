import * as dbConfig from "./config/database.js";
import * as webServer from "./services/web-server.js";
import * as database from "./services/database.js";

// Set the default thread pool size for Node.js
// This is used for handling asynchronous operations in the database module.
// The default thread pool size is 4, but it can be increased based on the database connection pool size.
// The thread pool size is set to the database connection pool size plus a default value.

const defaultThreadPoolSize = 4;

// Increase thread pool size by poolMax
// !!! Note: On Windows this won't have an effect. Instead the variable must be set before Node.js is started !!!
process.env.UV_THREADPOOL_SIZE =
    dbConfig.dbPool.poolMax + defaultThreadPoolSize;

async function startup() {
    console.log("Starting application");

    try {
        console.log("Initializing database module");

        await database.initialize();
    } catch (err) {
        console.error(err);

        process.exit(1); // Non-zero failure code
    }

    try {
        console.log("Initializing web server module");

        await webServer.initialize();
    } catch (err) {
        console.error(err);

        process.exit(1); // Non-zero failure code
    }
}

startup();

async function shutdown(e) {
    let err = e;

    console.log("Shutting down application");

    try {
        console.log("Closing web server module");

        await webServer.close();
    } catch (e) {
        console.error(e);

        err = err || e;
    }

    try {
        console.log("Closing database module");

        await database.close();
    } catch (e) {
        console.error(e);

        err = err || e;
    }

    console.log("Exiting process");

    if (err) {
        process.exit(1); // Non-zero failure code
    } else {
        process.exit(0);
    }
}

process.once("SIGTERM", () => {
    console.log("Received SIGTERM");

    shutdown();
});

process.once("SIGINT", () => {
    console.log("Received SIGINT");

    shutdown();
});

process.once("uncaughtException", (err) => {
    console.log("Uncaught exception");
    console.error(err);

    shutdown(err);
});
