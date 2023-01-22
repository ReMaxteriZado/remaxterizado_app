<template>
    <div class="text-primary d-flex flex-wrap gap-3 align-items-center">
        <h5 class="mb-0">{{ title }}</h5>
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