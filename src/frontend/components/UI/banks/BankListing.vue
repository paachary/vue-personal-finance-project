<template>
    <the-table-with-search
        :items="items"
        :headers="headers"
        v-model="filteredItems"
        title="Bank Listing"
        childLink="/banks/edit/"
        deleteLink="/banks/delete/"
        componentType="setup"
    >
    </the-table-with-search>
</template>

<script>
import TheTableWithSearch from "../common/TheTableWithSearch.vue";

export default {
    name: "BankListing",
    components: { TheTableWithSearch },
    data() {
        return {};
    },
    computed: {
        items() {
            const banks = this.$store.getters["setup/banks/banks"];

            if (banks === undefined || banks === null)
                this.$router.replace("/auth/logout");

            return banks;
        },
        headers() {
            return this.$store.getters["setup/banks/bankHeaders"];
        },
        filteredItems() {
            if (this.$store.getters["setup/banks/hasBanks"]) {
                const searchFilter = this.$store.getters["common/search"];

                return this.items.filter((item) => {
                    return (
                        item.bankName.toLowerCase().includes(searchFilter) ||
                        item.branchName.toLowerCase().includes(searchFilter) ||
                        item.bankAbbr.toLowerCase().includes(searchFilter) ||
                        item.bankCity.toLowerCase().includes(searchFilter) ||
                        item.bankPinCode.toString().includes(searchFilter)
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
