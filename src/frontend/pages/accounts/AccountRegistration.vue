<template>
    <the-flash-message
        v-if="showMessage()"
        :feedback-message="status.message"
        :feedbackClass="status.class"
    ></the-flash-message>

    <the-spinner v-if="isLoading"></the-spinner>

    <the-header
        headerClass="h3 fw-bold p-3 text-dark"
        title="Customer Accounts"
        headerStyle="background-color: #F6F6F4"
    ></the-header>

    <the-form @submitForm="submitForm">
        <customer-details :selectedCustomer="selectedCustomer" tabindex="-1" />
        <!-- Account-->
        <the-row class="border-bottom border-top border-1">
            <h4 class="text-center my-3">Account Registration</h4>
            <the-column class="col-6 border-end border-top border-2 shadow-sm">
                <!-- Customer Account Number -->
                <the-row>
                    <the-column class="col-sm-4 mb-2">
                        <the-label
                            label-title="Account Number"
                            for-id="accountNbr"
                            label-class="col-form-label fw-bold"
                            :class="{ invalid: accountValidity === 'invalid' }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="custaccountNbr"
                            v-model="accountNumber"
                            placeholder="Customer Account Number"
                            tabindex="1"
                            :onBlur="resetFeedback"
                            :class="{ invalid: accountValidity === 'invalid' }"
                            ref="acctNbrRef"
                        ></the-input>
                        <the-error-para
                            :errorComponent="accountValidity"
                            errorTitle="Please enter valid Account Number!"
                        ></the-error-para>
                    </the-column>
                </the-row>
            </the-column>
            <the-column class="col-6 border-end border-top border-2 shadow-sm">
                <!-- Contact Number -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Bank Details"
                            for-id="bankDetails"
                            label-class="col-form-label fw-bold"
                            :class="{ invalid: bankDtlsValidity === 'invalid' }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-3">
                        <the-select
                            id="select"
                            name="select"
                            v-model.trim="bankDtls"
                            tabindex="2"
                            :onBlur="resetFeedback"
                            :class="{ invalid: bankDtlsValidity === 'invalid' }"
                        >
                            <option
                                v-for="bank in selectedBankDetails"
                                :key="bank.bankAbbr"
                                :value="[bank.bankId, bank.bankAbbr]"
                            >
                                {{ bank.bankName }} - {{ bank.branchName }}
                            </option>
                        </the-select>
                        <the-error-para
                            :errorComponent="bankDtlsValidity"
                            errorTitle="Please select a valid Bank!"
                        ></the-error-para>
                    </the-column>
                </the-row>
            </the-column>
        </the-row>

        <the-row>
            <the-column
                class="col-12 border-end border-top border-2 shadow-sm mb-2"
            >
                <form-buttons
                    backButtonHide="true"
                    @resetForm="resetForm"
                ></form-buttons>

                <!-- style="background-color: #a8a8ac" -->
            </the-column>
        </the-row>
    </the-form>

    <!-- Accounts Listing -->
    <account-listing :custId="selectedCustomer.custId" />
</template>

<script>
import TheRow from "@components/UI/layout/TheRow.vue";
import TheColumn from "@components/UI/layout/TheColumn.vue";
import TheLabel from "@components/UI/common/TheLabel.vue";
import TheInput from "@components/UI/common/TheInput.vue";
import TheSelect from "@components/UI/common/TheSelect.vue";
import TheForm from "@components/UI/common/TheForm.vue";
import TheHeader from "@components/UI/layout/TheHeader.vue";
import CustomerDetails from "@components/UI/customers/CustomerDetails.vue";
import AccountListing from "@components/UI/accounts/AccountListing.vue";
import FormButtons from "@components/UI/common/FormButtons.vue";
import TheFlashMessage from "@components/UI/common/TheFlashMessage.vue";
import TheErrorPara from "@components/UI/common/TheErrorPara.vue";
import TheSpinner from "@components/UI/common/TheSpinner.vue";
import mixins from "../../mixins/mixins";

export default {
    components: {
        TheHeader,
        TheRow,
        TheColumn,
        TheLabel,
        TheInput,
        TheForm,
        FormButtons,
        AccountListing,
        CustomerDetails,
        TheSelect,
        TheFlashMessage,
        TheErrorPara,
        TheSpinner,
    },
    name: "AccountRegistration",
    mixins: [mixins],
    data() {
        return {
            selectedCustomer: {},
            accountNumber: "",
            bankDtls: "",
            bankId: "",
            bankAbbr: "",
            status: "",
            selectedBankDetails: {},
            bankDtlsValidity: "pending",
            accountValidity: "pending",
        };
    },
    computed: {},
    methods: {
        resetForm() {
            this.accountNumber = "";
            this.$refs.acctNbrRef.focus();
        },
        resetFeedback() {
            this.status.class = "";
            this.status.message = "";
            this.$store.commit(
                "setStatus",
                {
                    error: false,
                    errorCode: "",
                    message: "",
                    class: "",
                },
                { root: true }
            );
            this.$store.commit("setFlashMessage", false, { root: true });
            this.bankDtlsValidity = "pending";
            this.accountValidity = "pending";
        },
        // Add your methods here
        async submitForm() {
            this.resetFeedback();

            if (this.bankDtls === null || this.bankDtls === "") {
                this.bankDtlsValidity = "invalid";
            } else {
                this.bankDtlsValidity = "valid";
            }

            if (this.accountNumber === null || this.accountNumber === "") {
                this.accountValidity = "invalid";
            } else {
                this.accountValidity = "valid";
            }

            try {
                if (
                    this.bankDtlsValidity === "valid" &&
                    this.accountValidity === "valid"
                ) {
                    [this.bankId, this.bankAbbr] = this.bankDtls.split(",");

                    const selectedBank = this.selectedBankDetails.find(
                        (bank) => bank.bankId === +this.bankId
                    );

                    await this.$store.dispatch("accounts/registerAccount", {
                        accountNumber: this.accountNumber,
                        bankId: this.bankId,
                        bankAbbr: this.bankAbbr,
                        ...selectedBank,
                        ...this.selectedCustomer,
                    });

                    this.$store.commit("setLoading", true, { root: true });
                    setTimeout(() => {
                        this.$store.commit("setFlashMessage", false, {
                            root: true,
                        });
                        this.$router.replace("/accounts");
                        this.$store.commit("setLoading", false, { root: true });
                    }, 500);
                    this.accountNumber = "";
                    this.bankId = "";
                    this.bankAbbr = "";
                }
            } catch (error) {
                this.$store.commit(
                    "setStatus",
                    {
                        error: true,
                        errorCode: "400",
                        message: "An unexpected error occurred.",
                        class: "bg-danger text-white",
                    },
                    { root: true }
                );
            }
        },
        showMessage() {
            this.status = this.$store.getters["status"];
            return this.$store.getters["showFlashMessage"];
        },
    },
    mounted() {
        this.resetFeedback();
        try {
            this.selectedBankDetails =
                this.$store.getters["setup/banks/bankDetails"];
            this.selectedCustomer = this.$store.getters["customer/customer"][0];
        } catch (error) {
            this.commonCatch("Error fetching customer or bank details.");
        }
    },
};
</script>

<style scoped>
.invalid {
    border-color: red;
    color: red;
}
</style>
