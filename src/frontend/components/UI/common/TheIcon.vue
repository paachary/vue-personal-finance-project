<template>
    <i @click="handleActions()" :class="icon" role="button"></i>
</template>

<script>
export default {
    name: "TheIcon",
    emits: ["handleActions"],
    props: {
        icon: {
            type: String,
            default: "fa fa-edit",
        },
        action: {
            type: String,
            default: "",
        },
    },
    methods: {
        handleActions() {
            this.$emit("handleActions", this.action);
        },
    },
};
</script>

<style></style>
