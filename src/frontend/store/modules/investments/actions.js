import Api from "@/scripts/Api";
import { handleCatchError, handleSuccessResponse } from "@/scripts/util";

export default {
    async addInvestment({ state, commit }, payload) {
        let investmentData = {
            ...payload,
        };

        if (state.items === null || state.items === "") {
            state.items = [];
        }
        handleSuccessResponse();
        // Reset the investmentData object to avoid duplication
        investmentData.investmentId = null;
        await Api()
            .post(`/investments/account/register`, investmentData)
            .then((response) => {
                if (response.status === 200) {
                    investmentData.investmentId =
                        response.data.outBinds.investment_id;

                    // Ensure investmentId is included in the investmentData object
                    // This is to ensure that the investmentId is set correctly
                    investmentData = {
                        investmentId: investmentData.investmentId,
                        ...investmentData,
                    };
                    commit("addInvestment", investmentData);
                    handleSuccessResponse(
                        response.status,
                        "Investment Registered Successfully!",
                        "bg-success",
                        true
                    );
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },

    async loadInvestments({ commit, state }, { acctId }) {
        await Api()
            .get(`/investments/account/${acctId}`)
            .then((response) => {
                handleSuccessResponse();
                if (response.status === 200) {
                    handleSuccessResponse();
                    if (response.data === null || response.data === "") {
                        state.items = [];
                    }
                    commit("setInvestments", response.data);
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },

    async updateInvestment({ state, commit }, payload) {
        let investmentData = {
            ...payload,
        };

        if (state.items === null || state.items === "") {
            state.items = [];
        }
        handleSuccessResponse();
        await Api()
            .put(
                `/investments/update-investment/${investmentData.investmentId}`,
                {
                    expirationDate: investmentData.expirationDate,
                    investmentStatus: investmentData.investmentStatus,
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    commit("updateInvestment", investmentData);
                    handleSuccessResponse(
                        response.status,
                        "Investment Updated Successfully!",
                        "bg-success",
                        true
                    );
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },

    async deleteInvestment({ state, commit }, payload) {
        let investmentData = {
            ...payload,
        };

        if (state.items === null || state.items === "") {
            state.items = [];
        }
        handleSuccessResponse();
        await Api()
            .delete(
                `/investments/delete-investment/${investmentData.investmentId}`
            )
            .then((response) => {
                if (response.status === 200) {
                    commit("deleteInvestment", investmentData);
                    handleSuccessResponse(
                        response.status,
                        "Investment Deleted Successfully!",
                        "bg-success",
                        true
                    );
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },

    async loadAllInvestments({ commit }, payload) {
        await Api()
            .get(`/all-investments/${payload.userName}`)
            .then((response) => {
                handleSuccessResponse();
                if (response.status === 200) {
                    handleSuccessResponse();
                    if (response.data === null || response.data === "") {
                        commit("setAllInvestments", []);
                    }
                    commit("setAllInvestments", response.data);
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },

    async loadActiveInvestmentSummary({ commit }, payload) {
        await Api()
            .get(`get-active-investment-summary/${payload.userName}`)
            .then((response) => {
                handleSuccessResponse();
                if (response.status === 200) {
                    handleSuccessResponse();
                    if (response.data === null || response.data === "") {
                        commit("setActiveInvestmentSummary", {});
                    }
                    commit("setActiveInvestmentSummary", response.data);
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },

    async loadActiveInvestmentSummaryForInvestmentType({ commit }, payload) {
        await Api()
            .get(
                `get-active-investment-summary-for-investment-type/${payload.userName}`
            )
            .then((response) => {
                handleSuccessResponse();
                if (response.status === 200) {
                    handleSuccessResponse();
                    if (response.data === null || response.data === "") {
                        commit(
                            "setActiveInvestmentSummaryForInvestmentType",
                            {}
                        );
                    }
                    commit(
                        "setActiveInvestmentSummaryForInvestmentType",
                        response.data
                    );
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },

    async loadActiveInvestmentSummaryForInstrumentType({ commit }, payload) {
        await Api()
            .get(
                `get-active-investment-summary-for-instrument-type/${payload.userName}`
            )
            .then((response) => {
                handleSuccessResponse();
                if (response.status === 200) {
                    handleSuccessResponse();
                    if (response.data === null || response.data === "") {
                        commit(
                            "setActiveInvestmentSummaryForInstrumentType",
                            {}
                        );
                    }
                    commit(
                        "setActiveInvestmentSummaryForInstrumentType",
                        response.data
                    );
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },
    async loadMonthlyDebitSummary({ commit }) {
        await Api()
            .get(`get-monthly-debit-summary`)
            .then((response) => {
                handleSuccessResponse();
                if (response.status === 200) {
                    handleSuccessResponse();
                    if (response.data === null || response.data === "") {
                        commit("setMonthlyDebitSummary", []);
                    }
                    commit("setMonthlyDebitSummary", response.data);
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },
};
