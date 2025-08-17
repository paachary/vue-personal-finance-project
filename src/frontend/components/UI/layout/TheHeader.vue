<template>
    <header>
        <h1
            class="text-center mb-1 rounded-3"
            :class="headerClass"
            :style="headerStyle"
        >
            {{ title }}
        </h1>
    </header>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "Personal Finances",
        },
        headerClass: {
            type: String,
            default: "h1 p-2 fw-bold text-dark ",
        },
        headerStyle: {
            type: String,
            default: "background-color: #FCFDED",
        },
    },
};
</script>

<style></style>
