import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
    namespaced: true,
    state() {
        return {
            headers: [
                {
                    title: "User",
                    hidden: false, // Default value; logic moved to computed property
                    key: "userName",
                    isAscending: true,
                },
                {
                    title: "Bank",
                    hidden: false, // Default value; logic moved to computed property
                    key: "bank",
                    isAscending: false,
                },
                {
                    title: "Debit Account Number",
                    hidden: false, // Default value; logic moved to computed property
                    key: "accountNumber",
                    isAscending: false,
                },
                {
                    title: "Instrument Name",
                    hidden: false,
                    key: "instrumentName",
                    isAscending: false,
                },
                {
                    title: "Instrument Type",
                    hidden: false,
                    key: "instrumentType",
                    isAscending: false,
                },
                {
                    title: "Investment Type",
                    hidden: false,
                    key: "investmentType",
                    isAscending: false,
                },
                {
                    title: "Associated Bank",
                    hidden: false,
                    key: "instrumentAssocBankName",
                    isAscending: false,
                },
                {
                    title: "Amount",
                    hidden: false,
                    key: "investmentAmount",
                    isAscending: false,
                },
                {
                    title: "Investment Date",
                    hidden: false,
                    key: "investmentDate",
                    isAscending: false,
                },
                {
                    title: "Active",
                    hidden: false,
                    key: "investmentStatus",
                    isAscending: false,
                },
            ],
        };
    },
    mutations,
    getters,
    actions,
};
