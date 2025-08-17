<template>
    <the-table-with-search
        :items="items"
        :headers="headers"
        v-model="filteredItems"
        title="Customer Account Listing"
        childLink="/accounts/edit/"
        deleteLink="/accounts/delete/"
    ></the-table-with-search>
</template>

<script>
import TheTableWithSearch from "../common/TheTableWithSearch.vue";
import mixins from "../../../mixins/mixins";

export default {
    name: "AccountListing",
    components: { TheTableWithSearch },
    props: ["custId"],
    data() {},
    mixins: [mixins],
    computed: {
        items() {
            const accounts = this.$store.getters["accounts/accounts"];

            if (accounts === null || accounts === undefined)
                this.$router.replace("/auth/logout");

            return accounts;
        },
        headers() {
            return this.$store.getters["accounts/accountHeaders"];
        },

        filteredItems() {
            if (this.$store.getters["accounts/hasAccounts"]) {
                const searchFilter = this.$store.getters["common/search"];

                return this.items.filter((item) => {
                    return (
                        item.accountNumber.toString().includes(searchFilter) ||
                        item.bankName.toLowerCase().includes(searchFilter) ||
                        item.branchName.toLowerCase().includes(searchFilter) ||
                        item.bankCity.toLowerCase().includes(searchFilter) ||
                        item.bankPinCode.toString().includes(searchFilter) ||
                        item.preferredName.toLowerCase().includes(searchFilter)
                    );
                });
            } else return this.items;
        },
    },
    watch: {},
    async mounted() {
        if (!this.$store.getters["accounts/hasAccounts"]) {
            this.$store.commit("setLoading", true, { root: true });
            await this.$store
                .dispatch("accounts/loadAccounts")
                .catch((error) => {
                    this.commonCatch(error);
                });
            this.$store.commit("setLoading", false, { root: true });
        }

        this.$store.commit("common/resetSearchFilter");
    },
    methods: {},
};
</script>
<style></style>
