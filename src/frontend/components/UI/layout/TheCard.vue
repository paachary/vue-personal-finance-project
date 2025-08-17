<template>
    <div class="card">
        <div v-if="hasHeader === 'true'" class="card-header">
            <slot name="header"></slot>
        </div>

        <div v-if="hasBody === 'true'" class="card-body">
            <slot name="body"></slot>
            <!-- This is the default slot -->
        </div>
        <div v-if="hasFooter === 'true'" class="card-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "TheCard",
    props: {
        hasHeader: {
            type: String,
            default: "false",
        },
        hasFooter: {
            type: String,
            default: "false",
        },
        hasBody: {
            type: String,
            default: "false",
        },
    },
};
</script>

<style></style>
