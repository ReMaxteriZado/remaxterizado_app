<template>
	<div id="admin-layout">
		<Toast />
		<ConfirmDialog />
		<LoadingComponent />

		<div
			class="sidebar-section"
			v-if="show_sidebar"
		>
			<LogoComponent />
			<SidebarComponent />
		</div>

		<div class="top-bar-section">
			<TopBar />
		</div>
		<div class="content-section p-4 pt-0">
			<router-view v-slot="{ Component }">
				<transition
					name="slide"
					mode="out-in"
				>
					<component
						:is="Component"
						:key="$route.path"
					/>
				</transition>
			</router-view>
		</div>
		<div class="logout-section">
			<Logout />
		</div>
	</div>
</template>

<script>
	import LogoComponent from "@/components/admin/panels/LogoComponent.vue";
	import SidebarComponent from "@/components/admin/panels/SidebarComponent.vue";
	import BottomBar from "@/components/admin/panels/BottomBarComponent.vue";
	import Logout from "@/components/admin/panels/LogoutComponent.vue";
	import TopBar from "@/components/admin/panels/TopBarComponent.vue";
	import LoadingComponent from "@/components/admin/partials/LoadingComponent.vue";

	import Toast from "primevue/toast";
	import ConfirmDialog from "primevue/confirmdialog";

	import { mapState, mapMutations } from "vuex";

	export default {
		components: {
			LogoComponent,
			SidebarComponent,
			LoadingComponent,
			TopBar,
			Toast,
			ConfirmDialog,
			BottomBar,
			Logout,
		},
		data() {
			return {
				show_sidebar: false,
			};
		},
		computed: {
			...mapState(["showNotLoggedToast", "errorToast", "successToast", "warningToast"]),
		},
		methods: {
			...mapMutations(["changeSuccessToast", "changeErrorToast", "changeWarningToast"]),
			storageListener() {
				const interval = setInterval(() => {
					if (localStorage.getItem("user_permissions") != null) {
						this.show_sidebar = true;
						clearInterval(interval);
					}
				}, 50);
			},
		},
		mounted() {
			document.addEventListener("storage", this.storageListener());
		},
		watch: {
			showNotLoggedToast(value) {
				if (value) {
					this.$toast.add({
						severity: "error",
						summary: "No has iniciado sesión",
						detail: "Por favor incia sesión para continuar",
						life: 3000,
					});
				}
			},
			successToast() {
				if (this.successToast != null) {
					this.$toast.add({
						severity: "success",
						summary: "Acción realizada",
						detail: this.successToast == true ? "Operación realizada con éxito" : this.successToast,
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
						detail: this.errorToast == true ? "Ha ocurrido un error" : this.errorToast,
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
						detail: this.warningToast == true ? "Ha ocurrido un error" : this.warningToast,
						life: 3000,
					});
				}

				this.changeWarningToast(null);
			},
		},
	};
</script>

<style
	lang="scss"
	scoped
>
	#admin-layout {
		height: 100vh;
		display: grid;
		grid-template-columns: 15.5% 1fr;
		grid-template-rows: fit-content(10rem) auto 3rem;
		grid-template-areas:
			"sidebar-section top-bar-section"
			"sidebar-section content-section"
			"logout-section content-section";
		background-color: rgb(245, 245, 245);

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
			overflow: auto;
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
	}
</style>
