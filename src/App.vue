<template>
    <the-nav-bar></the-nav-bar>
    <the-container className="border border-2 shadow rounded-3">
        <the-row
            v-if="
                checkSetupData &&
                !isSetupComplete &&
                currentPage !== '/auth/login' &&
                currentPage !== '/auth/logout' &&
                currentPage !== '/register-new-customer'
            "
        >
            <the-column class="mb-5">
                <the-container
                    class="border border-2 text-center fs-5 rounded rounded-3"
                    style="background-color: #fdf0d5"
                >
                    <p class="my-3">
                        Setting up of either <u>Banks</u> or
                        <u>Instrument Types</u> or <u>Investment Types</u> is
                        <strong>incomplete</strong>.
                    </p>
                    <p v-if="isAdmin" class="my-3">
                        Please proceed to Setup menu above to complete the
                        initial setup.
                    </p>
                    <p v-if="!isAdmin" class="my-3">
                        Please ask your system administrator to complete the
                        initial setup, before you can proceed with registering
                        your accounts and investments.
                    </p>
                </the-container>
            </the-column>
        </the-row>
        <router-view :key="$route.fullPath"></router-view>
    </the-container>
</template>

<script>
import TheContainer from "@components/UI/layout/TheContainer.vue";
import TheNavBar from "@components/UI/layout/TheNavBar.vue";
import mixins from "./frontend/mixins/mixins";
export default {
    components: {
        TheContainer,
        TheNavBar,
    },
    mixins: [mixins],
    mounted() {
        this.resetInactivityTimer();
        document.title = "My Personal Finances App";
    },
    watch: {
        $route(to, from) {
            this.$store.commit("setRoutes", {
                toName: to.name,
                fromName: from.name,
                from,
                to,
            });
        },
    },
    methods: {},
    computed: {
        checkSetupData() {
            const hasBanks = this.$store.getters["setup/banks/hasBanks"];
            const hasInstrumentTypes =
                this.$store.getters["setup/instrumentTypes/hasInstrumentTypes"];
            const hasInvestmentTypes =
                this.$store.getters["setup/investmentTypes/hasInvestmentTypes"];

            if (!hasBanks || !hasInstrumentTypes || !hasInvestmentTypes) {
                this.$store.commit("setupData", false, { root: true });
            } else this.$store.commit("setupData", true, { root: true });

            return true;
        },
    },
};
</script>

<style>
body {
    width: 1350px;
    margin: 0 auto;
    background-color: #fcfded;
}
</style>
