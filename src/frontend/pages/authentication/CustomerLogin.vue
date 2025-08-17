<template>
    <the-flash-message
        v-if="showMessage()"
        :feedback-message="status.message"
        :feedbackClass="status.class"
    ></the-flash-message>
    <the-row>
        <the-column class="col-sm-6 mb-2">
            <img class="img-fluid" src="../../assets/savings.png" alt="" />
        </the-column>
        <the-column class="col-sm-6 mb-2">
            <the-form @submitForm="submitForm">
                <h3 class="text-center" style="margin-top: 2rem">
                    Customer Login
                </h3>
                <the-row style="margin-top: 2rem">
                    <the-column class="col-sm-2 ms-4 mb-5">
                        <the-label
                            label-title="User Name"
                            for-id="userName"
                            label-class="col-form-label fw-bold"
                            :class="{ invalid: userNameValidity === 'invalid' }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-5">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="userName"
                            v-model="userName"
                            placeholder="Customer User Name"
                            tabindex="1"
                            :onBlur="resetFeedback"
                            :class="{ invalid: userNameValidity === 'invalid' }"
                            autofocus
                            ref="userNameRef"
                        >
                        </the-input>
                        <the-error-para
                            :errorComponent="userNameValidity"
                            errorTitle="Please enter a valid User Name!"
                        ></the-error-para>
                    </the-column>
                </the-row>

                <the-row>
                    <the-column class="col-sm-2 ms-4 mb-5">
                        <the-label
                            label-title="Password"
                            for-id="password"
                            label-class="col-form-label fw-bold"
                            :class="{ invalid: passwordValidity === 'invalid' }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-5">
                        <the-input
                            inputClass="form-control mt-3"
                            inputType="password"
                            inputId="password"
                            v-model="password"
                            placeholder="Password"
                            tabindex="2"
                            :onBlur="resetFeedback"
                            :class="{ invalid: passwordValidity === 'invalid' }"
                        >
                        </the-input>
                        <the-error-para
                            :errorComponent="passwordValidity"
                            errorTitle="Please enter a valid Password!"
                        ></the-error-para>
                    </the-column>
                </the-row>
                <the-row>
                    <the-column class="col-6 offset-3 mb-2">
                        <form-buttons
                            title="Login"
                            backButtonHide="true"
                            @resetForm="resetForm"
                        ></form-buttons>
                        <!-- style="background-color: #a8a8ac" -->
                    </the-column>
                </the-row>
            </the-form>
            <the-row>
                <the-column>
                    <p class="text-center mt-4">
                        Don't have an account?
                        <span
                            ><router-link to="/register-new-customer"
                                >Sign up!</router-link
                            ></span
                        >
                    </p>
                </the-column>
            </the-row>
        </the-column>
    </the-row>
</template>

<script>
import TheRow from "@components/UI/layout/TheRow.vue";
import TheColumn from "@components/UI/layout/TheColumn.vue";
import TheForm from "@components/UI/common/TheForm.vue";
import TheLabel from "@components/UI/common/TheLabel.vue";
import TheInput from "@components/UI/common/TheInput.vue";
import FormButtons from "@components/UI/common/FormButtons.vue";
import TheFlashMessage from "@components/UI/common/TheFlashMessage.vue";
import TheErrorPara from "@components/UI/common/TheErrorPara.vue";
import mixins from "../../mixins/mixins";

export default {
    name: "CustomerLogin",
    components: {
        TheRow,
        TheColumn,
        TheForm,
        TheLabel,
        TheInput,
        FormButtons,
        TheFlashMessage,
        TheErrorPara,
    },
    mixins: [mixins],

    data() {
        TheColumn;
        return {
            password: "",
            userName: "",
            passwordValidity: "pending",
            userNameValidity: "pending",

            customerData: {},
        };
    },
    methods: {
        resetFeedback() {
            this.status.class = "";
            this.status.message = "";
            this.$store.commit(
                "setStatus",
                {
                    error: false,
                    errorCode: "",
                    message: "",
                    class: "",
                },
                { root: true }
            );
            this.$store.commit("setFlashMessage", false, { root: true });
            this.passwordValidity = "pending";
            this.userNameValidity = "pending";
        },
        resetForm() {
            this.userName = "";
            this.password = "";
            this.$refs.userNameRef.focus();
        },
        async submitForm() {
            this.resetFeedback();
            if (this.password === "" || this.password === null)
                this.passwordValidity = "invalid";
            else this.passwordValidity = "valid";

            if (this.userName === "" || this.userName === null)
                this.userNameValidity = "invalid";
            else this.userNameValidity = "valid";

            try {
                if (
                    this.userNameValidity === "valid" &&
                    this.passwordValidity === "valid"
                ) {
                    await this.$store
                        .dispatch("customer/validateCustomer", {
                            userName: this.userName,
                            password: this.password,
                        })
                        .then((response) => {
                            if (response) {
                                this.$router.replace("/");
                            } else {
                                this.commonCatch(this.status.message);
                            }
                        });
                }
            } catch (error) {
                this.$store.commit(
                    "setStatus",
                    {
                        error: true,
                        errorCode: "500",
                        message: this.status.message,
                        class: "bg-danger",
                    },
                    { root: true }
                );
                this.$store.commit("setFlashMessage", true, { root: true });
            }
        },

        showMessage() {
            this.status = this.$store.getters["status"];

            return this.$store.getters["showFlashMessage"];
        },
    },
};
</script>

TheColumn
<style scoped>
.invalid {
    border-color: red;
    color: red;
}
</style>
