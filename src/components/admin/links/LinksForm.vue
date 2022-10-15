<template>
	<Dialog
		v-model:visible="$store.state.links.dialog"
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
			<div class="row">
				<div class="col-12 col-md-6">
					<InputText
						ref="title"
						label="Título"
						:disabled="disabled"
						:error="form.errors.get('title')"
						@change-value="(value) => (form.title = value)"
					/>
				</div>
				<div class="col-12 col-md-6">
					<InputText
						ref="link"
						label="Enlace"
						:disabled="disabled"
						:error="form.errors.get('link')"
						@change-value="(value) => (form.link = value)"
					/>
				</div>
				<div class="col-12 col-md-6 mt-4">
					<DropDown
						ref="category_id"
						label="Categoría"
						:options="categories.list"
						:displayText="['parent.name', 'name']"
						:displayTextSeparator="' > '"
						:disabled="disabled"
						:error="form.errors.get('category_id')"
						@change-value="(value) => (form.category_id = value)"
					/>
				</div>

				<div class="col-12">
					<Button
						label="Añadir nombre"
						@click="totalNames++"
					/>
					<div
						v-if="form.errors.get(`new_form`) != null"
						class="text-danger"
					>
						{{ form.errors.get(`new_form`) }}
					</div>
				</div>

				<div v-auto-animate>
					<div
						v-for="n in totalNames"
						:key="n"
					>
						<InputText
							:ref="`${n - 1}.id`"
							class="d-none"
							@change-value="(value) => (form[`${n - 1}.id`] = value)"
						/>
						<InputText
							:ref="`${n - 1}.name`"
							label="Nombre"
							:disabled="disabled"
							:error="form.errors.get(`new_form.${n - 1}.name`)"
							@change-value="(value) => (form[`${n - 1}.name`] = value)"
						/>
						<InputText
							:ref="`${n - 1}.lastname`"
							label="Apellidos"
							:disabled="disabled"
							:error="form.errors.get(`new_form.${n - 1}.lastname`)"
							@change-value="(value) => (form[`${n - 1}.lastname`] = value)"
						/>
					</div>
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
	import Dialog from "primevue/dialog";
	import Button from "primevue/button";
	import Form from "vform";
	import { mapActions, mapMutations, mapState } from "vuex";

	export default {
		components: {
			Dialog,
			Button,
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
		data: () => ({
			form: new Form(),
			modelName: "enlace",
			title: `Añadir enlace`,
			disabled: false,
			totalNames: 1,
		}),
		methods: {
			...mapActions(["sendForm", "getRegisters"]),
			...mapMutations(["toggleFormDialog", "changeCurrentRegister"]),
			save() {
				const update = this.links.register != null;
				const url = `/links${update ? `/${this.links.register.id}` : ""}`;

				this.form.new_form = [];

				for (let index = 0; index < this.totalNames; index++) {
					this.form.new_form.push({
						id: this.form[`${index}.id`],
						name: this.form[`${index}.name`],
						lastname: this.form[`${index}.lastname`],
					});
				}

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
							page: this.links.currentPage,
							rows: this.links.rows,
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

				this.totalNames = 0;
			},
			show() {
				this.clearForm();

				this.getRegisters({
					route: "/categories",
					stateVariable: "categories",
					getAll: true,
					showLoading: false,
				});

				if (this.links.register != null) {
					const register = this.links.register;

					for (const key in register) {
						if (Object.hasOwnProperty.call(register, key)) {
							if (this.$refs[key] != undefined) {
								this.$refs[key].model = register[key];
							}
						}
					}

					if (register.names != null) {
						register.names.forEach((name, index) => {
							this.totalNames++;

							this.$nextTick(() => {
								for (const key in name) {
									if (Object.hasOwnProperty.call(name, key)) {
										if (this.$refs[`${index}.${key}`] != undefined) {
											this.$refs[`${index}.${key}`][0].model = name[key];
										}
									}
								}
							});
						});
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
