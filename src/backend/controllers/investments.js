import * as dbApis from "../database/investments.js";
import { handleError } from "../util/error.js";

// This module provides the controller functions for handling investment-related requests.
// It uses the database APIs to interact with investment data.
// The `getInvestmentDetails` function retrieves investment details by ID,
// while the `getSavingsForAccount` function retrieves savings for a specific account.
// The `registerSavings` function registers new savings,
// and the `getInvestmentTypes` function retrieves available investment types.
// The `getInvestmentDtlsFromReq` function extracts investment details from the request body.
// Errors are caught and passed to the next middleware for handling.
//

function getInvestmentDtlsFromReq(req) {
    // Extract investment details from the request body
    const investmentDetails = {
        account_number: req.body.accountNumber,
        instrument_id: req.body.instrumentId,
        instrument_name: req.body.instrumentName,
        instrument_type: req.body.instrumentType,
        investment_type: req.body.investmentType,
        instrument_assoc_bank: req.body.instrumentAssocBankName,
        investment_amount: +req.body.investmentAmount,
        investment_dt: req.body.investmentDate,
        expiration_dt: req.body.expirationDate,
        active_flag: req.body.investmentStatus,
    };
    return investmentDetails;
}

export async function getInvestmentDetails(req, res, next) {
    try {
        const investmentId = +req.params.id;
        const investmentDetails = await dbApis.getInvestmentDetails(
            investmentId
        );
        res.json(investmentDetails);
    } catch (err) {
        handleError(err, "Error retrieving investment details", res, next);
    }
}
export async function getSavingsForAccount(req, res, next) {
    try {
        const accountNumber = req.params.accountNumber;
        const savings = await dbApis.getSavingsForAccount(accountNumber);
        res.json(savings);
    } catch (err) {
        handleError(err, "Error retrieving savings for account", res, next);
    }
}
export async function registerSavings(req, res, next) {
    try {
        const saving = getInvestmentDtlsFromReq(req);
        const result = await dbApis.registerSavings(saving);
        res.json(result);
    } catch (err) {
        handleError(err, "Error registering savings", res, next);
    }
}

export async function updateInvestment(req, res, next) {
    try {
        const investment = {
            investment_id: req.params.investmentId,
            expiration_date: req.body.expirationDate,
            investment_status: req.body.investmentStatus,
        };
        const result = await dbApis.updateInvestment(investment);
        res.json(result);
    } catch (err) {
        handleError(err, "Error updating investment", res, next);
    }
}

export async function deleteInvestment(req, res, next) {
    try {
        const investment = {
            investment_id: req.params.investmentId,
        };
        const result = await dbApis.deleteInvestment(investment);
        res.json(result);
    } catch (err) {
        handleError(err, "Error deleting investment", res, next);
    }
}

export async function getAllInvestmentsForUser(req, res, next) {
    try {
        // If the userName is "allUsers", we want to retrieve all investments
        // for all users, so we pass an empty string to the database API.
        // If the userName is not "allUsers", we pass the specific userName.
        // This allows us to handle both cases in a single API call.

        const userName =
            req.params.userName !== "allUsers" ? req.params.userName : "";

        const investments = await dbApis.getAllInvestmentsForUser(userName);
        res.json(investments);
    } catch (err) {
        handleError(err, "Error retrieving investments for user", res, next);
    }
}

export async function getActiveInvestmentSummary(req, res, next) {
    try {
        const userName =
            req.params.userName !== "allUsers" ? req.params.userName : "";
        const summary = await dbApis.getActiveInvestmentSummary(userName);
        res.json(summary);
    } catch (err) {
        handleError(
            err,
            "Error retrieving active investment summary",
            res,
            next
        );
    }
}

export async function getActiveInvestmentSummaryForInvestmentType(
    req,
    res,
    next
) {
    try {
        const userName =
            req.params.userName !== "allUsers" ? req.params.userName : "";
        const summary =
            await dbApis.getActiveInvestmentSummaryForInvestmentType(userName);
        res.json(summary);
    } catch (err) {
        handleError(
            err,
            "Error retrieving active investment summary for investment type",
            res,
            next
        );
    }
}

export async function getActiveInvestmentSummaryForInstrumentType(
    req,
    res,
    next
) {
    try {
        const userName =
            req.params.userName !== "allUsers" ? req.params.userName : "";
        const summary =
            await dbApis.getActiveInvestmentSummaryForInstrumentType(userName);
        res.json(summary);
    } catch (err) {
        handleError(
            err,
            "Error retrieving active investment summary for instrument type",
            res,
            next
        );
    }
}

export async function getMonthlyDebitSummary(req, res, next) {
    try {
        const summary = await dbApis.getMonthlyDebitSummary();
        res.json(summary);
    } catch (err) {
        handleError(err, "Error retrieving monthly debit summary", res, next);
    }
}
