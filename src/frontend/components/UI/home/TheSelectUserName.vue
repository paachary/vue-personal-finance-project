<template>
    <the-row>
        <the-column class="col-sm-3 mb-2">
            <the-label
                label-title="User Name"
                for-id="userName"
                label-class="col-form-label fw-bold"
            ></the-label>
        </the-column>
        <the-column class="col-sm-9 mb-2">
            <select
                id="selectUserName"
                name="selectUserName"
                v-model.trim="selectUserName"
                class="form-select mt-3"
                style="font-size: 13px; background-color: #e4eef1"
                tabindex="1"
            >
                <option disabled value="" selected>Select One</option>
                <option v-for="user in users" :key="user" :value="user">
                    {{ user }}
                </option>
            </select>
        </the-column>
    </the-row>
</template>

<script>
import TheRow from "@/components/UI/layout/TheRow.vue";
import TheColumn from "@/components/UI/layout/TheColumn.vue";
import TheLabel from "@/components/UI/common/TheLabel.vue";

export default {
    name: "TheSelectUserName",
    components: {
        TheRow,
        TheColumn,
        TheLabel,
    },
    emits: ["update:selectedUser"],

    props: ["data"],

    data() {
        return {
            selectUserName: "",
        };
    },
    watch: {
        selectUserName(newValue) {
            this.$emit("update:selectedUser", newValue);
        },
    },
    updated() {
        // Log the selected user name whenever it changes
        this.selectUserName = this.data.length > 0 ? this.data[0].userName : "";
    },
    computed: {
        users() {
            return new Set(this.data.map((investment) => investment.userName));
        },
    },
    mounted() {
        // Initialize the select element with the first user if available
        this.selectUserName = this.data.length > 0 ? this.data[0].userName : "";
    },
};
</script>

<style></style>
