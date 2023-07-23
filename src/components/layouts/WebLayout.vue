<template>
  <div class="web">
    <Sidebar />
    <Navbar />
    <div class="row justify-content-center mx-0">
      <div class="col-12 col-md-10">
        <Header />
        <Projects id="last-projects" />
        <Overview id="overview" />
        <Footer id="footer" />
      </div>
    </div>
    <ToggleSidebarButton />
  </div>
</template>

<script>
// Panels
import Sidebar from "@/components/web/sections/Sidebar.vue";
import Navbar from "@/components/web/sections/Navbar.vue";
import ToggleSidebarButton from "@/components/web/partials/ToggleSidebarButton.vue";

// Sections
import Header from "@/components/web/sections/Header.vue";
import Projects from "@/components/web/sections/Projects.vue";
import Overview from "@/components/web/sections/Overview.vue";
import Footer from "@/components/web/sections/Footer.vue";

export default {
  components: {
    // Panels
    Sidebar,
    Navbar,
    ToggleSidebarButton,

    // Sections
    Header,
    Projects,
    Overview,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.web {
  .footer {
    margin-top: 8rem;
  }

  @media (min-width: $mobile-min-width) and (max-width: $large-tablet-max-width) {
    .footer {
      margin-top: 4rem;
    }
  }
}
</style>
