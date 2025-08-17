<template>
    <the-flash-message
        v-if="showMessage()"
        :feedback-message="status.message"
        :feedbackClass="status.class"
    ></the-flash-message>
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
            <bank-account-details :acctId="acctId"></bank-account-details>
        </the-column>
    </the-row>

    <the-form @submitForm="submitForm">
        <the-row class="border-bottom border-top border-1">
            <h4 class="text-center mt-4 mb-4">Add Investment</h4>
            <the-column class="col-6 border-end border-top border-2 shadow-sm">
                <!-- Instrument ID -->
                <the-row>
                    <the-column class="col-sm-4 mb-2">
                        <the-label
                            label-title="Instrument ID"
                            for-id="instrumentId"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: instrumentIdValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="instrumentId"
                            :class="{
                                invalid: instrumentIdValidity === 'invalid',
                            }"
                            v-model.trim="instrumentId"
                            placeholder="Enter Instrument Id"
                            :onBlur="resetFeedback"
                            tabindex="1"
                        ></the-input>
                        <the-error-para
                            :errorComponent="instrumentIdValidity"
                            errorTitle="Please enter a valid Instrument Id!"
                        ></the-error-para>
                    </the-column>
                </the-row>
                <!-- Instrument Name -->
                <the-row>
                    <the-column class="col-sm-4 mb-2">
                        <the-label
                            label-title="Instrument Name"
                            for-id="instrumentName"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: instrumentNameValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="custInstrumentName"
                            v-model.trim="instrumentName"
                            placeholder="Enter Instrument Name"
                            :onBlur="resetFeedback"
                            tabindex="2"
                            :class="{
                                invalid: instrumentNameValidity === 'invalid',
                            }"
                        ></the-input>
                        <the-error-para
                            :errorComponent="instrumentNameValidity"
                            errorTitle="Please enter a valid Instrument Name!"
                        ></the-error-para>
                    </the-column>
                </the-row>

                <!-- Instrument Type -->
                <the-row>
                    <the-column class="col-sm-4 mb-2">
                        <the-label
                            label-title="Instrument Type"
                            for-id="instrumentType"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid:
                                    selectInstrumentTypeValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-select
                            id="select"
                            name="select"
                            v-model.trim="selectInstrumentType"
                            :onBlur="resetFeedback"
                            tabindex="3"
                            :class="{
                                invalid:
                                    selectInstrumentTypeValidity === 'invalid',
                            }"
                        >
                            <option
                                v-for="instrumentType in instrumentTypes"
                                :key="instrumentType.instrumentTypeCode"
                                :value="instrumentType.instrumentTypeCode"
                            >
                                {{ instrumentType.instrumentTypeDescription }}
                            </option>
                        </the-select>
                        <the-error-para
                            :errorComponent="selectInstrumentTypeValidity"
                            errorTitle="Please select a valid Instrument Type!"
                        ></the-error-para>
                    </the-column>
                </the-row>

                <!-- Investment Type -->
                <the-row>
                    <the-column class="col-sm-4 mb-2">
                        <the-label
                            label-title="Investment Type"
                            for-id="investmentType"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid:
                                    selectInvestmentTypeValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-select
                            id="select"
                            name="select"
                            v-model.trim="selectInvestmentType"
                            :onBlur="resetFeedback"
                            tabindex="4"
                            :class="{
                                invalid:
                                    selectInvestmentTypeValidity === 'invalid',
                            }"
                        >
                            <option
                                v-for="investmentType in investmentTypes"
                                :key="investmentType.investmentTypeCode"
                                :value="investmentType.investmentTypeCode"
                            >
                                {{ investmentType.investmentTypeDescription }}
                            </option>
                        </the-select>
                        <the-error-para
                            :errorComponent="selectInvestmentTypeValidity"
                            errorTitle="Please select a valid Investment Type!"
                        ></the-error-para>
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
                            :class="{
                                invalid:
                                    instrumentAssocBankNameValidity ===
                                    'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="instrumentAssocBankName"
                            inputValue=""
                            v-model.trim="instrumentAssocBankName"
                            placeholder="Enter Instrument Associated Bank"
                            :onBlur="resetFeedback"
                            tabindex="5"
                            :class="{
                                invalid:
                                    instrumentAssocBankNameValidity ===
                                    'invalid',
                            }"
                        ></the-input>
                        <the-error-para
                            :errorComponent="instrumentAssocBankNameValidity"
                            errorTitle="Please enter a valid Associated Bank!"
                        ></the-error-para>
                    </the-column>
                </the-row>

                <!-- Invested Amount (₹) -->
                <the-row>
                    <the-column class="col-sm-4 mb-2">
                        <the-label
                            label-title="Invested Amount (₹)"
                            for-id="investedAmt"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: investmentAmountValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-input
                            inputClass="form-control  mt-3"
                            inputId="custInvestedAmt"
                            v-model.trim="investmentAmount"
                            placeholder="Enter Invested Amount (₹)"
                            :onBlur="resetFeedback"
                            tabindex="6"
                            :class="{
                                invalid: investmentAmountValidity === 'invalid',
                            }"
                        ></the-input>
                        <the-error-para
                            :errorComponent="investmentAmountValidity"
                            errorTitle="Please enter a valid Amount value!"
                        ></the-error-para>
                    </the-column>
                </the-row>

                <!-- Investment Date -->
                <the-row>
                    <the-column class="col-sm-4 mb-2">
                        <the-label
                            label-title="Investment Date"
                            for-id="investmentDt"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: investmentDateValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-input
                            inputClass="form-control  mt-3"
                            inputId="custInvestmentDt"
                            inputType="date"
                            v-model.trim="investmentDate"
                            placeholder="Enter Investment Date"
                            :onBlur="resetFeedback"
                            tabindex="7"
                            :class="{
                                invalid: investmentDateValidity === 'invalid',
                            }"
                        ></the-input>
                        <the-error-para
                            :errorComponent="investmentDateValidity"
                            errorTitle="Please enter a valid value of date!"
                        ></the-error-para>
                    </the-column>
                </the-row>

                <!-- Expiration Date (optional) -->
                <the-row>
                    <the-column class="col-sm-4 mb-2">
                        <the-label
                            label-title="Expiration Date (optional)"
                            for-id="expirationDt"
                            label-class="col-form-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-input
                            inputClass="form-control  mt-3"
                            inputId="custExpirationDt"
                            inputType="date"
                            v-model.trim="expirationDate"
                            placeholder="Enter Expiration Dt (if any)"
                            :onBlur="resetFeedback"
                            required="false"
                            tabindex="8"
                        ></the-input>
                    </the-column>
                </the-row>
            </the-column>
        </the-row>

        <the-row>
            <the-column
                class="col-12 border-end border-top border-2 shadow-sm mb-2"
            >
                <form-buttons backLink="/accounts"></form-buttons>

                <!-- style="background-color: #a8a8ac" -->
            </the-column>
        </the-row>
    </the-form>
    <investment-listing :acctId="acctId" />
</template>

<script>
import TheRow from "@components/UI/layout/TheRow.vue";
import BankAccountDetails from "@components/UI/banks/BankAccountDetails.vue";
import CustomerDetails from "@components/UI/customers/CustomerDetails.vue";
import TheColumn from "@components/UI/layout/TheColumn.vue";
import TheInput from "@components/UI/common/TheInput.vue";
import TheSelect from "@components/UI/common/TheSelect.vue";
import TheLabel from "@components/UI/common/TheLabel.vue";
import TheForm from "@components/UI/common/TheForm.vue";
import InvestmentListing from "@components/UI/investments/InvestmentListing.vue";
import FormButtons from "@components/UI/common/FormButtons.vue";
import TheFlashMessage from "@components/UI/common/TheFlashMessage.vue";
import TheErrorPara from "@components/UI/common/TheErrorPara.vue";

export default {
    components: {
        TheRow,
        CustomerDetails,
        BankAccountDetails,
        TheColumn,
        TheInput,
        TheLabel,
        TheSelect,
        FormButtons,
        TheForm,
        InvestmentListing,
        TheFlashMessage,
        TheErrorPara,
    },
    props: ["acctId"],
    data() {
        return {
            selectedCustomer: {},
            selectInstrumentType: "",
            instrumentTypes: "",

            selectInvestmentType: "",
            investmentTypes: "",

            instrumentName: "",
            instrumentId: null,
            instrumentAssocBankName: "",
            investmentAmount: null,
            investmentDate: "",
            expirationDate: "",

            instrumentNameValidity: "pending",
            instrumentIdValidity: "pending",
            instrumentAssocBankNameValidity: "pending",
            investmentAmountValidity: "pending",
            investmentDateValidity: "pending",
            selectInstrumentTypeValidity: "pending",
            selectInvestmentTypeValidity: "pending",
        };
    },
    created() {
        this.setupTypes();
        this.selectedCustomer = this.$store.getters["customer/customer"][0];
    },
    methods: {
        setupTypes() {
            this.instrumentTypes =
                this.$store.getters["setup/instrumentTypes/instrumentTypes"];
            this.investmentTypes =
                this.$store.getters["setup/investmentTypes/investmentTypes"];
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

            this.instrumentIdValidity = "pending";
            this.instrumentNameValidity = "pending";
            this.investmentAmountValidity = "pending";
            this.instrumentAssocBankNameValidity = "pending";
            this.investmentDateValidity = "pending";
            this.selectInvestmentTypeValidity = "pending";
            this.selectInstrumentTypeValidity = "pending";
        },
        submitForm() {
            this.resetFeedback();

            if (this.instrumentId === "" || this.instrumentId === null)
                this.instrumentIdValidity = "invalid";
            else this.instrumentIdValidity = "valid";

            if (this.instrumentName === "" || this.instrumentName === null)
                this.instrumentNameValidity = "invalid";
            else this.instrumentNameValidity = "valid";

            if (this.investmentAmount === "" || this.investmentAmount === null)
                this.investmentAmountValidity = "invalid";
            else {
                try {
                    this.investmentAmount = parseFloat(this.investmentAmount);
                    this.investmentAmountValidity = "valid";
                } catch (e) {
                    this.investmentAmountValidity = "invalid";
                }
            }

            if (
                this.instrumentAssocBankName === "" ||
                this.instrumentAssocBankName === null
            )
                this.instrumentAssocBankNameValidity = "invalid";
            else this.instrumentAssocBankNameValidity = "valid";

            if (this.investmentDate === "" || this.investmentDate === null)
                this.investmentDateValidity = "invalid";
            else this.investmentDateValidity = "valid";

            if (
                this.selectInstrumentType === "" ||
                this.selectInstrumentType === null
            )
                this.selectInstrumentTypeValidity = "invalid";
            else this.selectInstrumentTypeValidity = "valid";

            if (
                this.selectInvestmentType === "" ||
                this.selectInvestmentType === null
            )
                this.selectInvestmentTypeValidity = "invalid";
            else this.selectInvestmentTypeValidity = "valid";

            const localInvestmentDate = formatDateToDDMMYYYY(
                new Date(this.investmentDate)
            );

            if (
                this.instrumentIdValidity === "valid" &&
                this.instrumentNameValidity === "valid" &&
                this.investmentAmountValidity === "valid" &&
                this.instrumentAssocBankNameValidity === "valid" &&
                this.investmentDateValidity === "valid" &&
                this.selectInvestmentTypeValidity === "valid" &&
                this.selectInstrumentTypeValidity === "valid"
            ) {
                let localExpirationDate = "";
                let investmentStatus = "Y"; // Default to "Y" if no expiration date is provided
                if (this.expirationDate) {
                    localExpirationDate = formatDateToDDMMYYYY(
                        new Date(this.expirationDate)
                    );
                    investmentStatus =
                        new Date(this.expirationDate) > new Date() ? "Y" : "N";
                }

                const newInvestment = {
                    accountNumber: this.acctId,
                    instrumentId: this.instrumentId,
                    instrumentName: this.instrumentName,
                    instrumentType: this.selectInstrumentType,
                    investmentType: this.selectInvestmentType,
                    instrumentAssocBankName: this.instrumentAssocBankName,
                    investmentAmount: this.investmentAmount,
                    investmentDate: localInvestmentDate,
                    expirationDate: localExpirationDate,
                    investmentStatus: investmentStatus,
                };

                this.$store.dispatch(
                    "investments/addInvestment",
                    newInvestment
                );

                this.instrumentName = "";
                this.selectInstrumentType = "";
                this.selectInvestmentType = "";
                this.investmentAmount = "";
                this.investmentDate = "";
                this.expirationDate = "";
                this.investmentTypes = "";
                this.instrumentTypes = "";
                this.instrumentId = null;
                this.instrumentAssocBankName = "";
                this.setupTypes();
            }
        },
        showMessage() {
            this.status = this.$store.getters["status"];

            return this.$store.getters["showFlashMessage"];
        },
    },
};
function formatDateToDDMMYYYY(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const month = monthNames[date.getMonth()];

    return `${day}-${month}-${year}`;
}
</script>

<style scoped>
.invalid {
    border-color: red;
    color: red;
}
</style>
