<template>
    <label :for="forId" :class="labelClass" class="mt-3">{{
        labelTitle
    }}</label>
</template>

<script>
export default {
    props: {
        labelTitle: {
            type: String,
            required: true,
        },
        forId: {
            type: String,
            required: true,
        },
        labelClass: {
            type: String,
            default: "form-label",
        },
    },
};
</script>

<style scoped>
label {
    color: #546678;
}
</style>
