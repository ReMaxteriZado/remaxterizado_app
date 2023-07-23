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
      class="d-none d-lg-flex align-items-center gap-4"
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
    <div class="d-lg-none">
      <h1
        :data-aos="animation"
        :data-aos-duration="duration"
        data-aos-delay="400"
      >
        Developer
      </h1>
      <p
        class="mb-0"
        :data-aos="animation"
        :data-aos-duration="duration"
        data-aos-delay="600"
      >
        Welcome to my portolio with information about me, my skills and some
        projects
      </p>
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
  mounted() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

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

  @media only screen and (min-width: $mobile-min-width) and (max-width: $mobile-max-width) {
    h1 {
      font-size: 3rem;
      line-height: 3rem;
    }

    p {
      max-width: 80vw;
    }
  }

  @media (min-width: $tablet-min-width) and (max-width: $tablet-max-width) {
    h1 {
      font-size: 5rem;
      line-height: 5rem;
    }
  }

  @media (min-width: $large-tablet-min-width) and (max-width: $large-tablet-max-width) {
    h1 {
      font-size: 5rem;
      line-height: 5rem;
    }
  }
}
</style>
