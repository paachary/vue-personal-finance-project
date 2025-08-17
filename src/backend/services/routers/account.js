import express from "express";
import * as accountsService from "../../controllers/accounts.js";

const router = express.Router();

router.route("/accounts").get(accountsService.getAccounts);

router.route("/register-account").post(accountsService.registerAccount);

router.route("/update-account").put(accountsService.updateAccountDetails);

router
    .route("/delete-account/:acctId")
    .delete(accountsService.deleteAccountDetails);

router
    .route("/all-accounts/:userName")
    .get(accountsService.getAllAccountsForCust);

export default router;
