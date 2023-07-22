<template>
  <div class="projects">
    <div
      data-aos="fade-right"
      data-aos-duration="800"
      class="d-flex align-items-center gap-4 mb-5"
    >
      <h2>Last projects</h2>
      <div class="line"></div>
    </div>
    <div class="d-flex gap-2">
      <a
        v-for="(project, index) in projects"
        :key="index"
        :href="project.url"
        target="_blank"
        class="project-container"
      >
        <div
          class="project w-100 h-100"
          :style="{
            backgroundImage:
              'url(' +
              require(`@/assets/images/projects/${project.background}`) +
              ')',
          }"
        >
          <img
            :src="require(`@/assets/images/projects/${project.image}`)"
            :style="{ width: project.width }"
          />
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        {
          name: "Sergio Espino",
          image: "sergio.png",
          background: "sergio-background.jpg",
          url: "https://webfoliosergioespino.com/",
          width: "10rem",
        },
        {
          name: "El Reto de Kike",
          image: "erdk.png",
          background: "erdk-background.jpg",
          url: "https://app.elretodekike.com/",
          width: "12rem",
        },
        {
          name: "ReMaxteriZado",
          image: "remaxterizado.png",
          background: "remaxterizado-background.jpg",
          url: "https://www.remaxterizado.es/login",
          width: "10rem",
        },
        {
          name: "Obots",
          image: "obots.png",
          background: "obots-background.jpg",
          url: "https://www.obots.io/",
          width: "13rem",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.projects {
  .line {
    width: 10rem;
    height: 2px;
    background-color: $dark;
    transform: translateY(-2px);
  }

  .project-container {
    flex-grow: 1;
    transition: $transition;
    transition-duration: 0.7s;
    height: 35rem;

    .project {
      background-position: center;
      background-size: cover;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(#000000, 0.5);
      }

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 5;
      }
    }

    &:hover {
      flex-grow: 1.5;
    }
  }
}
</style>
