<template>
    <the-flash-message
        v-if="showMessage()"
        :feedback-message="status.message"
        :feedbackClass="status.class"
    ></the-flash-message>

    <the-spinner v-if="isLoading"></the-spinner>

    <the-form @submitForm="submitForm" novalidate="true">
        <the-row class="border-bottom border-top border-1">
            <h3 class="text-center my-1">Customer Registration</h3>

            <h4 class="text-start my-1">Personal Details</h4>
            <!-- User Personal Details -->
            <the-column class="col-6 border-end border-top border-2 shadow-sm">
                <!-- is Administrator flag -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Administrator"
                            for-id="isAdmin"
                            label-class="form-check-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-2">
                        <div class="mt-3 form-check form-switch">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                id="isAdmin"
                                name="isAdmin"
                                value="no"
                                v-model="isAdmin"
                                @change="validateUserType"
                                tabindex="1"
                                :onblur="resetFeedback"
                            />
                        </div>
                    </the-column>
                </the-row>
                <!-- First Name -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="First Name"
                            for-id="firstName"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: firstNameValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-2">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="firstName"
                            v-model.trim="firstName"
                            placeholder="Enter First Name"
                            :readOnly="isAdmin ? 'true' : 'false'"
                            tabindex="2"
                            :class="{
                                invalid: firstNameValidity === 'invalid',
                            }"
                            :onblur="resetFeedback"
                            ref="firstNameRef"
                        ></the-input>
                        <the-error-para
                            :errorComponent="firstNameValidity"
                            errorTitle="Please enter a valid First Name!"
                        ></the-error-para>
                    </the-column>
                </the-row>
                <!-- Last Name -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Last Name"
                            for-id="lastName"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: lastNameValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-2">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="lastName"
                            v-model.trim="lastName"
                            placeholder="Enter Last Name"
                            :readOnly="isAdmin ? 'true' : 'false'"
                            tabindex="3"
                            :class="{
                                invalid: lastNameValidity === 'invalid',
                            }"
                            :onblur="resetFeedback"
                        ></the-input>
                        <the-error-para
                            :errorComponent="lastNameValidity"
                            errorTitle="Please enter a valid Last Name!"
                        ></the-error-para>
                    </the-column>
                </the-row>

                <!-- Called Name -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Preferred Name"
                            for-id="preferredName"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: preferredNameValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-2">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="preferredName"
                            v-model.trim="preferredName"
                            placeholder="Enter your Preferred Name (max 4 chars)"
                            tabindex="4"
                            :readOnly="isAdmin ? 'true' : 'false'"
                            :class="{
                                invalid: preferredNameValidity === 'invalid',
                            }"
                            :onblur="resetFeedback"
                        ></the-input>
                        <the-error-para
                            :errorComponent="preferredNameValidity"
                            errorTitle="Please enter a valid Preferred Name!"
                        ></the-error-para>
                    </the-column>
                </the-row>
                <!-- Gender -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Gender"
                            for-id="genderLabel"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: genderValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-3 mb-2 border-end">
                        <div class="form-check">
                            <the-input
                                inputClass="form-check-input  mt-3"
                                type="radio"
                                inputId="male"
                                name="gender"
                                inputValue="male"
                                value="male"
                                v-model.trim="gender"
                                tabindex="5"
                                :class="{
                                    invalid: genderValidity === 'invalid',
                                }"
                                :onblur="resetFeedback"
                            ></the-input>
                            <the-label
                                label-title="Male"
                                for-id="male"
                                label-class="form-check-label "
                                :class="{
                                    invalid: genderValidity === 'invalid',
                                }"
                            ></the-label>
                        </div>
                        <div class="form-check">
                            <the-input
                                inputClass="form-check-input  mt-3"
                                type="radio"
                                inputId="male"
                                name="gender"
                                inputValue="female"
                                v-model.trim="gender"
                                value="female"
                                checked="true"
                                tabindex="6"
                                :class="{
                                    invalid: genderValidity === 'invalid',
                                }"
                                :onblur="resetFeedback"
                            ></the-input>
                            <the-label
                                label-title="Female"
                                for-id="female"
                                label-class="form-check-label "
                                :class="{
                                    invalid: genderValidity === 'invalid',
                                }"
                            ></the-label>
                        </div>
                        <the-error-para
                            :errorComponent="genderValidity"
                            errorTitle="Please select a Gender value!"
                        ></the-error-para>
                    </the-column>
                    <!-- Date of Birth -->
                    <the-column class="col-sm-2 mb-2 border-start">
                        <the-label
                            label-title="DoB"
                            for-id="dob"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: dobValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-4 mb-2">
                        <the-input
                            inputClass="form-control  mt-3"
                            type="date"
                            inputId="dob"
                            name="dob"
                            v-model.trim="dob"
                            :class="{
                                invalid: dobValidity === 'invalid',
                            }"
                            :onblur="resetFeedback"
                            tabindex="6"
                        ></the-input>
                        <the-error-para
                            :errorComponent="dobValidity"
                            errorTitle="Please enter a valid Date!"
                        ></the-error-para>
                    </the-column>
                </the-row>
            </the-column>
            <the-column
                class="col-6 border-start border-top border-2 shadow-sm"
            >
                <!-- User ID -->
                <the-row>
                    <the-column class="col-sm-4 mb-2">
                        <the-label
                            label-title="User Name"
                            for-id="userName"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: userNameValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-input
                            inputClass="form-control  mt-3"
                            inputId="userName"
                            v-model.trim="userName"
                            placeholder="Enter User Name"
                            :readOnly="isAdmin ? 'true' : 'false'"
                            tabindex="7"
                            :class="{
                                invalid: userNameValidity === 'invalid',
                            }"
                            :onblur="resetFeedback"
                        ></the-input>
                        <the-error-para
                            :errorComponent="userNameValidity"
                            errorTitle="Please enter a valid User Name!"
                        ></the-error-para>
                    </the-column>
                </the-row>

                <!-- Password -->
                <the-row>
                    <the-column class="col-sm-4 mb-2">
                        <the-label
                            label-title="Password"
                            for-id="password"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: passwordValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-input
                            inputClass="form-control  mt-3"
                            inputId="password"
                            v-model.trim="password"
                            inputType="password"
                            placeholder="Enter Preferred Password"
                            tabindex="8"
                            :class="{
                                invalid: passwordValidity === 'invalid',
                            }"
                            :onblur="resetFeedback"
                        ></the-input>
                        <the-error-para
                            :errorComponent="passwordValidity"
                            errorTitle="Please enter a valid Password!"
                        ></the-error-para>
                    </the-column>
                </the-row>

                <!-- Retype Password -->
                <the-row>
                    <the-column class="col-sm-4 mb-2">
                        <the-label
                            label-title="Confirm Password"
                            for-id="confirm-password"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: confirmPasswordValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-8 mb-2">
                        <the-input
                            inputClass="form-control  mt-3"
                            inputId="confirm-password"
                            v-model.trim="confirmPassword"
                            inputType="password"
                            placeholder="Re-enter Password"
                            tabindex="9"
                            :class="{
                                invalid: confirmPasswordValidity === 'invalid',
                            }"
                            :onblur="resetFeedback"
                        ></the-input>
                        <the-error-para
                            :errorComponent="confirmPasswordValidity"
                            errorTitle="Please enter a valid Password!"
                        ></the-error-para>
                    </the-column>
                </the-row>
            </the-column>
        </the-row>
        <the-row class="border-top border-bottom border-1">
            <h4 class="text-start my-1">Contact Details</h4>
            <the-column
                class="col-6 border-end border-top border-2 shadow-sm mb-2"
            >
                <!-- Email Id -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Email"
                            for-id="email"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: emailValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-2">
                        <the-input
                            inputClass="form-control  mt-3"
                            inputId="email"
                            inputType="email"
                            v-model.trim="email"
                            placeholder="Enter Email Id"
                            tabindex="10"
                            :class="{
                                invalid: emailValidity === 'invalid',
                            }"
                            :onblur="resetFeedback"
                        ></the-input>
                        <the-error-para
                            :errorComponent="emailValidity"
                            errorTitle="Please enter a valid Email id!"
                        ></the-error-para>
                    </the-column>
                </the-row>
                <!-- Phone Number -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Mobile"
                            for-id="phoneNbr"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: mobileValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-2">
                        <the-input
                            inputClass="form-control  mt-3"
                            inputId="phoneNbr"
                            inputType="phone"
                            v-model.number="phoneNbr"
                            placeholder="Enter Mobile Number"
                            tabindex="11"
                            :class="{
                                invalid: mobileValidity === 'invalid',
                            }"
                            :onblur="resetFeedback"
                        ></the-input>
                        <the-error-para
                            :errorComponent="mobileValidity"
                            errorTitle="Please enter a valid Mobile Number!"
                        ></the-error-para>
                    </the-column>
                </the-row>
                <!-- Pin Code -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Pin Code"
                            for-id="custPinCode"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: pinValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-2">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="custPinCode"
                            v-model.number="custPinCode"
                            placeholder="Enter Pin Code"
                            tabindex="12"
                            :class="{
                                invalid: pinValidity === 'invalid',
                            }"
                            :onblur="resetFeedback"
                        ></the-input>
                        <the-error-para
                            :errorComponent="pinValidity"
                            errorTitle="Please enter a valid Pincode!"
                        ></the-error-para>
                    </the-column>
                </the-row>
            </the-column>

            <the-column
                class="col-6 border-end border-top border-2 shadow-sm mb-2"
            >
                <!-- Contact Address -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Address"
                            for-id="custAddress"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: addressValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-2">
                        <textarea
                            class="my-3"
                            name="custAddress"
                            id="custAddress"
                            cols="40"
                            rows="5"
                            tabindex="13"
                            style="background-color: #e4eef1"
                            placeholder="Enter Communication Address"
                            v-model.trim="custAddress"
                            :class="{
                                invalid: addressValidity === 'invalid',
                            }"
                            :onblur="resetFeedback"
                        ></textarea>
                        <the-error-para
                            :errorComponent="addressValidity"
                            errorTitle="Please enter a valid Address!"
                        ></the-error-para>
                    </the-column>
                </the-row>
                <!-- City -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="City"
                            for-id="custCity"
                            label-class="col-form-label fw-bold"
                            :class="{
                                invalid: cityValidity === 'invalid',
                            }"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-4">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="custCity"
                            v-model.trim="custCity"
                            placeholder="Enter City"
                            tabindex="14"
                            :class="{
                                invalid: cityValidity === 'invalid',
                            }"
                            :onblur="resetFeedback"
                        ></the-input>
                        <the-error-para
                            :errorComponent="cityValidity"
                            errorTitle="Please enter a valid City!"
                        ></the-error-para>
                    </the-column>
                </the-row>
            </the-column>
        </the-row>

        <the-column class="col-12">
            <form-buttons
                title="Register"
                backButtonHide="true"
                @resetForm="resetForm"
            ></form-buttons>
            <!-- style="background-color: #a8a8ac" -->
        </the-column>
    </the-form>
    <the-row>
        <the-column>
            <p class="text-center">
                Already have an account?
                <span
                    ><router-link to="/auth/login">Sign in!</router-link></span
                >
            </p>
        </the-column>
    </the-row>
</template>

<script>
import TheRow from "@components/UI/layout/TheRow.vue";

import TheColumn from "@components/UI/layout/TheColumn.vue";
import TheLabel from "@components/UI/common/TheLabel.vue";
import TheInput from "@components/UI/common/TheInput.vue";
import TheForm from "@components/UI/common/TheForm.vue";
import FormButtons from "@components/UI/common/FormButtons.vue";
import TheFlashMessage from "@components/UI/common/TheFlashMessage.vue";
import TheErrorPara from "@components/UI/common/TheErrorPara.vue";
import TheSpinner from "@components/UI/common/TheSpinner.vue";
import mixins from "../../mixins/mixins";

export default {
    components: {
        TheRow,
        TheColumn,
        TheLabel,
        TheInput,
        TheForm,
        FormButtons,
        TheFlashMessage,
        TheErrorPara,
        TheSpinner,
    },
    name: "CustomerRegistration",
    mixins: [mixins],
    data() {
        return {
            // Add your data properties here
            isAdmin: false,
            userName: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            dob: "",
            gender: "",
            custAddress: "",
            custPinCode: "",
            custCity: "",
            preferredName: "",
            email: "",
            phoneNbr: "",
            status: "",

            firstNameValidity: "pending",
            lastNameValidity: "pending",
            preferredNameValidity: "pending",
            genderValidity: "pending",
            dobValidity: "pending",
            userNameValidity: "pending",
            passwordValidity: "pending",
            confirmPasswordValidity: "pending",
            emailValidity: "pending",
            mobileValidity: "pending",
            cityValidity: "pending",
            addressValidity: "pending",
            pinValidity: "pending",
        };
    },
    mounted() {
        this.resetForm();
    },
    computed: {},
    methods: {
        validateUserType() {
            this.userName = this.isAdmin ? "sysadmin" : "";
            this.firstName = this.isAdmin ? "System" : "";
            this.lastName = this.isAdmin ? "Administrator" : "";
            this.preferredName = this.isAdmin ? "admin" : "";
        },
        // Add your methods here
        resetForm() {
            this.isAdmin = false;
            this.userName = "";
            this.firstName = "";
            this.lastName = "";
            this.password = "";
            this.confirmPassword = "";
            this.preferredName = "";
            this.gender;
            this.dob = "";
            this.email = "";
            this.phoneNbr = "";
            this.custPinCode = "";
            this.custAddress = "";
            this.custCity = "";
            this.$refs.firstNameRef.focus();
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

            this.firstNameValidity = "pending";
            this.lastNameValidity = "pending";
            this.preferredNameValidity = "pending";
            this.genderValidity = "pending";
            this.dobValidity = "pending";
            this.userNameValidity = "pending";
            this.passwordValidity = "pending";
            this.confirmPasswordValidity = "pending";
            this.emailValidity = "pending";
            this.mobileValidity = "pending";
            this.cityValidity = "pending";
            this.addressValidity = "pending";
            this.pinValidity = "pending";
        },
        async submitForm() {
            this.resetFeedback();

            if (this.firstName === "" || this.firstName === null)
                this.firstNameValidity = "invalid";
            else this.firstNameValidity = "valid";

            if (this.lastName === "" || this.lastName === null)
                this.lastNameValidity = "invalid";
            else this.lastNameValidity = "valid";

            if (this.preferredName === "" || this.preferredName === null)
                this.preferredNameValidity = "invalid";
            else this.preferredNameValidity = "valid";

            if (this.gender === "" || this.gender === null)
                this.genderValidity = "invalid";
            else this.genderValidity = "valid";

            if (this.dob === "" || this.dob === null)
                this.dobValidity = "invalid";
            else this.dobValidity = "valid";

            if (this.userName === "" || this.userName === null)
                this.userNameValidity = "invalid";
            else this.userNameValidity = "valid";

            if (this.password === "" || this.password === null)
                this.passwordValidity = "invalid";
            else this.passwordValidity = "valid";

            if (this.confirmPassword === "" || this.confirmPassword === null)
                this.confirmPasswordValidity = "invalid";
            else this.confirmPasswordValidity = "valid";

            if (
                this.email === "" ||
                this.email === null ||
                !this.validEmail(this.email)
            )
                this.emailValidity = "invalid";
            else this.emailValidity = "valid";

            if (this.phoneNbr === "" || this.phoneNbr === null)
                this.mobileValidity = "invalid";
            else this.mobileValidity = "valid";

            if (
                this.custPinCode === "" ||
                this.custPinCode === null ||
                typeof this.custPinCode !== "number"
            )
                this.pinValidity = "invalid";
            else this.pinValidity = "valid";

            if (this.custAddress === "" || this.custAddress === null)
                this.addressValidity = "invalid";
            else this.addressValidity = "valid";

            if (this.custCity === "" || this.custAddress === null)
                this.cityValidity = "invalid";
            else this.cityValidity = "valid";

            if (!this.validatePasswords(this.password, this.confirmPassword)) {
                this.$store.commit(
                    "setStatus",
                    {
                        class: "bg-danger",
                        error: true,
                        errorCode: "Error",
                        message: `Passwords provided do not match! Please reenter`,
                    },
                    { root: true }
                );
                this.$store.commit("setFlashMessage", true, { root: true });
                this.passwordValidity = "invalid";
                this.confirmPasswordValidity = "invalid";
            }
            if (
                this.firstNameValidity === "valid" &&
                this.lastNameValidity === "valid" &&
                this.preferredNameValidity === "valid" &&
                this.genderValidity === "valid" &&
                this.dobValidity === "valid" &&
                this.userNameValidity === "valid" &&
                this.passwordValidity === "valid" &&
                this.confirmPasswordValidity === "valid" &&
                this.emailValidity === "valid" &&
                this.mobileValidity === "valid" &&
                this.cityValidity === "valid" &&
                this.addressValidity === "valid" &&
                this.pinValidity === "valid"
            ) {
                const customerData = {
                    firstName: this.firstName.toUpperCase(),
                    lastName: this.lastName.toUpperCase(),
                    preferredName: this.preferredName.toUpperCase(),
                    gender: this.gender,
                    dob: this.dob,
                    userName: this.userName.toUpperCase(),
                    password: this.password,
                    email: this.email.toLowerCase(),
                    phoneNbr: this.phoneNbr,
                    custPinCode: this.custPinCode,
                    custAddress: this.custAddress,
                    custCity: this.custCity.toUpperCase(),
                    isAdmin: this.isAdmin ? "Y" : "N",
                };

                await this.$store
                    .dispatch("customer/registerNewCustomer", customerData)
                    .then((response) => {
                        if (response) {
                            this.$store
                                .dispatch(
                                    "customer/getCustomerDetails",
                                    customerData.userName
                                )
                                .then((response) => {
                                    if (response) {
                                        this.$store.commit("setLoading", true, {
                                            root: true,
                                        });
                                        setTimeout(() => {
                                            this.$router.replace("/");
                                            this.$store.commit(
                                                "setLoading",
                                                false,
                                                {
                                                    root: true,
                                                }
                                            );
                                        }, 500);
                                    }
                                });
                        }
                    });
                this.isAdmin = false;
                this.userName = "";
                this.firstName = "";
                this.lastName = "";
                this.password = "";
                this.confirmPassword = "";
                this.preferredName = "";
                this.gender;
                this.dob = "";
                this.email = "";
                this.phoneNbr = "";
                this.custPinCode = "";
                this.custAddress = "";
                this.custCity = "";
            }
        },

        validEmail(email) {
            var re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
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
