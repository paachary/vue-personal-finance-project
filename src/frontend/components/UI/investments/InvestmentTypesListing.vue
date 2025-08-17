<template>
    <the-table-with-search
        :items="items"
        :headers="headers"
        v-model="filteredItems"
        title="Investment Types Listing"
        childLink="/investment-types/edit/"
        deleteLink="/investment-types/delete/"
        componentType="setup"
    >
    </the-table-with-search>
</template>

<script>
import TheTableWithSearch from "../common/TheTableWithSearch.vue";

export default {
    name: "InvestmentTypesListing",
    components: { TheTableWithSearch },
    data() {
        return {};
    },
    computed: {
        items() {
            return this.$store.getters["setup/investmentTypes/investmentTypes"];
        },
        headers() {
            return this.$store.getters[
                "setup/investmentTypes/investmentTypeHeaders"
            ];
        },
        filteredItems() {
            if (
                this.$store.getters["setup/investmentTypes/hasInvestmentTypes"]
            ) {
                const searchFilter = this.$store.getters["common/search"];

                return this.items.filter((item) => {
                    return (
                        item.investmentTypeCode
                            .toLowerCase()
                            .includes(searchFilter) ||
                        item.investmentTypeDescription
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
