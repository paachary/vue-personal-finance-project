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
                itemType="instrument type"
                :selectedItem="selectedInstrumentType.instrumentTypeDescription"
            ></the-delete-confirmation>

            <!-- Instrument Types Details -->
            <the-column
                v-if="mode !== 'delete'"
                class="col-6 offset-3 border-end border-start border-top border-1 shadow-sm"
            >
                <!-- Instrument Type Code -->
                <the-row class="mb-3">
                    <the-column class="col-sm-5 mb-2">
                        <the-label
                            label-title="Instrument Type Code"
                            for-id="instrumentTypeCode"
                            label-class="col-form-label fw-bold"
                            :class="{ invalid: codeValidity === 'invalid' }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-7">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="instrumentTypeCode"
                            placeholder="Instrument Type Code"
                            v-model.trim="
                                selectedInstrumentType.instrumentTypeCode
                            "
                            :readonly="mode === 'edit'"
                            :class="{ invalid: codeValidity === 'invalid' }"
                            :onBlur="resetFeedback"
                        ></the-input>
                        <the-error-para
                            :errorComponent="codeValidity"
                            errorTitle="Please enter a valid Code!"
                        ></the-error-para>
                    </the-column>
                </the-row>
                <!-- Instrument Type Description -->
                <the-row class="mb-3">
                    <the-column class="col-sm-5 mb-2">
                        <the-label
                            label-title="Instrument Type Description"
                            for-id="instrumentTypeDescription"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: descriptionValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-7">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="instrumentTypeDescription"
                            placeholder="Instrument Type Description"
                            v-model="
                                selectedInstrumentType.instrumentTypeDescription
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
                    backLink="/instrument-types"
                    :buttonColor="buttonColor"
                ></form-buttons>
            </the-column>
        </the-row>
    </the-form>
    <instrument-types-listing
        v-if="mode !== 'edit' && mode !== 'delete'"
    ></instrument-types-listing>
</template>

<script>
import TheRow from "@components/UI/layout/TheRow.vue";
import TheColumn from "@components/UI/layout/TheColumn.vue";
import TheLabel from "@components/UI/common/TheLabel.vue";
import TheInput from "@components/UI/common/TheInput.vue";
import TheForm from "@components/UI/common/TheForm.vue";
import FormButtons from "@components/UI/common/FormButtons.vue";
import TheFlashMessage from "@components/UI/common/TheFlashMessage.vue";
import InstrumentTypesListing from "@components/UI/investments/InstrumentTypesListing.vue";
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
        InstrumentTypesListing,
        TheDeleteConfirmation,
        TheErrorPara,
        TheSpinner,
    },
    props: ["mode", "instrumentTypeId"],
    name: "InstrumentTypes",
    mixins: [mixins],
    data() {
        return {
            // Add your data properties here
            selectedInstrumentType: {
                instrumentTypeCode: "",
                instrumentTypeDescription: "",
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
                this.selectedInstrumentType.instrumentTypeCode === "" ||
                this.selectedInstrumentType.instrumentTypeCode === null
            )
                this.codeValidity = "invalid";
            else this.codeValidity = "valid";

            if (
                this.selectedInstrumentType.instrumentTypeDescription ===
                    null ||
                this.selectedInstrumentType.instrumentTypeDescription === ""
            )
                this.descriptionValidity = "invalid";
            else this.descriptionValidity = "valid";

            if (
                this.codeValidity === "valid" &&
                this.descriptionValidity === "valid"
            ) {
                if (this.mode === "edit") {
                    // Update existing instrument type
                    const instrumentTypeData = {
                        instrumentTypeId: +this.instrumentTypeId,
                        instrumentTypeDescription:
                            this.selectedInstrumentType.instrumentTypeDescription.toUpperCase(),
                    };
                    await this.$store.dispatch(
                        "setup/instrumentTypes/updateInstrumentType",
                        instrumentTypeData
                    );

                    this.$store.commit("setLoading", true, { root: true });
                    setTimeout(() => {
                        this.$router.replace("/instrument-types");
                        this.$store.commit("setLoading", false, { root: true });
                    }, 1000);
                } else if (this.mode === "delete") {
                    // Delete existing instrument type
                    const instrumentTypeData = {
                        instrumentTypeId: +this.instrumentTypeId,
                    };

                    await this.$store.dispatch(
                        "setup/instrumentTypes/deleteInstrumentType",
                        instrumentTypeData
                    );
                    this.$store.commit("setLoading", true, { root: true });
                    setTimeout(() => {
                        this.$router.replace("/instrument-types");
                        this.$store.commit("setLoading", false, { root: true });
                    }, 1000);
                } else {
                    // Add new instrument type
                    const newInstrumentTypeData = {
                        instrumentTypeCode:
                            this.selectedInstrumentType.instrumentTypeCode.toUpperCase(),
                        instrumentTypeDescription:
                            this.selectedInstrumentType.instrumentTypeDescription.toUpperCase(),
                    };
                    await this.$store.dispatch(
                        "setup/instrumentTypes/registerInstrumentType",
                        newInstrumentTypeData
                    );
                }
                this.selectedInstrumentType = {
                    instrumentTypeCode: "",
                    instrumentTypeDescription: "",
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
                "setup/instrumentTypes/loadInstrumentTypes"
            );
            this.selectedInstrumentType = this.$store.getters[
                "setup/instrumentTypes/instrumentTypes"
            ].filter((instrumentType) => {
                return (
                    instrumentType.instrumentTypeId === +this.instrumentTypeId
                );
            })[0];
        }
    },
    computed: {
        getTitle() {
            if (this.mode === "edit") {
                return "Edit Instrument Type";
            } else if (this.mode === "delete") {
                return "Delete Instrument Type";
            } else {
                return "Add New Instrument Type";
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
