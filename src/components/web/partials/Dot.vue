<template>
	<div class="dot-container">
		<div class="dot" @click="$parent.showDotContent(dotNumber)"></div>
		<div class="dot-name text-secondary">{{ title }}</div>
		<div :class="{ show: showContent }" class="dot-content">
			<h3 class="bg-secondary text-white px-3 py-1 mb-0">
				<a
					class="text-white"
					:href="company_url"
					target="_blank"
					rel="noreferrer nofollow"
					>{{ company }}</a
				>
			</h3>
			<div class="p-3">
				<h5 class="text-primary">{{ role }}</h5>
				<p class="text-secondary">{{ period }}</p>
				<p class="text-secondary mb-0">{{ description }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		showContent: {
			type: Boolean,
			default: false,
		},
		dotNumber: {
			type: Number,
		},
		title: {
			type: String,
		},
		company: {
			type: String,
		},
		company_url: {
			type: String,
		},
		role: {
			type: String,
		},
		period: {
			type: String,
		},
		description: {
			type: String,
		},
	},
};
</script>

<style lang="scss" scoped>
.dot-container {
	position: absolute;
	top: 60%;
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

		&:hover {
			background-color: rgb(225, 225, 225);
		}
	}

	.dot-name {
		position: absolute;
		bottom: 120%;
		left: 50%;
		transform: translateX(-50%);
		width: 10rem;
		text-align: center;
		font-weight: bold;
	}

	.dot-content {
		position: absolute;
		top: 260%;
		left: 50%;
		transform: translateX(-50%);
		background-color: white;
		border-radius: 5px;
		box-shadow: $smooth-box-shadow;
		width: 20rem;
		overflow: hidden;
		opacity: 0;
		visibility: hidden;

		&.show {
			animation: fade-in 0.5s ease-out forwards;

			@keyframes fade-in {
				0% {
					opacity: 0;
					visibility: hidden;
				}
				100% {
					opacity: 1;
					visibility: visible;
					top: 200%;
				}
			}
		}

		a {
			text-decoration: none;
		}
	}

	&.first-dot {
		left: calc(100% / 3);
		animation-delay: 1s;
	}

	&.second-dot {
		left: calc((100% / 3) * 2);
		animation-delay: 1.5s;
	}

	@keyframes show-up {
		100% {
			opacity: 1;
			top: 50%;
		}
	}
}
</style>