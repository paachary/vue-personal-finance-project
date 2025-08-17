import * as dbApis from "../database/customer.js";

import { hashPassword } from "../services/database.js";
import { handleError } from "../util/error.js";
import {
    createToken,
    retrieveRefreshTokenForRequest,
    assignRefreshToken,
    rotateRefreshToken,
} from "../util/jwtToken.js";

function generateAccessToken(userName, expiresIn = "30m") {
    return createToken(
        process.env.ACCESS_TOKEN_SECRET,
        {
            userName,
        },
        expiresIn
    );
}
// This module provides the controller functions for handling bank-related requests.
// It uses the database APIs to interact with the bank data.
// The `getBank` function retrieves bank details, while the `registerBank` function registers a new bank.
// The `getBankFromRec` function extracts bank details from the request body.
// Errors are caught and passed to the next middleware for handling.

async function getCustomerDataFromRec(req) {
    // Extract Customer details from the request body
    const password = await hashPassword(req.body.password);

    const customer = {
        user_name: req.body.userName,
        password: password.hashedPassword,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        preferred_name: req.body.preferredName,
        gender: req.body.gender,
        dob: req.body.dob,
        email: req.body.email,
        phone_nbr: req.body.phoneNbr,
        cust_address: req.body.custAddress,
        cust_city: req.body.custCity,
        cust_pin_code: req.body.custPinCode,
        is_admin: req.body.isAdmin,
    };
    return customer;
}

export async function registerNewCustomer(req, res, next) {
    try {
        const customer = await getCustomerDataFromRec(req);
        const result = await dbApis.registerNewCustomer(customer);
        // create the refresh token since its fresh for this user
        // add the refresh token to the database and
        // insert the refresh token into a rt cookie
        res = await assignRefreshToken(customer.user_name, res);
        // create auth token and send it back with the rest of the response object

        const authToken = generateAccessToken(customer.user_name, "5s");

        res.status(200).json({ result, token: authToken });
    } catch (err) {
        handleError(err, "Error registering new customer", res, next);
    }
}

export async function updateCustomerDetails(req, res, next) {
    try {
        const result = await dbApis.updateCustomerDetails({
            cust_id: req.params.custId,
            phone_nbr: req.body.phoneNbr,
            email: req.body.email,
            cust_pin_code: req.body.custPinCode,
            cust_city: req.body.custCity,
            cust_address: req.body.custAddress,
        });
        res.json(result);
    } catch (err) {
        handleError(err, "Error updating customer details", res, next);
    }
}

export async function getCustomerDetails(req, res, next) {
    try {
        const result = await dbApis.getCustomerDetails(req.params.userName);
        res.json(result);
    } catch (err) {
        handleError(err, "Error retrieving customer details", res, next);
    }
}

export async function validateCustomer(req, res, next) {
    try {
        const result = await dbApis.validateCustomer({
            userName: req.params.userName,
            password: req.body.password,
        });

        res = await retrieveRefreshTokenForRequest(res, req, next);

        // create new access token
        const authToken = generateAccessToken(
            req.params.userName.toUpperCase(),
            "30m"
        );

        await dbApis.updateLastLoggedIn(req.params.userName.toUpperCase());

        res.status(200).json({ result, token: authToken });
    } catch (err) {
        handleError(err, "Error validating customer", res, next);
    }
}

export async function getAllCustomers(req, res, next) {
    try {
        const result = await dbApis.getAllCustomers();
        res.json(result);
    } catch (err) {
        handleError(err, "Error retrieving all customers", res, next);
    }
}

export async function getCustomerRefreshToken(rt, res, next) {
    try {
        return await dbApis.getCustRefreshToken(rt);
    } catch (err) {
        handleError(
            err,
            "Error retrieving customer user name for the refresh token",
            res,
            next
        );
    }
}

export async function setCustomerRefreshToken(req, res, next) {
    try {
        const result = await dbApis.setCustRefreshToken(
            req.params.userName,
            req.params.refreshToken
        );
        res.json(result);
    } catch (err) {
        handleError(
            err,
            "Error inserting refresh token for customer",
            res,
            next
        );
    }
}

export async function deleteCustRefreshToken(req, res, next) {
    try {
        const result = await dbApis.deleteCustRefreshToken(
            req.params.refreshToken
        );
        res.json(result);
    } catch (err) {
        handleError(
            err,
            "Error deleting refresh token for customer",
            res,
            next
        );
    }
}

export async function accessTokenRefresh(req, res, next) {
    try {
        //
        res = await rotateRefreshToken(req, res, next);
        const authToken = generateAccessToken(
            req.params.userName.toUpperCase(),
            "30s"
        );
        res.status(200).json({ token: authToken });
    } catch (err) {
        handleError(err, "Error refreshing token", res, next);
    }
}

export async function resetPassword(req, res, next) {
    try {
        const newPassword = await hashPassword(req.body.newPassword);

        const result = await dbApis.resetPassword(
            +req.body.custId,
            req.body.enteredPassword,
            req.body.dbPassword,
            newPassword.hashedPassword
        );

        res.status(200).json(result);
    } catch (err) {
        handleError(err, "Error refreshing the password!", res, next);
    }
}
