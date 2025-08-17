let inactivityTimer;
const inactivityThreshold = 300000; // 5 minutes in milliseconds
export default {
    methods: {
        handleInactivity() {
            // Dispatch an action to Vuex store to update inactivity status
            // Or trigger a global event for components to listen to
            if (this.$route.path !== "/auth/login") {
                this.$store.commit("setFlashMessage", true, { root: true });
                this.$store.commit(
                    "setStatus",
                    {
                        error: true,
                        errorCode: "500",
                        message:
                            "You have been logged out due to inactivity! Please log back again",
                        class: "bg-success",
                    },
                    { root: true }
                );
                setTimeout(() => {
                    this.$store.commit("setFlashMessage", false, {
                        root: true,
                    });

                    this.$router.replace("/auth/logout");
                }, 2000);
            }
        },

        resetInactivityTimer() {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(
                this.handleInactivity,
                inactivityThreshold
            );
        },
    },
    mounted() {
        document.addEventListener("mousemove", this.resetInactivityTimer);
        document.addEventListener("mouseover", this.resetInactivityTimer);
        document.addEventListener("mouseout", this.resetInactivityTimer);
        document.addEventListener("mouseup", this.resetInactivityTimer);
        document.addEventListener("mousedown", this.resetInactivityTimer);
        document.addEventListener("keydown", this.resetInactivityTimer);
        document.addEventListener("keyup", this.resetInactivityTimer);
        document.addEventListener("keypress", this.resetInactivityTimer);
        document.addEventListener("load", this.resetInactivityTimer);
        document.addEventListener("scroll", this.resetInactivityTimer);
        document.addEventListener("click", this.resetInactivityTimer);
    },
};
