export default {
    setInstrumentTypes(state, payload) {
        state.items = payload;
    },

    addInstrumentType(state, payload) {
        state.items.push(payload);
    },

    updateInstrumentType(state, payload) {
        const index = state.items.findIndex(
            (item) => item.instrumentTypeId === payload.instrumentTypeId
        );
        if (index !== -1) {
            state.items.splice(index, 1, payload);
        }
    },

    removeInstrumentType(state, payload) {
        state.items = state.items.filter(
            (type) => type.instrumentTypeId !== +payload.instrumentTypeId
        );
    },

    resetInstrumentTypes(state) {
        state.items = [];
    },
};
