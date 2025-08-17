<template>
    <!--
tags: [people, persons, accounts]
version: "1.7"
unicode: "ebf2"
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
        <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
        <title>{{ title }}</title>
    </svg>
</template>

<script>
export default {
    name: "TheUsersIcon",
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
            default: "All Customers",
        },
    },
};
</script>

<style></style>
