<template>
    <div class="a-container">
        <router-link v-if="!isSection" @mouseover="mouseOver" @mouseleave="mouseLeave" :to="href">{{text}}</router-link>
        <a v-else @mouseover="mouseOver" @mouseleave="mouseLeave" :href="href">{{text}}</a>
        <div class="underline" :class="{show: showUnderline}"></div>
    </div>
</template>

<script>

export default {
    props: {
        href: String,
        isSection: Boolean,
        text: String
    },
    data() {
        return {
            showUnderline: false
        }
    },
    methods: {
        mouseOver() {
            this.showUnderline = true
        },
        mouseLeave() {
            this.showUnderline = false
        }
    }
}
</script>

<style lang="scss" scoped>
    .a-container {
        position: relative;
        
        a {
            color: $primary;
            text-decoration: none;
        }

        .underline {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: $primary;
            transition: all .3s ease;

            &.show {
                width: 100%;
            }
        }
    }
</style>