<template>
    <select
        class="form-select mt-3"
        :class="selectClass"
        style="background-color: #e4eef1"
        @change="handleChange($event)"
    >
        <option disabled value="" selected>Select One</option>
        <slot />
    </select>
</template>

<script>
export default {
    name: "TheSelect",
    props: ["selectClass", "modelValue"],
    emits: ["update:modelValue"],

    data() {
        return {
            selectedValue: this.modelValue,
        };
    },
    methods: {
        handleChange(event) {
            this.$emit("update:modelValue", event.target.value);
        },
    },
};
</script>

<style></style>
