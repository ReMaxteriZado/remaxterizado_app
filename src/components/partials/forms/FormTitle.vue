<template>
  <div class="text-primary d-flex flex-wrap gap-3 align-items-center">
    <h3 class="mb-0">{{ title }}</h3>
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
