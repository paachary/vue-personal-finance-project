<template>
    <div :class="colClass">
        <slot />
    </div>
</template>

<script>
export default {
    props: ["colClass"],
};
</script>

<style></style>
