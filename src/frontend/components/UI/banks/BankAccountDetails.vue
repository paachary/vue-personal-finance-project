<template>
    <the-form @submitForm="submitForm">
        <the-row class="border-bottom border-top border-1">
            <!-- Bank Account Details -->
            <the-column class="col-12 border-end border-top border-2 shadow-sm">
                <!-- Bank and Branch -->
                <the-row>
                    <the-column class="col-12 mb-2">
                        <h4 class="text-center my-3">Bank Account Details</h4>
                    </the-column>
                </the-row>
                <the-row>
                    <the-column class="col-3 mb-2">
                        <the-label
                            label-title="Bank"
                            for-id="bank"
                            label-class="col-form-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-9">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="name"
                            readOnly="true"
                            v-model="bank"
                            placeholder="Bank and Branch Name"
                        ></the-input>
                    </the-column>
                </the-row>
                <the-row>
                    <the-column class="col-3 mb-2">
                        <the-label
                            label-title="Account No"
                            for-id="acctNbr"
                            label-class="col-form-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-9 mb-3">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="custAcctNbr"
                            readOnly="true"
                            required="false"
                            v-model="selectedBank.accountNumber"
                            placeholder="Account Number"
                        ></the-input>
                    </the-column>
                </the-row>
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Preferred Name"
                            for-id="actAbbr"
                            label-class="col-form-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-3">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="custAcctAbbr"
                            :readOnly="mode === 'edit' ? 'false' : 'true'"
                            required="false"
                            v-model="selectedBank.preferredName"
                            placeholder="Account Abbreviation"
                            ref="myInput"
                            autofocus
                        ></the-input>
                    </the-column>
                </the-row>
            </the-column>
        </the-row>
        <the-row v-if="mode === 'edit'">
            <the-column
                class="col-12 border-end border-top border-2 shadow-sm mb-2"
            >
                <form-buttons
                    backLink="/accounts"
                    title="Save"
                    @resetForm="resetForm"
                ></form-buttons>

                <!-- style="background-color: #a8a8ac" -->
            </the-column>
        </the-row>
    </the-form>
</template>

<script>
import TheRow from "../layout/TheRow.vue";
import TheColumn from "../layout/TheColumn.vue";
import TheLabel from "../common/TheLabel.vue";
import TheInput from "../common/TheInput.vue";
import TheForm from "../common/TheForm.vue";
import FormButtons from "../common/FormButtons.vue";

export default {
    components: {
        TheRow,
        TheColumn,
        TheLabel,
        TheInput,
        TheForm,
        FormButtons,
    },
    name: "BankAccountDetails",
    props: ["acctId", "mode"],
    emits: ["submitForm"],
    data() {
        return {
            selectedBank: [],
            origPreferredName: "",
        };
    },
    computed: {
        bank() {
            return (
                this.selectedBank.bankName +
                ", " +
                this.selectedBank.branchName +
                ", " +
                this.selectedBank.bankCity +
                ", " +
                this.selectedBank.bankPinCode
            );
        },
    },
    methods: {
        resetForm() {
            this.selectedBank.preferredName = this.origPreferredName;
            this.$refs.myInput.focus();
        },
        submitForm() {
            this.$emit("submitForm", {
                preferredName: this.selectedBank.preferredName.toUpperCase(),
                custId: this.selectedBank.custId,
                bankId: this.selectedBank.bankId,
            });
        },
    },
    async mounted() {
        try {
            this.selectedBank = await this.$store.getters[
                "accounts/accounts"
            ].find((account) => account.accountNumber === this.acctId);
        } catch (error) {
            this.$router.replace("/auth/logout");
        }
        if (this.selectedBank === null || this.selectedBank === undefined) {
            this.$router.replace("/auth/logout");
        }
        this.origPreferredName = this.selectedBank.preferredName;
    },
};
</script>

<style></style>
