<template>
    <the-column class="mb-4">
        <div v-if="isLoading">
            <div colspan="7" class="mt-4">
                <the-spinner></the-spinner>
            </div>
        </div>
        <DynamicPieChart
            style="cursor: pointer"
            :data="pieChartData"
            :labels="pieChartLabels"
            :title="title"
            v-if="
                !isLoading &&
                activeInvestmentData &&
                activeInvestmentData.length !== 0
            "
            @slice-clicked="(data) => handleSliceClicked(data)"
        />
        <div class="text-center mt-4" v-if="activeInvestmentData.length === 0">
            <h5 class="text-center text-danger" style="font-size: 15px">
                No Records Found!
            </h5>
        </div>
    </the-column>
</template>

<script>
import DynamicPieChart from "@/components/UI/common/DynamicPieChart.vue";
import TheColumn from "@/components/UI/layout/TheColumn.vue";
import TheSpinner from "@/components/UI/common/TheSpinner.vue";
import mixins from "../../../mixins/mixins";

export default {
    name: "ActiveInvestmentsDistribution",
    components: {
        DynamicPieChart,
        TheColumn,
        TheSpinner,
    },
    emits: ["handleSliceClicked"],
    mixins: [mixins],
    props: [
        "activeInvestmentData",
        "title",
        "pieChartData",
        "pieChartLabels",
        "dataType",
    ],

    data() {
        return {};
    },
    computed: {},
    methods: {
        handleSliceClicked(data) {
            this.$emit("handleSliceClicked", data, this.dataType);
        },
    },
};
</script>

<style></style>
