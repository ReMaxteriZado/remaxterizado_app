<template>
    <div v-on:click="scrollToTop" :class="{show: isVisible}" id="floating-button">
        <font-awesome-icon icon="chevron-up" />
    </div>
</template>

<script>
export default {
    name: 'FloatingButtonComponent',
    created () {
        window.addEventListener('scroll', this.handleScroll);
    },
    data() {
        return {
            isVisible: false
        }
    },
    methods: {
        handleScroll() {
            if(window.scrollY > 100) {
                this.isVisible = true;
            } else {
                this.isVisible = false;
            }
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    },
    mounted() {
        this.handleScroll();
    }
}
</script>

<style lang="scss" scoped>
    #floating-button {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        background-color: $primary;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        padding: 1rem;
        font-size: 1.5rem;
        transition: all .3s ease;
        opacity: 0;
        visibility: hidden;

        &.show {
            opacity: 1;
            visibility: visible;
        }

        &:hover {
            background-color: darken($primary, 20%);
            transform: translateY(-5px);
            cursor: pointer;
        }
    }
</style>