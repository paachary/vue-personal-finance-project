import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
    namespaced: true,
    state() {
        return {
            status: {
                error: false,
                errorCode: "",
                message: "",
                loading: false,
            },
            headers: [
                {
                    title: "Bank Id",
                    align: "center",
                    sortable: true,
                    key: "bankId",
                    hidden: true,
                },
                {
                    title: "Bank Name",
                    align: "center",
                    sortable: true,
                    key: "bankName",
                },
                {
                    title: "Branch Name",
                    align: "center",
                    sortable: true,
                    key: "branchName",
                },
                {
                    title: "Branch Abbrevation",
                    align: "center",
                    sortable: true,
                    key: "bankAbbr",
                },
                {
                    title: "City",
                    align: "center",
                    sortable: true,
                    key: "bankCity",
                },
                {
                    title: "Pin Code",
                    align: "center",
                    sortable: true,
                    key: "bankPinCode",
                },
                {
                    title: "Address",
                    align: "center",
                    sortable: true,
                    key: "bankAddress",
                    hidden: true,
                },
                {
                    title: "Actions",
                    align: "center",
                    key: "actions",
                    relatedKey: "bankId",
                    edit: true,
                    delete: true,
                },
            ],
            items: [],
        };
    },
    mutations,
    getters,
    actions,
};
