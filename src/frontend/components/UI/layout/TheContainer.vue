<template>
    <div class="container" :class="className" style="background-color: #f7f6f7">
        <slot />
    </div>
</template>

<script>
export default {
    props: ["className"],
};
</script>

<style></style>
