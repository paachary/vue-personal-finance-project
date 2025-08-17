import { createStore } from "vuex";

import banksModule from "./modules/setup/banks/index.js";
import instrumentTypesModule from "./modules/setup/instrumentTypes/index.js";
import investmentTypesModule from "./modules/setup/investmentTypes/index.js";

import commonModule from "./modules/common/index.js";

import accountsModule from "./modules/accounts/index.js";
import customerModule from "./modules/customer/index.js";
import investmentsModule from "./modules/investments/index.js";
import reportsModule from "./modules/reports/index.js";

const store = createStore({
    modules: {
        // Setup modules
        setup: {
            // Each module can have its own state, mutations, actions, and getters
            // This is especially useful when the application grows
            // and we need to manage different parts of the application separately
            // This also helps in avoiding naming conflicts
            // For example, we can have a module for banks, another for customers, etc.
            // Each module can be imported from its own file
            // This way, we can keep the code organized and maintainable

            namespaced: true,
            modules: {
                banks: banksModule,
                instrumentTypes: instrumentTypesModule,
                investmentTypes: investmentTypesModule,
            },
        },
        accounts: accountsModule,
        common: commonModule,
        customer: customerModule,
        investments: investmentsModule,
        reports: reportsModule,
    },
    state: {
        isLoading: false,
        showFlashMessage: false,
        status: {
            error: false,
            errorCode: "",
            message: "",
            class: "",
        },
        authToken: {
            token: "",
            expiresIn: "1d",
        },
        routes: [],
        setupData: true,
    },
    actions: {
        reset({ commit }) {
            commit("resetTokens");
            commit("setLoading", false);
            commit("setError", false);
            commit("setStatus", {
                error: false,
                errorCode: "",
                message: "",
                class: "",
            });
            commit("setFlashMessage", false);
            commit("resetRoutes");
            commit("investments/resetInvestments");
            commit("accounts/resetAccounts");
            commit("setup/banks/resetBanks");
            commit("setup/investmentTypes/resetInvestmentTypes");
            commit("setup/instrumentTypes/resetInstrumentTypes");
            commit("customer/resetCustomer");
        },
    },
    mutations: {
        setupData(state, payload) {
            state.setupData = payload;
        },
        setLoading(state, isLoading) {
            state.isLoading = isLoading;
        },
        setError(state, error) {
            state.error = error;
        },
        setStatus(state, status) {
            state.status = {
                ...state.status,
                ...status,
            };
        },
        setFlashMessage(state, showFlashMessage) {
            state.showFlashMessage = showFlashMessage;
        },
        setAuthToken(state, authToken) {
            state.authToken = {
                ...state.authToken,
                ...authToken,
            };
        },
        resetTokens(state) {
            state.authToken = {
                token: "",
                expiresIn: "1d",
            };
        },
        setRoutes(state, route) {
            let maxid = Math.max(...state.routes.map((route) => route.id));
            if (maxid === undefined || maxid === "" || maxid === -Infinity) {
                maxid = 0;
            }

            const newRoute = {
                id: maxid + 1,
                ...route,
            };

            state.routes.push(newRoute);
        },
        resetRoutes(state) {
            state.routes = [];
        },
    },
    getters: {
        setupData(state) {
            return state.setupData;
        },
        isLoading(state) {
            return state.isLoading;
        },
        status(state) {
            return state.status;
        },
        showFlashMessage(state) {
            return state.showFlashMessage;
        },
        authToken(state) {
            return state.authToken;
        },
        routes(state) {
            return (toName) => {
                const routes = state.routes.filter((route) => {
                    return route.toName === toName;
                });
                if (routes.length === 1) {
                    return routes[0];
                } else {
                    const maxid = Math.max(
                        ...state.routes.map((route) => route.id)
                    );
                    return routes.filter((route) => route.id === maxid)[0];
                }
            };
        },
    },
});

export default store;
