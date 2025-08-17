export default {
    bankHeaders(state) {
        return state.headers;
    },
    banks(state) {
        return state.items;
    },
    hasBanks(state) {
        return state.items && state.items.length > 0;
    },
    errorStatus(state) {
        return state.status;
    },
    bankDetails(state) {
        return state.items.map((bank) => {
            return {
                bankId: bank.bankId,
                bankName: bank.bankName,
                branchName: bank.branchName,
                bankAbbr: bank.bankAbbr,
                bankCity: bank.bankCity,
                bankPinCode: bank.bankPinCode,
                bankAddress: bank.bankAddress,
            };
        });
    },
};
