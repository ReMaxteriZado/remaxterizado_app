<template>
  <div class="sidebar d-lg-none">
    <div v-if="showSidebar" @click="toggleSidebar(false)" class="overlay"></div>
    <div
      class="sidebar-content d-lg-none bg-secondary text-white p-3"
      :class="[showSidebar ? 'show' : '']"
    >
      <div
        class="h-100 d-flex flex-column align-items-end justify-content-between gap-3"
      >
        <div class="bg-white rounded w-100 text-secondary text-center py-2">
          <h3 class="mb-0">Alejandro Espino</h3>
        </div>
        <div>
          <div
            v-for="(link, index) in links"
            :key="index"
            class="w-100 text-end text-white mt-3"
          >
            <a
              @click="toggleSidebar(false)"
              :href="`#${link.name}`"
              class="text-white h3"
              >{{ link.text }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      links: [
        {
          name: "last-projects",
          text: "Last projects",
        },
        {
          name: "overview",
          text: "Overview",
        },
      ],
    };
  },
  computed: {
    ...mapState(["showSidebar"]),
  },
  methods: {
    ...mapMutations(["toggleSidebar"]),
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 4;
    touch-action: none;
  }

  .sidebar-content {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    width: 30rem;
    max-width: 80vw;
    transform: translateX(100%);
    transition: $transition;
    touch-action: none;

    a {
      text-decoration: none;
    }

    &.show {
      transform: translateX(0);
    }
  }
}
</style>
