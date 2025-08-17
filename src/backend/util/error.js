import { CustomError } from "../util/CustomError.js";
// This module provides a utility function to handle database errors.

export const handleError = (err, msg, res, next) => {
    let statusCode = 500;
    if (err instanceof CustomError) {
        statusCode = err.statusCode;
    }
    res.status(statusCode).json({
        status: "error",
        message: `${msg}: ${err.message}`,
    });

    next(err);
};
