import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
    namespaced: true,
    state() {
        return {
            headers: [
                {
                    title: "Investment Type Id",
                    key: "investmentTypeId",
                    sortable: true,
                    hidden: true,
                    align: "center",
                },

                {
                    title: "Investment Type",
                    key: "investmentTypeCode",
                    sortable: true,
                    isAscending: true,
                    align: "center",
                },
                {
                    title: "Description",
                    key: "investmentTypeDescription",
                    sortable: true,
                    isAscending: true,
                    align: "center",
                },
                {
                    title: "Actions",
                    align: "center",
                    key: "actions",
                    relatedKey: "investmentTypeId",
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
