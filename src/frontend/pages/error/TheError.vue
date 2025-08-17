<template>
    <the-row class="bg-gradient">
        <the-column class="col-12">
            <h4 class="text-center text-danger mt-4">
                {{
                    errorMessage ??
                    "An error occurred while processing your request."
                }}
            </h4>
        </the-column>
        <the-column class="col-12 text-center">
            <p class="mt-4">
                Please <router-link to="/auth/logout">click</router-link> to
                login.
            </p>
        </the-column>
        <the-column class="col-12 text-center mt-3">
            <p class="text-secondary">
                If you need assistance, please contact our support team.
            </p>
        </the-column>
    </the-row>
</template>

<script>
import TheRow from "@components/UI/layout/TheRow.vue";
import TheColumn from "@components/UI/layout/TheColumn.vue";
import { handleSuccessResponse } from "../../scripts/util";
export default {
    name: "TheError",
    components: {
        TheColumn,
        TheRow,
    },
    props: {
        errorCode: {
            type: String,
            default: "Unknown",
        },
    },
    data() {
        return {
            errorMessage: "",
        };
    },
    methods: {
        // You can add methods here if needed
    },
    mounted() {
        // You can add any initialization logic here if needed
        if (+this.errorCode === 403) {
            //
            this.errorMessage =
                "Access is forbidden. Please check with the administrator! ";
        } else if (+this.errorCode === 400) {
            //
            this.errorMessage =
                "Unexpected error has occurred. Please check the database connection! ";
        } else if (+this.errorCode === 401) {
            //
            this.errorMessage =
                "You are unauthenticated. Please login to proceed!";
        }
    },
    computed: {
        // You can add computed properties here if needed
    },
    watch: {
        // You can add watchers here if needed
    },
    unmounted() {
        handleSuccessResponse();
    },
};
</script>

<style></style>
