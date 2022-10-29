<template>
	<div class="p-2 p-md-4">
		<Card class="no-custom-card">
			<template #content>
				<div class="d-flex justify-content-between">
					<Breadcrumb />
					<CurrentUser />
				</div>
			</template>
		</Card>
	</div>
</template>

<script>
import Card from "primevue/card";
import Breadcrumb from "../partials/BreadcrumComponent.vue";
import CurrentUser from "../partials/CurrentUserComponent.vue";

export default {
	components: {
		Breadcrumb,
		Card,
		CurrentUser,
	},
	data: () => ({
		home: {
			icon: "pi pi-home",
			url: "/dashboard",
		},
		items: [],
	}),
	mounted() {
		if (this.$route.name != undefined) {
			this.$route.name.split("/").forEach((bread) => {
				this.items.push({ label: bread });
			});
		}
	},
	watch: {
		$route(to) {
			this.items = [];

			if (to.name != undefined) {
				to.name.split("/").forEach((bread, index) => {
					let path = to.path.split("/");
					let url = "";

					for (let i = 0; i <= index + 1; i++) {
						url += "/" + path[i + 1];
					}

					this.items.push({ label: bread, url: url });
				});

				// remove url prop for last items item
				this.items[this.items.length - 1].url = null;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.link {
	text-decoration: none;
}

:deep(.p-breadcrumb) {
	background-color: white;
	border: none;
}

:deep(.p-card .p-card-body) {
	padding: 0;
}

:deep(.p-card .p-card-content) {
	padding: 0;
}
</style>
