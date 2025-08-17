import express from "express";
import * as investmentService from "../../controllers/investments.js";

const router = express.Router();

router.route("/investments/:id").get(investmentService.getInvestmentDetails);

router
    .route("/investments/account/:accountNumber")
    .get(investmentService.getSavingsForAccount);

router
    .route("/investments/account/register")
    .post(investmentService.registerSavings);

router
    .route("/investments/update-investment/:investmentId")
    .put(investmentService.updateInvestment);

router
    .route("/investments/delete-investment/:investmentId")
    .delete(investmentService.deleteInvestment);

router
    .route("/all-investments/:userName")
    .get(investmentService.getAllInvestmentsForUser);

router
    .route("/get-active-investment-summary/:userName")
    .get(investmentService.getActiveInvestmentSummary);

router
    .route("/get-active-investment-summary-for-investment-type/:userName")
    .get(investmentService.getActiveInvestmentSummaryForInvestmentType);

router
    .route("/get-active-investment-summary-for-instrument-type/:userName")
    .get(investmentService.getActiveInvestmentSummaryForInstrumentType);

router
    .route("/get-monthly-debit-summary")
    .get(investmentService.getMonthlyDebitSummary);

export default router;
