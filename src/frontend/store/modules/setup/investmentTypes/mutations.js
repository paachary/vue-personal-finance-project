export default {
    setInvestmentTypes(state, payload) {
        state.items = payload;
    },
    addInvestmentType(state, payload) {
        state.items.push(payload);
    },

    updateInvestmentType(state, payload) {
        const index = state.items.findIndex(
            (item) => item.investmentTypeId === payload.investmentTypeId
        );
        if (index !== -1) {
            state.items.splice(index, 1, payload);
        }
    },

    removeInvestmentType(state, payload) {
        state.items = state.items.filter(
            (type) => type.investmentTypeId !== +payload.investmentTypeId
        );
    },

    resetInvestmentTypes(state) {
        state.items = [];
    },
};
