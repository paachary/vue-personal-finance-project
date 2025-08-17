import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
    namespaced: true,
    state() {
        return {
            headers: [
                {
                    title: "Instrument Id",
                    align: "center",
                    key: "instrumentTypeId",
                    sortable: true,
                    hidden: true,
                },
                {
                    title: "Instrument Type",
                    align: "center",
                    key: "instrumentTypeCode",
                    sortable: true,
                    isAscending: true,
                },
                {
                    title: "Description",
                    align: "center",
                    key: "instrumentTypeDescription",
                    sortable: true,
                    isAscending: true,
                },
                {
                    title: "Actions",
                    align: "center",
                    key: "actions",
                    relatedKey: "instrumentTypeId",
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
