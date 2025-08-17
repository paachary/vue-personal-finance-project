<template>
    <div class="d-flex gap-5 align-items-center justify-content-end">
        <router-link :to="backLink" v-if="backButtonHide !== 'true'">
            <the-button
                btn-type="button"
                className="rounded-4 "
                style="background-color: #dddddd; border-width: medium"
                title="Back"
            ></the-button>
        </router-link>
        <the-button
            v-if="buttonHide !== 'true'"
            className="rounded-4"
            style="
                background-color: #8fb339;
                border-width: medium;
                color: white;
            "
            :style="buttonStyle"
            btn-type="submit"
            :title="title"
        ></the-button>
        <the-button
            @click="resetForm"
            title="Reset"
            className="rounded-4"
            style="border-color: #877c6e; border-width: medium"
        ></the-button>
    </div>
</template>

<script>
import TheButton from "./TheButton.vue";

export default {
    name: "FormButtons",
    emits: ["resetForm"],
    components: {
        TheButton,
    },
    props: {
        title: {
            type: String,
            default: "Submit",
        },
        backLink: {
            type: String,
            default: "",
        },
        buttonColor: {
            type: String,
            default: "#8fb339",
        },
        buttonHide: {
            type: String,
            default: "false",
        },
        backButtonHide: {
            type: String,
            default: "false",
        },
    },
    methods: {
        resetForm() {
            this.$emit("resetForm");
        },
    },
    computed: {
        buttonStyle() {
            return {
                backgroundColor: this.buttonColor,
                borderWidth: "medium",
                color: "white",
            };
        },
    },
};
</script>

<style></style>
