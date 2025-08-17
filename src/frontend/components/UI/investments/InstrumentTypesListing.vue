<template>
    <the-table-with-search
        :items="items"
        :headers="headers"
        v-model="filteredItems"
        title="Instrument Types Listing"
        childLink="/instrument-types/edit/"
        deleteLink="/instrument-types/delete/"
        componentType="setup"
    >
    </the-table-with-search>
</template>

<script>
import TheTableWithSearch from "../common/TheTableWithSearch.vue";

export default {
    name: "InstrumentTypesListing",
    components: { TheTableWithSearch },
    data() {
        return {};
    },
    computed: {
        items() {
            return this.$store.getters["setup/instrumentTypes/instrumentTypes"];
        },
        headers() {
            return this.$store.getters[
                "setup/instrumentTypes/instrumentTypeHeaders"
            ];
        },
        filteredItems() {
            if (
                this.$store.getters["setup/instrumentTypes/hasInstrumentTypes"]
            ) {
                const searchFilter = this.$store.getters["common/search"];

                return this.items.filter((item) => {
                    return (
                        item.instrumentTypeCode
                            .toLowerCase()
                            .includes(searchFilter) ||
                        item.instrumentTypeDescription
                            .toLowerCase()
                            .includes(searchFilter)
                    );
                });
            } else return "";
        },
    },
    methods: {},
    async mounted() {
        // Reset search filter when component is mounted
        this.$store.commit("common/resetSearchFilter");
    },
};
</script>
<style></style>
