<template>
    <h5>{{ title }}</h5>
</template>

<script>
export default {
    props: ["title"],
};
</script>

<style lang="scss" scoped>
h5 {
    color: $primary;
}
</style>
