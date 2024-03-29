<template>
	<div id="admin-layout">
		<Toast />
		<ConfirmDialog />
		<Loading />

		<div
			class="sidebar-section d-flex flex-column justify-content-between"
			:class="[showSidebar ? 'sidebar-open' : '']"
		>
			<div>
				<Logo />
				<Sidebar />
			</div>
			<Logout class="d-md-none" />
		</div>

		<div class="top-bar-section">
			<TopBar />
		</div>

		<div class="content-section px-2 px-md-4 pb-2 pb-md-4">
			<router-view v-slot="{ Component }">
				<transition name="slide" mode="out-in">
					<component :is="Component" :key="$route.path" />
				</transition>
			</router-view>
		</div>

		<div class="logout-section d-none d-md-block">
			<Logout />
		</div>

		<div
			class="sidebar-overlay d-block d-md-none"
			:class="[showSidebar ? 'sidebar-open' : '']"
			@click="toggleSidebar(false)"
		></div>
	</div>
</template>

<script>
	import Logo from "@/components/panels/Logo.vue";
	import Sidebar from "@/components/panels/Sidebar.vue";
	import BottomBar from "@/components/panels/BottomBar.vue";
	import Logout from "@/components/panels/Logout.vue";
	import TopBar from "@/components/panels/TopBar.vue";
	import Loading from "@/components/partials/Loading.vue";

	import Toast from "primevue/toast";
	import ConfirmDialog from "primevue/confirmdialog";

	import { mapState, mapMutations, mapActions } from "vuex";

	export default {
		components: {
			Logo,
			Sidebar,
			Loading,
			TopBar,
			Toast,
			ConfirmDialog,
			BottomBar,
			Logout,
		},
		data() {
			return {};
		},
		computed: {
			...mapState([
				"errorToast",
				"successToast",
				"warningToast",
				"showSidebar",
				"userLogged",
			]),
		},
		methods: {
			...mapActions(["setFormAccessToken"]),
			...mapMutations([
				"changeSuccessToast",
				"changeErrorToast",
				"changeWarningToast",
				"toggleSidebar",
				"changeUserLogged",
			]),
		},
		mounted() {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);

			this.setFormAccessToken();
		},
		watch: {
			successToast() {
				if (this.successToast != null) {
					this.$toast.add({
						severity: "success",
						summary: "Acción realizada",
						detail:
							this.successToast == true
								? "Operación realizada con éxito"
								: this.successToast,
						life: 3000,
					});
				}

				this.changeSuccessToast(null);
			},
			errorToast() {
				if (this.errorToast != null) {
					this.$toast.add({
						severity: "error",
						summary: "Error",
						detail:
							this.errorToast == true
								? "Ha ocurrido un error"
								: this.errorToast,
						life: 3000,
					});
				}

				this.changeErrorToast(null);
			},
			warningToast() {
				if (this.warningToast != null) {
					this.$toast.add({
						severity: "warn",
						summary: "Advertencia",
						detail:
							this.warningToast == true
								? "Ha ocurrido un error"
								: this.warningToast,
						life: 3000,
					});
				}

				this.changeWarningToast(null);
			},
		},
	};
</script>

<style lang="scss" scoped>
	#admin-layout {
		height: 100vh;
		height: calc(var(--vh, 1vh) * 100);
		display: grid;
		grid-template-columns: 15.5% 1fr;
		grid-template-rows: fit-content(10rem) auto 3rem;
		grid-template-areas:
			"sidebar-section top-bar-section"
			"sidebar-section content-section"
			"logout-section content-section";
		background-color: rgb(245, 245, 245);
		overflow: hidden;

		.top-bar-section {
			grid-area: top-bar-section;
			z-index: 20;
		}

		.sidebar-section {
			grid-area: sidebar-section;
			z-index: 20;
			overflow-y: auto;
			position: relative;
			background-color: white;
			box-shadow: $smooth-box-shadow;
		}

		.content-section {
			grid-area: content-section;
			z-index: 50;
			overflow-y: auto;
			overflow-x: hidden;
		}

		.logout-section {
			grid-area: logout-section;
			z-index: 20;
		}

		.slide-enter-active,
		.slide-leave-active {
			transition: all 0.2s ease;
		}

		.slide-enter-from,
		.slide-leave-to {
			transform: translateX(30%);
			opacity: 0;
		}

		// Mobiles
		@media only screen and (min-width: $mobile-min-width) and (max-width: $mobile-max-width) {
			grid-template-columns: 100%;
			grid-template-rows: fit-content(10rem) auto;
			grid-template-areas:
				"top-bar-section"
				"content-section";

			.sidebar-section {
				position: fixed;
				top: 0;
				left: 0;
				bottom: 0;
				z-index: 90;
				transform: translateX(-100%);
				transition: $transition;
				width: 80vw;

				&.sidebar-open {
					transform: translateX(0);
				}
			}

			.sidebar-overlay {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.5);
				opacity: 0;
				transition: $transition;
				visibility: hidden;
				z-index: 80;

				&.sidebar-open {
					opacity: 1;
					visibility: visible;
				}
			}
		}
	}
</style>
