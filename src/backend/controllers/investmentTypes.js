import * as dbApis from "../database/investmentTypes.js";
import { handleError } from "../util/error.js";

function getInvestmentTypeDtlsFromReq(req) {
    // Extract investment type details from the request body
    const investmentTypeDetails = {
        investment_type_cd: req.body.investmentTypeCode,
        investment_type_desc: req.body.investmentTypeDescription,
    };
    return investmentTypeDetails;
}

export async function registerInvestmentType(req, res, next) {
    try {
        const investmentType = getInvestmentTypeDtlsFromReq(req);
        const result = await dbApis.registerInvestmentType(investmentType);
        res.json(result);
    } catch (err) {
        handleError(err, "Error registering investment type", res, next);
    }
}

export async function getInvestmentTypes(req, res, next) {
    try {
        const investmentTypes = await dbApis.getInvestmentTypes();
        res.json(investmentTypes);
    } catch (err) {
        handleError(err, "Error retrieving investment types", res, next);
    }
}

export async function getInvestmentType(req, res, next) {
    try {
        const investmentType = await dbApis.getInvestmentType(
            +req.params.investmentTypeId
        );
        res.json(investmentType);
    } catch (err) {
        handleError(err, "Error retrieving investment type", res, next);
    }
}

export async function updateInvestmentType(req, res, next) {
    try {
        const investmentType = getInvestmentTypeDtlsFromReq(req);
        delete investmentType.investment_type_cd;
        investmentType.investment_type_id = +req.params.investmentTypeId;
        const result = await dbApis.updateInvestmentType(investmentType);
        res.json(result);
    } catch (err) {
        handleError(err, "Error updating investment type", res, next);
    }
}

export async function deleteInvestmentType(req, res, next) {
    try {
        const investmentTypeId = +req.params.investmentTypeId;
        const result = await dbApis.deleteInvestmentType(investmentTypeId);
        res.json(result);
    } catch (err) {
        handleError(err, "Error deleting investment type", res, next);
    }
}
