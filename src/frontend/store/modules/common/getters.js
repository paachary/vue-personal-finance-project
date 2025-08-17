import { getSearchFilter } from "../../../scripts/util.js";
export default {
    search(state) {
        return getSearchFilter(state.searchFilter);
    },
};
