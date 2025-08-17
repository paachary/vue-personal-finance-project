<template>
    <the-container class="my-4">
        <h4 class="text-center my-2">
            All Investments
            <hr />
        </h4>
    </the-container>
    <the-container
        class="my-4 border border-3 rounded rounded-3 shadow"
        style="font-size: 13px"
    >
        <the-report-search
            v-model:selectUserName="selectUserName"
            v-model:selectAccountNumber="selectAccountNumber"
            v-model:selectBank="selectBank"
            v-model:selectInstrumentType="selectInstrumentType"
            v-model:selectInvestmentType="selectInvestmentType"
            v-model:selectInvestmentStatus="selectInvestmentStatus"
            :users="users"
            :banks="banks"
            :accountNumbers="accountNumbers"
            :instrumentTypes="instrumentTypes"
            :investmentTypes="investmentTypes"
            :investmentStatuses="investmentStatuses"
            @handleReset="reset"
        >
        </the-report-search>
    </the-container>
    <the-container class="mb-4 border border-3 rounded rounded-3 shadow">
        <h5 class="text-center my-2">
            Report
            <hr />
        </h5>

        <the-report-table :allInvestments="allInvestments"></the-report-table>
        <the-row class="my-2">
            <the-column class="col-sm-6 text-start">
                <export-to-excel
                    :data="allInvestments"
                    filename="all-investments-report.xlsx"
                    :header="header"
                ></export-to-excel>
            </the-column>
            <the-column class="col-sm-6 text-end">
                <button
                    class="btn btn-secondary mb-3"
                    @click="handleBackBtnClick"
                    tabindex="6"
                >
                    Back
                </button>
            </the-column>
        </the-row>
    </the-container>
</template>
<script>
import TheContainer from "@/components/UI/layout/TheContainer.vue";
import TheRow from "@/components/UI/layout/TheRow.vue";
import TheColumn from "@/components/UI/layout/TheColumn.vue";
import mixins from "../../../mixins/mixins";
import TheReportSearch from "@components/UI/reports/allinvestments/TheReportSearch.vue";
import TheReportTable from "@components/UI/reports/allinvestments/TheReportTable.vue";
import ExportToExcel from "@components/UI/common/ExportToExcel.vue";

export default {
    name: "AllInvestmentsReport",
    components: {
        TheContainer,
        TheRow,
        TheColumn,
        TheReportSearch,
        TheReportTable,
        ExportToExcel,
    },
    mixins: [mixins],
    props: [
        "userName",
        "investmentTypeCd",
        "instrumentTypeCd",
        "investmentStatus",
        "acctNumber",
    ],
    data() {
        return {
            investments: [],
            selectUserName: "",
            selectBank: "",
            selectInstrumentType: "",
            selectInvestmentType: "",
            selectInvestmentStatus: "",
            selectAccountNumber: "",
            header: ["All Investments Report", `Generated as of ${new Date()}`],
        };
    },

    watch: {
        selectUserName: {
            handler(newValue) {
                if (!newValue) {
                    return "";
                }
                this.investments = this.investments.filter((investment) => {
                    return investment.userName === newValue;
                });
            },
        },

        selectBank: {
            handler(newValue) {
                if (!newValue) {
                    return "";
                }
                this.investments = this.investments.filter((investment) => {
                    return (
                        investment.bankName + ", " + investment.branchName ===
                        newValue
                    );
                });
            },
        },
        selectInstrumentType: {
            handler(newValue) {
                if (!newValue) {
                    return "";
                } else {
                    this.investments = this.investments.filter((investment) => {
                        return investment.instrumentType === newValue;
                    });
                }
            },
        },
        selectInvestmentType: {
            handler(newValue) {
                if (!newValue) {
                    return "";
                }
                this.investments = this.investments.filter((investment) => {
                    return investment.investmentType === newValue;
                });
            },
        },
        selectInvestmentStatus: {
            handler(newValue) {
                if (!newValue) {
                    return "";
                }
                this.investments = this.investments.filter((investment) => {
                    return investment.investmentStatus === newValue;
                });
            },
        },
        selectAccountNumber: {
            handler(newValue) {
                if (!newValue) {
                    return "";
                }
                this.investments = this.investments.filter((investment) => {
                    return investment.accountNumber === newValue;
                });
            },
        },
    },

    computed: {
        allInvestments() {
            return this.investments;
        },
        users() {
            return new Set(
                this.allInvestments.map((investment) => investment.userName)
            );
        },
        banks() {
            return new Set(
                this.allInvestments.map(
                    (investment) =>
                        investment.bankName + ", " + investment.branchName
                )
            );
        },
        accountNumbers() {
            return new Set(
                this.allInvestments.map(
                    (investment) => investment.accountNumber
                )
            );
        },

        instrumentTypes() {
            return new Set(
                this.allInvestments.map(
                    (investment) => investment.instrumentType
                )
            );
        },
        investmentTypes() {
            return new Set(
                this.allInvestments.map(
                    (investment) => investment.investmentType
                )
            );
        },
        investmentStatuses() {
            return new Set(
                this.allInvestments.map(
                    (investment) => investment.investmentStatus
                )
            );
        },
    },
    methods: {
        reset() {
            this.investments =
                this.$store.getters["investments/allInvestments"];
        },
        resetFilter() {
            this.selectInvestmentStatus = "";
            this.selectInvestmentType = "";
            this.selectInstrumentType = "";
            this.selectBank = "";
            this.selectUserName = "";
            this.selectAccountNumber = "";
            this.reset();
        },
        async fetchAllInvestments() {
            this.$store.commit("setLoading", true, { root: true });
            await this.$store
                .dispatch("investments/loadAllInvestments", {
                    userName: "allUsers",
                })
                .then(() => {
                    this.$store.commit("setLoading", false, { root: true });
                })
                .catch((error) => {
                    console.error("Error fetching investments:", error);
                    this.$store.commit("setLoading", false, { root: true });
                });
        },
    },
    async created() {
        await this.fetchAllInvestments();
        this.reset();

        this.selectBank = "";
        this.selectUserName = this.userName === "all" ? "" : this.userName;
        this.selectInstrumentType =
            this.instrumentTypeCd === "all" ? "" : this.instrumentTypeCd;
        this.selectInvestmentType =
            this.investmentTypeCd === "all" ? "" : this.investmentTypeCd;
        this.selectInvestmentStatus =
            this.investmentStatus === "all" ? "" : this.investmentStatus;
        this.selectAccountNumber =
            this.acctNumber === "all" ? "" : this.acctNumber;

        this.initializeRouting("allInvestmentsReport");
    },
};
</script>

<style></style>
