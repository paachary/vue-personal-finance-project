import express from "express";

import * as customerService from "../../controllers/customer.js";

const router = express.Router();

router.route("/customer/:userName").get(customerService.getCustomerDetails);

router
    .route("/customer/update-customer-details/:custId")
    .put(customerService.updateCustomerDetails);

router
    .route("/customer/auth/reset-password")
    .put(customerService.resetPassword);

router.route("/customers").get(customerService.getAllCustomers);

export default router;
