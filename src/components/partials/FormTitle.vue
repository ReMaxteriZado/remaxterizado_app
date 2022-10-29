<template>
    <div class="text-primary d-flex flex-wrap gap-3 align-items-center">
        <h3>{{ title }}</h3>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
h3 {
    margin-bottom: 0;
}
</style>
