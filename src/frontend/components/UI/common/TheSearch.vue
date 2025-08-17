<template>
    <the-input
        placeholder="Search"
        v-model="searchQuery"
        inputId="search"
        style="background-color: #ebebeb"
    />
</template>

<script>
import TheInput from "./TheInput.vue";
export default {
    components: { TheInput },
    data() {
        return {
            searchQuery: "",
        };
    },
    methods: {},

    watch: {
        searchQuery(newValue) {
            this.$store.commit("common/setFilter", { searchFilter: newValue });
        },
    },
};
</script>

<style></style>
