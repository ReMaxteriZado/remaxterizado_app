<template>
	<div class="dot-container">
		<div @click="$parent.showDotContent(dot.dotNumber)" class="dot"></div>
		<div
			@click="$parent.showDotContent(dot.dotNumber)"
			class="dot-name border border-2 border-primary text-primary rounded px-3 py-1"
		>
			{{ dot.title }}
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			dot: {
				type: Object,
			},
		},
	};
</script>

<style lang="scss" scoped>
	.dot-container {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		animation: show-up 0.5s ease-out forwards;
		opacity: 0;

		.dot {
			height: 20px;
			width: 20px;
			background-color: white;
			border: 3px solid $primary;
			border-radius: 50%;
			cursor: pointer;
			transition: all 0.3s ease;
			position: relative;

			&::after {
				content: "";
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				height: 20px;
				width: 20px;
				border: 1px solid $primary;
				border-radius: 100%;
				animation: pulse 2.5s ease-out infinite;

				@keyframes pulse {
					0% {
						transform: translate(-50%, -50%) scale(1);
						opacity: 1;
					}

					100% {
						transform: translate(-50%, -50%) scale(1.6);
						opacity: 0;
					}
				}
			}

			&:hover {
				background-color: rgb(225, 225, 225);
			}
		}

		.dot-name {
			position: absolute;
			bottom: 50%;
			left: 50%;
			transform: translateX(-50%);
			text-align: center;
			white-space: nowrap;
			font-size: 1.2rem;
			font-weight: bold;
			transition: $transition;
			cursor: pointer;
			animation: show-up-name 1s ease-out forwards;
			opacity: 0;

			@keyframes show-up-name {
				100% {
					bottom: 140%;
					opacity: 1;
				}
			}

			&:hover {
				background-color: $primary;
				color: white !important;
			}
		}

		&.first-dot {
			left: calc(100% / 3);
			animation-delay: 0.8s;

			.dot-name {
				animation-delay: 0.8s;
			}
		}

		&.second-dot {
			left: calc((100% / 3) * 2);
			animation-delay: 1.5s;

			.dot-name {
				animation-delay: 1.5s;
			}
		}

		@keyframes show-up {
			100% {
				opacity: 1;
			}
		}
	}
</style>
