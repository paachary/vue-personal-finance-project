<template>
    <table class="table table-striped" style="font-size: 13px">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th
                    scope="col"
                    v-for="header in updatedHeaders"
                    :key="header.key"
                    :hidden="header.hidden"
                >
                    <button
                        class="border-0 bg-white fw-bold"
                        @click="computedItems(header.key, header.isAscending)"
                    >
                        {{ header.title }}
                        <the-icon
                            @handleAction="handleActions"
                            :icon="selectSortIcon(header.isAscending)"
                            :style="rowStyles"
                        >
                        </the-icon>
                    </button>
                </th>
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
                !isLoading && allInvestments && allInvestments.length > 0
            "
        >
            <tr v-for="(investment, index) in items" :key="index">
                <th scope="row">{{ index + 1 }}</th>

                <td
                    v-for="header in headers"
                    :key="header.key"
                    :hidden="header.hidden"
                >
                    {{ investment[header.key] }}
                </td>
            </tr>
            <tr class="table-group-divider" v-if="allInvestments.length !== 0">
                <th scope="row" colspan="100%" class="text-center">
                    Total Investment: ₹
                    {{ totalInvestmentAmount }}
                </th>
            </tr>
        </tbody>
        <tbody
            v-else-if="!isLoading && (!reportData || reportData.length === 0)"
        >
            <tr>
                <td colspan="100%" class="mt-4">
                    <h5 class="text-center text-danger" style="font-size: 15px">
                        No Records Found!
                    </h5>
                </td>
            </tr>
        </tbody>
    </table>
    <the-row>
        <the-pagination
            @pagination="handlePagination"
            :totalRecords="allInvestments.length"
        ></the-pagination>
    </the-row>
</template>

<script>
import TheSpinner from "@components/UI/common/TheSpinner.vue";
import mixins from "../../../../mixins/mixins";
import ThePagination from "@components/UI/common/ThePagination.vue";
import TheIcon from "@components/UI/common/TheIcon.vue";

export default {
    name: "TheReportTable",
    mixins: [mixins],
    components: {
        TheSpinner,
        ThePagination,
        TheIcon,
    },
    props: ["allInvestments", "hideCol"],
    data() {
        return {
            pagination: { page: 1, perPage: 5 },
            headers: [],
            sortDirection: "asc",
            sortKey: "",
        };
    },
    computed: {
        totalInvestmentAmount() {
            return this.allInvestments.reduce(
                (acc, investment) => acc + investment.investmentAmount,
                0
            );
        },
        items() {
            const firstIndex =
                (this.pagination.page - 1) * this.pagination.perPage;
            const lastIndex = this.pagination.page * this.pagination.perPage;
            return this.allInvestments.slice(firstIndex, lastIndex);
        },
        updatedHeaders() {
            return this.headers.map((header) => {
                if (
                    header.key === "userName" ||
                    header.key === "bank" ||
                    header.key === "accountNumber"
                ) {
                    header.hidden = this.columnHidden(header.key);
                }
                return header;
            });
        },
        columnHidden() {
            return (key) => {
                if (key === "userName") {
                    if (this.isAdmin && this.hideCol === "true") {
                        return true;
                    } else {
                        if (
                            this.isAdmin &&
                            (this.hideCol === undefined ||
                                this.hideCol === null)
                        ) {
                            return false;
                        }
                    }
                    return true;
                } else if (key === "bank" || key === "accountNumber") {
                    if (this.hideCol === "true") return true;
                    else false;
                }
            };
        },
        computedItems() {
            let items = "";
            return (key, isAscending) => {
                this.sortKey = key;
                this.sortDirection = isAscending ? "asc" : "desc";

                // Set the default sort direction for the first header
                this.headers.forEach((header) => {
                    header.isAscending =
                        header.key === key ? !isAscending : header.isAscending;
                });

                if (this.allInvestments && this.allInvestments.length > 0) {
                    items = this.allInvestments;

                    items.sort((a, b) => {
                        const aValue = a[key];
                        const bValue = b[key];

                        if (this.sortDirection === "asc") {
                            return aValue > bValue ? 1 : -1;
                        } else {
                            return aValue < bValue ? 1 : -1;
                        }
                    });
                }
            };
        },
    },
    methods: {
        handlePagination(pagination) {
            this.pagination = pagination;
        },
        selectSortIcon(isAscending) {
            return isAscending ? "fa fa-sort-asc" : "fa fa-sort-desc";
        },
    },
    mounted() {
        this.headers =
            this.$store.getters["reports/investmentReportTableHeader"];
    },
};
</script>

<style></style>
