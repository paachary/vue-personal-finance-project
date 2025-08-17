<template>
    <the-flash-message
        v-if="showMessage()"
        :feedback-message="status.message"
        :feedbackClass="status.class"
    ></the-flash-message>

    <the-spinner v-if="isLoading"></the-spinner>

    <the-form v-if="mode === 'delete'" @submitForm="submitForm">
        <the-row class="border-bottom border-top border-1">
            <h2 class="text-center my-3">Delete Account Details</h2>
        </the-row>
        <the-row>
            <the-delete-confirmation itemType="Account" :selectedItem="acctId">
                <p class="fs-4 text-center text-danger">
                    This will delete all the related savings associated with
                    this account!
                </p>
            </the-delete-confirmation>
        </the-row>
        <the-row>
            <the-column
                class="col-6 offset-3 border-end border-top border-2 shadow-sm mb-2"
            >
                <form-buttons
                    :title="title"
                    :buttonColor="buttonColor"
                    backLink="/accounts"
                ></form-buttons>
                <!-- style="background-color: #a8a8ac" -->
            </the-column>
        </the-row>
    </the-form>
    <div v-else-if="mode === 'edit'">
        <the-row class="border-bottom border-top border-1">
            <h2 class="text-center my-3">Edit Account Details</h2>
        </the-row>
        <the-row>
            <the-column class="col-6 mb-2">
                <customer-details
                    :selectedCustomer="selectedCustomer"
                ></customer-details>
            </the-column>
            <the-column class="col-6 mb-2">
                <bank-account-details
                    :acctId="acctId"
                    :mode="mode"
                    @submitForm="submitForm"
                ></bank-account-details>
            </the-column>
        </the-row>
    </div>
</template>

<script>
import TheRow from "@components/UI/layout/TheRow.vue";
import TheColumn from "@components/UI/layout/TheColumn.vue";
import CustomerDetails from "@components/UI/customers/CustomerDetails.vue";
import TheFlashMessage from "@components/UI/common/TheFlashMessage.vue";
import BankAccountDetails from "@components/UI/banks/BankAccountDetails.vue";
import TheSpinner from "@components/UI/common/TheSpinner.vue";
import TheForm from "@components/UI/common/TheForm.vue";
import TheDeleteConfirmation from "@components/UI/common/TheDeleteConfirmation.vue";
import FormButtons from "@components/UI/common/FormButtons.vue";
import mixins from "../../mixins/mixins";

export default {
    name: "AccountRegistrationEdit",
    props: ["acctId", "mode"],
    mixins: [mixins],
    components: {
        TheColumn,
        TheFlashMessage,
        TheSpinner,
        TheRow,
        CustomerDetails,
        BankAccountDetails,
        TheForm,
        TheDeleteConfirmation,
        FormButtons,
    },

    TheFormdata() {
        return {
            status: "",
            selectedCustomer: {},
        };
    },
    computed: {
        title() {
            if (this.mode === "edit") return "Save";
            else if (this.mode === "delete") return "Delete";
            else return "Add";
        },
        buttonColor() {
            if (this.mode === "delete") {
                return "#DB1A4D";
            } else {
                return "#8fb339";
            }
        },
    },
    created() {
        try {
            this.selectedCustomer = this.$store.getters["customer/customer"][0];
        } catch (error) {
            this.$store.commit(
                "setStatus",
                {
                    error: true,
                    errorCode: "500",
                    message: "An unexpected error occurred.",
                    class: "bg-danger text-white",
                },
                { root: true }
            );
            this.$store.commit("setFlashMessage", true, { root: true });
            setTimeout(() => {
                this.$store.commit("setFlashMessage", false, {
                    root: true,
                });
                this.$$router.replace("/auth/logout");
            }, 1000);
        }
    },
    methods: {
        showMessage() {
            this.status = this.$store.getters["status"];

            return this.$store.getters["showFlashMessage"];
        },
        async submitForm(val) {
            if (this.mode === "delete") {
                await this.$store
                    .dispatch("accounts/deleteAccountDetails", {
                        accountNumber: this.acctId,
                    })
                    .then((response) => {
                        if (response) {
                            this.$store.commit("setLoading", true, {
                                root: true,
                            });
                            setTimeout(() => {
                                this.$router.replace("/accounts");
                                this.$store.commit("setLoading", false, {
                                    root: true,
                                });
                            }, 1000);
                        }
                    });
            } else {
                try {
                    await this.$store
                        .dispatch("accounts/updateAccountDetails", {
                            accountNumber: this.acctId,
                            ...val,
                        })
                        .then((response) => {
                            if (response) {
                                this.$store.commit("setLoading", true, {
                                    root: true,
                                });
                                setTimeout(() => {
                                    this.$router.replace("/accounts");
                                    this.$store.commit("setLoading", false, {
                                        root: true,
                                    });
                                }, 1000);
                            }
                        });
                } catch (err) {
                    //
                }
            }
        },
    },
};
</script>

<style></style>
