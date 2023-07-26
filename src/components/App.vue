<template>
	<div id="app">
		<router-view></router-view>
		<div
			class="d-flex align-items-center justify-content-center loading"
			:class="{ hide: hide }"
		>
			<img src="@/assets/images/logotipo-sin-fondo.png" width="300" />
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		data() {
			return {
				hide: false,
			};
		},
		computed: {
			...mapState(["userLogged"]),
		},
		mounted() {
			this.hide = true;
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
		background-image: url("@/assets/images/login-background.jpg");
		background-size: cover;
		background-position: center;
		z-index: 100;

		&.hide {
			animation: hide 1s ease-out forwards;

			@keyframes hide {
				from {
					opacity: 1;
				}

				to {
					opacity: 0;
					visibility: hidden;
				}
			}
		}

		img {
			animation: blink 1s ease infinite alternate;

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
