<template>
    <the-row class="border-bottom border-top border-1">
        <!-- Customer Account Details -->
        <the-column class="col-12 border-end border-top border-2 shadow-sm">
            <the-row>
                <the-column class="col-12 mb-2">
                    <h4 class="text-center my-3">Customer Details</h4>
                </the-column>
            </the-row>
            <!-- Customer Full Name -->
            <the-row>
                <the-column class="col-2 mb-2">
                    <the-label
                        label-title="Name"
                        for-id="name"
                        label-class="col-form-label fw-bold"
                    ></the-label>
                </the-column>
                <the-column class="col-10">
                    <the-input
                        inputClass="form-control mt-3"
                        inputId="name"
                        v-model="customerFullName"
                        readOnly="true"
                        placeholder="Customer Name"
                        tabindex="-1"
                    ></the-input>
                </the-column>
            </the-row>
            <the-row>
                <the-column class="col-2 mb-2">
                    <the-label
                        label-title="Contact"
                        for-id="mobieNo"
                        label-class="col-form-label fw-bold"
                    ></the-label>
                </the-column>
                <the-column class="col-10 mb-3">
                    <the-input
                        inputClass="form-control mt-3"
                        inputId="phone"
                        v-model="customerContact"
                        readOnly="true"
                        required="false"
                        placeholder="Mobile Number"
                        tabindex="-1"
                    ></the-input>
                </the-column>
            </the-row>
            <the-row>
                <the-column class="col-2 mb-2">
                    <the-label
                        label-title="Address"
                        for-id="addess"
                        label-class="col-form-label fw-bold"
                    ></the-label>
                </the-column>
                <the-column class="col-10 mb-3">
                    <the-input
                        inputClass="form-control mt-3"
                        inputId="custaddress"
                        readOnly="true"
                        v-model="customerAddress"
                        required="false"
                        placeholder="Customer Address"
                        tabindex="-1"
                    ></the-input>
                </the-column>
            </the-row>
        </the-column>
    </the-row>
</template>

<script>
import TheRow from "../layout/TheRow.vue";
import TheColumn from "../layout/TheColumn.vue";
import TheLabel from "../common/TheLabel.vue";
import TheInput from "../common/TheInput.vue";

export default {
    components: {
        TheRow,
        TheColumn,
        TheLabel,
        TheInput,
    },
    name: "CustomerDetails",
    props: ["selectedCustomer"],
    data() {
        return {};
    },
    computed: {
        customerFullName() {
            return (
                this.selectedCustomer.firstName +
                " " +
                this.selectedCustomer.lastName
            );
        },
        customerAddress() {
            return (
                this.selectedCustomer.custAddress +
                ", " +
                this.selectedCustomer.custCity +
                ", " +
                this.selectedCustomer.custPinCode
            );
        },
        customerContact() {
            return (
                this.selectedCustomer.phoneNbr +
                ",  " +
                this.selectedCustomer.email
            );
        },
    },
    async created() {},
};
</script>

<style></style>
