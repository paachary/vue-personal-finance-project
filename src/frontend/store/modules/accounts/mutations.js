export default {
    addAccount(state, payload) {
        state.items.push(payload);
    },

    setAccounts(state, payload) {
        state.items = payload;
    },

    setAllAccounts(state, payload) {
        state.allAccounts = payload;
    },
    updateAccount(state, payload) {
        const rowToChange = state.items.findIndex((item) => {
            return item.accountNumber === payload.acctNbr;
        });

        state.items[rowToChange] = {
            ...state.items[rowToChange],
            preferredName: payload.preferredName,
        };
    },

    deleteAccount(state, payload) {
        state.items = state.items.filter(
            (type) => type.acctId !== payload.acctId
        );
    },

    resetAccounts(state) {
        state.items = [];
    },
};
