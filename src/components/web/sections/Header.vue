<template>
	<div class="container">
		<div class="w-100 group d-flex justify-content-end flex-column">
			<div class="image rounded"></div>
			<div
				v-if="currentText != ''"
				class="name rounded px-4 py-2 bg-secondary text-white text-uppercase"
				:class="{ animate: currentText.length == text.length }"
			>
				<div class="main-text">{{ currentText }}</div>
				<div class="secondary-text">
					Focused on <span class="text-primary">Frontend</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				text: "Software Developer",
				currentText: "",
			};
		},
		mounted() {
			setTimeout(() => {
				this.typeWriter();
			}, 1000);

			this.trackMouse();
		},
		methods: {
			typeWriter() {
				if (this.currentText.length < this.text.length) {
					this.currentText = this.text.slice(0, this.currentText.length + 1);

					const random = Math.random() * 100 + 50;
					setTimeout(this.typeWriter, random);
				}
			},
			trackMouse() {
				document.addEventListener("mousemove", (e) => {
					const x = e.clientX;
					const y = e.clientY;

					this.animate(".name", x, y);
				});
			},
			animate(className, x, y) {
				const element = document.querySelector(className);

				const elementRect = element.getBoundingClientRect();

				const xAngle = (elementRect.top - y) / 50;
				const yAngle = ((elementRect.left - x) / 120) * -1;

				element.style.transform = `perspective(500px) rotateX(${xAngle}deg) rotateY(${yAngle}deg) translateY(-50%)`;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.group {
		position: relative;

		.image {
			width: 80%;
			background-image: url("@/assets/images/header.jpeg");
			background-size: cover;
			background-position: center;
			aspect-ratio: 4/3;
			transition: $transition;
			animation: animate 1s ease-out forwards;

			@keyframes animate {
				from {
					transform: translateX(80px);
					opacity: 0;
				}

				to {
					transform: translateX(0);
					opacity: 1;
				}
			}
		}

		.name {
			position: absolute;
			top: 50%;
			left: -10%;
			transform: translateY(-50%);
			white-space: nowrap;
			font-size: 3rem;
			font-weight: bold;
			box-shadow: $smooth-box-shadow;
			overflow: hidden;
			cursor: default;

			.main-text {
				transition: $transition;
			}

			.secondary-text {
				position: absolute;
				top: 120%;
				left: 50%;
				transform: translateX(-50%) translateY(-50%);
				transition: $transition;
			}

			&.animate {
				&:hover {
					.main-text {
						transform: translateY(-100px);
					}

					.secondary-text {
						top: 50%;
					}
				}
			}
		}
	}

	@media (min-width: $mobile-min-width) and (max-width: $mobile-max-width) {
		.container {
			padding: 0;

			.group {
				.image {
					position: relative;
					width: 100%;
					aspect-ratio: 16/9;
					border-radius: 0 !important;
				}

				.name {
					position: relative;
					transform: none;
					left: auto;
					white-space: inherit;
					border-radius: 0 !important;

					.main-text {
						font-size: 1.8rem;
					}

					.secondary-text {
						position: relative;
						top: auto;
						left: auto;
						transform: none;
						font-size: 1.5rem;
					}
				}
			}
		}
	}
</style>
