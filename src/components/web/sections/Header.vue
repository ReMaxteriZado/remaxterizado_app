<template>
	<div class="w-100 group">
		<div class="image"></div>
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
		<div class="waves">
			<div class="bottom-bg"></div>
			<svg
				v-for="n in 3"
				:key="n"
				width="100%"
				height="100%"
				viewBox="0 0 1000 1000"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="none"
				overflow="auto"
				shape-rendering="auto"
				fill="#ffffff"
			>
				<defs>
					<path
						id="wavepath"
						d="M 0 2000 0 500 Q 123 360 246 500 t 246 0 246 0 246 0 246 0 246 0 246 0  v1000 z"
					/>
					<path id="motionpath" d="M -492 0 0 0" />
				</defs>
				<g>
					<use xlink:href="#wavepath" y="125" fill="#041525">
						<animateMotion :dur="n * 5.3 + 's'" repeatCount="indefinite">
							<mpath xlink:href="#motionpath" />
						</animateMotion>
					</use>
				</g>
			</svg>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				text: "FullStack Developer",
				currentText: "",
			};
		},
		mounted() {
			setTimeout(() => {
				this.typeWriter();
			}, 1000);

			if (!("ontouchstart" in document.documentElement)) {
				this.trackMouse();
			}
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

				if (element) {
					const elementRect = element.getBoundingClientRect();

					const xAngle = (elementRect.top - y) / 50;
					const yAngle = ((elementRect.left - x) / 120) * -1;

					element.style.transform = `perspective(500px) rotateX(${xAngle}deg) rotateY(${yAngle}deg) translateY(-50%)`;
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.group {
		position: relative;

		.image {
			width: 100%;
			height: 100vh;
			background-image: url("@/assets/images/header.jpeg");
			background-size: cover;
			background-position: center;
			transition: $transition;
			animation: animate 0.5s ease-out forwards;
			position: relative;

			&::after {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.3);
			}

			@keyframes animate {
				from {
					transform: translateY(80px);
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
			left: 10%;
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

		.waves {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 15rem;

			svg {
				opacity: 0.5;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
			}

			.bottom-bg {
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 10rem;
				background: linear-gradient(0deg, $secondary 0%, rgba(0, 0, 0, 0) 100%);
			}
		}
	}

	@media (min-width: $mobile-min-width) and (max-width: $large-tablet-max-width) {
		.group {
			.name {
				left: 50%;
				transform: translateX(-50%) scale(0.9);

				.main-text {
					font-size: 1.8rem;
				}

				.secondary-text {
					position: relative;
					text-align: center;
					top: auto;
					left: auto;
					transform: translateY(-50%);
					transition: $transition;
					font-size: 1.5rem;
					opacity: 0;
				}

				&.animate {
					.secondary-text {
						transform: translateY(0%);
						opacity: 1;
					}
					&:hover {
						.main-text {
							transform: none;
						}

						.secondary-text {
							top: auto;
						}
					}
				}
			}

			.waves {
				height: 10rem;

				.bottom-bg {
					height: 5rem;
				}
			}
		}
	}
</style>
