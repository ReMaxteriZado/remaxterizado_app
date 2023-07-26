<template>
	<div class="web">
		<div class="cursor d-none d-md-block"></div>
		<div class="cursor2 d-none d-md-block"></div>

		<div class="background"></div>
		<div class="background"></div>
		<div class="background"></div>

		<Sidebar />
		<Navbar />
		<div class="row justify-content-center mx-0">
			<div class="content col-12 col-md-10">
				<Header />
				<Projects id="last-projects" class="padding-top" />
				<Overview id="overview" class="padding-top" />
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
		methods: {
			initMouse() {
				var cursor = document.querySelector(".cursor");
				var cursorinner = document.querySelector(".cursor2");
				var cursorHover = document.querySelectorAll(".cursor-hover");

				document.addEventListener("mousemove", function (e) {
					var x = e.clientX;
					var y = e.clientY;

					cursor.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
					cursorinner.style.left = x + "px";
					cursorinner.style.top = y + "px";
				});

				document.addEventListener("mousedown", function () {
					cursor.classList.add("mousedown");
					cursorinner.classList.add("mousedown");
				});

				document.addEventListener("mouseup", function () {
					cursor.classList.remove("mousedown");
					cursorinner.classList.remove("mousedown");
				});

				cursorHover.forEach((item) => {
					item.addEventListener("mouseover", () => {
						cursor.classList.add("hover");
					});

					item.addEventListener("mouseleave", () => {
						cursor.classList.remove("hover");
					});
				});
			},
			initParticles() {},
			preventRightClick() {
				document.addEventListener("contextmenu", (event) =>
					event.preventDefault()
				);
			},
			preventDevTools() {
				document.onkeydown = function (e) {
					if (
						e.keyCode == 123 ||
						(e.ctrlKey && e.shiftKey && e.keyCode == 73) ||
						(e.ctrlKey && e.shiftKey && e.keyCode == 74)
					) {
						return false;
					}
				};
			},
		},
		mounted() {
			this.initMouse();

			if (window.location.hostname != "localhost") {
				this.preventRightClick();
				this.preventDevTools();
			}
		},
	};
</script>

<style lang="scss" scoped>
	.web {
		.cursor {
			width: 40px;
			height: 40px;
			border-radius: 100%;
			border: 1px solid $primary;
			transition: all 200ms ease-out;
			position: fixed;
			pointer-events: none;
			transform: translate(calc(-50% + 15px), -50%);
			z-index: 95;

			&.hover {
				background-color: $primary;
				opacity: 0.5;
			}

			&.mousedown {
				width: 50px;
				height: 50px;
			}
		}

		.cursor2 {
			width: 10px;
			height: 10px;
			border-radius: 100%;
			background-color: $primary;
			opacity: 0.8;
			position: fixed;
			transform: translate(-50%, -50%);
			pointer-events: none;
			transition: width 0.3s, height 0.3s, opacity 0.3s;
			z-index: 95;

			&.mousedown {
				width: 50px;
				height: 50px;
			}
		}

		.background {
			position: fixed;
			top: 0;
			bottom: 0;
			left: -50%;
			right: -50%;
			animation: slide 15s ease-in-out infinite alternate;
			background-image: linear-gradient(-60deg, #eeeeee 50%, #bcbcbc 50%);
			opacity: 0.4;

			&:nth-of-type(2) {
				animation-direction: alternate-reverse;
				animation-duration: 24s;
			}

			&:nth-of-type(3) {
				animation-duration: 30s;
			}
		}

		@keyframes slide {
			0% {
				transform: translateX(-25%);
			}
			100% {
				transform: translateX(25%);
			}
		}

		.content {
			z-index: 5;
		}

		.padding-top {
			padding-top: 6rem;
		}

		.footer {
			margin-top: 8rem;
		}

		@media (min-width: $mobile-min-width) and (max-width: $large-tablet-max-width) {
			.padding-top {
				padding-top: 1rem;
			}

			.footer {
				margin-top: 4rem;
			}
		}
	}
</style>
