<template>
	<Breadcrumb :home="home" :model="items">
		<template #item="{ item }">
			<router-link v-if="item.url" :to="item.url" class="link text-primary">
				<i v-if="item.icon" :class="item.icon"></i>
				<span>{{ item.label }}</span>
			</router-link>
			<span v-else class="link text-primary">{{ item.label }}</span>
		</template>
	</Breadcrumb>
</template>

<script>
import Breadcrumb from "primevue/breadcrumb";

export default {
	components: {
		Breadcrumb,
	},
	data: () => ({
		home: {
			label: "Inicio",
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

:deep(.pi-chevron-right:before) {
	content: "/";
}

:deep(.p-breadcrumb-list) {
	display: flex;
	gap: 0.4rem;
}
</style>
