<template>
    <p v-if="errorComponent === 'invalid'" class="mt-3" style="color: #c44900">
        {{ errorTitle }}
    </p>
</template>

<script>
export default {
    name: "TheErrorPara",
    props: ["errorTitle", "errorComponent"],
    data() {
        return {};
    },
};
</script>

<style></style>
