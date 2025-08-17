import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
    namespaced: true,
    state() {
        return {
            headers: [
                { title: "Investment Id", key: "investmentId", hidden: true },
                { title: "Account Number", key: "accountNumber", hidden: true },

                {
                    title: "Instrument Name",
                    align: "center",
                    sortable: true,
                    key: "instrumentName",
                    isAscending: true,
                },
                {
                    title: "Instrument Type",
                    align: "center",
                    sortable: true,
                    key: "instrumentType",
                    isAscending: true,
                },
                {
                    title: "Investment Type",
                    align: "center",
                    sortable: true,
                    key: "investmentType",
                    isAscending: true,
                },
                {
                    title: "Instrument Assoc Bank",
                    align: "center",
                    sortable: true,
                    key: "instrumentAssocBankName",
                    isAscending: true,
                },
                {
                    title: "Investment Amount (₹)",
                    align: "center",
                    sortable: true,
                    key: "investmentAmount",
                    isAscending: true,
                },
                {
                    title: "Investment Date",
                    align: "center",
                    sortable: true,
                    key: "investmentDate",
                    isAscending: true,
                },
                {
                    title: "Active",
                    align: "center",
                    sortable: true,
                    key: "investmentStatus",
                    isAscending: true,
                },
                {
                    title: "Actions",
                    align: "center",
                    edit: true,
                    delete: true,
                    key: "actions",
                    relatedKey: "investmentId",
                },
            ],
            items: [],
            allInvestments: [],
            activeInvestmentSummary: [],
            activeInvestmentSummaryForInvestmentType: [],
            activeInvestmentSummaryForInstrumentType: [],
            monthlyDebitSummary: [],
        };
    },
    mutations,
    getters,
    actions,
};
