<template>
	<div
		class="toggle-sidebar-button d-lg-none"
		:class="[sidebarShown ? 'show-sidebar' : '']"
	>
		<Button
			class="button"
			@click="toggleSidebar(!showSidebar)"
			rounded
			:icon="[sidebarShown ? 'pi pi-times' : 'pi pi-bars']"
		/>
	</div>
</template>

<script>
	import { mapMutations, mapState } from "vuex";

	export default {
		data() {
			return {
				sidebarShown: false,
			};
		},
		computed: {
			...mapState(["showSidebar"]),
		},
		methods: {
			...mapMutations(["toggleSidebar"]),
		},
		watch: {
			showSidebar() {
				setTimeout(() => {
					this.sidebarShown = this.showSidebar;
				}, 500);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.toggle-sidebar-button {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		z-index: 4;
		border-radius: 100%;
		box-shadow: $smooth-box-shadow;
		transition: $transition;

		.button {
			border-radius: 100%;
		}

		&.show-sidebar {
			right: calc(100% - 1rem);
			transform: translateX(100%);
		}
	}
</style>
