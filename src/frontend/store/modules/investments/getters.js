export default {
    investmentHeaders(state) {
        return state.headers;
    },
    allInvestments(state) {
        if (state.allInvestments === "" || state.allInvestments === null)
            state.allInvestments = [];
        return state.allInvestments;
    },
    investments(state) {
        if (state.items === "" || state.items === null) state.items = [];
        return state.items;
    },
    hasInvestments(state) {
        return state.items && state.items.length > 0;
    },
    investmentTypeHeaders(state) {
        return state.investmentTypeHeaders;
    },
    investmentTypes(state) {
        return state.investmentTypes;
    },
    instrumentTypeHeaders(state) {
        return state.instrumentTypeHeaders;
    },
    instrumentTypes(state) {
        return state.instrumentTypes;
    },
    activeInvestmentSummary(state) {
        if (
            state.activeInvestmentSummary === "" ||
            state.activeInvestmentSummary === null
        ) {
            state.activeInvestmentSummary = {};
        }
        return state.activeInvestmentSummary;
    },
    activeInvestmentSummaryForInvestmentType(state) {
        if (
            state.activeInvestmentSummaryForInvestmentType === "" ||
            state.activeInvestmentSummaryForInvestmentType === null
        ) {
            state.activeInvestmentSummaryForInvestmentType = {};
        }
        return state.activeInvestmentSummaryForInvestmentType;
    },
    activeInvestmentSummaryForInstrumentType(state) {
        if (
            state.activeInvestmentSummaryForInstrumentType === "" ||
            state.activeInvestmentSummaryForInstrumentType === null
        ) {
            state.activeInvestmentSummaryForInstrumentType = {};
        }
        return state.activeInvestmentSummaryForInstrumentType;
    },
    monthlyDebitSummary(state) {
        if (
            state.monthlyDebitSummary === "" ||
            state.monthlyDebitSummary === null
        ) {
            state.monthlyDebitSummary = [];
        }
        return state.monthlyDebitSummary;
    },
};
