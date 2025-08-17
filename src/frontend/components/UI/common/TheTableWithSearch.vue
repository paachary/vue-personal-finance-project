<template>
    <the-row>
        <the-col class="col">
            <h4
                class="fw-bold p-1 text-dark text-center"
                style="background-color: #f6f6f4"
            >
                {{ title }}
            </h4></the-col
        >
    </the-row>
    <the-row>
        <the-column class="col-6 mb-2">
            <the-column class="col-6 mb-2">
                <!-- The Search Component -->
                <the-search
                    class="mt-2"
                    style="padding-top: 0.75rem; padding-bottom: 0.75rem"
                />
            </the-column>
        </the-column>
    </the-row>

    <the-data-table
        :headers="headers"
        v-model="filteredItems"
        :tabdata="items"
        :childLink="childLink"
        :deleteLink="deleteLink"
        :componentType="componentType"
    >
    </the-data-table>
</template>

<script>
import TheDataTable from "./TheDataTable.vue";
import TheRow from "../layout/TheRow.vue";
import TheColumn from "../layout/TheColumn.vue";
import TheSearch from "./TheSearch.vue";

export default {
    name: "TheTableWithSearch",
    components: {
        TheDataTable,
        TheRow,
        TheColumn,
        TheSearch,
    },

    emits: ["handleActions"],
    props: [
        "headers",
        "items",
        "modelValue",
        "title",
        "childLink",
        "deleteLink",
        "componentType",
    ],

    data() {
        return {};
    },

    computed: {
        filteredItems() {
            this.$emit("input");
            return this.modelValue;
        },
        methods: {},
    },
};
</script>

<style></style>
