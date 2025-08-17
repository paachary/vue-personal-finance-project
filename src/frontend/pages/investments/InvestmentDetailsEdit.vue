<template>
    <the-flash-message
        v-if="showMessage()"
        :feedback-message="status.message"
        :feedbackClass="status.class"
    ></the-flash-message>

    <the-spinner v-if="isLoading"></the-spinner>

    <the-row class="border-bottom border-top border-1">
        <h2 class="text-center my-3">Investment Details</h2>
    </the-row>

    <the-row>
        <the-column class="col-6 mb-2">
            <customer-details
                :selectedCustomer="selectedCustomer"
            ></customer-details>
        </the-column>
        <the-column class="col-6 mb-2">
            <bank-account-details
                :acctId="investment.accountNumber"
            ></bank-account-details>
        </the-column>
    </the-row>

    <the-form @submitForm="submitForm">
        <the-row
            v-if="mode === 'delete'"
            class="border-bottom border-top border-1"
        >
            <h4 class="text-center mt-4 mb-4">{{ title }}</h4>
            <the-delete-confirmation
                itemType="Investment"
                :selectedItem="investmentDetails"
            ></the-delete-confirmation>
        </the-row>

        <the-row
            v-else-if="mode === 'edit'"
            class="border-bottom border-top border-1"
        >
            <h4 class="text-center mt-4 mb-4">Edit Investment</h4>

            <the-column class="col-6 border-end border-top border-2 shadow-sm">
                <!-- Instrument ID -->
                <the-row>
                    <the-column class="col-sm-4 mb-2">
                        <the-label
                            label-title="Instrument ID"
                            for-id="instrumentId"
                            label-class="col-form-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="instrumentId"
                            inputValue=""
                            v-model="investment.instrumentId"
                            readOnly="true"
                            placeholder="Enter Instrument Id"
                            onBlur="resetFeedback"
                            tabindex="1"
                        ></the-input>
                    </the-column>
                </the-row>
                <!-- Instrument Name -->
                <the-row>
                    <the-column class="col-sm-4 mb-2">
                        <the-label
                            label-title="Instrument Name"
                            for-id="instrumentName"
                            label-class="col-form-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="custInstrumentName"
                            inputValue=""
                            v-model="investment.instrumentName"
                            readOnly="true"
                            placeholder="Enter Instrument Name"
                            onBlur="resetFeedback"
                            tabindex="2"
                        ></the-input>
                    </the-column>
                </the-row>

                <!-- Instrument Type -->
                <the-row>
                    <the-column class="col-sm-4 mb-2">
                        <the-label
                            label-title="Instrument Type"
                            for-id="instrumentType"
                            label-class="col-form-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-input
                            id="select"
                            name="select"
                            v-model="investment.instrumentType"
                            onBlur="resetFeedback"
                            readOnly="true"
                            tabindex="3"
                        >
                        </the-input>
                    </the-column>
                </the-row>

                <!-- Investment Type -->
                <the-row>
                    <the-column class="col-sm-4 mb-2">
                        <the-label
                            label-title="Investment Type"
                            for-id="investmentType"
                            label-class="col-form-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-input
                            id="select"
                            name="select"
                            v-model="investment.investmentType"
                            onBlur="resetFeedback"
                            tabindex="4"
                            readOnly="true"
                        >
                        </the-input>
                    </the-column>
                </the-row>
            </the-column>
            <the-column class="col-6 border-end border-top border-2 shadow-sm">
                <!-- Instrument Assoc Bank -->
                <the-row>
                    <the-column class="col-sm-4 mb-2">
                        <the-label
                            label-title="Instrument Assoc Bank"
                            for-id="instrumentAssocBankName"
                            label-class="col-form-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="instrumentAssocBankName"
                            v-model="investment.instrumentAssocBankName"
                            placeholder="Enter Instrument Associated Bank"
                            onBlur="resetFeedback"
                            readOnly="true"
                            tabindex="5"
                        ></the-input>
                    </the-column>
                </the-row>

                <!-- Invested Amount (₹) -->
                <the-row>
                    <the-column class="col-sm-4 mb-2">
                        <the-label
                            label-title="Invested Amount (₹)"
                            for-id="investedAmt"
                            label-class="col-form-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-input
                            inputClass="form-control  mt-3"
                            inputId="custInvestedAmt"
                            inputValue=""
                            v-model="investment.investmentAmount"
                            readOnly="true"
                            placeholder="Enter Invested Amount (₹)"
                            onBlur="resetFeedback"
                            tabindex="6"
                        ></the-input>
                    </the-column>
                </the-row>

                <!-- Investment Date -->
                <the-row>
                    <the-column class="col-sm-4 mb-2">
                        <the-label
                            label-title="Investment Date"
                            for-id="investmentDt"
                            label-class="col-form-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-input
                            inputClass="form-control  mt-3"
                            inputId="custInvestmentDt"
                            v-model="investment.investmentDate"
                            readOnly="true"
                            placeholder="Enter Investment Date"
                            onBlur="resetFeedback"
                            tabindex="7"
                        ></the-input>
                    </the-column>
                </the-row>

                <!-- Expiration Date (optional) -->
                <the-row>
                    <the-column class="col-sm-4 mb-2">
                        <the-label
                            label-title="Expiration Dt (optional)"
                            for-id="expirationDt"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: expirationDtValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-input
                            inputClass="form-control  mt-3"
                            inputId="custExpirationDt"
                            v-model="investment.expirationDate"
                            placeholder="Enter Expiration Dt (if any, DD-MON-YYYY)"
                            onBlur="resetFeedback"
                            required="false"
                            :readOnly="toggleButton"
                            tabindex="8"
                            :class="{
                                invalid: expirationDtValidity === 'invalid',
                            }"
                        ></the-input>
                        <the-error-para
                            :errorComponent="expirationDtValidity"
                            errorTitle="Please enter date in valid format (DD-MON-YYYY)!"
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
                    :backLink="backLink"
                    :title="buttonTitle"
                    :buttonColor="buttonColor"
                    :buttonHide="toggleButton"
                ></form-buttons>

                <!-- style="background-color: #a8a8ac" -->
            </the-column>
        </the-row>
    </the-form>
</template>

<script>
import TheRow from "@components/UI/layout/TheRow.vue";
import BankAccountDetails from "@components/UI/banks/BankAccountDetails.vue";
import CustomerDetails from "@components/UI/customers/CustomerDetails.vue";
import TheColumn from "@components/UI/layout/TheColumn.vue";
import TheInput from "@components/UI/common/TheInput.vue";
import TheLabel from "@components/UI/common/TheLabel.vue";
import TheForm from "@components/UI/common/TheForm.vue";
import FormButtons from "@components/UI/common/FormButtons.vue";
import TheFlashMessage from "@components/UI/common/TheFlashMessage.vue";
import TheSpinner from "@components/UI/common/TheSpinner.vue";
import TheErrorPara from "@components/UI/common/TheErrorPara.vue";
import TheDeleteConfirmation from "@components/UI/common/TheDeleteConfirmation.vue";
import mixins from "../../mixins/mixins";

export default {
    components: {
        TheRow,
        CustomerDetails,
        BankAccountDetails,
        TheColumn,
        TheInput,
        TheLabel,
        FormButtons,
        TheForm,
        TheFlashMessage,
        TheSpinner,
        TheErrorPara,
        TheDeleteConfirmation,
    },
    props: ["acctId", "investmentId", "mode"],
    mixins: [mixins],
    data() {
        return {
            selectedCustomer: {},
            investment: {},
            expirationDtValidity: "pending",
        };
    },
    computed: {
        buttonTitle() {
            if (this.mode === "edit") {
                return "Save";
            } else if (this.mode === "delete") {
                return "Delete";
            } else {
                return "Add";
            }
        },
        buttonColor() {
            if (this.mode === "delete") {
                return "#DB1A4D";
            } else {
                return "#8fb339";
            }
        },
        backLink() {
            return `/investments/account/${this.investment.accountNumber}`;
        },

        toggleButton() {
            return this.mode === "edit" &&
                this.investment.investmentStatus === "N"
                ? "true"
                : "false";
        },
        investmentDetails() {
            return (
                this.investment.instrumentId +
                "-" +
                this.investment.instrumentName
            );
        },
        title() {
            return this.mode === "edit"
                ? "Edit Investment Details"
                : "Delete Investment";
        },
    },
    async created() {
        this.selectedCustomer = this.$store.getters["customer/customer"][0];

        if (!this.$store.getters["investments/hasInvestments"]) {
            await this.$store.dispatch("investments/loadInvestments", {
                acctId: this.acctId,
            });
        }
        this.investment = this.$store.getters["investments/investments"].find(
            (invst) => invst.investmentId === +this.investmentId
        );

        if (this.investment === null || this.investment === "") {
            this.$router.replace("/");
        }
    },
    methods: {
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
            this.expirationDtValidity = "pending";
        },
        async submitForm() {
            this.resetFeedback();

            if (this.mode === "delete") {
                const modifiedInvestment = {
                    investmentId: this.investmentId,
                };

                await this.$store.dispatch(
                    "investments/deleteInvestment",
                    modifiedInvestment
                );
                this.$store.commit("setLoading", true, { root: true });
                setTimeout(() => {
                    this.$router.replace(this.backLink);
                    this.$store.commit("setLoading", false, { root: true });
                }, 1000);
            } else if (this.mode === "edit") {
                this.expirationDtValidity = "valid";

                const regex =
                    /^(0[1-9]|[12][0-9]|3[01])-(JAN|FRB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)-\d{4}$/;

                if (
                    this.investment.expirationDate &&
                    !regex.test(this.investment.expirationDate.toUpperCase())
                ) {
                    this.expirationDtValidity = "invalid";
                } else {
                    let investmentStatus = "Y"; // Default to "Y" if no expiration date is provided
                    if (this.investment.expirationDate) {
                        investmentStatus =
                            new Date(this.investment.expirationDate) >
                            new Date()
                                ? "Y"
                                : "N";
                    }

                    const modifiedInvestment = {
                        investmentId: this.investmentId,
                        expirationDate: this.investment.expirationDate,
                        investmentStatus: investmentStatus,
                    };
                    await this.$store.dispatch(
                        "investments/updateInvestment",
                        modifiedInvestment
                    );
                    this.$store.commit("setLoading", true, { root: true });
                    setTimeout(() => {
                        this.$router.replace(this.backLink);
                        this.$store.commit("setLoading", false, { root: true });
                    }, 1000);
                }
            }
        },
        showMessage() {
            this.status = this.$store.getters["status"];

            return this.$store.getters["showFlashMessage"];
        },
    },
};
</script>

<style scoped>
.invalid {
    border-color: red;
    color: red;
}
</style>
