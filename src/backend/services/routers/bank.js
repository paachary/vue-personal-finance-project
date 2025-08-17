import express from "express";

import * as banksService from "../../controllers/banks.js";

const router = express.Router();

router.route("/banks").get(banksService.getBankDetails);

router.route("/register-bank").post(banksService.registerBank);

router.route("/update-bank/:bankId").put(banksService.updateBankDetails);

router.route("/delete-bank/:bankId").delete(banksService.deleteBankDetails);

export default router;
