<template>
	<footer class="footer">
		<div class="d-flex justify-content-between align-items-center">
			<div
				class="back-top-section"
				data-aos="fade-right"
				:data-aos-duration="duration"
				data-aos-offset="-100"
			>
				<div
					class="back-top cursor-hover d-flex align-items-center gap-3 px-3 py-2"
					@click="goTop"
				>
					<div class="h5 mb-0">
						{{ $t("footer.back_to_top") }}
					</div>
					<i class="fa fa-chevron-up small"></i>
				</div>
			</div>
			<div class="d-none d-lg-flex align-items-center gap-3">
				<div
					class="language cursor-hover px-3 py-1 border-dark rounded"
					:class="{ 'bg-primary text-white': english }"
					@click="changeLanguage('en')"
				>
					EN
				</div>
				<div
					class="language cursor-hover px-3 py-1 border-dark rounded"
					@click="changeLanguage('es')"
					:class="{ 'bg-primary text-white': spanish }"
				>
					ES
				</div>
			</div>
			<div class="icons d-flex align-items-center gap-4">
				<a
					class="linkedin cursor-hover"
					href="https://www.linkedin.com/in/aesppal/"
					target="_blank"
				>
					<img
						src="@/assets/images/footer/linkedin.png"
						width="25"
						:data-aos="animation"
						:data-aos-duration="duration"
						data-aos-offset="-100"
					/>
				</a>

				<a
					class="cursor-hover"
					href="mailto:alejandro.espinopalma@gmail.com"
					target="_blank"
				>
					<img
						src="@/assets/images/footer/gmail.png"
						width="30"
						:data-aos="animation"
						:data-aos-duration="duration"
						data-aos-offset="-100"
						data-aos-delay="200"
					/>
				</a>
				<a
					class="cursor-hover"
					a
					href="https://github.com/ReMaxteriZado"
					target="_blank"
				>
					<img
						src="@/assets/images/footer/github.png"
						width="30"
						:data-aos="animation"
						:data-aos-duration="duration"
						data-aos-offset="-100"
						data-aos-delay="400"
					/>
				</a>
				<a
					class="cursor-hover"
					href="https://wa.me/+34616974171"
					target="_blank"
				>
					<img
						src="@/assets/images/footer/whatsapp.png"
						width="30"
						:data-aos="animation"
						:data-aos-duration="duration"
						data-aos-offset="-100"
						data-aos-delay="600"
					/>
				</a>
			</div>
		</div>
	</footer>
</template>

<script>
	export default {
		data() {
			return {
				animation: "fade-up",
				duration: 800,
			};
		},
		methods: {
			goTop() {
				window.scrollTo(0, 0);
			},
			changeLanguage(language) {
				this.$i18n.locale = language;
			},
		},
		computed: {
			english() {
				return this.$i18n.locale === "en";
			},
			spanish() {
				return this.$i18n.locale === "es";
			},
		},
	};
</script>

<style lang="scss" scoped>
	.footer {
		padding-bottom: 5rem;

		.back-top {
			transition: $transition;
			border-radius: 10rem;

			&:hover {
				background-color: lightgray;
			}
		}

		.language {
			transition: $transition;
			border-radius: 10rem;

			&:hover {
				background-color: lightgray;
			}
		}

		.icons {
			filter: invert(70%);

			.linkedin {
				transform: translateY(-2px);
			}
		}
	}
</style>
