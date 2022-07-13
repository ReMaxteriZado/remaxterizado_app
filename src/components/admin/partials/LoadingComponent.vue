<template>
    <div
        id="loading"
        :class="{ show: loading }"
        class="d-flex justify-content-center align-items-center"
    >
        <ProgressBar mode="indeterminate" />
    </div>
</template>

<script>
import ProgressBar from "primevue/progressbar";
import { mapState } from "vuex";

export default {
    components: {
        ProgressBar,
    },
    computed: {
        ...mapState(["loading"]),
    },
};
</script>

<style lang="scss" scoped>
#loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(#000000, 0.3);
    z-index: 9999;
    opacity: 0;
    visibility: hidden;
    transition: $transition;

    &.show {
        opacity: 1;
        visibility: visible;
    }
}

:deep(.p-progressbar) {
    background-color: rgba($primary, 0.2);
    height: 10px;
    width: 90vw;
    max-width: 500px;
}
</style>
