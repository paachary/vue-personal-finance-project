<template>
    <Pie :data="chartData" :options="chartOptions" />
</template>

<script>
import { Pie } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
} from "chart.js";
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
export default {
    name: "DynamicPieChart",
    components: {
        Pie,
    },
    emits: ["slice-clicked"],
    props: {
        data: {
            type: Object,
            required: true,
        },
        labels: {
            type: Array,
            required: true,
        },
        title: {
            type: String,
            default: "Dynamic Pie Chart",
        },

        backgroundColor: {
            type: Array,
            default: () => [
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF6384",
                "#FF9F40",
            ],
        },
        borderColor: {
            type: String,
            default: "#ffffff",
        },
        borderWidth: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {};
    },
    computed: {
        chartOptions() {
            return {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: this.title,
                    },
                },

                onClick: (_, chartElement) => {
                    if (chartElement.length > 0) {
                        const index = chartElement[0].index;
                        const label = this.labels[index];
                        const value = this.data[index];

                        this.$emit("slice-clicked", { label, value });
                    }
                },
            };
        },
        chartData() {
            return {
                labels: this.labels,
                datasets: [
                    {
                        data: this.data,
                        backgroundColor: this.backgroundColor,
                        borderColor: this.borderColor,
                        borderWidth: this.borderWidth,
                    },
                ],
            };
        },
    },
    // watch: {
    //     chartData: {
    //         handler(newData) {
    //             this.formattedChartData.labels = newData.labels;
    //             this.formattedChartData.datasets[0].data = newData.values;
    //         },
    //         deep: true,
    //     },
    // },
    methods: {
        updateChartData(newData) {
            this.chartData = newData;
        },
    },
    mounted() {
        // Any additional setup can be done here
    },
};
</script>

<style></style>
