import * as dbApis from "../database/instrumentTypes.js";

import { handleError } from "../util/error.js";

function getInstrumentTypeDtlsFromReq(req) {
    // Extract instrument type details from the request body
    const instrumentTypeDetails = {
        instrument_type_cd: req.body.instrumentTypeCode,
        instrument_type_desc: req.body.instrumentTypeDescription,
    };
    return instrumentTypeDetails;
}

export async function registerInstrumentType(req, res, next) {
    try {
        const instrumentType = getInstrumentTypeDtlsFromReq(req);
        const result = await dbApis.registerInstrumentType(instrumentType);
        res.json(result);
    } catch (err) {
        handleError(err, "Error registering instrument type", res, next);
    }
}
export async function getInstrumentTypes(req, res, next) {
    try {
        const instrumentTypes = await dbApis.getInstrumentTypes();
        res.json(instrumentTypes);
    } catch (err) {
        handleError(err, "Error retrieving instrument types", res, next);
    }
}
export async function getInstrumentType(req, res, next) {
    try {
        const instrumentType = await dbApis.getInstrumentType(
            +req.params.instrumentTypeId
        );
        res.json(instrumentType);
    } catch (err) {
        handleError(err, "Error retrieving instrument type", res, next);
    }
}

export async function updateInstrumentType(req, res, next) {
    try {
        const instrumentType = getInstrumentTypeDtlsFromReq(req);
        instrumentType.instrument_type_id = +req.params.instrumentTypeId;
        delete instrumentType.instrument_type_cd;

        const result = await dbApis.updateInstrumentType(instrumentType);
        res.json(result);
    } catch (err) {
        handleError(err, "Error updating instrument type", res, next);
    }
}

export async function deleteInstrumentType(req, res, next) {
    try {
        const instrumentTypeId = +req.params.instrumentTypeId;
        const result = await dbApis.deleteInstrumentType(instrumentTypeId);
        res.json(result);
    } catch (err) {
        handleError(err, "Error deleting instrument type", res, next);
    }
}
