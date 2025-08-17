<template>
    <the-flash-message
        v-if="showMessage()"
        :feedback-message="status.message"
        :feedbackClass="status.class"
    ></the-flash-message>

    <the-row>
        <the-column class="col">
            <h4
                class="mt-2 fw-bold p-1 text-dark text-center mb-3"
                style="background-color: #f6f6f4"
            >
                Customers Listing
            </h4>
        </the-column>
    </the-row>

    <the-row id="custId" class="row-cols-3 bg-gradient">
        <the-column
            class="mb-4"
            v-for="customer in customers"
            :key="customer.custId"
        >
            <div :class="showFocusRing(customer.custId)">
                <the-card hasBody="true">
                    <template #body>
                        <button
                            class="border-0 bg-white mb-3 fw-bold text-dark"
                            type="button"
                            data-bs-toggle="collapse"
                            :data-bs-target="customerId(customer.custId)"
                            :aria-controls="customer.custId"
                            @click="handleClick(customer.custId)"
                        >
                            {{ customer.firstName }} {{ customer.lastName }}
                        </button>
                        <div
                            class="collapse"
                            data-bs-parent="#custId"
                            :id="customer.custId"
                        >
                            <div class="card-text">
                                <p>
                                    Username:
                                    <router-link
                                        :to="allAccountsLink(customer.userName)"
                                        ><span>
                                            {{ customer.userName }}
                                        </span></router-link
                                    >
                                </p>
                                <p>{{ customer.email }}</p>
                                <p>{{ customer.phoneNbr }}</p>
                                <p>
                                    {{
                                        custAddress(
                                            customer.custAddress,
                                            customer.custCity,
                                            customer.custPinCode
                                        )
                                    }}
                                </p>
                            </div>
                        </div>
                    </template>
                </the-card>
            </div>
        </the-column>
    </the-row>
    <the-row v-if="customers.length === 0">
        <h5 class="text-center text-danger" style="font-size: 15px">
            No Records Found!
        </h5>
    </the-row>
</template>

<script>
import TheCard from "@components/UI/layout/TheCard.vue";
import TheColumn from "@components/UI/layout/TheColumn.vue";
import TheRow from "@components/UI/layout/TheRow.vue";
import TheFlashMessage from "@components/UI/common/TheFlashMessage.vue";

export default {
    name: "CustomersListing",
    components: { TheCard, TheRow, TheColumn, TheFlashMessage },
    data() {
        return {
            selectedCard: null, // To track the selected card
        };
    },
    computed: {
        customers() {
            // Fetching customers from the Vuex store
            return this.$store.getters["customer/getAllCustomers"];
        },
        customerName(firstName, lastName) {
            // Assuming customerName is a property of each customer object
            return firstName + " " + lastName;
        },
    },
    methods: {
        showMessage() {
            this.status = this.$store.getters["status"];

            return this.$store.getters["showFlashMessage"];
        },
        customerId(id) {
            return `#${id}`;
        },
        handleClick(id) {
            this.selectedCard = {
                id: id,
            };
        },
        showFocusRing(id) {
            // This function will be used to determine the focus ring style
            if (this.selectedCard && this.selectedCard.id === id) {
                return "bg-warning px-1 py-1 rounded-3 shadow";
            } else return "";
        },
        custAddress(address, city, pinCode) {
            return address + ", " + city + " - " + pinCode;
        },

        allAccountsLink(username) {
            // This function will return the link to the accounts page for the customer
            return {
                name: "allUserAccounts",
                params: { userName: username },
            };
        },

        async fetchCustomers() {
            try {
                this.$store.commit("setLoading", true, { root: true });
                await this.$store.dispatch("customer/getAllCustomers");
                this.$store.commit("setLoading", false, { root: true });
            } catch (error) {
                this.$store.commit("setLoading", false, { root: true });
            }
        },
    },
    mounted() {
        // Fetch customers data when the component is mounted
        this.fetchCustomers();
    },
};
</script>

<style></style>
