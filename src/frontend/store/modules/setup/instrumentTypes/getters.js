export default {
    instrumentTypeHeaders(state) {
        return state.headers;
    },

    instrumentTypes(state) {
        return state.items;
    },

    hasInstrumentTypes(state) {
        return state.items && state.items.length > 0;
    },
};
