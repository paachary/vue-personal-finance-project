import Api from "@/scripts/Api";
import { handleCatchError, handleSuccessResponse } from "@/scripts/util";

export default {
    async addBank({ state }, payload) {
        let bankData = {
            ...payload,
        };

        if (state.items === null || state.items === "") {
            state.items = [];
        }
        handleSuccessResponse();
        await Api()
            .post("register-bank", bankData)
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse(
                        response.status,
                        "Bank Registered Successfully!",
                        "bg-success",
                        true
                    );

                    bankData = {
                        bankId: response.data.outBinds.ret,
                        ...bankData,
                    };
                    state.items.push(bankData);
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },

    async updateBank({ commit }, payload) {
        handleSuccessResponse();
        const bankData = {
            ...payload,
        };

        await Api()
            .put(`update-bank/${bankData.bankId}`, bankData)
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse(
                        response.status,
                        "Bank Details Updated Successfully!",
                        "bg-success",
                        true
                    );
                    // Update the bank in the state
                    commit("updateBank", bankData);
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },

    async deleteBank({ commit }, payload) {
        const bankData = {
            ...payload,
        };
        handleSuccessResponse();
        await Api()
            .delete(`delete-bank/${bankData.bankId}`)
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse(
                        response.status,
                        "Bank Details Deleted Successfully!",
                        "bg-success",
                        true
                    );
                    commit("deleteBank", bankData);
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },

    async loadBanks({ commit }) {
        handleSuccessResponse();
        await Api()
            .get("banks")
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse();
                    const items = response.data;
                    commit("setBanks", items);
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },
};
