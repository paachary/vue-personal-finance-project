import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
    namespaced: true,
    state() {
        return {
            headers: [
                {
                    title: "Account Number",
                    align: "center",
                    sortable: true,
                    key: "accountNumber",
                    isAscending: true,
                    drillDown: true,
                    dest: "/investments/account/",
                },
                {
                    title: "Preferred Name",
                    align: "center",
                    sortable: true,
                    key: "preferredName",
                    isAscending: true,
                },
                {
                    title: "Bank Name",
                    align: "center",
                    sortable: true,
                    key: "bankName",
                    isAscending: false,
                },
                {
                    title: "Branch Name",
                    align: "center",
                    sortable: true,
                    key: "branchName",
                    isAscending: false,
                },
                {
                    title: "City",
                    align: "center",
                    sortable: true,
                    key: "bankCity",
                    isAscending: false,
                },
                {
                    title: "Pin",
                    align: "center",
                    sortable: true,
                    key: "bankPinCode",
                    isAscending: false,
                },
                {
                    title: "Actions",
                    align: "center",
                    edit: true,
                    delete: true,
                    sortable: false,
                    key: "actions",
                    relatedKey: "accountNumber",
                },
            ],
            items: [],
            allAccounts: [],
        };
    },
    mutations,
    getters,
    actions,
};
