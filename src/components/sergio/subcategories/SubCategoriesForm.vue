<template>
	<Dialog
		v-model:visible="$store.state.sergioSubCategories.dialog"
		:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
		:style="{ width: '30vw' }"
		:modal="dialogDefaults.modal"
		:closeOnEscape="dialogDefaults.closeOnEscape"
		:dismissableMask="dialogDefaults.dismissableMask"
		@hide="hide"
		@show="show"
	>
		<template #header>
			<FormTitle :title="title" />
		</template>

		<form @keydown="$event.key === 'Enter' ? save() : null">
			<div class="row gy-3">
				<div class="col-12">
					<FileUpload
						label="Imagen"
						ref="FileUpload"
						:error="form.errors.get('image')"
						:disabled="disabled"
						:accept="'image/*'"
					/>
				</div>
				<div class="col-12 col-md-6">
					<DropDown
						ref="category_id"
						label="Categoría"
						:options="sergioCategories.list"
						optionLabel="name"
						:displayText="'name'"
						:disabled="disabled"
						:error="form.errors.get('category_id')"
						@change-value="(value) => (form.category_id = value)"
					/>
				</div>
				<div class="col-12 col-md-6">
					<InputText
						ref="name"
						label="Nombre"
						:disabled="disabled"
						:error="form.errors.get('name')"
						@change-value="(value) => (form.name = value)"
					/>
				</div>
			</div>
		</form>

		<template #footer v-if="!disabled">
			<div class="col-12 d-flex justify-content-end">
				<Button @click="save()" label="Guardar" :disabled="form.busy" />
			</div>
		</template>
	</Dialog>
</template>

<script>
import Form from "vform";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
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
	data: () => ({
		form: new Form(),
		modelName: "categoría",
		title: `Añadir subcategoría`,
		disabled: false,
		tags: [],
	}),
	methods: {
		...mapActions(["sendForm", "getRegisters"]),
		...mapMutations(["toggleFormDialog", "changeCurrentRegister"]),
		save() {
			const update = this.sergioSubCategories.register != null;
			const url = `/${this.route}${
				update ? `/${this.sergioSubCategories.register.id}` : ""
			}`;

			this.form.image = this.$refs.FileUpload.files;

			this.sendForm({
				method: update ? "put" : "post",
				form: this.form,
				url: url,
				errors: this.form.errors,
			}).then((response) => {
				if (response.status === 200) {
					this.toggleFormDialog({
						stateVariable: this.stateVariable,
						value: false,
					});

					this.getRegisters({
						route: this.route,
						stateVariable: this.stateVariable,
						page: this.sergioSubCategories.currentPage,
						rows: this.sergioSubCategories.rows,
					});
				}
			});
		},
		hide() {
			this.title = `Añadir ${this.modelName}`;
			this.disabled = false;

			this.changeCurrentRegister({
				stateVariable: this.stateVariable,
				register: null,
			});
		},
		clearForm() {
			this.form.clear();
			this.form.reset();

			for (const key in this.$refs) {
				if (Object.hasOwnProperty.call(this.$refs, key)) {
					this.$refs[key].model = null;
				}
			}
		},
		show() {
			this.clearForm();

			this.getRegisters({
				route: "/sergio-categories",
				stateVariable: "sergioCategories",
				getAll: true,
				showLoading: false,
			});

			const register = this.sergioSubCategories.register;

			if (register != null) {
				for (const key in register) {
					if (Object.hasOwnProperty.call(register, key)) {
						if (this.$refs[key] != undefined) {
							this.$refs[key].model = register[key];
						}
					}
				}

				if (this.sergioSubCategories.dialogMode == "edit") {
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
		...mapState(["dialogDefaults", "sergioSubCategories", "sergioCategories"]),
	},
};
</script>

<style lang="scss" scoped>
:deep(.p-chips) {
	.p-chips-multiple-container {
		gap: 0.5rem;
	}

	.p-chips-multiple-container {
		width: 100%;
	}
}
</style>
