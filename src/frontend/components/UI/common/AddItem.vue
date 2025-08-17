<template>
    <a :href="destination" class="rounded rounded-3 btn btn-primary">
        {{ title }}
    </a>
</template>

<script>
export default {
    name: "AddItem",
    props: {
        title: {
            type: String,
            default: "Add Item",
        },
        destination: {
            type: String,
            default: "/add-item",
        },
    },
    methods: {
        handleAddItem() {},
    },
};
</script>

<style></style>
