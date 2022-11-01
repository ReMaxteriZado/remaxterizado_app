<template>
	<div>
		<div class="d-flex flex-wrap align-items-center mb-3 gap-3">
			<Button
				v-if="category_selected != null"
				:label="`Editar la categoría '${category_selected.label}'`"
				icon="pi pi-pencil"
				@click="edit(category_selected)"
			/>
			<Button
				v-if="category_selected != null"
				:label="`Borrar la categoría '${category_selected.label}'`"
				icon="pi pi-trash"
				@click="deleteCategory(category_selected.id)"
			/>
		</div>
		<PanelMenu :model="items" />
	</div>
</template>

<script>
import PanelMenu from "primevue/panelmenu";

import { mapActions, mapMutations, mapState } from "vuex";

export default {
	components: {
		PanelMenu,
	},
	props: {
		route: {
			type: String,
			required: true,
		},
		stateVariable: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			items: [],
			categories_added: [],
			category_selected: null,
		};
	},
	methods: {
		...mapActions(["getCategories", "deleteRegisters"]),
		...mapMutations([
			"changeCurrentRegister",
			"changeFormDialogMode",
			"toggleFormDialog",
		]),
		edit(register) {
			this.changeCurrentRegister({
				stateVariable: this.stateVariable,
				register,
			});

			this.changeFormDialogMode({
				stateVariable: this.stateVariable,
				dialogMode: "edit",
			});

			this.toggleFormDialog({
				stateVariable: this.stateVariable,
				show: true,
			});
		},
		deleteCategory(id) {
			this.$confirm.require({
				message: "¿Desea borrar el registro?",
				header: "Borrar registro",
				icon: "pi pi-exclamation-triangle",
				accept: () => {
					this.deleteRegisters({
						url: `/categories/${id}`,
					}).then(() => {
						this.getCategories();
					});
				},
			});
		},
		pushItem(items, category) {
			const children = this.findChildren(category);
			const links = this.findLinks(category);

			let item_children = [];

			if (children.length) {
				item_children.push(...children);
			}

			if (links.length) {
				item_children.push(...links);
			}

			items.push({
				id: category.id,
				category: category,
				label: category.name,
				icon: "pi pi-folder",
				items: item_children,
				command: () => {
					this.changeItemIcon(this.items, category.id);
				},
			});
		},
		changeItemIcon(items, category_id) {
			items.forEach((item) => {
				if (item.id == category_id) {
					this.category_selected = item;

					if (item.items != undefined) {
						if (item.icon == "pi pi-folder") {
							item.icon = "pi pi-folder-open";
						} else {
							item.icon = "pi pi-folder";
						}
					}
				}

				if (item.items != undefined) {
					this.changeItemIcon(item.items, category_id);
				}
			});
		},
		formatCategories(categories) {
			categories.forEach((category) => {
				if (category.parent_id == null) {
					this.pushItem(this.items, category);
				}
			});
		},
		findChildren(parent) {
			let children = [];

			this.categories.customList.forEach((category) => {
				if (category.parent_id == parent.id) {
					const children2 = this.findChildren(category);
					const links = this.findLinks(category);

					const item = {
						id: category.id,
						category: category,
						label: category.name,
						icon: "pi pi-folder",
						items: [],
						command: () => {
							this.changeItemIcon(this.items, category.id);
						},
					};

					if (children2.length) {
						item.items.push(...children2);
					}

					if (links.length) {
						item.items.push(...links);
					}

					if (!item.items.length) {
						delete item.items;
					}

					children.push(item);
				}
			});

			return children;
		},
		findLinks(parent) {
			let links = [];

			parent.links.forEach((link) => {
				links.push({
					label: link.title,
					icon: "pi pi-link",
					command: () => {
						window.open(link.link, "_blank").focus();
					},
				});
			});

			return links;
		},
	},
	computed: {
		...mapState(["categories"]),
	},
	mounted() {
		this.getCategories();
	},
	watch: {
		"categories.customList"() {
			this.items = [];
			this.categories_added = [];
			this.category_selected = null;

			this.formatCategories(this.categories.customList);
		},
	},
};
</script>

<style lang="scss" scoped>
:deep(.p-panelmenu) {
	box-shadow: $smooth-box-shadow;
	border-radius: $border-radius;
	overflow: hidden;
}
</style>