<template>
    <div class="accordion my-3" id="searchAccordion">
        <div class="accordion-item">
            <h4 class="accordion-header text-center" id="headingOne">
                <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                >
                    <strong>Search</strong>
                </button>
            </h4>
            <div
                id="collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
            >
                <div class="accordion-body">
                    <the-row>
                        <the-column class="col-6 border-top border-2 shadow-sm">
                            <the-label-input
                                v-model="localUserName"
                                name="users"
                                title="User Name"
                                :options="users"
                            ></the-label-input>

                            <the-label-input
                                v-model="localBank"
                                name="banks"
                                title="Bank"
                                :options="banks"
                            ></the-label-input>

                            <the-label-input
                                v-model="localAccountNumber"
                                name="accountNumber"
                                title="Debit Acct Number"
                                :options="accountNumbers"
                            ></the-label-input>
                        </the-column>
                        <the-column class="col-6 border-top border-2 shadow-sm">
                            <the-label-input
                                v-model="localInstrumentType"
                                name="instrumentType"
                                title="Instrument Type"
                                :options="instrumentTypes"
                            ></the-label-input>

                            <the-label-input
                                v-model="localInvestmentType"
                                name="investmentType"
                                title="Investment Type"
                                :options="investmentTypes"
                            ></the-label-input>

                            <the-label-input
                                v-model="localInvestmentStatus"
                                name="investmentStatus"
                                title="Is Active"
                                :options="investmentStatuses"
                            ></the-label-input>
                        </the-column>
                    </the-row>
                    <the-row class="text-end mt-3">
                        <the-column class="col-12">
                            <button
                                class="btn btn-secondary mb-3"
                                @click="resetFilter"
                                tabindex="6"
                            >
                                Reset Filters
                            </button>
                        </the-column>
                    </the-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TheRow from "@/components/UI/layout/TheRow.vue";
import TheColumn from "@/components/UI/layout/TheColumn.vue";
import TheLabelInput from "@/components/UI/reports/allinvestments/TheLabelInput.vue";

export default {
    name: "TheReportSearch",
    components: {
        TheRow,
        TheColumn,
        TheLabelInput,
    },
    props: [
        "selectUserName",
        "selectBank",
        "selectAccountNumber",
        "selectInstrumentType",
        "selectInvestmentType",
        "selectInvestmentStatus",
        "users",
        "banks",
        "investmentTypes",
        "instrumentTypes",
        "accountNumbers",
        "investmentStatuses",
    ],
    data() {
        return {
            localUserName: this.selectUserName,
            localBank: this.localBank,
            localAccountNumber: this.selectAccountNumber,
            localInstrumentType: this.selectInstrumentType,
            localInvestmentType: this.selectInvestmentType,
            localInvestmentStatus: this.selectInvestmentStatus,
        };
    },
    methods: {
        resetFilter() {
            this.$emit("update:selectUserName", "");
            this.$emit("update:selectBank", "");
            this.$emit("update:selectAccountNumber", "");
            this.$emit("update:selectInstrumentType", "");
            this.$emit("update:selectInvestmentType", "");
            this.$emit("update:selectInvestmentStatus", "");
            this.$emit("handleReset");
        },
    },
    watch: {
        localUserName(newVal) {
            this.$emit("update:selectUserName", newVal);
        },
        localBank(newVal) {
            this.$emit("update:selectBank", newVal);
        },
        localAccountNumber(newVal) {
            this.$emit("update:selectAccountNumber", newVal);
        },
        localInstrumentType(newVal) {
            this.$emit("update:selectInstrumentType", newVal);
        },
        localInvestmentType(newVal) {
            this.$emit("update:selectInvestmentType", newVal);
        },
        localInvestmentStatus(newVal) {
            this.$emit("update:selectInvestmentStatus", newVal);
        },
    },
    updated() {
        this.localUserName = this.selectUserName;
        this.localAccountNumber = this.selectAccountNumber;
        this.localBank = this.selectBank;
        this.localInstrumentType = this.selectInstrumentType;
        this.localInvestmentType = this.selectInvestmentType;
        this.localInvestmentStatus = this.selectInvestmentStatus;
    },
};
</script>

<style></style>
