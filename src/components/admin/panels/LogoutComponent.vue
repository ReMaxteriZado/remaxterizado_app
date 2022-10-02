<template>
    <div
        class="cursor-pointer close-session d-flex align-items-center justify-content-center gap-2 p-3 p-ripple"
        v-ripple
        @click="logout()"
    >
        <i class="pi pi-power-off"></i>
        Cerrar sesión
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    methods: {
        ...mapActions(["logout"]),
    },
};
</script>

<style lang="scss" scoped>

.close-session {
    background-color: white;
    width: 100%;
    height: 100%;
    color: #666;
    position: relative;
    transition: $transition;

    &:hover {
        background-color: $secondary;
        color: white;

        &::after {
            opacity: 0;
        }
    }

    &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 2px;
        height: 60%;
        background-color: lightgray;
        transition: $transition;
    }
}
</style>
