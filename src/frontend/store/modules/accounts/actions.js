import Api from "@/scripts/Api";
import { handleCatchError, handleSuccessResponse } from "@/scripts/util";

export default {
    async registerAccount({ commit }, payload) {
        handleSuccessResponse();

        // append the called name with the bank abbr
        const acctData = {
            custId: +payload.custId,
            preferredName: payload.preferredName + "-" + payload.bankAbbr,
            bankId: +payload.bankId,
            accountNumber: payload.accountNumber,
        };

        await Api()
            .post("register-account", acctData)
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse(
                        response.status,
                        "Account Registered Successfully!",
                        "bg-success",
                        true
                    );

                    commit("addAccount", {
                        custId: +payload.custId,
                        bankId: +payload.bankId,
                        bankName: payload.bankName,
                        branchName: payload.branchName,
                        bankCity: payload.bankCity,
                        bankPinCode: payload.bankPinCode,
                        bankAddress: payload.bankAddress,
                        accountNumber: payload.accountNumber,
                        firstName: payload.firstName,
                        lastName: payload.lastName,
                        preferredName: acctData.preferredName,
                        phoneNbr: payload.phoneNbr,
                        email: payload.email,
                        custAddress: payload.custAddress,
                        custPinCode: payload.custPinCode,
                    });
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },

    async loadAccounts({ commit }) {
        handleSuccessResponse();

        await Api()
            .get("accounts")
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse();
                    const items = response.data;
                    if (items === null) {
                        commit("setAccounts", []);
                    } else {
                        commit("setAccounts", items);
                    }
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },

    async updateAccountDetails({ commit }, payload) {
        let ret = false;
        handleSuccessResponse();
        await Api()
            .put("update-account", payload)
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse(
                        response.status,
                        "Account Updated Successfully!",
                        "bg-success",
                        true
                    );

                    commit("updateAccount", payload);
                    ret = true;
                } else {
                    handleCatchError(null, response);
                    ret = false;
                }
                return ret;
            })
            .catch((error) => {
                handleCatchError(error, null);
                ret = false;
                return ret;
            });
        return ret;
    },

    async deleteAccountDetails({ commit }, payload) {
        let ret = false;
        const acctData = {
            ...payload,
        };
        handleSuccessResponse();
        await Api()
            .delete(`delete-account/${acctData.accountNumber}`)
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse(
                        response.status,
                        "Account Deleted Successfully!",
                        "bg-success",
                        true
                    );

                    commit("deleteAccount", acctData);
                    ret = true;
                } else {
                    handleCatchError(null, response);
                    ret = false;
                }
                return ret;
            })
            .catch((error) => {
                handleCatchError(error, null);
                ret = false;
                return ret;
            });
        return ret;
    },

    async getAllAccountsForCust({ commit }, payload) {
        handleSuccessResponse();
        await Api()
            .get(`all-accounts/${payload.userName}`)
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse();
                    const items = response.data;
                    if (items === null) {
                        commit("setAllAccounts", []);
                    } else {
                        commit("setAllAccounts", items);
                    }
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },
};
