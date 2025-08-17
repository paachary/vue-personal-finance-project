<template>
    <the-column class="col-6 offset-3 mb-3">
        <p class="fs-4 text-center text-danger">
            {{ deleteText }}
        </p>
        <p class="fs-5 text-center fw-bold">
            {{ selectedItem }}
        </p>

        <slot></slot>
        <p class="fs-5 text-center text-danger fw-bold">
            This operation cannot be undone!
        </p>
    </the-column>
</template>

<script>
import TheColumn from "../layout/TheColumn.vue";
export default {
    name: "TheDeleteConfirmation",
    props: ["itemType", "selectedItem"],
    components: {
        TheColumn,
    },
    methods: {},
    computed: {
        deleteText() {
            return `Are you sure you want to delete this ${this.itemType}?`;
        },
    },
};
</script>

<style></style>
