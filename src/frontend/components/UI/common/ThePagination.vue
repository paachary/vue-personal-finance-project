<template>
    <span class="d-flex justify-content-between align-items-center">
        <span class="d-flex align-items-center gap-3">
            <the-label forId="select" labelTitle="Show" class="f" />
            <span>
                <the-select
                    id="select"
                    name="select"
                    class="mb-2"
                    v-model="perPage"
                    @change="handleSelectedChange"
                >
                    <option value="+5" selected>5</option>
                    <option value="+20">20</option>
                    <option value="+50">50</option>
                    <option :value="totalRecords">All</option>
                </the-select>
            </span>
            <span> Total of {{ totalRecords }} records </span>
        </span>

        <span class="d-flex align-items-center gap-5">
            <the-icon
                @handleActions="changePage"
                action="0"
                icon="fa fa-angle-double-left fs-3"
                :style="computedstyleforLeft"
            >
            </the-icon>
            <the-icon
                @handleActions="changePage"
                action="-1"
                icon="fa fa-angle-left  fs-3"
                :style="computedstyleforLeft"
            >
            </the-icon>
            <span style="font-size: 20px">Page {{ page }} of {{ pages }}</span>
            <the-icon
                @handleActions="changePage"
                action="1"
                icon="fa fa-angle-right  fs-3"
                :style="computedstyleforRight"
            >
            </the-icon>
            <the-icon
                @handleActions="changePage"
                :action="pages"
                icon="fa fa-angle-double-right  fs-3 "
                :style="computedstyleforRight"
            >
            </the-icon>
        </span>
    </span>
</template>

<script>
import TheIcon from "./TheIcon.vue";
import TheLabel from "./TheLabel.vue";
import TheSelect from "./TheSelect.vue";

export default {
    components: { TheIcon, TheSelect, TheLabel },
    name: "ThePagination",
    props: ["totalRecords"],

    data() {
        return {
            disabledLeft: false,
            disabledRight: false,
            page: 1,
            perPage: 5,
        };
    },
    computed: {
        pages() {
            const remainder = this.totalRecords % this.perPage;

            if (remainder > 0) {
                return Math.floor(this.totalRecords / this.perPage) + 1;
            } else {
                return this.totalRecords / this.perPage;
            }
        },
        computedstyleforLeft() {
            if (this.disabledLeft) {
                return "color:#b7b7b7; cursor: default";
            } else return "color:#212529; cursor: pointer;";
        },
        computedstyleforRight() {
            if (this.disabledRight) return "color:#b7b7b7; cursor: default";
            return "color:#212529;cursor: pointer;";
        },
    },
    mounted() {
        this.disabledLeft = true;
        this.disabledRight = false;
    },
    methods: {
        handleSelectedChange() {
            this.changePage(0);
        },
        changePage(val) {
            switch (+val) {
                case 0:
                    this.page = 1;
                    this.disabledLeft = true;
                    this.disabledRight = false;
                    break;
                case -1:
                    this.page = this.page > 1 ? this.page - 1 : this.page;
                    if (this.page === 1) this.disabledLeft = true;
                    else this.disabledLeft = false;
                    this.disabledRight = false;
                    break;
                case 1:
                    this.page =
                        this.page < this.pages ? this.page + 1 : this.page;

                    if (this.page === this.pages) this.disabledRight = true;
                    else this.disabledRight = false;
                    this.disabledLeft = false;
                    break;
                case this.pages:
                    this.page = this.pages;
                    this.disabledRight = true;
                    this.disabledLeft = false;
                    break;
            }

            if (this.page === 1 && this.pages === 1) {
                this.disabledRight = true;
                this.disabledLeft = true;
            }

            this.$emit("pagination", {
                page: this.page,
                perPage: this.perPage,
            });
        },
    },
};
</script>

<style></style>
