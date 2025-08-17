<template>
    <the-table-with-search
        :items="items"
        :headers="headers"
        v-model="filteredItems"
        title="Customer Investment Listing"
        childLink="/investments/edit/"
        deleteLink="/investments/delete/"
    ></the-table-with-search>
</template>

<script>
import TheTableWithSearch from "../common/TheTableWithSearch.vue";

export default {
    name: "investmentListing",
    components: { TheTableWithSearch },
    props: ["acctId"],
    data() {
        return {
            selectedInvestments: [],
        };
    },
    computed: {
        items() {
            return this.$store.getters["investments/investments"];
        },
        headers() {
            return this.$store.getters["investments/investmentHeaders"];
        },
        filteredItems() {
            const searchFilter = this.$store.getters["common/search"];

            if (this.items && this.items.length > 0) {
                return this.items.filter((item) => {
                    return item.instrumentName === null ||
                        item.instrumentName === undefined ||
                        item.instrumentName === ""
                        ? "null"
                        : item.instrumentName
                              .toLowerCase()
                              .includes(searchFilter) ||
                          item.instrumentType === null ||
                          item.instrumentType === undefined ||
                          item.instrumentType === ""
                        ? "null"
                        : item.instrumentType
                              .toLowerCase()
                              .includes(searchFilter) ||
                          item.investmentType === null ||
                          item.investmentType === undefined ||
                          item.investmentType === ""
                        ? "null"
                        : item.investmentType
                              .toLowerCase()
                              .includes(searchFilter) ||
                          item.instrumentAssocBankName === null ||
                          item.instrumentAssocBankName === undefined ||
                          item.instrumentAssocBankName === ""
                        ? "null"
                        : item.instrumentAssocBankName
                              .toLowerCase()
                              .includes(searchFilter) ||
                          item.investmentAmount === null ||
                          item.investmentAmount === undefined ||
                          item.investmentAmount === ""
                        ? "null"
                        : item.investmentAmount
                              .toString()
                              .includes(searchFilter) ||
                          item.investmentDate === null ||
                          item.investmentDate === undefined ||
                          item.investmentDate === ""
                        ? "null"
                        : item.investmentDate.includes(searchFilter) ||
                          item.investmentStatus === null ||
                          item.investmentStatus === undefined ||
                          item.investmentStatus === ""
                        ? "null"
                        : item.investmentStatus
                              .toLocaleLowerCase()
                              .includes(searchFilter);
                });
            } else {
                return "";
            }
        },
    },
    watch: {},
    methods: {},
    async mounted() {
        // Reset search filter when component is mounted
        this.$store.commit("setLoading", true, { root: true });
        await this.$store.dispatch("investments/loadInvestments", {
            acctId: this.acctId,
        });
        this.$store.commit("setLoading", false, { root: true });

        this.$store.commit("common/resetSearchFilter");
    },
    created() {},
};
</script>
<style></style>
