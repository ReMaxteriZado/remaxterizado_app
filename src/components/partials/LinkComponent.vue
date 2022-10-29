<template>
    <router-link
        :to="item.href"
        class="link d-flex align-items-center py-3 gap-2 p-ripple"
        v-ripple
    >
        <p class="custom-line-heigth mb-0">
            {{ item.label }}
        </p></router-link
    >
</template>

<script>
export default {
    props: ["item"],
};
</script>

<style lang="scss" scoped>
.link {
    text-decoration: none;
    transition: $transition;
    color: #666;
    font-weight: bold;

    .custom-line-heigth {
        line-height: 24px;
    }

    i {
        line-height: 24px;
        transform: translateY(-1px);
    }

    &.router-link-active {
        background-color: $secondary;
        color: white;
    }

    &:hover {
        background-color: rgba($secondary, 0.7);
        color: white;
    }
}
</style>
