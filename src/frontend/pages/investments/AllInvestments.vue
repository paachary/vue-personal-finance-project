<template>
    <the-container class="mb-sm-4 rounded-3 border border-3">
        <the-row>
            <the-column class="col-sm">
                <h4
                    class="mt-2 fw-bold p-1 text-dark text-center mb-3"
                    style="background-color: #f6f6f4"
                >
                    Investments Listing for {{ userName }}
                </h4>
            </the-column>
        </the-row>
        <the-row>
            <the-column class="col-sm-6 mb-sm-3">
                <customer-details
                    :selectedCustomer="selectedCustomer"
                ></customer-details>
            </the-column>
            <the-column class="col-sm-6 mb-sm-3">
                <bank-account-details
                    :acctId="accountNumber"
                ></bank-account-details>
            </the-column>
        </the-row>
    </the-container>

    <the-container class="mb-sm-4 rounded-3 border border-3">
        <the-report-table
            :allInvestments="investments"
            hideCol="true"
        ></the-report-table>
    </the-container>
    <the-row id="allAccounts" class="bg-gradient">
        <the-column>
            <the-row class="text-end">
                <the-column class="col-12">
                    <button
                        class="btn btn-secondary mb-3"
                        @click="handleBackBtnClick"
                        tabindex="6"
                    >
                        Back
                    </button>
                </the-column>
            </the-row>
        </the-column>
    </the-row>
</template>
<script>
import TheRow from "@/components/UI/layout/TheRow.vue";
import TheColumn from "@/components/UI/layout/TheColumn.vue";
import CustomerDetails from "@/components/UI/customers/CustomerDetails.vue";
import BankAccountDetails from "@/components/UI/banks/BankAccountDetails.vue";
import mixins from "../../mixins/mixins";
import TheContainer from "@/components/UI/layout/TheContainer.vue";
import TheReportTable from "@components/UI/reports/allinvestments/TheReportTable.vue";

export default {
    name: "AccountsListing",
    components: {
        TheRow,
        TheColumn,
        CustomerDetails,
        BankAccountDetails,
        TheContainer,
        TheReportTable,
    },
    mixins: [mixins],
    data() {
        return {
            selectedCustomer: {},
            selectedCard: {
                id: null,
            }, // To track the selected card
        };
    },
    props: ["userName", "accountNumber"],
    methods: {
        async fetchAllInvestments() {
            this.$store.commit("setLoading", true, { root: true });
            await this.$store.dispatch("investments/loadInvestments", {
                acctId: this.accountNumber,
            });
            this.$store.commit("setLoading", false, { root: true });
        },
        handleClick(id) {
            this.selectedCard = {
                id,
            };
        },
        allInvestmentsLink(accountNumber) {
            // This function will return the link to the accounts page for the customer
            return {
                name: "allInvestments",
                params: { accountNumber: accountNumber },
            };
        },
        showFocusRing(id) {
            // This function will be used to determine the focus ring style
            if (this.selectedCard && this.selectedCard.id === id) {
                return "bg-warning px-1 py-1 rounded-3 shadow";
            } else return "";
        },
    },
    mounted() {
        // Fetch customers data when the component is mounted
        this.fetchAllInvestments();
        this.selectedCustomer = this.$store.getters[
            "customer/selectedCustomer"
        ](this.userName);

        this.initializeRouting("allInvestments");
    },
    computed: {
        investments() {
            return this.$store.getters["investments/investments"];
        },
    },
};
</script>

<style></style>
