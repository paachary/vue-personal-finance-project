<template>
    <the-row>
        <the-column class="col-sm-3 mb-2">
            <the-label
                :label-title="title"
                :for-id="lableId"
                label-class="col-form-label fw-bold"
            ></the-label>
        </the-column>
        <the-column class="col-sm-9 mb-2">
            <select
                :id="setId"
                :name="name"
                :value="modelValue"
                class="form-select mt-3"
                style="font-size: 13px; background-color: #e4eef1"
                tabindex="1"
                @change="handleChange"
            >
                <option disabled value="" selected>Select One</option>
                <option v-for="option in options" :key="option" :value="option">
                    {{ option }}
                </option>
            </select>
        </the-column>
    </the-row>
</template>

<script>
import TheRow from "@/components/UI/layout/TheRow.vue";
import TheColumn from "@/components/UI/layout/TheColumn.vue";
import TheLabel from "@components/UI/common/TheLabel.vue";
export default {
    name: "TheLabelInput",
    components: {
        TheRow,
        TheColumn,
        TheLabel,
    },
    props: ["title", "name", "options", "modelValue"],
    emits: ["update:modelValue"],
    data() {
        return {};
    },
    methods: {
        handleChange(event) {
            this.$emit("update:modelValue", event.target.value);
        },
    },
    computed: {
        setId() {
            return `${this.name}Id`;
        },
        labelId() {
            return `label-${this.name}Id`;
        },
    },
    watch() {},
    mounted() {},
};
</script>

<style></style>
