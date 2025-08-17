import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
    namespaced: true,
    state() {
        return {
            headers: [
                {
                    title: "First Name",
                    align: "center",
                    sortable: true,
                    key: "firstName",
                    isAscending: true,
                },

                {
                    title: "Last Name",
                    align: "center",
                    sortable: true,
                    key: "lastName",
                    isAscending: false,
                },
                {
                    title: "Called Name",
                    align: "center",
                    sortable: true,
                    key: "calledName",
                    isAscending: false,
                },
                {
                    title: "Gender",
                    align: "center",
                    sortable: true,
                    key: "gender",
                    isAscending: false,
                },
                {
                    title: "Date of Birth",
                    align: "center",
                    sortable: true,
                    key: "dob",
                    isAscending: false,
                },
                {
                    title: "Customer ID",
                    align: "center",
                    sortable: true,
                    key: "custID",
                    isAscending: false,
                },
                {
                    title: "Email",
                    align: "center",
                    sortable: true,
                    key: "email",
                    isAscending: false,
                },
                {
                    title: "Mobile Number",
                    align: "center",
                    sortable: true,
                    key: "phone",
                    isAscending: false,
                },
                {
                    title: "Pin Code",
                    align: "center",
                    sortable: true,
                    key: "pinCode",
                    isAscending: false,
                },
                {
                    title: "Address",
                    align: "center",
                    sortable: true,
                    key: "address",
                    isAscending: false,
                },
                {
                    title: "City",
                    align: "center",
                    sortable: true,
                    key: "city",
                    isAscending: false,
                },
            ],
            items: [],
            allCustomers: [],
            userName: "",
        };
    },
    mutations,
    getters,
    actions,
};
