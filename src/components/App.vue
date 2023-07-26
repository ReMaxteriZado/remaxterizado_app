<template>
	<div id="app">
		<router-view></router-view>
		<div
			class="loading loading-1 bg-secondary d-flex align-items-center justify-content-center"
			:class="{ hide: hide1 }"
		>
			<img src="@/assets/images/logotipo-sin-fondo.png" width="300" />
		</div>
		<div class="loading loading-2 bg-primary" :class="{ hide: hide2 }"></div>
		<div class="loading loading-3 bg-dark" :class="{ hide: hide3 }"></div>
	</div>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		data() {
			return {
				hide1: false,
				hide2: false,
				hide3: false,
			};
		},
		computed: {
			...mapState(["userLogged"]),
		},
		methods: {
			// prevent scroll until the page is loaded
			preventScroll() {
				document.body.style.overflow = "hidden";
			},
			// allow scroll when the page is loaded
			allowScroll() {
				document.body.style.overflow = "auto";
			},
		},
		mounted() {
			this.preventScroll();

			setTimeout(() => {
				this.hide1 = true;
			}, 1500);

			setTimeout(() => {
				this.hide2 = true;
			}, 1800);

			setTimeout(() => {
				this.hide3 = true;

				this.allowScroll();
			}, 2000);
		},
	};
</script>

<style lang="scss" scoped>
	.loading {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		&-3 {
			z-index: 98;
		}

		&-2 {
			z-index: 99;
		}

		&-1 {
			z-index: 100;
		}

		&.hide {
			animation: hide 1s ease-out forwards;
		}

		@keyframes hide {
			to {
				transform: translateY(100%);
			}
		}

		img {
			animation: blink 0.8s ease infinite alternate;
			max-width: 40vw;

			@keyframes blink {
				from {
					opacity: 1;
				}

				to {
					opacity: 0.3;
				}
			}
		}
	}
</style>
