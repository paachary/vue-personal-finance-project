import Api from "@/scripts/Api";
import { handleCatchError, handleSuccessResponse } from "@/scripts/util";

async function setApplicationContext(custId, userName) {
    if (!custId || !userName) {
        handleCatchError(
            null,
            "Customer ID and Username are required to set application context."
        );
        return false;
    }
    let ret = false;
    handleSuccessResponse();
    await Api()
        .post("set-application-context", {
            custId,
            userName,
        })
        .then((response) => {
            if (response.status === 200) {
                handleSuccessResponse(
                    response.status,
                    "Application Context Set Successfully!",
                    "bg-success",
                    true
                );
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
}

export default {
    async registerNewCustomer({ commit }, payload) {
        let ret = false;
        let customerData = {
            ...payload,
        };
        handleSuccessResponse();
        await Api()
            .post("register-new-customer", customerData)
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse(
                        response.status,
                        "Customer Registered Successfully!",
                        "bg-success",
                        true
                    );
                    customerData = {
                        custId: response.data.result.outBinds.cust_id,
                        ...customerData,
                    };
                    commit(
                        "setAuthToken",
                        { token: response.data.token },
                        { root: true }
                    );
                    commit("setUserName", customerData.userName);

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
        ret = await setApplicationContext(
            customerData.custId,
            customerData.userName
        );
        return ret;
    },

    async updateCustomerDetails({ commit }, payload) {
        handleSuccessResponse();
        let customerData = {
            ...payload,
        };
        const custId = customerData.custId;

        await Api()
            .put(`customer/update-customer-details/${custId}`, customerData)
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse(
                        response.status,
                        "Customer Details Updated Successfully!",
                        "bg-success",
                        true
                    );
                    commit("updateCustomer", customerData);
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },

    async getCustomerDetails({ commit }, userName) {
        let ret = false;
        handleSuccessResponse();
        await Api()
            .get(`customer/${userName}`)
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse();
                    commit("setCustomer", response.data);
                    ret = true;
                } else {
                    ret = false;
                    handleCatchError(null, response);
                }
                return ret;
            })
            .catch((error) => {
                handleCatchError(error, null);
                ret = false;
            });
        return ret;
    },
    async accessTokenRefresh({ commit }, { userName }) {
        let authToken;
        handleSuccessResponse();
        await Api()
            .post(`access-token-refresh/${userName}`)
            .then((response) => {
                if (response.status === 200) {
                    authToken = response.data.token;
                    commit(
                        "setAuthToken",
                        { token: authToken },
                        { root: true }
                    );
                    handleSuccessResponse();
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },

    async clearSession(state, custId) {
        handleSuccessResponse();
        await Api()
            .post("clear-session", { custId })
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse();
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },
    async validateCustomer({ commit }, { userName, password }) {
        let ret = false;
        let custId = 0;
        handleSuccessResponse();

        await Api()
            .post(`customer/validate-customer/${userName}`, {
                password: password,
                fromUI: true,
            })
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse();
                    commit("setCustomer", response.data.result);
                    commit(
                        "setAuthToken",
                        { token: response.data.token },
                        { root: true }
                    );
                    custId = response.data.result[0].custId;
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

        ret = await setApplicationContext(custId, userName);
        return ret;
    },

    async getAllCustomers({ commit }) {
        let ret = false;
        handleSuccessResponse();
        await Api()
            .get("customers")
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse();
                    commit("setAllCustomers", response.data);
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

    async handleResetPassword({ commit }, payload) {
        let ret = false;
        handleSuccessResponse();

        await Api()
            .put("customer/auth/reset-password", payload)
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse(
                        response.status,
                        "Password reset is successful",
                        "bg-success",
                        true
                    );
                    const customerData = {
                        custId: payload.custId,
                        password: payload.newPassword,
                    };
                    commit("setPassword", customerData);
                    ret = true;
                } else {
                    ret = false;
                    handleCatchError(null, response);
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
};
