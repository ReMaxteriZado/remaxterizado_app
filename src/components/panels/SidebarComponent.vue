<template>
	<div class="sidebar d-flex flex-column justify-content-between">
		<SidebarLinks />
	</div>
</template>

<script>
import SidebarLinks from "@/components/partials/SidebarLinksComponent.vue";

export default {
	components: {
		SidebarLinks,
	},
};
</script>

<style lang="scss" scoped>
.sidebar {
	.p-submenu-header {
		background-color: transparent;
		color: #1e1e1e;
		text-transform: uppercase;
	}

	.p-menuitem {
		.p-menuitem-link {
			transition: $transition;

			&:not(.p-disabled) {
				&:hover {
					background: rgba(white, 0.3);

					span {
						color: white;
					}
				}
			}

			span {
				color: white;
			}

			&:focus {
				box-shadow: none;
			}

			&:hover {
				background: rgba(white, 0.3);
			}
		}
	}
}
</style>
