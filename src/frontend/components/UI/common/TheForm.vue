<template>
    <form @submit.prevent="submitForm">
        <slot />
    </form>
</template>

<script>
export default {
    name: "TheForm",
    emits: ["submitForm"],
    methods: {
        submitForm() {
            // Handle form submission logic here
            this.$emit("submitForm");
            // You can also pass form data if needed
            // this.$emit("submitForm", formData);
            // or use this.$refs to access form elements
            // const formData = new FormData(this.$refs.form);
        },
    },
};
</script>

<style></style>
