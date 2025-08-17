<template>
    <!--
tags: [statistics, data, value, variable, scale, statistical, bar, information, report]
category: Charts
version: "1.39"
unicode: "ee30"
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
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path
            d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
        />
        <path d="M9 17l0 -5" />
        <path d="M12 17l0 -1" />
        <path d="M15 17l0 -3" />
        <title>{{ title }}</title>
    </svg>
</template>

<script>
export default {
    name: "TheReportsIcon",
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
            default: "Reports Icon",
        },
    },
};
</script>
