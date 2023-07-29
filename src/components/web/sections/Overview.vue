<template>
	<div class="overview row">
		<div class="col-12 col-lg-4">
			<h2
				class="title text-uppercase"
				data-aos="fade-right"
				data-aos-duration="800"
			>
				{{ $t("overview.title") }}
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
						class="accordion cursor-hover d-flex justify-content-between align-items-center w-100"
					>
						<div class="title">{{ $t("overview.technologies") }}</div>
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
						class="accordion cursor-hover d-flex justify-content-between align-items-center w-100"
					>
						<div class="title">{{ $t("overview.experience") }}</div>
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
								<b>{{ experience.title }}</b> |
								{{ $t(`overview.company_${index + 1}.period`) }}
							</div>

							<p
								class="mb-0 description"
								v-html="$t(`overview.company_${index + 1}.description`)"
							></p>
							<a :href="experience.company_url" target="_blank" class="fw-bold"
								>Company's website
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
						class="accordion cursor-hover d-flex justify-content-between align-items-center w-100"
					>
						<div class="title">{{ $t("overview.about_me") }}</div>
						<div class="icon d-flex align-items-center justify-content-center">
							<span>
								<i class="fa fa-chevron-right"></i>
							</span>
						</div>
					</div>

					<!-- Accordion content -->
					<div class="panel">
						<p>
							{{ $t("overview.about_me_description_1") }}
						</p>
						<p class="mb-0">
							{{ $t("overview.about_me_description_2") }}
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
						class="accordion cursor-hover d-flex justify-content-between align-items-center w-100"
					>
						<div class="title">{{ $t("overview.repository") }}</div>
						<div class="icon d-flex align-items-center justify-content-center">
							<span>
								<i class="fa fa-chevron-right"></i>
							</span>
						</div>
					</div>

					<!-- Accordion content -->
					<div class="panel">
						<p>
							{{ $t("overview.repository_description_1") }}
						</p>
						<p>
							{{ $t("overview.repository_description_2") }}
						</p>
						<div class="d-flex gap-4">
							<a
								href="https://github.com/ReMaxteriZado/remaxterizado_app"
								target="_blank"
							>
								{{ $t("overview.frontend_repository") }}
							</a>
							<a
								href="https://github.com/ReMaxteriZado/remaxterizado_api"
								target="_blank"
								>{{ $t("overview.backend_repository") }}</a
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
					},
					{
						title: "Occam",
						company_url: "https://www.occamagenciadigital.com/",
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
