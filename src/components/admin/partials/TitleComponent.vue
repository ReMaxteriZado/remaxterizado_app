<template>
    <h3>{{ title }}</h3>
</template>

<script>
export default {
    props: ["title"],
};
</script>

<style lang="scss" scoped>
h3 {
    color: $primary;
    margin-bottom: 0;
}
</style>
