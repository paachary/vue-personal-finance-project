@
<template>
    <the-flash-message
        v-if="showMessage()"
        :feedback-message="status.message"
        :feedbackClass="status.class"
    ></the-flash-message>

    <the-spinner v-if="isLoading"></the-spinner>

    <the-form v-if="isAdmin" @submitForm="submitForm">
        <the-row class="border-bottom border-top border-1">
            <!-- Bank Registration Form -->
            <h3 class="text-center my-3">Bank Registration Details</h3>
            <!-- Bank Details -->
            <the-column class="col-6 border-end border-top border-2 shadow-sm">
                <!-- Bank Name -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Bank Name"
                            for-id="bankName"
                            label-class="col-form-label fw-bold"
                            :class="{ invalid: bankNameValidity === 'invalid' }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="bankName"
                            v-model.trim="bankName"
                            placeholder="Enter Bank Name"
                            tabindex="1"
                            :onBlur="resetFeedback"
                            :class="{ invalid: bankNameValidity === 'invalid' }"
                        ></the-input>
                        <the-error-para
                            :errorComponent="bankNameValidity"
                            errorTitle="Please enter a valid Bank Name!"
                        ></the-error-para>
                    </the-column>
                </the-row>
                <!-- Branch Name -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Branch Name"
                            for-id="branchName"
                            label-class="col-form-label fw-bold"
                            :class="{ invalid: branchValidity === 'invalid' }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="branchName"
                            v-model.trim="branchName"
                            placeholder="Enter Branch Name"
                            tabindex="2"
                            :onBlur="resetFeedback"
                            :class="{ invalid: branchValidity === 'invalid' }"
                        ></the-input>
                        <the-error-para
                            :errorComponent="branchValidity"
                            errorTitle="Please enter a valid Branch Name!"
                        ></the-error-para>
                    </the-column>
                </the-row>
                <!-- Bank Abbr Name -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Bank Abbr"
                            for-id="bankAbbr"
                            label-class="col-form-label fw-bold"
                            :class="{ invalid: bankAbbrValidity === 'invalid' }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-input
                            inputClass="form-control  mt-3"
                            inputId="bankAbbr"
                            v-model.trim="bankAbbr"
                            placeholder="Enter Preferred Bank Abbr"
                            :onBlur="resetFeedback"
                            :class="{ invalid: bankAbbrValidity === 'invalid' }"
                            tabindex="3"
                        ></the-input>
                        <the-error-para
                            :errorComponent="bankAbbrValidity"
                            errorTitle="Please enter a valid Abbreviated Name!"
                        ></the-error-para>
                    </the-column>
                </the-row>
            </the-column>
            <the-column
                class="col-6 border-start border-top border-2 shadow-sm"
            >
                <!-- Bank Address -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Address"
                            for-id="bankAddress"
                            label-class="col-form-label fw-bold"
                            :class="{ invalid: addressValidity === 'invalid' }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-2">
                        <textarea
                            class="my-3"
                            name="bankAddress"
                            id="bankAddress"
                            cols="30"
                            rows="5"
                            tabindex="4"
                            v-model.trim="bankAddress"
                            placeholder="Enter Bank Address"
                            :class="{ invalid: addressValidity === 'invalid' }"
                            style="background-color: #e4eef1"
                            :onBlur="resetFeedback"
                        ></textarea>
                        <the-error-para
                            :errorComponent="addressValidity"
                            errorTitle="Please enter a valid Address!"
                        ></the-error-para>
                    </the-column>
                </the-row>
                <!-- City -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="City"
                            for-id="bankCity"
                            label-class="col-form-label fw-bold"
                            :class="{ invalid: cityValidity === 'invalid' }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-4">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="bankCity"
                            v-model.trim="bankCity"
                            placeholder="Enter City"
                            :onBlur="resetFeedback"
                            :class="{ invalid: cityValidity === 'invalid' }"
                            tabindex="5"
                        ></the-input>
                        <the-error-para
                            :errorComponent="cityValidity"
                            errorTitle="Please enter a valid City!"
                        ></the-error-para>
                    </the-column>
                </the-row>
                <!-- Pin code -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Pin Code"
                            for-id="bankPinCode"
                            label-class="col-form-label fw-bold"
                            :class="{ invalid: pinValidity === 'invalid' }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-4">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="bankPinCode"
                            v-model.number="bankPinCode"
                            placeholder="Enter Branch Pin Code"
                            :onBlur="resetFeedback"
                            :class="{ invalid: pinValidity === 'invalid' }"
                            tabindex="6"
                        ></the-input>
                        <the-error-para
                            :errorComponent="pinValidity"
                            errorTitle="Please enter a valid Pin Code!"
                        ></the-error-para>
                    </the-column>
                </the-row>
            </the-column>
        </the-row>

        <the-row>
            <the-column
                class="col-12 border-end border-top border-2 shadow-sm mb-2"
            >
                <form-buttons title="Add"></form-buttons>
            </the-column>
        </the-row>
    </the-form>
    <bank-listing></bank-listing>
</template>

<script>
import TheRow from "@components/UI/layout/TheRow.vue";
import TheColumn from "@components/UI/layout/TheColumn.vue";
import TheLabel from "@components/UI/common/TheLabel.vue";
import TheInput from "@components/UI/common/TheInput.vue";
import TheForm from "@components/UI/common/TheForm.vue";
import BankListing from "@components/UI/banks/BankListing.vue";
import FormButtons from "@components/UI/common/FormButtons.vue";
import TheFlashMessage from "@components/UI/common/TheFlashMessage.vue";
import TheErrorPara from "@components/UI/common/TheErrorPara.vue";
import TheSpinner from "@/components/UI/common/TheSpinner.vue";
import mixins from "../../mixins/mixins";

export default {
    components: {
        TheRow,
        TheColumn,
        TheLabel,
        TheInput,
        TheForm,
        BankListing,
        FormButtons,
        TheFlashMessage,
        TheErrorPara,
        TheSpinner,
    },
    name: "BankDetailsEntry",
    mixins: [mixins],
    data() {
        return {
            // Add your data properties here
            bankName: "",
            branchName: "",
            bankAbbr: "",
            bankCity: "",
            bankAddress: "",
            bankPinCode: "",
            status: "",
            bankNameValidity: "pending",
            branchValidity: "pending",
            bankAbbrValidity: "pending",
            cityValidity: "pending",
            pinValidity: "pending",
            addressValidity: "pending",
        };
    },
    computed: {
        // Add your computed properties here
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
            this.bankNameValidity = "pending";
            this.branchValidity = "pending";
            this.bankAbbrValidity = "pending";
            this.pinValidity = "pending";
            this.cityValidity = "pending";
            this.addressValidity = "pending";
        },
        // Add your methods here
        async submitForm() {
            this.resetFeedback();

            if (this.bankName === "") {
                this.bankNameValidity = "invalid";
            } else {
                this.bankNameValidity = "valid";
            }

            if (this.branchName === "") {
                this.branchValidity = "invalid";
            } else {
                this.branchValidity = "valid";
            }

            if (this.bankAbbr === "") {
                this.bankAbbrValidity = "invalid";
            } else {
                this.bankAbbrValidity = "valid";
            }

            if (this.bankCity === "") {
                this.cityValidity = "invalid";
            } else {
                this.cityValidity = "valid";
            }

            if (
                this.bankPinCode === "" ||
                typeof this.bankPinCode !== "number"
            ) {
                this.pinValidity = "invalid";
            } else {
                this.pinValidity = "valid";
            }

            if (this.bankAddress === "") {
                this.addressValidity = "invalid";
            } else {
                this.addressValidity = "valid";
            }

            if (
                this.pinValidity === "valid" &&
                this.bankAbbrValidity === "valid" &&
                this.branchValidity === "valid" &&
                this.bankNameValidity === "valid" &&
                this.cityValidity === "valid" &&
                this.addressValidity === "valid"
            ) {
                const bankData = {
                    bankName: this.bankName.toUpperCase(),
                    branchName: this.branchName.toUpperCase(),
                    bankCity: this.bankCity.toUpperCase(),
                    bankAbbr: this.bankAbbr.toUpperCase(),
                    bankAddress: this.bankAddress,
                    bankPinCode: this.bankPinCode,
                };
                this.$store.commit("setLoading", true, { root: true });

                await this.$store.dispatch("setup/banks/addBank", bankData);
                setTimeout(() => {
                    this.$store.commit("setFlashMessage", false, {
                        root: true,
                    });
                    this.$router.replace("/banks");
                    this.$store.commit("setLoading", false, { root: true });
                }, 500);
                // Reset the form fields after submission
                this.bankAbbr = "";
                this.bankName = "";
                this.address = "";
                this.bankCity = "";
                this.bankPinCode = "";
                this.branchName = "";
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
