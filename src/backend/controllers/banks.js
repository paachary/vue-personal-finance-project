import * as dbApis from "../database/banks.js";
import { handleError } from "../util/error.js";

// This module provides the controller functions for handling bank-related requests.
// It uses the database APIs to interact with the bank data.
// The `getBank` function retrieves bank details, while the `registerBank` function registers a new bank.
// The `getBankFromRec` function extracts bank details from the request body.
// Errors are caught and passed to the next middleware for handling.

function getBankFromRec(req) {
    // Extract bank details from the request body
    const bank = {
        bank_name: req.body.bankName,
        branch_name: req.body.branchName,
        bank_city: req.body.bankCity,
        bank_pin_code: req.body.bankPinCode,
        bank_abbr: req.body.bankAbbr,
        bank_address: req.body.bankAddress,
    };
    return bank;
}

export async function getBankDetails(req, res, next) {
    try {
        const result = await dbApis.getBankDetails();
        res.json(result);
    } catch (err) {
        handleError(err, "Error retrieving bank details", res, next);
    }
}

export async function registerBank(req, res, next) {
    try {
        const bank = getBankFromRec(req);
        const result = await dbApis.registerBank(bank);
        res.json(result);
    } catch (err) {
        handleError(err, "Error registering bank", res, next);
    }
}

export async function updateBankDetails(req, res, next) {
    try {
        const bank = getBankFromRec(req);
        bank.bank_id = req.body.bankId; // Add bank_id from request body
        delete bank.branch_name;
        delete bank.bank_name;
        delete bank.bank_city;
        const result = await dbApis.updateBankDetails(bank);
        res.json(result);
    } catch (err) {
        handleError(err, "Error updating bank details", res, next);
    }
}

export async function deleteBankDetails(req, res, next) {
    try {
        const bank = { bank_id: +req.params.bankId };
        const result = await dbApis.deleteBankDetails(bank);
        res.json(result);
    } catch (err) {
        handleError(err, "Error deleting bank details", res, next);
    }
}
