<template>
    <the-flash-message
        v-if="showMessage()"
        :feedback-message="status.message"
        :feedbackClass="status.class"
    ></the-flash-message>

    <the-spinner v-if="isLoading"></the-spinner>

    <the-form v-if="isAdmin" @submitForm="submitForm">
        <the-row class="border-bottom border-top border-1">
            <h3 class="text-center my-3 text-capitalize">{{ getTitle }}</h3>
            <the-delete-confirmation
                v-if="mode === 'delete'"
                itemType="investment type"
                :selectedItem="selectedInvestmentType.investmentTypeDescription"
            ></the-delete-confirmation>

            <!-- Investment Types Details -->
            <the-column
                v-if="mode !== 'delete'"
                class="col-6 offset-3 border-end border-start border-top border-1 shadow-sm"
            >
                <!-- Investment Type Code -->
                <the-row class="mb-3">
                    <the-column class="col-sm-5 mb-2">
                        <the-label
                            label-title="Investment Type Code"
                            for-id="investmentTypeCode"
                            label-class="col-form-label fw-bold"
                            :class="{ invalid: codeValidity === 'invalid' }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-7">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="investmentTypeCode"
                            placeholder="Investment Type Code"
                            v-model.trim="
                                selectedInvestmentType.investmentTypeCode
                            "
                            :readonly="mode === 'edit'"
                            :onBlur="resetFeedback"
                            :class="{ invalid: codeValidity === 'invalid' }"
                        ></the-input>
                        <the-error-para
                            :errorComponent="codeValidity"
                            errorTitle="Please enter a valid Code!"
                        ></the-error-para>
                    </the-column>
                </the-row>
                <!-- Investment Type Description -->
                <the-row class="mb-3">
                    <the-column class="col-sm-5 mb-2">
                        <the-label
                            label-title="Investment Type Description"
                            for-id="investmentTypeDescription"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: descriptionValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-7">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="investmentTypeDescription"
                            placeholder="Investment Type Description"
                            v-model.trim="
                                selectedInvestmentType.investmentTypeDescription
                            "
                            :onBlur="resetFeedback"
                            :class="{
                                invalid: descriptionValidity === 'invalid',
                            }"
                        ></the-input>
                        <the-error-para
                            :errorComponent="descriptionValidity"
                            errorTitle="Please enter a valid Description!"
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
                    :title="getButtonTitle"
                    backLink="/investment-types"
                    :buttonColor="buttonColor"
                ></form-buttons>
            </the-column>
        </the-row>
    </the-form>
    <investment-types-listing
        v-if="mode !== 'edit' && mode !== 'delete'"
    ></investment-types-listing>
</template>

<script>
import TheRow from "@components/UI/layout/TheRow.vue";
import TheColumn from "@components/UI/layout/TheColumn.vue";
import TheLabel from "@components/UI/common/TheLabel.vue";
import TheInput from "@components/UI/common/TheInput.vue";
import TheForm from "@components/UI/common/TheForm.vue";
import FormButtons from "@components/UI/common/FormButtons.vue";
import TheFlashMessage from "@components/UI/common/TheFlashMessage.vue";
import InvestmentTypesListing from "@components/UI/investments/InvestmentTypesListing.vue";
import TheDeleteConfirmation from "@components/UI/common/TheDeleteConfirmation.vue";
import TheErrorPara from "@components/UI/common/TheErrorPara.vue";
import TheSpinner from "@components/UI/common/TheSpinner.vue";
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
        InvestmentTypesListing,
        TheDeleteConfirmation,
        TheErrorPara,
        TheSpinner,
    },
    props: ["mode", "investmentTypeId"],
    name: "InvestmentTypes",
    mixins: [mixins],
    data() {
        return {
            // Add your data properties here
            selectedInvestmentType: {
                investmentTypeCode: "",
                investmentTypeDescription: "",
            },
            status: "",
            descriptionValidity: "pending",
            codeValidity: "pending",
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
            this.descriptionValidity = "pending";
            this.codeValidity = "pending";
        },
        async submitForm() {
            this.resetFeedback();

            if (
                this.selectedInvestmentType.investmentTypeCode === "" ||
                this.selectedInvestmentType.investmentTypeCode === null
            )
                this.codeValidity = "invalid";
            else this.codeValidity = "valid";

            if (
                this.selectedInvestmentType.investmentTypeDescription ===
                    null ||
                this.selectedInvestmentType.investmentTypeDescription === ""
            )
                this.descriptionValidity = "invalid";
            else this.descriptionValidity = "valid";

            if (
                this.codeValidity === "valid" &&
                this.descriptionValidity === "valid"
            ) {
                if (this.mode === "edit") {
                    // Update existing investment type
                    const investmentTypeData = {
                        investmentTypeId: this.investmentTypeId,
                        investmentTypeDescription:
                            this.selectedInvestmentType.investmentTypeDescription.toUpperCase(),
                    };
                    await this.$store.dispatch(
                        "setup/investmentTypes/updateInvestmentType",
                        investmentTypeData
                    );
                    this.$store.commit("setLoading", true, { root: true });
                    setTimeout(() => {
                        this.$router.replace("/investment-types");
                        this.$store.commit("setLoading", false, { root: true });
                    }, 1000);
                } else if (this.mode === "delete") {
                    // Delete existing investment type
                    const investmentTypeData = {
                        investmentTypeId: this.investmentTypeId,
                    };

                    await this.$store.dispatch(
                        "setup/investmentTypes/deleteInvestmentType",
                        investmentTypeData
                    );
                    this.$store.commit("setLoading", true, { root: true });
                    setTimeout(() => {
                        this.$router.replace("/investment-types");
                        this.$store.commit("setLoading", false, { root: true });
                    }, 1000);
                } else {
                    // Add new investment type
                    const newInvestmentTypeData = {
                        investmentTypeCode:
                            this.selectedInvestmentType.investmentTypeCode.toUpperCase(),
                        investmentTypeDescription:
                            this.selectedInvestmentType.investmentTypeDescription.toUpperCase(),
                    };
                    await this.$store.dispatch(
                        "setup/investmentTypes/registerInvestmentType",
                        newInvestmentTypeData
                    );
                }
                this.selectedInvestmentType = {
                    investmentTypeCode: "",
                    investmentTypeDescription: "",
                };
            }
        },
        showMessage() {
            this.status = this.$store.getters["status"];

            return this.$store.getters["showFlashMessage"];
        },
    },
    async mounted() {
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

        if (this.mode === "edit" || this.mode === "delete") {
            await this.$store.dispatch(
                "setup/investmentTypes/loadInvestmentTypes"
            );
            this.selectedInvestmentType = this.$store.getters[
                "setup/investmentTypes/investmentTypes"
            ].filter((investmentType) => {
                return (
                    investmentType.investmentTypeId === +this.investmentTypeId
                );
            })[0];
        }
    },
    computed: {
        getTitle() {
            if (this.mode === "edit") {
                return "Edit Investment Type";
            } else if (this.mode === "delete") {
                return "Delete Investment Type";
            } else {
                return "Add New Investment Type";
            }
        },
        getButtonTitle() {
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
    },
};
</script>

<style scoped>
.invalid {
    border-color: red;
    color: red;
}
</style>
