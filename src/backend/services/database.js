import oracledb from "oracledb";

import bcrypt from "bcrypt";

import * as dbConfig from "../config/database.js";

import { CustomError } from "../util/CustomError.js";

const errorHandler = (err) => {
    let errorString;

    if (err instanceof Object) {
        errorString = err.message;
    } else {
        errorString = err;
    }
    if (
        errorString.includes("ORA-01017") ||
        errorString.includes("ORA-20010")
    ) {
        throw new CustomError(
            "Invalid credentials provided. Please try again.",
            401
        );
    } else if (errorString.includes("ORA-01403")) {
        throw new CustomError("No data found for the provided query.", 404);
    } else if (errorString.includes("ORA-00001")) {
        throw new CustomError(
            "Unique constraint violated. Please ensure unique values.",
            409
        );
    } else if (errorString.includes("ORA-06512")) {
        throw new CustomError(
            "A PL/SQL error occurred. Please check your procedure.",
            400
        );
    } else if (errorString.includes("ORA-04063")) {
        throw new CustomError(
            "A database object is invalid. Please check the database objects.",
            400
        );
    } else if (errorString.includes("ORA-04098")) {
        throw new CustomError(
            "A database trigger is invalid. Please check the trigger.",
            400
        );
    } else if (errorString.includes("ORA-00942")) {
        throw new CustomError(
            "Table or view does not exist. Please check.",
            400
        );
    } else if (errorString.includes("ORA-24338")) {
        throw new CustomError(
            "Invalid cursor state. Please check your query.",
            400
        );
    } else if (errorString.includes("ORA-01000")) {
        throw new CustomError(
            "Maximum open cursors exceeded. Please close unused cursors.",
            400
        );
    } else if (errorString.includes("ORA-12541")) {
        throw new CustomError(
            "TNS: no listener. Please check your database connection.",
            400
        );
    } else if (errorString.includes("ORA-12154")) {
        throw new CustomError(
            "TNS: could not resolve the connect identifier specified.",
            400
        );
    } else if (errorString.includes("ORA-28009")) {
        throw new CustomError(
            "Connection is restricted. Please contact your DBA.",
            403
        );
    } else if (errorString.includes("ORA-28000")) {
        throw new CustomError(
            "Account is locked. Please contact your DBA.",
            403
        );
    } else if (errorString.includes("ORA-28001")) {
        throw new CustomError(
            "Password has expired. Please change your password.",
            403
        );
    } else if (errorString.includes("ORA-28002")) {
        throw new CustomError(
            "Password will expire soon. Please change your password.",
            403
        );
    } else if (errorString.includes("ORA-28003")) {
        throw new CustomError(
            "Too many failed login attempts. Account is locked.",
            403
        );
    } else if (errorString.includes("ORA-28004")) {
        throw new CustomError(
            "User account is not allowed to log on to the database.",
            403
        );
    } else if (errorString.includes("ORA-28005")) {
        throw new CustomError(
            "Database link is not allowed to connect to the database.",
            403
        );
    } else {
        throw new CustomError(
            "An unexpected error occurred! Check database connection.",
            400
        );
    }
};

export async function initialize() {
    try {
        await oracledb.createPool(dbConfig.dbPool);
    } catch (err) {
        throw new CustomError(
            `Error closing existing pool: ${err.message}`,
            500
        );
    }
}

export async function close() {
    await oracledb.getPool().close(0);
}

export async function cursorStmtExecute(statement, binds = [], options = {}) {
    let conn;
    const rows = [];

    try {
        conn = await oracledb.getConnection();

        options.outFormat = oracledb.OBJECT;

        const res = await conn.execute(statement, binds, options);

        const result = res.outBinds.ret;

        let row;
        while ((row = await result.getRow())) {
            rows.push(row);
        }
    } catch (err) {
        console.error("Error in cursorStmtExecute:", err);
        errorHandler(err);
    } finally {
        if (conn) {
            // conn assignment worked, need to close
            try {
                await conn.close();
            } catch (err) {
                new Error(err);
            }
        }
    }
    return rows;
}

export async function simpleExecute(statement, binds = [], opts = {}) {
    let conn;

    opts.outFormat = oracledb.OBJECT;

    try {
        conn = await oracledb.getConnection();
        const result = await conn.execute(statement, binds, opts);
        return result;
    } catch (err) {
        console.error("Error in simpleExecute:", err);
        errorHandler(err);
    } finally {
        if (conn) {
            // conn assignment worked, need to close
            try {
                await conn.close();
            } catch (err) {
                new Error(err);
            }
        }
    }
}

// Hashing a password during registration
export async function hashPassword(plainPassword) {
    try {
        const saltRounds = 10; // Adjust as needed for desired security vs. performance
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);
        return { hashedPassword, salt }; // Store both in your Oracle DB
    } catch (err) {
        throw new CustomError("Error hashing password", 500);
    }
}

export async function verifyPassword(plainPassword, storedHash) {
    try {
        const match = await bcrypt.compare(plainPassword, storedHash);
        return match; // true if passwords match, false otherwise
    } catch (err) {
        throw new CustomError("Error verifying password", 500);
    }
}
