<template>
    <the-card has-header="true" has-body="true">
        <template #header>
            <h5 class="text-center">Active Investments Summary</h5>
        </template>
        <template #body>
            <table class="table table-striped w-100" style="font-size: 14px">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th v-if="isAdmin" scope="col">Customer</th>
                        <th scope="col">Instrument Type</th>
                        <th scope="col">Investment Type</th>
                        <th scope="col">Amount (₹)</th>
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
                    v-else-if="
                        !isLoading &&
                        activeInvestmentSummary &&
                        activeInvestmentSummary.length > 0
                    "
                >
                    <tr
                        style="cursor: pointer"
                        v-for="(investment, index) in activeInvestmentSummary"
                        :key="index"
                        @click="
                            handleClickRow(
                                isAdmin
                                    ? investment.userName
                                    : selectedCustomer.userName,
                                investment.investmentType,
                                investment.instrumentType,
                                'Y',
                                'all'
                            )
                        "
                    >
                        <th scope="row">{{ index + 1 }}</th>
                        <td v-if="isAdmin">
                            {{ investment.userName }}
                        </td>
                        <td>
                            {{ investment.instrumentType }}
                        </td>
                        <td>
                            {{ investment.investmentType }}
                        </td>
                        <td>{{ investment.investmentAmount }}</td>
                    </tr>
                </tbody>
                <tbody
                    v-else-if="
                        !isLoading &&
                        (!activeInvestmentSummary ||
                            activeInvestmentSummary.length === 0)
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
        </template>
    </the-card>
</template>

<script>
import TheCard from "@/components/UI/layout/TheCard.vue";
import TheSpinner from "@/components/UI/common/TheSpinner.vue";
import mixins from "../../../mixins/mixins";

export default {
    name: "ActiveInvestmentsTable",
    components: {
        TheCard,
        TheSpinner,
    },
    emits: ["handleClickRow"],
    mixins: [mixins],
    props: {
        activeInvestmentSummary: {
            type: Array,
            default: () => [],
        },
        selectedCustomer: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {},
    methods: {
        handleClickRow(
            userName,
            investmentTypeCd,
            instrumentTypeCd,
            investmentStatus,
            acctNumber
        ) {
            // Emit the event with the selected row data
            this.$emit(
                "handleClickRow",
                userName,
                investmentTypeCd,
                instrumentTypeCd,
                investmentStatus,
                acctNumber
            );
        },
    },
};
</script>

<style></style>
