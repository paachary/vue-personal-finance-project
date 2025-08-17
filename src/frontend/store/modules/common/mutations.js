export default {
    setFilter(state, payload) {
        state.searchFilter = payload.searchFilter;
    },
    resetSearchFilter(state) {
        state.searchFilter = "";
    },
};
