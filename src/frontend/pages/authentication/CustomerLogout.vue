<template>
    <the-flash-message
        feedback-message="You are being logged out!"
        feedbackClass="bg-success"
    ></the-flash-message>

    <the-spinner v-if="isLoading"></the-spinner>
</template>

<script>
import TheFlashMessage from "@components/UI/common/TheFlashMessage.vue";
import TheSpinner from "@components/UI/common/TheSpinner.vue";
import mixins from "../../mixins/mixins";

export default {
    name: "CustomerLogout",
    components: { TheFlashMessage, TheSpinner },
    mixins: [mixins],
    data() {
        return {};
    },
    async mounted() {
        await this.$store.dispatch(
            "customer/clearSession",
            this.$store.getters["customer/custId"]
        );
        this.$store.dispatch("reset");
        this.$store.commit("setLoading", true, {
            root: true,
        });
        setTimeout(() => {
            this.$router.replace("/auth/login");
            this.$store.commit("setLoading", false, {
                root: true,
            });
        }, 500);
    },

    computed: {},
};
</script>

<style></style>
