<template>
	<div class="sidebar d-lg-none">
		<div v-if="showSidebar" @click="toggleSidebar(false)" class="overlay"></div>
		<div
			class="sidebar-content d-lg-none text-white p-3"
			:class="[showSidebar ? 'show' : '']"
			@click="toggleSidebar(false)"
		>
			<div
				class="h-100 d-flex flex-column align-items-end justify-content-between gap-3"
			>
				<a class="text-white" href="#">
					<h3 class="mb-0">Alejandro Espino</h3>
				</a>
				<div>
					<div class="d-flex flex-column align-items-end gap-3">
						<div
							class="h3 text-white mb-0"
							:class="{ 'bg-primary text-white': english }"
							@click="changeLanguage('en')"
						>
							EN
						</div>
						<div
							class="h3 text-white mb-0"
							@click="changeLanguage('es')"
							:class="{ 'bg-primary text-white': spanish }"
						>
							ES
						</div>
					</div>
					<div
						v-for="(link, index) in links"
						:key="index"
						class="w-100 text-end mt-3"
					>
						<a :href="`#${link.name}`" class="h3 text-white mb-0">{{
							$t(`navbar.${link.i18n}`)
						}}</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapMutations, mapState } from "vuex";

	export default {
		data() {
			return {
				links: [
					{
						name: "last-projects",
						i18n: "last_projects",
					},
					{
						name: "overview",
						i18n: "overview",
					},
				],
			};
		},
		computed: {
			...mapState(["showSidebar"]),
		},
		methods: {
			...mapMutations(["toggleSidebar"]),
			changeLanguage(language) {
				this.$i18n.locale = language;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.sidebar {
		.overlay {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.7);
			z-index: 8;
			touch-action: none;
		}

		.sidebar-content {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 10;
			width: 30rem;
			max-width: 80vw;
			transform: translateX(100%);
			transition: $transition;
			touch-action: none;

			a {
				text-decoration: none;
			}

			&.show {
				transform: translateX(0);
			}
		}
	}
</style>
