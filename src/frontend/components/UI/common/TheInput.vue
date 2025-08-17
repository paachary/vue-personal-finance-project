<template>
    <input
        :type="inputType"
        :id="inputId"
        :name="name"
        :tabindex="tabIndex"
        :placeholder="placeholder"
        :class="inputClass"
        :readonly="readOnly === 'true'"
        :value="modelValue"
        checked=":inputType === 'radio' ? checked : undefined"
        @input="$emit('update:modelValue', $event.target.value)"
        :style="styleBgColor"
        ref="rootElement"
    />
</template>

<script>
export default {
    props: {
        required: {
            type: Boolean,
            default: true,
        },
        readOnly: {
            type: String,
            default: "false",
        },
        tabIndex: {
            type: String,
            default: "0",
        },
        checked: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            default: "",
        },
        inputType: {
            type: String,
            default: "text",
        },
        inputId: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            default: "",
        },
        inputClass: {
            type: String,
            default: "form-control",
        },

        modelValue: {
            type: String,
            default: "",
        },
    },
    emits: ["update:modelValue"],
    data() {
        return {};
    },
    computed: {
        styleBgColor() {
            if (this.readOnly === "true") {
                return "background-color: #EDEBE9";
            }
            return "background-color: #e4eef1";
        },
    },

    methods: {
        focus() {
            this.$refs.rootElement.focus();
        },
    },
    watch: {},
    mounted() {},
};
</script>

<style></style>
