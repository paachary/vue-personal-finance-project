import { CustomError } from "../../util/CustomError.js";
import { verifyToken } from "../../util/jwtToken.js";
import * as customerService from "../../controllers/customer.js";
import * as contextService from "../../controllers/context.js";
import express from "express";
import { handleError } from "../../util/error.js";

const router = express.Router();

router
    .route("/register-new-customer")
    .post(customerService.registerNewCustomer);

router
    .route("/customer/validate-customer/:userName")
    .post(customerService.validateCustomer);

router
    .route("/access-token-refresh/:userName")
    .post(customerService.accessTokenRefresh);

router
    .route("/set-application-context")
    .post(contextService.setApplicationContext);

router.route("/clear-session").post(contextService.clearCtxSession);

export default router;

export function authenticate(req, res, next) {
    if (req.method === "OPTIONS") return next();

    if (!req.headers.authorization) {
        handleError(
            new CustomError("Token not found! User not authenticated.", 401),
            "Authentication Error",
            res,
            next
        );
    }

    const authFragments = req.headers.authorization.split(" ");

    if (authFragments.length !== 2)
        handleError(
            new CustomError("Token not found! User not authenticated.", 401),
            "Authentication Error",
            res,
            next
        );
    const authToken = authFragments[1];

    if (!req.headers.username) {
        handleError(
            new CustomError(
                "Username Header not found! User not authenticated.",
                401
            ),
            "Authentication Error",
            res,
            next
        );
    }

    const usernameHeaderFrag = req.headers.username.split(" ");

    if (usernameHeaderFrag.length !== 2)
        handleError(
            new CustomError(
                "Username Header not found!  User not authenticated.",
                401
            ),
            "Authentication Error",
            res,
            next
        );
    const userName = usernameHeaderFrag[1];
    try {
        verifyToken(authToken, process.env.ACCESS_TOKEN_SECRET, { userName });
        next();
    } catch (err) {
        handleError(err, "Authentication Error", res, next);
    }
}
