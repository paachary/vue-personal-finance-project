export default {
    setCustomer(state, payload) {
        state.items = payload;
    },

    setUserName(state, payload) {
        state.userName = payload;
    },

    resetCustomer(state) {
        state.items = [];
        state.userName = "";
        state.allCustomers = [];
    },

    updateCustomer(state, payload) {
        const rowToChange = state.items.findIndex((item) => {
            return item.custId === payload.custId;
        });

        state.items[rowToChange] = {
            ...state.items[rowToChange],
            email: payload.email,
            phoneNbr: payload.phoneNbr,
            custPinCode: payload.custPinCode,
            custAddress: payload.custAddress,
            custCity: payload.custCity,
        };
    },
    setAllCustomers(state, payload) {
        state.allCustomers = payload;
    },
    setPassword(state, payload) {
        const rowToChange = state.items.findIndex((item) => {
            return item.custId === payload.custId;
        });

        state.items[rowToChange] = {
            ...state.items[rowToChange],
            password: payload.password,
        };
    },
};
