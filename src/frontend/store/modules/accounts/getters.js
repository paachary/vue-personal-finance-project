import { reactive } from "vue";
export default {
    accountHeaders(state) {
        return state.headers;
    },
    accounts(state, _1, _2, rootGetters) {
        const isAdmin = rootGetters["customer/isAdmin"];
        if (!isAdmin)
            return reactive(
                state.items.filter(
                    (item) => item.custId === rootGetters["customer/custId"]
                )
            );
        else return state.items;
    },
    hasAccounts(state) {
        return state.items && state.items.length > 0;
    },
    allAccounts(state) {
        return state.allAccounts;
    },
    hasAllAccounts(state) {
        return state.allAccounts && state.allAccounts.length > 0;
    },
};
