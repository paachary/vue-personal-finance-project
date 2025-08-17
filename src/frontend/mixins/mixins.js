export default {
    data() {
        return {
            routeParams: {},
        };
    },

    methods: {
        /**
         * Common error handler for unexpected errors.
         * Displays a flash message and redirects to the login page.
         * @param {string} msg - The error message to display.
         */
        commonCatch(msg = "An unexpected error occurred.") {
            this.$store.commit(
                "setStatus",
                {
                    error: true,
                    errorCode: "500",
                    message: msg,
                    class: "bg-danger text-white",
                },
                { root: true }
            );
            if (this.$route.path !== "/auth/login") {
                this.$store.commit("setFlashMessage", true, { root: true });
                setTimeout(() => {
                    this.$store.commit("setFlashMessage", false, {
                        root: true,
                    });
                    this.$router.replace("/auth/logout");
                }, 2000);
            }
        },
        handleBackBtnClick() {
            if (this.routeParams) {
                this.$router.replace(this.routeParams);
            }
        },
        initializeRouting(parentRoute) {
            const route = this.$store.getters["routes"](parentRoute);
            if (route) {
                this.routeParams = {
                    name: route.from.name,
                    params: route.from.params,
                };
            }
        },
        validatePasswords(password, confirmPassword) {
            if (password.toLowerCase() === confirmPassword.toLowerCase())
                return true;
            else return false;
        },
        showMessage() {
            this.status = this.$store.getters["status"];

            return this.$store.getters["showFlashMessage"];
        },
    },
    computed: {
        isAdmin() {
            return this.$store.getters["customer/isAdmin"];
        },
        isLoading() {
            return this.$store.getters["isLoading"];
        },
        isSetupComplete() {
            return this.$store.getters["setupData"];
        },
        currentPage() {
            return this.$route.path;
        },
    },
};
