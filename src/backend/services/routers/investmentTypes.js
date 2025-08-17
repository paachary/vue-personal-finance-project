import express from "express";
import * as investmentTypesService from "../../controllers/investmentTypes.js";

const router = express.Router();

router
    .route("/investment-types")
    .get(investmentTypesService.getInvestmentTypes);

router
    .route("/investment-types/register-investment-type")
    .post(investmentTypesService.registerInvestmentType);

router
    .route("/investment-types/:investmentTypeId")
    .get(investmentTypesService.getInvestmentType);

router
    .route("/investment-types/update-investment-type/:investmentTypeId")
    .put(investmentTypesService.updateInvestmentType);

router
    .route("/investment-types/delete-investment-type/:investmentTypeId")
    .delete(investmentTypesService.deleteInvestmentType);

export default router;
