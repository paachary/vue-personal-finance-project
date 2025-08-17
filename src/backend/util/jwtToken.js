import jwt from "jsonwebtoken";
import { CustomError } from "./CustomError.js";
import { handleError } from "../util/error.js";
import {
    getCustRefreshToken,
    deleteCustRefreshToken,
    setCustRefreshToken,
    detectReuseOfRefreshToken,
    deleteCustRefreshTokenForUser,
} from "./../database/customer.js";

const { sign, verify } = jwt;

export function createToken(tokenSecret, payload, expiresIn = "1d") {
    return sign(payload, tokenSecret, { expiresIn });
}

export function verifyToken(token, tokenSecret, payload) {
    return verify(token, tokenSecret, (err, decoded) => {
        if (err) {
            if (err.name === "JsonWebTokenError") {
                throw new CustomError("Invalid token", 401);
            } else if (err.name === "TokenExpiredError") {
                if (tokenSecret === process.env.ACCESS_TOKEN_SECRET) {
                    throw new CustomError("Token expired", 403);
                } else if (tokenSecret === process.env.REFRESH_TOKEN_SECRET) {
                    return "REFRESH_TOKEN_EXPIRED";
                }
            } else {
                throw new CustomError(err.message, 403);
            }
        } else {
            if (
                decoded.userName.toLowerCase() !==
                payload.userName.toLowerCase()
            ) {
                if (tokenSecret === process.env.ACCESS_TOKEN_SECRET) {
                    throw new CustomError(
                        "Access forbidden, invalid token",
                        403
                    );
                } else if (tokenSecret === process.env.REFRESH_TOKEN_SECRET) {
                    return "INVALID_REFRESH_TOKEN";
                }
            } else {
                return "VALID_TOKEN";
            }
        }
        return "VALID_TOKEN";
    });
}

export async function assignRefreshToken(userName, res) {
    // create new rt
    // create a new refresh token
    const refreshToken = createToken(
        process.env.REFRESH_TOKEN_SECRET,
        {
            userName,
        },
        "1d"
    );
    await setCustRefreshToken(userName, refreshToken);

    // storing the refresh token in a cookie and send it to the client
    res.cookie(`refreshToken-${userName.toUpperCase()}`, refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return res;
}

function retrieveRefreshTokenFromCookie(req) {
    const refreshTokenFromClient =
        req.cookies[`refreshToken-${req.params.userName.toUpperCase()}`]; // Assuming refresh token in cookie
    // check cookie if the refresh token exists in the cookie
    if (!refreshTokenFromClient) {
        throw new CustomError(
            "Refresh token not found. Check with your administrator.",
            410
        );
    }
    return refreshTokenFromClient;
}

async function resetRefreshToken(refreshToken) {
    // delete refreshtoken from database for all users
    await deleteCustRefreshToken(refreshToken);
}

async function resetRefreshTokenForUser(userName, refreshToken) {
    // delete refreshtoken from database for that user
    await deleteCustRefreshTokenForUser(userName, refreshToken);
}

export async function retrieveRefreshTokenForRequest(res, req, next) {
    try {
        let requireRefreshTokenRotation = false;

        // check if the userName is provided in the request params
        if (!req.params.userName) {
            throw new CustomError(
                "Username is required to retrieve refresh token",
                400
            );
        }
        if (req.body.fromUI) {
            await resetRefreshTokenForUser(
                req.params.userName.toUpperCase(),
                ""
            );
            requireRefreshTokenRotation = true;
        } else {
            // retrieve token from cookie
            const refreshTokenFromClient = retrieveRefreshTokenFromCookie(req);

            // if rt exists,
            // get the username associated with the rt in the database
            const result = await getCustRefreshToken(refreshTokenFromClient);
            // then check if it is associated with username stored in the database
            if (
                result[0].userName === null ||
                result[0].userName === undefined ||
                result[0].userName === ""
            ) {
                requireRefreshTokenRotation = true;
            } else {
                const verifyResult = verifyToken(
                    refreshTokenFromClient,
                    process.env.REFRESH_TOKEN_SECRET,
                    { userName: result[0].userName }
                );

                // if rt has expired, then delete the rt
                if (verifyResult === "REFRESH_TOKEN_EXPIRED") {
                    // delete the refresh token from the cookie
                    res.clearCookie(`refreshToken-${result[0].userName}`, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "None",
                    });
                    await resetRefreshTokenForUser(
                        result[0].userName,
                        refreshTokenFromClient
                    );
                    requireRefreshTokenRotation = true;
                } // if it matches, then check for the expiration time left for the rt.
                // if it has not expired, then create the access token

                // if user in the rt does not match with associated user in the db,
                // delete the rt for all users as this could be a hack
                else if (verifyResult === "INVALID_REFRESH_TOKEN") {
                    // delete the refresh token from the cookie
                    res.clearCookie(`refreshToken-${result[0].userName}`, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "None",
                    });
                    await resetRefreshToken(refreshTokenFromClient);
                    requireRefreshTokenRotation = true;
                }

                // detect reuse of token

                const rows = await detectReuseOfRefreshToken(
                    result[0].userName,
                    refreshTokenFromClient
                );
                if (rows.outBinds.ret !== 0) {
                    //delete all refresh tokens for that user
                    await resetRefreshTokenForUser(result[0].userName, "");
                    requireRefreshTokenRotation = true;
                }
            }
        }

        // create a new refresh token if there is a flag set
        if (requireRefreshTokenRotation) {
            res = await assignRefreshToken(
                req.params.userName.toUpperCase(),
                res
            );
        }
    } catch (err) {
        handleError(err, "Error in refresh token operation", res, next);
    }
    return res;
}

export async function rotateRefreshToken(req, res, next) {
    // retrieve token from cookie
    const refreshTokenFromClient = retrieveRefreshTokenFromCookie(req);
    try {
        // delete the refresh token from the cookie
        res.clearCookie(`refreshToken-${req.params.userName.toUpperCase()}`, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });
        // delete the rt
        await resetRefreshToken(refreshTokenFromClient);

        // create a new refresh token
        res = await assignRefreshToken(req.params.userName.toUpperCase(), res);
    } catch (err) {
        handleError(
            err,
            "Error in refresh token rotation operation",
            res,
            next
        );
    }
    return res;
}
