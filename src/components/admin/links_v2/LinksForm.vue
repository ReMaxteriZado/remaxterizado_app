<template>
	<Dialog
		v-model:visible="$store.state.links.dialog"
		:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
		:style="{ width: '30vw' }"
		:modal="dialogDefaults.modal"
		:closeOnEscape="dialogDefaults.closeOnEscape"
		:dismissableMask="dialogDefaults.dismissableMask"
		@hide="clearForm()"
		@show="fillForm()"
	>
		<template #header>
			<Title :title="title" />
		</template>

		<form
			class="custom-form"
			@submit.prevent="save()"
			@keydown="form.onKeydown($event)"
		>
			<div class="row">
				<div class="col-12 col-md-6">
					<InputText
						ref="title"
						label="Título"
						:disabled="disabled"
						:error="form.errors.has('title') ? form.errors.get('title') : null"
						@change-value="(value) => (form.title = value)"
					/>
				</div>
				<div class="col-12 col-md-6">
					<InputText
						ref="link"
						label="Enlace"
						:disabled="disabled"
						:error="form.errors.has('link') ? form.errors.get('link') : null"
						@change-value="(value) => (form.link = value)"
					/>
				</div>
				<div class="col-12 col-md-6 mt-4">
					<DropDown
						ref="category_id"
						label="Categoría"
						:options="categories.list"
						optionValue="id"
						optionLabel="name"
						:filter="true"
						:showClear="true"
						:displayText="['parent.name', 'name']"
						:displayTextSeparator=" ' > '"
						:disabled="disabled"
						:error="form.errors.has('category_id') ? form.errors.get('category_id') : null"
						@change-value="(value) => (form.category_id = value)"
					/>
				</div>
			</div>
		</form>
		<template
			#footer
			v-if="!disabled"
		>
			<div class="col-12 d-flex justify-content-end">
				<Button
					@click="save()"
					label="Guardar"
					:disabled="form.busy"
				/>
			</div>
		</template>
	</Dialog>
</template>

<script>
	import Button from "primevue/button";
	import Dialog from "primevue/dialog";
	import Form from "vform";
	import { mapActions, mapMutations, mapState } from "vuex";

	import Title from "../partials/TitleComponent.vue";

	export default {
		components: {
			Dialog,
			Title,
			Button,
		},
		data: () => ({
			form: new Form({
				title: "",
				category_id: null,
				description: "",
			}),
			modelName: "enlace",
			title: `Añadir enlace`,
			disabled: false,
		}),
		methods: {
			...mapActions(["sendPostForm", "sendPutForm", "getLinks", "getRegisters"]),
			...mapMutations(["toggleLinksDialog", "changeCurrentLink"]),
			save() {
				let url = "/links";
				let result = null;

				if (this.links.register != null) {
					url += `/${this.links.register.id}`;

					this.sendPutForm({
						form: this.form,
						url: url,
						errors: this.form.errors,
					}).then((response) => {
						result = response;
					});
				} else {
					this.sendPostForm({
						form: this.form,
						url: url,
						errors: this.form.errors,
					}).then((response) => {
						result = response;
					});
				}

				if (result?.status === 200) {
					this.toggleLinksModal(false);
					this.getLinks(this.links.currentPage);
				}
			},
			clearForm() {
				this.form.clear();

				this.changeCurrentLink(null);

				this.title = `Añadir ${this.modelName}`;
				this.disabled = false;
			},
			fillForm() {
				this.getRegisters({
					route: "/categories",
					stateVariable: "categories",
					getAll: true,
				});

				if (this.links.register != null) {
					for (const key in this.links.register) {
						if (Object.hasOwnProperty.call(this.links.register, key)) {
							if (this.$refs[key] != undefined) {
								this.$refs[key].model = this.links.register[key];
							}
						}
					}

					if (this.links.dialogMode == "edit") {
						this.title = `Editar ${this.modelName}`;
						this.disabled = false;
					} else {
						this.title = `Ver ${this.modelName}`;
						this.disabled = true;
					}
				}
			},
		},
		computed: {
			...mapState(["dialogDefaults", "links", "categories"]),
		},
	};
</script>
