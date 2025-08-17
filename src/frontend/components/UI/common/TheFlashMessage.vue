<template>
    <p
        class="text-center text-white"
        :class="feedbackClass"
        style="font-size: 24px"
    >
        {{ feedbackMessage }}
    </p>
</template>

<script>
export default {
    name: "TheFlashMessage",
    props: {
        feedbackMessage: {
            type: String,
            default: "Operation Successful",
        },
        feedbackClass: {
            type: String,
            default: "bg-success",
        },
    },
};
</script>

<style></style>
