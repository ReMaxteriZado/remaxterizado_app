<template>
  <div
    v-if="data != null"
    class="text-truncate"
    style="max-width: 200px"
    v-tooltip.bottom="data"
  >
    {{ data }}
  </div>
  <div v-else class="text-muted">Sin información</div>
</template>

<script>
export default {
  props: {
    data: {
      required: true,
    },
  },
};
</script>
