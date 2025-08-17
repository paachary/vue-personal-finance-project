<template>
    <table class="text-start" style="width: 100%">
        <thead>
            <tr>
                <th
                    v-for="header in localHeaders"
                    :key="header.key"
                    :align="header.align"
                    :hidden="header.hidden"
                >
                    <button
                        :class="headClass"
                        :style="headStyles"
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

        <tbody v-else-if="!isLoading && items && items.length > 0">
            <tr
                v-for="item in items"
                :key="item[Object.keys(item)[0]]"
                class="border-bottom"
            >
                <td
                    v-for="header in localHeaders"
                    :key="item[header.key]"
                    :hidden="header.hidden"
                    :align="header.align"
                    :class="rowClasses"
                    :style="rowStyles"
                >
                    <div v-if="header.drillDown">
                        <router-link
                            :to="destinationLink(header.dest, item[header.key])"
                            >{{ item[header.key] }}</router-link
                        >
                    </div>
                    <div v-else-if="!header.edit">{{ item[header.key] }}</div>

                    <div
                        v-if="
                            (header.key === 'actions' && isAdmin) ||
                            componentType !== 'setup'
                        "
                    >
                        <span
                            style="font-size: 24px"
                            role="button"
                            class="d-flex justify-content-center align-items-center gap-3"
                        >
                            <div
                                v-if="header.edit"
                                class="d-flex justify-content-center align-items-center gap-3"
                            >
                                <router-link
                                    :to="
                                        getTargetLink(
                                            'edit',
                                            item[header.relatedKey]
                                        )
                                    "
                                >
                                    <the-icon icon="fa fa-edit"> </the-icon>
                                </router-link>
                                <router-link
                                    :to="
                                        getTargetLink(
                                            'delete',
                                            item[header.relatedKey]
                                        )
                                    "
                                >
                                    <the-icon icon="fa fa-trash-o"> </the-icon>
                                </router-link>
                            </div>
                        </span>
                    </div>
                </td>
            </tr>
        </tbody>
        <tbody v-else-if="!isLoading && (!items || items.length === 0)">
            <tr>
                <td colspan="100%" class="mt-4">
                    <h5 class="text-center text-danger">No Records Found!</h5>
                </td>
            </tr>
        </tbody>
    </table>
    <the-row>
        <the-pagination
            @pagination="handlePagination"
            :totalRecords="modelValue.length"
        ></the-pagination>
    </the-row>
</template>

<script>
import mixins from "../../../mixins/mixins";
import TheIcon from "./TheIcon.vue";
import ThePagination from "./ThePagination.vue";
import TheSpinner from "./TheSpinner.vue";

export default {
    name: "DataTable",
    components: {
        TheIcon,
        ThePagination,
        TheSpinner,
    },

    props: [
        "headers",
        "modelValue",
        "tabdata",
        "childLink",
        "deleteLink",
        "componentType",
    ],
    emits: ["update@modelValue"],
    mixins: [mixins],
    // Define the initial state of the component
    data() {
        return {
            sortDirection: "asc",
            sortKey: "",
            localHeaders: [],
            pagination: { page: 1, perPage: 5 },
            editableCol: "",
        };
    },
    watch: {},
    computed: {
        computedItems() {
            let items = "";
            return (key, isAscending) => {
                this.sortKey = key;
                this.sortDirection = isAscending ? "asc" : "desc";

                // Set the default sort direction for the first header
                this.localHeaders.forEach((header) => {
                    header.isAscending =
                        header.key === key ? !isAscending : header.isAscending;
                });

                if (this.tabdata && this.tabdata.length > 0) {
                    items = this.tabdata;

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
        items() {
            const firstIndex =
                (this.pagination.page - 1) * this.pagination.perPage;
            const lastIndex = this.pagination.page * this.pagination.perPage;
            return this.modelValue.slice(firstIndex, lastIndex);
        },
        rowClasses() {
            return "px-4 py-4 font-weight-medium";
        },
        rowStyles() {
            return "color: var(--bs-gray-900)";
        },
        headClass() {
            return "px-4 py-3 text-xs text-uppercase text-center fw-bold w-100 btn btn-link text-decoration-none";
        },
        headStyles() {
            return "background-color: var(--bs-gray-100); color: var(--bs-gray-900)";
        },
        isAdmin() {
            return (
                this.$store.getters["customer/isAdmin"] &&
                this.componentType === "setup"
            );
        },
    },
    mounted() {
        this.localHeaders = [...this.headers];
        this.localHeaders.isAscending = false;

        // Sort the items based on the default sort key and direction
        this.computedItems(
            this.localHeaders[0].key,
            this.localHeaders[0].isAscending
        );
    },

    methods: {
        displaySpecificHeader(title) {
            if (title === "Action" && this.isAdmin()) return title;
            // else return title;
        },
        getTargetLink(mode, acctNo) {
            if (mode === "edit") {
                return this.childLink + acctNo;
            } else if (mode === "delete") {
                return this.deleteLink + acctNo;
            }
        },
        selectSortIcon(isAscending) {
            return isAscending ? "fa fa-sort-asc" : "fa fa-sort-desc";
        },
        handleActions(action) {
            this.$emit("handleActions", action);
        },
        handlePagination(pagination) {
            this.pagination = pagination;
        },
        destinationLink(link, param) {
            return link + param;
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 1350px;
}
table,
th,
td {
    border-collapse: collapse;
}
</style>
