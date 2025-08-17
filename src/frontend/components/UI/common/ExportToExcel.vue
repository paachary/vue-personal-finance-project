<template>
    <json-excel
        class="btn btn-outline-dark"
        :data="jsondata"
        :fields="fields"
        :name="filename"
        type="xlsx"
        :header="header"
        :perColumnsHeaders="keys"
    >
        Export to Excel</json-excel
    >
</template>

<script>
import { toRaw } from "vue";

import JsonExcel from "vue-json-excel3";

export default {
    name: "ExportToExcel",
    components: { JsonExcel },
    props: ["data", "filename", "header"],
    data() {
        return {
            selectedCustomer: "",
        };
    },
    methods: {
        camelCaseToSpaced(camelCaseString) {
            // Use a regular expression to find uppercase letters that are not at the beginning
            // and insert a space before them.
            // Then, capitalize the first letter of the entire string.
            return camelCaseString
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, function (match) {
                    return match.toUpperCase();
                });
        },
        values() {
            return Object.keys(toRaw(this.data[0]));
        },
        keys() {
            return this.values().map((key) => this.camelCaseToSpaced(key));
        },
    },

    computed: {
        jsondata() {
            if (this.data && this.data.length > 0) {
                return this.data.map((item) => toRaw(item));
            }
            return "";
        },
        fields() {
            if (this.data && this.data.length > 0) {
                const values = this.values();
                const keys = this.keys();
                const newHeader = keys.reduce((acc, key, index) => {
                    acc[key] = values[index];
                    return acc;
                }, {});
                return newHeader;
            }
            return "";
        },
    },
};
</script>

<style></style>
