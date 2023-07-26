<template>
	<div
		class="custom-navbar d-none d-lg-block position-fixed text-uppercase"
		:class="{ display: display }"
	>
		<div class="row justify-content-center">
			<div class="col-12 col-md-10 d-flex align-items-center py-4">
				<!-- Main link -->
				<div class="col-6 d-flex">
					<a class="text-secondary" href="#">
						<div class="link cursor-hover bg-white px-3 py-2 rounded h5 mb-0">
							Alejandro Espino
						</div>
					</a>
				</div>

				<!-- Links -->
				<div class="col-6 d-flex justify-content-end">
					<div class="links d-flex gap-3">
						<div class="link-line d-none"></div>
						<a
							v-for="(link, index) in links"
							:key="index"
							@click="updateCurrent(index)"
							:href="`#${link.name}`"
						>
							<div
								class="link cursor-hover bg-white text-secondary px-3 py-2 rounded h5 mb-0"
							>
								{{ link.text }}
							</div>
						</a>
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
				display: false,
				current: 0,
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
		methods: {
			updateCurrent(index) {
				this.current = index;

				const linkLine = document.querySelector(".link-line");
				const links = document.querySelectorAll(".links .link");
				const link = links[index];

				linkLine.classList.remove("d-none");

				linkLine.style.left = `${link.offsetLeft}px`;
				linkLine.style.width = `${link.offsetWidth}px`;
			},
			handleScroll() {
				this.display = window.scrollY > 0;
			},
		},
		created() {
			window.addEventListener("scroll", () => {
				this.handleScroll();
			});
		},
	};
</script>

<style lang="scss" scoped>
	.custom-navbar {
		z-index: 10;
		top: 0;
		left: 0;
		right: 0;
		transition: $transition;
		transition-duration: 0.7s;

		&.display {
			box-shadow: 0 8px 32px 0 rgba($secondary, 0.37);
			backdrop-filter: blur(4px);
		}

		.links {
			position: relative;

			.link-line {
				position: absolute;
				bottom: -10px;
				left: 0;
				width: 20px;
				height: 2px;
				background-color: $primary;
				transition: $transition;
			}
		}

		.link {
			letter-spacing: 2px;
			transition: $transition;

			&:hover {
				background-color: darken(white, 8%) !important;
			}
		}

		a {
			text-decoration: none;
		}
	}
</style>
