<template>
    <the-container class="my-4">
        <h4 class="text-center my-2">
            Monthly Debit Summary
            <hr />
        </h4>
    </the-container>
    <the-container class="my-4 border border-3 rounded rounded-3 shadow">
        <table class="table table-striped w-100" style="font-size: 13px">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th v-if="isAdmin" scope="col">User</th>
                    <th v-if="isAdmin" scope="col">Customer</th>
                    <th scope="col">Bank</th>
                    <th scope="col">Debit Account Number</th>
                    <th class="text-end" scope="col">Total Amount (₹)</th>
                </tr>
            </thead>
            <tbody v-if="isLoading">
                <tr>
                    <td colspan="7" class="mt-4">
                        <the-spinner></the-spinner>
                    </td>
                </tr>
            </tbody>
            <tbody
                class="table-group-divider"
                v-else-if="!isLoading && reportData && reportData.length > 0"
            >
                <tr
                    v-for="(investment, index) in reportData"
                    :key="index"
                    style="cursor: pointer"
                    @click="
                        handleClickRow(
                            investment.userName,
                            'SYSTEMATIC INVESTMENT PLAN',
                            'all',
                            'Y',
                            investment.accountNumber
                        )
                    "
                >
                    <th scope="row">{{ index + 1 }}</th>
                    <td v-if="isAdmin">
                        {{ investment.userName }}
                    </td>
                    <td v-if="isAdmin">
                        {{ investment.firstName }}
                        {{ investment.lastName }}
                    </td>
                    <td>
                        {{ investment.bankName }},
                        {{ investment.branchName }}
                    </td>
                    <td>
                        {{ investment.accountNumber }}
                    </td>
                    <td class="text-end">
                        {{ investment.totalInvestmentAmount }}
                    </td>
                </tr>
                <tr class="table-group-divider" v-if="reportData.length !== 0">
                    <th scope="row" colspan="100%" class="text-center">
                        Total Investment: ₹
                        {{ totalInvestmentAmount }}
                    </th>
                </tr>
            </tbody>

            <tbody
                v-else-if="
                    !isLoading && (!reportData || reportData.length === 0)
                "
            >
                <tr>
                    <td colspan="100%" class="mt-4">
                        <h5
                            class="text-center text-danger"
                            style="font-size: 15px"
                        >
                            No Records Found!
                        </h5>
                    </td>
                </tr>
            </tbody>
        </table>
        <the-row>
            <the-column class="col-sm-6 text-start">
                <export-to-excel
                    :data="reportData"
                    filename="monthly-debit-summary-report.xlsx"
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
import TheSpinner from "@/components/UI/common/TheSpinner.vue";
import ExportToExcel from "@components/UI/common/ExportToExcel.vue";
import TheRow from "@/components/UI/layout/TheRow.vue";
import TheColumn from "@/components/UI/layout/TheColumn.vue";

import mixins from "../../../mixins/mixins";

export default {
    name: "MonthlyDebitSummaryReport",
    components: {
        // Import any child components needed for the report
        TheContainer,
        TheSpinner,
        ExportToExcel,
        TheRow,
        TheColumn,
    },
    mixins: [mixins],
    data() {
        return {
            // Define any data properties needed for the report
            reportData: null,
            header: [
                "Monthly Debit Summary Report",
                `Generated as of ${new Date()}`,
            ],
        };
    },
    methods: {
        // Define methods to fetch and process report data
        async fetchReportData() {
            this.$store.commit("setLoading", true, { root: true });
            await this.$store
                .dispatch("investments/loadMonthlyDebitSummary")
                .then(() => {
                    this.reportData =
                        this.$store.getters["investments/monthlyDebitSummary"];
                    this.$store.commit("setLoading", false, { root: true });
                })
                .catch((error) => {
                    console.error(
                        "Error fetching monthly debit summary:",
                        error
                    );
                });
        },
        handleClickRow(
            userName,
            investmentTypeCd,
            instrumentTypeCd,
            investmentStatus,
            acctNumber
        ) {
            this.$router.push({
                name: "allInvestmentsReport",
                params: {
                    userName,
                    instrumentTypeCd,
                    investmentTypeCd,
                    investmentStatus,
                    acctNumber,
                },
            });
        },
    },
    async beforeMount() {
        // Fetch initial data when the component is mounted
        await this.fetchReportData();
        this.initializeRouting("monthlyDebitSummary");
    },
    computed: {
        // Define computed properties if needed

        totalInvestmentAmount() {
            return this.reportData.reduce(
                (acc, investment) => acc + investment.totalInvestmentAmount,
                0
            );
        },
    },
    watch: {
        // Watch for changes in data properties if needed
    },
};
</script>

<style></style>
