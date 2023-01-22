<template>
  <div
    class="cursor-pointer close-session d-flex align-items-center justify-content-center h-100 gap-2 p-ripple"
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
}
</style>
