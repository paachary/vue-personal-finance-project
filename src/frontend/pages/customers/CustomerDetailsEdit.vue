<template>
    <the-flash-message
        v-if="showMessage()"
        :feedback-message="status.message"
        :feedbackClass="status.class"
    ></the-flash-message>

    <the-spinner v-if="isLoading"></the-spinner>
    <the-form @submitForm="submitForm" novalidate="true">
        <the-row class="border-bottom border-top border-1">
            <h3 class="text-center my-3">Customer Details</h3>
            <!-- User Personal Details -->
            <the-column
                class="col-6 border-end border-top border-2 shadow-sm mb-2"
            >
                <the-row>
                    <the-column class="col-12">
                        <h4 class="text-start border-bottom">
                            Personal Details
                        </h4>
                    </the-column>
                </the-row>
                <!-- First Name -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Name"
                            for-id="name"
                            label-class="col-form-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-2">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="name"
                            v-model.trim="fullName"
                            readOnly="true"
                        ></the-input>
                    </the-column>
                </the-row>

                <!-- Called Name -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Preferred Name"
                            for-id="preferredName"
                            label-class="col-form-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-2">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="preferredName"
                            v-model.trim="selectedCustomer.preferredName"
                            readOnly="true"
                        ></the-input>
                    </the-column>
                </the-row>
                <!-- is Administrator -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Administrator"
                            for-id="isAdmin"
                            label-class="col-form-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-9 mb-2">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="isAdmin"
                            v-model.trim="selectedCustomer.isAdmin"
                            readOnly="true"
                        ></the-input>
                    </the-column>
                </the-row>
                <!-- Gender -->
                <the-row>
                    <the-column class="col-sm-3 mb-2">
                        <the-label
                            label-title="Gender"
                            for-id="genderLabel"
                            label-class="col-form-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-3 mb-2 border-end">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="gender"
                            v-model.trim="selectedCustomer.gender"
                            readOnly="true"
                        ></the-input>
                    </the-column>
                    <!-- Date of Birth -->
                    <the-column class="col-sm-2 mb-2 border-start">
                        <the-label
                            label-title="DoB"
                            for-id="dob"
                            label-class="col-form-label fw-bold"
                        ></the-label>
                    </the-column>
                    <the-column class="col-sm-4 mb-2">
                        <the-input
                            inputClass="form-control mt-3"
                            inputId="dob"
                            v-model.trim="selectedCustomer.dob"
                            readOnly="true"
                        ></the-input>
                    </the-column>
                </the-row>
            </the-column>
            <the-column
                class="col-6 border-end border-top border-2 shadow-sm mb-2"
            >
                <the-row>
                    <the-column class="col-12">
                        <h4 class="text-start border-bottom">
                            Contact Details
                        </h4>
                    </the-column>
                </the-row>
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
                            v-model.trim="selectedCustomer.email"
                            placeholder="Enter Email Id"
                            tabindex="1"
                            :class="{
                                invalid: emailValidity === 'invalid',
                            }"
                            :onblur="resetFeedback"
                            ref="emailRefInput"
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
                            v-model.number="selectedCustomer.phoneNbr"
                            placeholder="Enter Mobile Number"
                            tabindex="2"
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
                            v-model.number="selectedCustomer.custPinCode"
                            placeholder="Enter Pin Code"
                            tabindex="3"
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
                            tabindex="4"
                            style="background-color: #e4eef1"
                            placeholder="Enter Communication Address"
                            v-model.trim="selectedCustomer.custAddress"
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
                            v-model.trim="selectedCustomer.custCity"
                            placeholder="Enter City"
                            tabindex="5"
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

        <the-column class="col-12 my-3">
            <form-buttons
                title="Save"
                backButtonHide="true"
                @resetForm="resetForm"
            ></form-buttons>
            <!-- style="background-color: #a8a8ac" -->
        </the-column>
    </the-form>
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
    name: "CustomerDetailsEdit",
    props: ["custId"],
    mixins: [mixins],
    data() {
        return {
            // Add your data properties here
            selectedCustomer: {},

            originalCustData: {},

            emailValidity: "pending",
            mobileValidity: "pending",
            cityValidity: "pending",
            addressValidity: "pending",
            pinValidity: "pending",
        };
    },
    computed: {
        fullName() {
            return (
                this.selectedCustomer.firstName +
                " " +
                this.selectedCustomer.lastName
            );
        },
    },
    created() {
        this.selectedCustomer = this.$store.getters["customer/customer"][0];

        if (
            this.selectedCustomer === null ||
            this.selectedCustomer === undefined
        )
            this.$router.replace("/auth/logout");
        this.originalCustData = { ...this.selectedCustomer };
    },
    methods: {
        // Add your methods here
        resetForm() {
            this.selectedCustomer.email = this.originalCustData.email;
            this.selectedCustomer.phoneNbr = this.originalCustData.phoneNbr;
            this.selectedCustomer.custPinCode =
                this.originalCustData.custPinCode;
            this.selectedCustomer.custAddress =
                this.originalCustData.custAddress;
            this.selectedCustomer.custCity = this.originalCustData.custCity;
            this.$refs.emailRefInput.focus();
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

            this.emailValidity = "pending";
            this.mobileValidity = "pending";
            this.cityValidity = "pending";
            this.addressValidity = "pending";
            this.pinValidity = "pending";
        },
        async submitForm() {
            this.resetFeedback();

            if (
                this.selectedCustomer.email === "" ||
                this.selectedCustomer.email === null ||
                !this.validEmail(this.selectedCustomer.email)
            )
                this.emailValidity = "invalid";
            else this.emailValidity = "valid";

            if (
                this.selectedCustomer.phoneNbr === "" ||
                this.selectedCustomer.phoneNbr === null
            )
                this.mobileValidity = "invalid";
            else this.mobileValidity = "valid";

            if (
                this.selectedCustomer.custPinCode === "" ||
                this.selectedCustomer.custPinCode === null ||
                typeof this.selectedCustomer.custPinCode !== "number"
            )
                this.pinValidity = "invalid";
            else this.pinValidity = "valid";

            if (
                this.selectedCustomer.custAddress === "" ||
                this.selectedCustomer.custAddress === null
            )
                this.addressValidity = "invalid";
            else this.addressValidity = "valid";

            if (
                this.selectedCustomer.custCity === "" ||
                this.selectedCustomer.custCity === null
            )
                this.cityValidity = "invalid";
            else this.cityValidity = "valid";

            if (
                this.emailValidity === "valid" &&
                this.mobileValidity === "valid" &&
                this.cityValidity === "valid" &&
                this.addressValidity === "valid" &&
                this.pinValidity === "valid"
            ) {
                const customerData = {
                    custId: this.custId,
                    email: this.selectedCustomer.email.toLowerCase(),
                    phoneNbr: this.selectedCustomer.phoneNbr,
                    custPinCode: this.selectedCustomer.custPinCode,
                    custAddress: this.selectedCustomer.custAddress,
                    custCity: this.selectedCustomer.custCity.toUpperCase(),
                };

                await this.$store.dispatch(
                    "customer/updateCustomerDetails",
                    customerData
                );

                this.$store.commit("setLoading", true, {
                    root: true,
                });
                setTimeout(() => {
                    this.$router.replace("/");
                    this.$store.commit("setLoading", false, {
                        root: true,
                    });
                }, 500);
            }
        },
        showMessage() {
            this.status = this.$store.getters["status"];

            return this.$store.getters["showFlashMessage"];
        },
        validEmail(email) {
            var re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        validatePasswords(password, confirmPassword) {
            if (password.toLowerCase() === confirmPassword.toLowerCase())
                return true;
            else return false;
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
