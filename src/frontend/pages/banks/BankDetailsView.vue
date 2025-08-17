<template>
    <the-flash-message
        v-if="showMessage()"
        :feedback-message="status.message"
        :feedbackClass="status.class"
    ></the-flash-message>
    <the-spinner v-if="isLoading"></the-spinner>

    <the-form @submitForm="submitForm">
        <the-row v-if="mode === 'delete'">
            <the-delete-confirmation
                itemType="Bank"
                :selectedItem="bankDetails"
            >
                <p class="fs-4 text-center text-danger">
                    This will delete all the related savings associated with
                    this branch!
                </p>
            </the-delete-confirmation>
        </the-row>
        <the-row
            v-if="mode === 'edit'"
            class="border-bottom border-top border-1"
        >
            <h3 class="text-center my-3">Edit Bank Details</h3>
            <!-- Bank Details -->
            <the-column
                class="col-6 offset-3 border-end border-start border-top border-1 shadow-sm"
            >
                <!-- Bank Name -->
                <the-row class="mb-3">
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Bank Name"
                            for-id="bankName"
                            label-class="col-form-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="bankName"
                            v-model.trim="selectedBank.bankName"
                            placeholder="Bank Name"
                            readOnly="true"
                        ></the-input>
                    </the-column>
                </the-row>
                <!-- Branch Name -->
                <the-row class="mb-3">
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Branch Name"
                            for-id="branchName"
                            label-class="col-form-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="branchName"
                            v-model.trim="selectedBank.branchName"
                            placeholder="Branch Name"
                            readOnly="true"
                        ></the-input>
                    </the-column>
                </the-row>
                <!-- Bank Abbr Name -->
                <the-row class="mb-3">
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
                            v-model.trim="selectedBank.bankAbbr"
                            placeholder="Enter Preferred Bank Abbr"
                            tabindex="1"
                            :onBlur="resetFeedback"
                            :class="{ invalid: bankAbbrValidity === 'invalid' }"
                        ></the-input>
                        <the-error-para
                            :errorComponent="bankAbbrValidity"
                            errorTitle="Please enter a valid Abbreviated Name!"
                        ></the-error-para>
                    </the-column>
                </the-row>
                <!-- Bank Address -->
                <the-row class="mb-3">
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
                            cols="38"
                            rows="5"
                            tabindex="2"
                            v-model.trim="selectedBank.bankAddress"
                            :class="{ invalid: addressValidity === 'invalid' }"
                            placeholder="Enter Bank Address"
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
                <the-row class="mb-3">
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="City"
                            for-id="city"
                            label-class="col-form-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-4">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="city"
                            v-model.trim="selectedBank.bankCity"
                            placeholder="City"
                            readOnly="true"
                        ></the-input>
                    </the-column>
                </the-row>
                <!-- Pin code -->
                <the-row class="mb-3">
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
                            v-model.trim.number="selectedBank.bankPinCode"
                            placeholder="Enter Branch Pin Code"
                            tabindex="4"
                            :onBlur="resetFeedback"
                            :class="{ invalid: pinValidity === 'invalid' }"
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
                class="col-6 offset-3 border-end border-top border-2 shadow-sm mb-2"
            >
                <form-buttons
                    :title="title"
                    :buttonColor="buttonColor"
                    backLink="/banks"
                ></form-buttons>
                <!-- style="background-color: #a8a8ac" -->
            </the-column>
        </the-row>
    </the-form>
</template>

<script>
import TheRow from "@components/UI/layout/TheRow.vue";
import TheColumn from "@components/UI/layout/TheColumn.vue";
import TheLabel from "@components/UI/common/TheLabel.vue";
import TheInput from "@components/UI/common/TheInput.vue";
import TheForm from "@components/UI/common/TheForm.vue";
import FormButtons from "@components/UI/common/FormButtons.vue";
import TheFlashMessage from "@components/UI/common/TheFlashMessage.vue";
import TheErrorPara from "@components/UI/common/TheErrorPara.vue";
import TheSpinner from "@components/UI/common/TheSpinner.vue";
import TheDeleteConfirmation from "@components/UI/common/TheDeleteConfirmation.vue";
import mixins from "../../mixins/mixins";

export default {
    components: {
        TheRow,
        TheColumn,
        TheLabel,
        TheInput,
        TheForm,
        FormButtons,
        TheFlashMessage,
        TheErrorPara,
        TheSpinner,
        TheDeleteConfirmation,
    },
    props: ["bankId", "mode"],
    name: "BankDetailsView",
    mixins: [mixins],
    data() {
        return {
            // Add your data properties here
            selectedBank: null,
            status: "",
            pinValidity: "pending",
            addressValidity: "pending",
            bankAbbrValidity: "pending",
        };
    },
    methods: {
        // Add your methods here
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
            this.bankAbbrValidity = "pending";
            this.pinValidity = "pending";
            this.addressValidity = "pending";
        },

        async editData() {
            if (
                this.selectedBank.bankAbbr === "" ||
                this.selectedBank.bankAbbr === null
            ) {
                this.bankAbbrValidity = "invalid";
            } else {
                this.bankAbbrValidity = "valid";
            }

            if (
                this.selectedBank.bankPinCode === "" ||
                this.selectedBank.bankPinCode === null ||
                typeof this.selectedBank.bankPinCode !== "number"
            ) {
                this.pinValidity = "invalid";
            } else {
                this.pinValidity = "valid";
            }

            if (
                this.selectedBank.bankAddress === "" ||
                this.selectedBank.bankAddress === null
            ) {
                this.addressValidity = "invalid";
            } else {
                this.addressValidity = "valid";
            }

            if (
                this.addressValidity === "valid" &&
                this.pinValidity === "valid" &&
                this.bankAbbrValidity === "valid"
            ) {
                const bankData = {
                    bankId: this.bankId,
                    bankAbbr: this.selectedBank.bankAbbr.toUpperCase(),
                    bankAddress: this.selectedBank.bankAddress,
                    bankPinCode: this.selectedBank.bankPinCode,
                };
                await this.$store.dispatch("setup/banks/updateBank", bankData);

                this.$store.commit("setLoading", true, { root: true });
                setTimeout(() => {
                    this.$router.replace("/banks");
                    this.$store.commit("setLoading", false, { root: true });
                }, 1000);
            }
        },

        async deleteData() {
            const bankData = {
                bankId: this.bankId,
            };
            await this.$store.dispatch("setup/banks/deleteBank", bankData);

            this.$store.commit("setLoading", true, { root: true });
            setTimeout(() => {
                this.$router.replace("/banks");
                this.$store.commit("setLoading", false, { root: true });
            }, 1000);
        },

        async submitForm() {
            this.resetFeedback();
            if (this.mode === "edit") await this.editData();
            else await this.deleteData();
        },
        showMessage() {
            this.status = this.$store.getters["status"];

            return this.$store.getters["showFlashMessage"];
        },
    },
    created() {
        this.selectedBank = this.$store.getters["setup/banks/banks"].filter(
            (bank) => {
                return bank.bankId === +this.bankId;
            }
        );
        this.selectedBank = this.selectedBank.length
            ? this.selectedBank[0]
            : null;
    },
    mounted() {
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
        bankDetails() {
            return (
                this.selectedBank.bankName +
                ", " +
                this.selectedBank.branchName +
                ", " +
                this.selectedBank.bankCity
            );
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
