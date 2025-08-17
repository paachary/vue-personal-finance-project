export default {
    setInvestments(state, payload) {
        state.items = payload;
    },
    setAllInvestments(state, payload) {
        state.allInvestments = payload;
    },
    addInvestment(state, payload) {
        state.items.push(payload);
    },
    setActiveInvestmentSummary(state, payload) {
        state.activeInvestmentSummary = payload;
    },
    setActiveInvestmentSummaryForInvestmentType(state, payload) {
        state.activeInvestmentSummaryForInvestmentType = payload;
    },
    setActiveInvestmentSummaryForInstrumentType(state, payload) {
        state.activeInvestmentSummaryForInstrumentType = payload;
    },
    setMonthlyDebitSummary(state, payload) {
        state.monthlyDebitSummary = payload;
    },
    updateInvestment(state, payload) {
        const rowToChange = state.items.findIndex((item) => {
            return item.investmentId === payload.investmentId;
        });
        state.items[rowToChange] = {
            ...state.items[rowToChange],
            expirationDate: payload.expirationDate,
            investmentStatus: payload.investmentStatus,
        };
    },

    deleteInvestment(state, payload) {
        state.items = state.items.filter(
            (type) => type.investmentId !== payload.investmentId
        );
    },

    resetInvestments(state) {
        state.items = [];
        state.allInvestments = [];
        state.activeInvestmentSummary = [];
        state.activeInvestmentSummaryForInvestmentType = [];
        state.activeInvestmentSummaryForInstrumentType = [];
        state.monthlyDebitSummary = [];
    },
};
