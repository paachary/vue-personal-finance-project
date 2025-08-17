import { initCap } from "../../../scripts/util";

export default {
    customerHeaders(state) {
        return state.headers;
    },
    customer(state) {
        return state.items;
    },
    isLoggedIn(state) {
        return state.items && state.items.length > 0;
    },
    customerName(state) {
        if (state.items && state.items.length > 0) {
            return initCap(
                state.items[0].firstName + " " + state.items[0].lastName
            );
        } else {
            return "";
        }
    },
    userName(state) {
        if (state.userName && state.userName !== "") {
            return state.userName;
        } else {
            if (state.items && state.items.length > 0) {
                state.userName = state.items[0].userName;
            } else state.userName = "";
            return state.userName;
        }
    },

    custId(state) {
        if (state.items && state.items.length > 0) {
            return state.items[0].custId;
        } else return "";
    },

    isAdmin(state) {
        if (state.items && state.items.length > 0) {
            return state.items[0].isAdmin === "Y" ? true : false;
        } else return false;
    },

    lastLoggedIn(state) {
        return state.items && state.items.length > 0
            ? state.items[0].lastLoggedIn
            : "";
    },

    getAllCustomers(state) {
        return state.allCustomers;
    },

    selectedCustomer(state) {
        return (userName) => {
            if (state.allCustomers === "" || state.allCustomers === null) {
                state.allCustomers = [];
            }
            return state.allCustomers.find((customer) => {
                return customer.userName === userName;
            });
        };
    },
};
