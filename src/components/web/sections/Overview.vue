<template>
  <div class="overview row">
    <div class="col-12 col-lg-4">
      <h2
        class="title text-uppercase"
        data-aos="fade-right"
        data-aos-duration="800"
      >
        Overview
      </h2>
    </div>
    <div class="col-12 col-lg-8">
      <div class="d-flex flex-column gap-3">
        <!-- Technologies -->
        <div
          class="accordion-section pb-3"
          :data-aos="animation"
          :data-aos-duration="duration"
        >
          <!-- Accordion button -->
          <div
            class="accordion d-flex justify-content-between align-items-center cursor-pointer w-100"
          >
            <div class="title">Technologies</div>
            <div class="icon d-flex align-items-center justify-content-center">
              <span>
                <i class="fa fa-chevron-right"></i>
              </span>
            </div>
          </div>

          <!-- Accordion content -->
          <div class="panel skills d-flex flex-wrap gap-3">
            <div v-for="skill in skills" :key="skill">
              <div
                class="image-container d-flex justify-content-center align-items-center rounded p-2"
                :style="{ backgroundColor: skill.bgColor }"
              >
                <img
                  :src="require(`@/assets/images/skills/${skill.img}`)"
                  :alt="skill.label"
                  width="25"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Experience -->
        <div
          class="accordion-section pb-3"
          :data-aos="animation"
          :data-aos-duration="duration"
          data-aos-delay="200"
        >
          <!-- Accordion button -->
          <div
            class="accordion d-flex justify-content-between align-items-center cursor-pointer w-100"
          >
            <div class="title">Experience</div>
            <div class="icon d-flex align-items-center justify-content-center">
              <span>
                <i class="fa fa-chevron-right"></i>
              </span>
            </div>
          </div>

          <!-- Accordion content -->
          <div class="panel">
            <div
              v-for="(experience, index) in experiences"
              :key="index"
              :class="[index == 0 ? 'mt-3' : 'mt-5']"
            >
              <div class="h5">
                <b>{{ experience.title }}</b> | {{ experience.period }}
              </div>

              <p class="mb-0 description" v-html="experience.description"></p>
              <a :href="experience.company_url" target="_blank" class="fw-bold"
                >Company website
              </a>
            </div>
          </div>
        </div>

        <!-- About me -->
        <div
          class="accordion-section pb-3"
          :data-aos="animation"
          :data-aos-duration="duration"
          data-aos-delay="400"
        >
          <!-- Accordion button -->
          <div
            class="accordion d-flex justify-content-between align-items-center cursor-pointer w-100"
          >
            <div class="title">About me</div>
            <div class="icon d-flex align-items-center justify-content-center">
              <span>
                <i class="fa fa-chevron-right"></i>
              </span>
            </div>
          </div>

          <!-- Accordion content -->
          <div class="panel">
            <p>
              Full Stack Programmer with advanced knowledge in VueJS, Laravel
              and PHP among others. I am specialized in Front-end, responsive
              and animations, and I would like to focus my career in this
              direction. career in this direction.
            </p>
            <p class="mb-0">
              I consider myself a responsible, hardworking and eager to learn
              person. to learn. With B1 level of English and eager to keep
              improving.
            </p>
          </div>
        </div>

        <!-- Repository -->
        <div
          class="accordion-section pb-3"
          :data-aos="animation"
          :data-aos-duration="duration"
          data-aos-delay="600"
        >
          <!-- Accordion button -->
          <div
            class="accordion d-flex justify-content-between align-items-center cursor-pointer w-100"
          >
            <div class="title">Repository</div>
            <div class="icon d-flex align-items-center justify-content-center">
              <span>
                <i class="fa fa-chevron-right"></i>
              </span>
            </div>
          </div>

          <!-- Accordion content -->
          <div class="panel">
            <p>
              You can check by yourself and with no filters, all the code I have
              made to create this whole website. Even a back panel designed from
              scratch to store some of my links of interest, code blocks, ...
            </p>
            <p>
              From my very first day at work, I have learned all my knowledge
              for my own. The code that you can see has been totally developed
              by myself.
            </p>
            <div class="d-flex gap-4">
              <a
                href="https://github.com/ReMaxteriZado/remaxterizado_app"
                target="_blank"
                >Frontend repository</a
              >
              <a
                href="https://github.com/ReMaxteriZado/remaxterizado_api"
                target="_blank"
                >Backend repository</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      duration: 800,
      skills: [
        {
          label: "Vue",
          img: "vue.png",
          bgColor: "#41b883",
        },
        {
          label: "Laravel",
          img: "laravel.png",
          bgColor: "#eb4d43",
        },
        {
          label: "JavaScript",
          img: "js.png",
          bgColor: "#f6a81d",
        },
        {
          label: "PHP",
          img: "php.png",
          bgColor: "#6180b6",
        },
        {
          label: "SCSS",
          img: "sass.png",
          bgColor: "#c76395",
        },
        {
          label: "CSS3",
          img: "css.png",
          bgColor: "#3595cf",
        },
        {
          label: "JQuery",
          img: "jquery.png",
          bgColor: "#1163a4",
        },
        {
          label: "GIT",
          img: "git.png",
          bgColor: "#e84d31",
        },
        {
          label: "HTML5",
          img: "html5.png",
          bgColor: "#e96228",
        },
        {
          label: "SQL",
          img: "sql.png",
          bgColor: "#d88d28",
        },
        {
          label: "Android",
          img: "android.png",
          bgColor: "#3bd481",
        },
      ],
      experiences: [
        {
          title: "Tca-tik",
          company_url: "https://tcatik.com/",
          period: "2020 May - 2022 June",
          description: `<p>Two years of experience in the development of web pages and business management
						and business management applications for different clients, using different languages and technologies
						languages and technologies according to the needs of each project.</p>
						<p>In these years I worked as lead developer on more than 10 projects, and helped with many others.
							with many others</p>`,
        },
        {
          title: "Occam",
          company_url: "https://www.occamagenciadigital.com/",
          period: "2022 June - Actuality",
          description: `<p>Lead developer of all the company's web projects, whether they are web pages, administration panels or
						web pages, administration panels or APIs for mobile applications.</p>
						<p>I have created numerous projects as a sole developer, the largest of them being 
							an ERP with more than 100 people working on it every day.</p>`,
        },
      ],
    };
  },
  methods: {
    loadAccordion() {
      var acc = document.getElementsByClassName("accordion");
      var i;

      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
          this.classList.toggle("active");

          var panel = this.nextElementSibling;

          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
        });
      }
    },
  },
  computed: {
    animation() {
      if (window.innerWidth >= 768) {
        return "fade-left";
      } else {
        return "fade-up";
      }
    },
  },
  mounted() {
    this.loadAccordion();
  },
};
</script>

<style lang="scss" scoped>
.overview {
  margin-top: 10rem;

  .title {
    font-size: 3.5rem;
    text-transform: uppercase;
  }

  .accordion-section {
    border-bottom: 1px solid lightgrey;

    .accordion {
      font-size: 15px;
      transition: 0.4s;

      .title {
        font-size: 1.5rem;
        text-transform: uppercase;
      }

      .icon {
        width: 3rem;
        height: 3rem;
        background-color: rgb(220, 220, 220);
        border-radius: 100%;
        transition: $transition;
        opacity: 0.5;

        span {
          transition: $transition;
        }
      }

      &:hover {
        .icon {
          opacity: 1;
        }
      }

      &.active {
        .icon {
          span {
            transform: rotate(90deg);
          }
        }
      }
    }

    .panel {
      max-height: 0;
      overflow: hidden;
      transition: $transition;

      a {
        text-decoration: none;
      }
    }
  }

  .skills {
    gap: 2rem;

    .custom-badge {
      background-color: white;
      color: $secondary;
      transition: $transition;
      cursor: default;
      box-shadow: $smooth-box-shadow;
      border-radius: $border-radius;
      position: relative;

      .image-container {
        width: 3rem;
        height: 3rem;
        position: absolute;
        top: -1rem;
        left: -1rem;
        overflow: hidden;
        transition: $transition;
      }

      &:hover {
        transform: translate(2px, 2px);

        .image-container {
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }

  @media (min-width: $tablet-min-width) and (max-width: $tablet-max-width) {
    margin-top: 5rem;

    .title {
      font-size: 2.5rem;
    }
  }
}
</style>
