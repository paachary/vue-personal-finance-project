export default {
    addBank(state, payload) {
        state.items.push(payload);
    },

    updateBank(state, payload) {
        const rowToChange = state.items.findIndex((item) => {
            return item.id === payload.id;
        });

        state.items[rowToChange] = {
            ...state.items[rowToChange],
            address: payload.address,
            bankAbbr: payload.bankAbbr,
            pinCode: payload.pinCode,
        };
    },

    setBanks(state, payload) {
        state.items = payload;
    },

    deleteBank(state, payload) {
        state.items = state.items.filter(
            (type) => type.bankId !== +payload.bankId
        );
    },

    resetBanks(state) {
        state.items = [];
    },
};
