<template>
    <!--
tags: [person, account]
version: "1.0"
unicode: "eb4d"
category: System
-->
    <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        stroke-width="2.75"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        <title>{{ title }}</title>
    </svg>
</template>
<script>
export default {
    name: "TheUserIcon",
    props: {
        size: {
            type: String,
            default: "56",
        },
        color: {
            type: String,
            default: "#000000",
        },
        title: {
            type: String,
            default: "User Icon",
        },
    },
};
</script>
