<template>
    <button
        class="btn"
        :class="className"
        :type="btnType"
        style="min-height: 50px; min-width: 100px"
    >
        {{ title }}
    </button>
</template>

<script>
export default {
    props: {
        className: {
            type: String,
            default: "",
        },
        btnType: {
            type: String,
            default: "button",
        },
        title: {
            type: String,
            default: "Submit",
        },
    },
};
</script>

<style></style>
