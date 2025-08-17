import * as dbApis from "../database/accounts.js";
import { handleError } from "../util/error.js";

// This module provides the controller functions for handling bank-related requests.
// It uses the database APIs to interact with the bank data.
// The `getBank` function retrieves bank details, while the `registerBank` function registers a new bank.
// The `getBankFromRec` function extracts bank details from the request body.
// Errors are caught and passed to the next middleware for handling.

function getAccountDtlsFromRec(req) {
    // Extract account details from the request body
    const acctDtls = {
        cust_id: +req.body.custId,
        bank_id: +req.body.bankId,
        account_nbr: req.body.accountNumber,
        preferred_name: req.body.preferredName,
    };
    return acctDtls;
}

export async function registerAccount(req, res, next) {
    try {
        const acctDtls = getAccountDtlsFromRec(req);
        const result = await dbApis.registerAccount(acctDtls);
        res.json(result);
    } catch (err) {
        handleError(err, "Error registering account", res, next);
    }
}

export async function getAccounts(req, res, next) {
    try {
        const accounts = await dbApis.getAllAccounts();
        res.json(accounts);
    } catch (err) {
        handleError(err, "Error retrieving accounts", res, next);
    }
}

export async function updateAccountDetails(req, res, next) {
    try {
        const acctDtls = getAccountDtlsFromRec(req);

        delete acctDtls.cust_id;
        delete acctDtls.bank_id;

        const result = await dbApis.updateAccountDetails(acctDtls);

        res.json(result);
    } catch (err) {
        handleError(err, "Error updating account details", res, next);
    }
}

export async function deleteAccountDetails(req, res, next) {
    try {
        const acctDtls = { account_nbr: req.params.acctId };
        const result = await dbApis.deleteAccountDetails(acctDtls);
        res.json(result);
    } catch (err) {
        handleError(err, "Error deleting account details", res, next);
    }
}

export async function getAllAccountsForCust(req, res, next) {
    try {
        const userName = req.params.userName;
        const accounts = await dbApis.getAllAccountsForCust(userName);
        res.json(accounts);
    } catch (err) {
        handleError(err, "Error retrieving accounts for customer", res, next);
    }
}
