<template>
    <the-row>
        <the-column class="col">
            <h4
                class="mt-2 fw-bold p-1 text-dark text-center mb-3"
                style="background-color: #f6f6f4"
            >
                Accounts Listing for {{ userName }}
            </h4>
        </the-column>
    </the-row>
    <the-row id="allAccounts" class="bg-gradient row-cols-3">
        <the-column
            class="mb-4"
            v-for="account in accounts"
            :key="account.accountNumber"
        >
            <div :class="showFocusRing(account.accountNumber)">
                <the-card hasBody="true">
                    <template #body>
                        <button
                            class="border-0 bg-white mb-3 fw-bold text-dark"
                            type="button"
                            data-bs-toggle="collapse"
                            :data-bs-target="'#' + account.accountNumber"
                            :aria-controls="account.accountNumber"
                            @click="handleClick(account)"
                        >
                            {{ account.accountNumber }}
                        </button>
                        <div
                            class="collapse"
                            data-bs-parent="#allAccounts"
                            :id="account.accountNumber"
                        >
                            <div>
                                <p>
                                    <router-link
                                        :to="
                                            allInvestmentsLink(
                                                account.accountNumber
                                            )
                                        "
                                        ><span>
                                            Click to see Investments
                                        </span></router-link
                                    >
                                </p>
                                <p>
                                    {{ account.bankName }},
                                    {{ account.branchName }},
                                    {{ account.bankAddress }},
                                    {{ account.bankCity }} -
                                    {{ account.bankPinCode }}
                                    {{ account.preferredName }}
                                </p>
                            </div>
                        </div>
                    </template>
                </the-card>
            </div>
        </the-column>
    </the-row>
    <the-row v-if="accounts.length === 0">
        <h5 class="text-center text-danger" style="font-size: 15px">
            No Records Found!
        </h5>
    </the-row>

    <the-row class="text-end">
        <the-column class="col-12">
            <button
                class="btn btn-secondary mb-3"
                @click="handleBackBtn"
                tabindex="6"
            >
                Back
            </button>
        </the-column>
    </the-row>
</template>

<script>
import TheCard from "@components/UI/layout/TheCard.vue";
import TheRow from "@/components/UI/layout/TheRow.vue";
import TheColumn from "@/components/UI/layout/TheColumn.vue";
import mixins from "../../mixins/mixins";
export default {
    name: "AccountsListing",
    components: {
        TheCard,
        TheRow,
        TheColumn,
    },
    mixins: [mixins],
    data() {
        return {
            selectedCard: {
                id: null,
            }, // To track the selected card
        };
    },
    props: ["userName"],
    methods: {
        handleBackBtn() {
            this.$router.replace("/customers");
        },
        async fetchAllAccounts() {
            this.$store.commit("setLoading", true, { root: true });
            await this.$store.dispatch("accounts/getAllAccountsForCust", {
                userName: this.userName,
            });
            this.$store.commit("setLoading", false, { root: true });
        },
        handleClick(account) {
            this.selectedCard = {
                id: account.accountNumber,
            };
            this.$store.commit("accounts/setAccounts", [account]);
        },
        allInvestmentsLink(accountNumber) {
            // This function will return the link to the accounts page for the customer
            return {
                name: "allInvestments",
                params: {
                    accountNumber: accountNumber,
                    userName: this.userName,
                },
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
        this.fetchAllAccounts();
        // this.initializeRouting("allUserAccounts");
    },
    computed: {
        accounts() {
            return this.$store.getters["accounts/allAccounts"];
        },
    },
};
</script>

<style></style>
