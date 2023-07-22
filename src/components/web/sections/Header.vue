<template>
  <div
    class="header d-flex flex-column justify-content-center align-items-start"
  >
    <h1 :data-aos="animation" :data-aos-duration="duration">Frontend</h1>
    <h1
      :data-aos="animation"
      :data-aos-duration="duration"
      data-aos-delay="200"
    >
      website
    </h1>
    <div
      class="d-flex align-items-center gap-4"
      :data-aos="animation"
      :data-aos-duration="duration"
      data-aos-delay="400"
    >
      <p class="mb-0">
        Welcome to my portolio with information about me, my skills and some
        projects
      </p>
      <h1>Developer</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animation: "fade-up",
      duration: 800,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 100vh;

  h1 {
    font-weight: 500;
    font-size: 10rem;
    line-height: 10rem;
    text-transform: uppercase;
  }

  p {
    max-width: 50vw;
    text-transform: uppercase;
    width: 20rem;
  }
}
</style>
