<template>
    <the-flash-message
        v-if="showMessage()"
        :feedback-message="status.message"
        :feedbackClass="status.class"
    ></the-flash-message>

    <the-spinner v-if="isLoading"></the-spinner>

    <the-container className="my-4">
        <h4 class="text-center my-3">Reset Password</h4>
        <the-form @submitForm="submitForm" novalidate="true">
            <the-container className="border border-3 mb-4 rounded rounded-4">
                <the-row>
                    <the-column class="col-12 offset-2">
                        <the-row>
                            <the-column class="mx-0 col-sm-3 mb-3">
                                <the-label
                                    label-title="Current Password"
                                    for-id="currentPassword"
                                    label-class="col-form-label fw-bold"
                                    :class="{
                                        invalid:
                                            currentPasswordValidity ===
                                            'invalid',
                                    }"
                                ></the-label>
                            </the-column>
                            <the-column class="col-sm-5 mb-3">
                                <the-input
                                    inputClass="form-control mt-3"
                                    inputType="password"
                                    inputId="currPassword"
                                    v-model="currentPassword"
                                    placeholder="Enter your current password"
                                    tabindex="1"
                                    :onBlur="resetFeedback"
                                    :class="{
                                        invalid:
                                            currentPasswordValidity ===
                                            'invalid',
                                    }"
                                    ref="currentPasswordRef"
                                >
                                </the-input>
                                <the-error-para
                                    :errorComponent="currentPasswordValidity"
                                    errorTitle="Please enter a valid Password!"
                                ></the-error-para>
                            </the-column>
                        </the-row>

                        <the-row>
                            <the-column class="mx-0 col-sm-3 mb-3">
                                <the-label
                                    label-title="New Password"
                                    for-id="newPassword"
                                    label-class="col-form-label fw-bold"
                                    :class="{
                                        invalid:
                                            newPasswordValidity === 'invalid',
                                    }"
                                ></the-label>
                            </the-column>
                            <the-column class="col-sm-5 mb-3">
                                <the-input
                                    inputClass="form-control mt-3"
                                    inputType="password"
                                    inputId="Npassword"
                                    v-model="newPassword"
                                    placeholder="Enter a new password"
                                    tabindex="2"
                                    :onBlur="resetFeedback"
                                    :class="{
                                        invalid:
                                            newPasswordValidity === 'invalid',
                                    }"
                                >
                                </the-input>
                                <the-error-para
                                    :errorComponent="newPasswordValidity"
                                    errorTitle="Please enter a valid Password!"
                                ></the-error-para>
                            </the-column>
                        </the-row>

                        <the-row>
                            <the-column class="mx-0 col-sm-3 mb-3">
                                <the-label
                                    label-title="Re-enter New Password"
                                    for-id="retypeNewPassword"
                                    label-class="col-form-label fw-bold"
                                    :class="{
                                        invalid:
                                            confirmNewPasswordValidity ===
                                            'invalid',
                                    }"
                                ></the-label>
                            </the-column>
                            <the-column class="col-sm-5 mb-3">
                                <the-input
                                    inputClass="form-control mt-3"
                                    inputType="password"
                                    inputId="confirmNewPassword"
                                    v-model="confirmNewPassword"
                                    placeholder="Re-enter the new password"
                                    tabindex="2"
                                    :onBlur="resetFeedback"
                                    :class="{
                                        invalid:
                                            confirmNewPasswordValidity ===
                                            'invalid',
                                    }"
                                >
                                </the-input>
                                <the-error-para
                                    :errorComponent="confirmNewPasswordValidity"
                                    errorTitle="Please enter a valid Password!"
                                ></the-error-para>
                            </the-column>
                        </the-row>
                    </the-column>
                </the-row>
            </the-container>
            <the-column class="col-12">
                <form-buttons
                    title="Change Password"
                    backButtonHide="true"
                    @resetForm="resetForm"
                ></form-buttons>
                <!-- style="background-color: #a8a8ac" -->
            </the-column>
        </the-form>
    </the-container>
</template>

<script>
import TheRow from "@components/UI/layout/TheRow.vue";
import TheColumn from "@components/UI/layout/TheColumn.vue";
import TheErrorPara from "@components/UI/common/TheErrorPara.vue";
import TheLabel from "@components/UI/common/TheLabel.vue";
import TheInput from "@components/UI/common/TheInput.vue";
import TheContainer from "@components/UI/layout/TheContainer.vue";
import TheSpinner from "@components/UI/common/TheSpinner.vue";
import FormButtons from "@components/UI/common/FormButtons.vue";
import TheForm from "@components/UI/common/TheForm.vue";
import TheFlashMessage from "@components/UI/common/TheFlashMessage.vue";
import mixins from "../../mixins/mixins";

export default {
    name: "PasswordReset",
    components: {
        TheRow,
        TheColumn,
        TheErrorPara,
        TheLabel,
        TheInput,
        TheContainer,
        TheSpinner,
        FormButtons,
        TheForm,
        TheFlashMessage,
    },
    data() {
        return {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",

            currentPasswordValidity: "pending",
            newPasswordValidity: "pending",
            confirmNewPasswordValidity: "pending",

            status: "",
        };
    },
    mixins: [mixins],
    methods: {
        resetForm() {
            this.resetFeedback();
            this.currentPassword = "";
            this.newPassword = "";
            this.confirmNewPassword = "";
            this.$refs.currentPasswordRef.focus();
        },
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

            this.currentPasswordValidity = "pending";
            this.confirmNewPasswordValidity = "pending";
            this.newPasswordValidity = "pending";
        },

        async submitForm() {
            if (this.currentPassword === "" || this.currentPassword === null)
                this.currentPasswordValidity = "invalid";
            else this.currentPasswordValidity = "valid";

            if (this.newPassword === "" || this.newPassword === null)
                this.newPasswordValidity = "invalid";
            else this.newPasswordValidity = "valid";

            if (
                this.confirmNewPassword === "" ||
                this.confirmNewPassword === null
            )
                this.confirmNewPasswordValidity = "invalid";
            else this.confirmNewPasswordValidity = "valid";

            if (
                !this.validatePasswords(
                    this.newPassword,
                    this.confirmNewPassword
                )
            ) {
                this.$store.commit(
                    "setStatus",
                    {
                        class: "bg-danger",
                        error: true,
                        errorCode: "Error",
                        message: `New Passwords provided do not match! Please re-enter the new passwords!`,
                    },
                    { root: true }
                );
                this.$store.commit("setFlashMessage", true, { root: true });
                this.passwordValidity = "invalid";
                this.confirmPasswordValidity = "invalid";
            }

            try {
                if (
                    this.currentPasswordValidity === "valid" &&
                    this.newPasswordValidity === "valid" &&
                    this.confirmNewPasswordValidity === "valid"
                ) {
                    const customer =
                        this.$store.getters["customer/customer"][0];

                    await this.$store
                        .dispatch("customer/handleResetPassword", {
                            custId: customer.custId,
                            enteredPassword: this.currentPassword,
                            dbPassword: customer.password,
                            newPassword: this.newPassword,
                        })
                        .then((response) => {
                            if (response) {
                                this.$store.commit("setLoading", true, {
                                    root: true,
                                });
                                setTimeout(() => {
                                    this.$router.replace("/auth/logout");
                                    this.$store.commit("setLoading", false, {
                                        root: true,
                                    });
                                }, 1000);
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
    },
};
</script>

<style scoped>
.invalid {
    border-color: red;
    color: red;
}
</style>
