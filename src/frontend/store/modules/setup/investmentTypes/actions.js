import Api from "@/scripts/Api";
import { handleCatchError, handleSuccessResponse } from "@/scripts/util";

export default {
    async loadInvestmentTypes({ commit }) {
        handleSuccessResponse();
        await Api()
            .get("investment-types")
            .then((response) => {
                if (response.status === 200) {
                    commit("setInvestmentTypes", response.data);
                    handleSuccessResponse();
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },

    async loadInvestmentType({ commit }, { investmentTypeId }) {
        handleSuccessResponse();
        await Api()
            .get(`investment-types/${investmentTypeId}`)
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse();
                    commit("setInvestmentTypes", response.data);
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },
    async registerInvestmentType({ commit }, investmentTypeData) {
        handleSuccessResponse();
        await Api()
            .post(
                `investment-types/register-investment-type`,
                investmentTypeData
            )
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse(
                        "bg-success",
                        response.status,
                        "Investment Type Registered Successfully!",
                        true
                    );

                    investmentTypeData = {
                        investmentTypeId:
                            response.data.outBinds.investment_type_id,
                        ...investmentTypeData,
                    };
                    commit("addInvestmentType", investmentTypeData);
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },
    async updateInvestmentType({ commit }, payload) {
        handleSuccessResponse();
        await Api()
            .put(
                `investment-types/update-investment-type/${payload.investmentTypeId}`,
                payload
            )
            .then((response) => {
                if (response.status === 200) {
                    commit("updateInvestmentType", payload);
                    handleSuccessResponse(
                        "bg-success",
                        response.status,
                        "Investment Type Updated Successfully!",
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
    async deleteInvestmentType({ commit }, { investmentTypeId }) {
        handleSuccessResponse();
        await Api()
            .delete(
                `investment-types/delete-investment-type/${investmentTypeId}`
            )
            .then((response) => {
                if (response.status === 200) {
                    commit("removeInvestmentType", { investmentTypeId });
                    handleSuccessResponse(
                        "bg-success",
                        response.status,
                        "Investment Type Deleted Successfully!",
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
};
