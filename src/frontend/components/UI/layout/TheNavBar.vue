<template>
    <div
        class="container d-flex rounded-3 justify-content-between align-items-center"
        style="background-color: #fcfded"
    >
        <div class="d-flex align-items-center">
            <router-link to="/" style="text-decoration: none" title="Home"
                ><the-header title="My Finances"></the-header
            ></router-link>
        </div>
        <the-nav-menu></the-nav-menu>
    </div>
</template>

<script>
import TheNavMenu from "./TheNavMenu.vue";
import TheHeader from "./TheHeader.vue";
export default {
    components: { TheHeader, TheNavMenu },
};
</script>

<style></style>
