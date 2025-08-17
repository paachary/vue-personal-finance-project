<template>
    <div
        v-if="isLoggedIn && !hasError"
        class="d-flex justify-content-center align-items-center gap-2"
    >
        <div>
            <the-home-icon
                @click="handleClick('/')"
                style="cursor: pointer"
                title="Home"
            />
        </div>
        <div class="dropdown">
            <a
                class="btn dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <the-settings-icon :title="`Setup`"></the-settings-icon>
            </a>
            <ul class="dropdown-menu">
                <li>
                    <router-link to="/banks" style="text-decoration: none">
                        <the-button
                            btnType="button"
                            title="Banks"
                            class="dropdown-item"
                        ></the-button>
                    </router-link>
                </li>
                <li>
                    <router-link
                        to="/instrument-types"
                        style="text-decoration: none"
                    >
                        <the-button
                            btnType="button"
                            title="Instrument Types"
                            class="dropdown-item"
                        ></the-button>
                    </router-link>
                </li>
                <li>
                    <router-link
                        to="/investment-types"
                        style="text-decoration: none"
                    >
                        <the-button
                            btnType="button"
                            title="Investment Types"
                            class="dropdown-item"
                        ></the-button>
                    </router-link>
                </li>
            </ul>
        </div>
        <div>
            <the-users-icon
                v-if="isAdmin"
                @click="handleClick('/customers')"
                style="cursor: pointer"
                title="All Customers"
            />

            <the-accounting-icon
                v-if="!isAdmin"
                @click="handleClick('/accounts')"
                style="cursor: pointer"
                title="Accounts & Investments"
            />
        </div>
        <div class="dropdown">
            <a
                class="btn dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <the-reports-icon :title="`Reports`"></the-reports-icon>
            </a>
            <ul class="dropdown-menu">
                <li>
                    <router-link
                        to="/reports/monthlyDebitSummary"
                        style="text-decoration: none"
                    >
                        <the-button
                            btnType="button"
                            title="Monthly Debit Summary"
                            class="dropdown-item"
                        ></the-button>
                    </router-link>
                </li>
                <li>
                    <router-link
                        to="/reports/investments/all/all/all/all/all"
                        style="text-decoration: none"
                    >
                        <the-button
                            btnType="button"
                            title="All Investments"
                            class="dropdown-item"
                        ></the-button>
                    </router-link>
                </li>
            </ul>
        </div>

        <div class="dropdown">
            <a
                class="btn dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-label="User Menu"
            >
                <the-user-icon :title="loggedInUser"></the-user-icon>
            </a>
            <ul class="dropdown-menu">
                <li>
                    <router-link
                        :to="custEditLink"
                        style="text-decoration: none"
                    >
                        <the-button
                            btnType="button"
                            title="Edit Profile"
                            class="dropdown-item"
                        ></the-button>
                    </router-link>
                </li>

                <li>
                    <router-link
                        to="/auth/password-reset"
                        style="text-decoration: none"
                    >
                        <the-button
                            btnType="button"
                            title="Reset Password"
                            class="dropdown-item"
                        ></the-button>
                    </router-link>
                </li>
                <li>
                    <router-link
                        to="/auth/logout"
                        style="text-decoration: none"
                    >
                        <the-button
                            btnType="button"
                            title="Logout"
                            class="dropdown-item"
                        ></the-button>
                    </router-link>
                </li>
            </ul>
        </div>
        <div>
            <the-help-icon
                @click="handleClick('#')"
                style="cursor: pointer"
                title="Help"
            >
            </the-help-icon>
        </div>
        <div class="ms-4" style="font-size: 12px">
            <span class="d-block">
                <span class="d-block"
                    >Welcome {{ customerName }}
                    <the-sign-out-icon
                        @click="handleClick('/auth/logout')"
                        style="cursor: pointer"
                        title="Sign Out"
                    />
                </span>
                Last Logged In
                <p>{{ lastLoggedIn }}</p>
            </span>
        </div>
    </div>
</template>

<script>
import TheButton from "../common/TheButton.vue";
import TheSignOutIcon from "../common/TheSignOutIcon.vue";
import TheUserIcon from "../common/TheUserIcon.vue";
import TheSettingsIcon from "../common/TheSettingsIcon.vue";
import TheReportsIcon from "../common/TheReportsIcon.vue";
import mixins from "../../../mixins/mixins";
import TheAccountingIcon from "../common/TheAccountingIcon.vue";
import TheUsersIcon from "../common/TheUsersIcon.vue";
import TheHelpIcon from "../common/TheHelpIcon.vue";
import TheHomeIcon from "../common/TheHomeIcon.vue";

export default {
    name: "TheNavMenu",
    components: {
        TheButton,
        TheSignOutIcon,
        TheUserIcon,
        TheSettingsIcon,
        TheReportsIcon,
        TheAccountingIcon,
        TheUsersIcon,
        TheHelpIcon,
        TheHomeIcon,
    },
    mixins: [mixins],
    methods: {
        handleClick(path) {
            this.$router.replace(path);
        },
    },
    computed: {
        hasError() {
            const status = this.$store.getters.status;
            return status.error;
        },
        loggedInUser() {
            if (this.isLoggedIn)
                return this.$store.getters["customer/userName"];
            else return "";
        },
        customerName() {
            if (this.isLoggedIn)
                return this.$store.getters["customer/customerName"];
            else return "";
        },
        isLoggedIn() {
            return this.$store.getters["customer/isLoggedIn"];
        },
        custEditLink() {
            const custId = this.$store.getters["customer/custId"];
            return `/customer/edit/${custId}`;
        },
        lastLoggedIn() {
            return this.$store.getters["customer/lastLoggedIn"];
        },
    },
};
</script>

<style></style>
