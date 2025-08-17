<template>
    <the-flash-message
        v-if="showMessage()"
        :feedback-message="status.message"
        :feedbackClass="status.class"
    ></the-flash-message>
    <the-container className="mt-5 mb-5">
        <h3 class="text-center mb-5">Welcome {{ customerName }}</h3>

        <the-row
            id="investmentSummary"
            class="row-cols-2 bg-gradient rounded-3"
        >
            <the-column class="mb-4">
                <active-investments-table
                    :selected-customer="selectedCustomer"
                    :activeInvestmentSummary="activeInvestmentSummary"
                    @handle-click-row="handleClickRow"
                ></active-investments-table>
            </the-column>
            <the-column class="mb-4">
                <the-card
                    has-header="true"
                    has-body="true"
                    style="height: 450px"
                >
                    <template #header>
                        <h5 class="text-center">Investment Distribution</h5>
                    </template>
                    <template #body>
                        <the-select-user-name
                            v-if="isAdmin"
                            :data="activeInvestmentSummary"
                            @update:selectedUser="handleSelectUserName"
                        ></the-select-user-name>

                        <the-row
                            id="investmentSummary"
                            class="row-cols-2 bg-gradient rounded-3"
                        >
                            <active-investments-distribution
                                :activeInvestmentData="
                                    activeInvestmentSummaryForInvestmentType
                                "
                                title="Distribution by Investment Type"
                                :pieChartData="pieChartDataForInvestmentType"
                                :pieChartLabels="
                                    pieChartLabelsForInvestmentType
                                "
                                dataType="investmentType"
                                @handle-slice-clicked="handleSliceClicked"
                            ></active-investments-distribution>

                            <the-column class="mb-4">
                                <active-investments-distribution
                                    :activeInvestmentData="
                                        activeInvestmentSummaryForInstrumentType
                                    "
                                    title="Distribution by Instrument Type"
                                    :pieChartData="
                                        pieChartDataForInstrumentType
                                    "
                                    :pieChartLabels="
                                        pieChartLabelsForInstrumentType
                                    "
                                    dataType="instrumentType"
                                    @handle-slice-clicked="handleSliceClicked"
                                ></active-investments-distribution>
                            </the-column>
                        </the-row>
                    </template>
                </the-card>
            </the-column>
        </the-row>
    </the-container>
</template>

<script>
import TheFlashMessage from "@/components/UI/common/TheFlashMessage.vue";
import TheContainer from "@/components/UI/layout/TheContainer.vue";
import ActiveInvestmentsTable from "@/components/UI/home/ActiveInvestmentsTable.vue";
import TheCard from "@/components/UI/layout/TheCard.vue";
import TheRow from "@/components/UI/layout/TheRow.vue";
import TheColumn from "@/components/UI/layout/TheColumn.vue";
import TheSelectUserName from "@/components/UI/home/TheSelectUserName.vue";
import ActiveInvestmentsDistribution from "@/components/UI/home/ActiveInvestmentsDistribution.vue";

import { initCap } from "../../scripts/util";
import mixins from "../../mixins/mixins";

export default {
    name: "TheHome",
    components: {
        TheFlashMessage,
        TheContainer,
        ActiveInvestmentsTable,
        TheCard,
        TheRow,
        TheColumn,
        TheSelectUserName,
        ActiveInvestmentsDistribution,
    },
    mixins: [mixins],
    data() {
        return {
            status: "",
            selectedCustomer: null,
            selectUserName: "",
            activeInvestmentSummary: [],
            activeInvestmentSummaryForInstrumentType: [],
            activeInvestmentSummaryForInvestmentType: [],
        };
    },
    methods: {
        handleSelectUserName(userName) {
            this.selectUserName = userName;
        },
        handleSliceClicked(data, type) {
            if (type === "investmentType") {
                this.handleClickRow(
                    this.isAdmin
                        ? this.selectUserName
                        : this.selectedCustomer.userName,
                    data.label,
                    "all",
                    "Y",
                    "all"
                );
            } else if (type === "instrumentType") {
                this.handleClickRow(
                    this.isAdmin
                        ? this.selectUserName
                        : this.selectedCustomer.userName,
                    "all",
                    data.label,
                    "Y",
                    "all"
                );
            }
        },
        showMessage() {
            this.status = this.$store.getters["status"];

            return this.$store.getters["showFlashMessage"];
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
                    investmentTypeCd,
                    instrumentTypeCd,
                    investmentStatus,
                    acctNumber,
                },
            });
        },
        initialize() {
            this.activeInvestmentSummaryForInstrumentType =
                this.$store.getters[
                    "investments/activeInvestmentSummaryForInstrumentType"
                ];

            this.activeInvestmentSummaryForInvestmentType =
                this.$store.getters[
                    "investments/activeInvestmentSummaryForInvestmentType"
                ];
        },
    },
    watch: {
        selectUserName: {
            handler(newValue, oldValue) {
                if (!newValue) {
                    return "";
                }
                if (newValue && oldValue && newValue !== oldValue) {
                    this.initialize();
                }
                this.activeInvestmentSummaryForInvestmentType =
                    this.activeInvestmentSummaryForInvestmentType.filter(
                        (investment) => {
                            return investment.userName === newValue;
                        }
                    );

                this.activeInvestmentSummaryForInstrumentType =
                    this.activeInvestmentSummaryForInstrumentType.filter(
                        (investment) => {
                            return investment.userName === newValue;
                        }
                    );
            },
        },
    },
    computed: {
        pieChartDataForInvestmentType() {
            return this.activeInvestmentSummaryForInvestmentType.map(
                (investment) => investment.investmentAmount
            );
        },
        pieChartLabelsForInvestmentType() {
            return this.activeInvestmentSummaryForInvestmentType.map(
                (investment) => investment.investmentType
            );
        },
        pieChartDataForInstrumentType() {
            return this.activeInvestmentSummaryForInstrumentType.map(
                (investment) => investment.investmentAmount
            );
        },
        pieChartLabelsForInstrumentType() {
            return this.activeInvestmentSummaryForInstrumentType.map(
                (investment) => investment.instrumentType
            );
        },
        customerName() {
            return initCap(
                this.selectedCustomer
                    ? this.selectedCustomer.firstName +
                          " " +
                          this.selectedCustomer.lastName
                    : "Guest"
            );
        },
    },

    async created() {
        this.selectedCustomer = this.$store.getters["customer/customer"][0];

        // Setup
        await this.$store.dispatch("setup/banks/loadBanks");
        await this.$store.dispatch("setup/instrumentTypes/loadInstrumentTypes");
        await this.$store.dispatch("setup/investmentTypes/loadInvestmentTypes");

        // Home page regions

        await this.$store.dispatch("investments/loadActiveInvestmentSummary", {
            userName: !this.isAdmin
                ? this.selectedCustomer.userName
                : "allUsers",
        });
        await this.$store.dispatch(
            "investments/loadActiveInvestmentSummaryForInvestmentType",
            {
                userName: !this.isAdmin
                    ? this.selectedCustomer.userName
                    : "allUsers",
            }
        );
        await this.$store.dispatch(
            "investments/loadActiveInvestmentSummaryForInstrumentType",
            {
                userName: !this.isAdmin
                    ? this.selectedCustomer.userName
                    : "allUsers",
            }
        );

        this.activeInvestmentSummary =
            this.$store.getters["investments/activeInvestmentSummary"];

        this.selectUserName =
            this.activeInvestmentSummary.length > 0
                ? this.activeInvestmentSummary[0].userName
                : "";

        this.initialize();
    },
};
</script>

<style></style>
