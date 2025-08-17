import { createRouter, createWebHistory } from "vue-router";
import BankDetailsEntry from "./pages/banks/BankDetailsEntry.vue";
import CustomerRegistration from "./pages/customers/CustomerRegistration.vue";
import CustomerDetailsEdit from "./pages/customers/CustomerDetailsEdit.vue";
import AccountRegistration from "./pages/accounts/AccountRegistration.vue";
import InvestmentDetails from "./pages/investments/InvestmentDetails.vue";
import BankDetailsView from "./pages/banks/BankDetailsView.vue";
import InvestmentTypes from "./pages/investments/InvestmentTypes.vue";
import InstrumentTypes from "./pages/investments/InstrumentTypes.vue";
import AccountRegistrationEdit from "./pages/accounts/AccountRegistrationEdit.vue";
import InvestmentDetailsEdit from "./pages/investments/InvestmentDetailsEdit.vue";
import CustomerLogin from "./pages/authentication/CustomerLogin.vue";
import CustomerLogout from "./pages/authentication/CustomerLogout.vue";
import PasswordReset from "./pages/authentication/PasswordReset.vue";

import TheHome from "./pages/home/TheHome.vue";
import CustomersListing from "./pages/customers/CustomersListing.vue";
import AccountsListing from "./pages/accounts/AccountsListing.vue";
import AllInvestments from "./pages/investments/AllInvestments.vue";

import AllInvestmentsReport from "./pages/reports/investments/AllInvestmentsReport.vue";
import MonthlyDebitSummaryReport from "./pages/reports/investments/MonthlyDebitSummaryReport.vue";

import TheError from "./pages/error/TheError.vue";
import store from "./store/index.js";

import {
    getAuthToken,
    getUserName,
    checkTokenValidity,
} from "./scripts/util.js";

const localRoutes = {
    history: createWebHistory(),
    routes: [
        {
            path: "/auth/login",
            name: "login",
            component: CustomerLogin,
            meta: {
                requiresUnauth: true,
            },
        },
        {
            path: "/auth/logout",
            name: "logout",
            component: CustomerLogout,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/auth/password-reset",
            name: "passwordReset",
            component: PasswordReset,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/",
            name: "home",
            component: TheHome,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/banks",
            name: "banks",
            component: BankDetailsEntry,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/banks/:mode/:bankId",
            name: "banksDetails",
            component: BankDetailsView,
            props: true,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/register-new-customer",
            name: "registerNewCustomer",
            component: CustomerRegistration,
            meta: {
                requiresUnauth: true,
            },
        },
        {
            path: "/customer/edit/:custId",
            name: "customerEdit",
            component: CustomerDetailsEdit,
            props: true,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/accounts",
            name: "accounts",
            component: AccountRegistration,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/accounts/:mode/:acctId",
            name: "accountsEdit",
            component: AccountRegistrationEdit,
            props: true,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/investments/account/:acctId",
            name: "investments",
            component: InvestmentDetails,
            props: true,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/investments/:mode/:investmentId",
            name: "investmentsEdit",
            component: InvestmentDetailsEdit,
            props: true,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/investment-types",
            name: "investmentTypes",
            component: InvestmentTypes,
            props: true,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/investment-types/:mode/:investmentTypeId",
            name: "investmentTypesParams",
            component: InvestmentTypes,
            props: true,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/instrument-types",
            name: "instrumentTypes",
            component: InstrumentTypes,
            props: true,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/instrument-types/:mode/:instrumentTypeId",
            name: "instrumentTypesParams",
            component: InstrumentTypes,
            props: true,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/customers",
            name: "customers",
            component: CustomersListing,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/all-accounts/:userName",
            name: "allUserAccounts",
            component: AccountsListing,
            props: true,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/all-investments/:accountNumber/:userName",
            name: "allInvestments",
            component: AllInvestments,
            props: true,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/reports/investments/:userName/:investmentTypeCd/:instrumentTypeCd/:investmentStatus/:acctNumber",
            name: "allInvestmentsReport",
            component: AllInvestmentsReport,
            props: true,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/reports/monthlyDebitSummary",
            name: "monthlyDebitSummary",
            // This route is for the monthly debit summary report
            component: MonthlyDebitSummaryReport,
            props: true,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/error/:errorCode",
            name: "error",
            component: TheError,
            props: true,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/:catchAll(.*)",
            // Catch-all route for handling 404 errors
            // This should be the last route in the array
            // to ensure it catches all unmatched routes.
            // It can also be used to display a custom error page.
            // This will not require authentication.
            // If you want to handle 404 errors differently,
            // you can create a specific error component.
            // Here we are using TheError component to display the error.
            name: "catchAll",
            // This is the component that will be displayed for unmatched routes
            // It can be a custom error component or a generic one.
            component: TheError,
            props: true,
            meta: {
                requiresAuth: false,
                requiresUnauth: false,
            },
        },
    ],
};

const router = createRouter(localRoutes);

router.linkActiveClass = "bg-secondary";
router.linkExactActiveClass = "bg-danger";

router.beforeEach(async (to, _, next) => {
    if (to.meta.requiresAuth && !store.getters["customer/isLoggedIn"]) {
        next("/auth/login");
    } else if (to.meta.requiresUnauth && store.getters["customer/isLoggedIn"]) {
        next("/");
    } else {
        const authToken = getAuthToken();
        const token = authToken.token;
        const userName = getUserName();
        if (token && token.length > 0) {
            const tokenValidity = checkTokenValidity(authToken.token);
            if (tokenValidity === "TOKEN_EXPIRED")
                await store.dispatch("customer/accessTokenRefresh", {
                    userName,
                });
        }
        next();
    }
});

export default router;
