import express from "express";
import * as instrumentTypesService from "../../controllers/instrumentTypes.js";

const router = express.Router();

router
    .route("/instrument-types")
    .get(instrumentTypesService.getInstrumentTypes);

router
    .route("/instrument-types/register-instrument-type")
    .post(instrumentTypesService.registerInstrumentType);

router
    .route("/instrument-types/:instrumentTypeId")
    .get(instrumentTypesService.getInstrumentType);

router
    .route("/instrument-types/update-instrument-type/:instrumentTypeId")
    .put(instrumentTypesService.updateInstrumentType);

router
    .route("/instrument-types/delete-instrument-type/:instrumentTypeId")
    .delete(instrumentTypesService.deleteInstrumentType);

export default router;
