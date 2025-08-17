export default {
    investmentTypeHeaders(state) {
        return state.headers;
    },
    investmentTypes(state) {
        return state.items;
    },

    hasInvestmentTypes(state) {
        return state.items && state.items.length > 0;
    },
};
