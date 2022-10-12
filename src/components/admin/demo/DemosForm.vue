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

		<form
			@submit.prevent="save()"
			@keydown="form.onKeydown($event)"
		>
			<div class="row">
				<div class="col-12">
					<FileUpload
						label="Subir archivo"
						ref="FileUpload"
						:error="form.errors.get('files_list')"
						:disabled="disabled"
					/>
				</div>
				<div class="col-12 col-md-6 mt-4">
					<InputText
						ref="title"
						label="Título"
						:disabled="disabled"
						:error="form.errors.get('title')"
						@change-value="(value) => (form.title = value)"
					/>
				</div>
				<div class="col-12 col-md-6 mt-4">
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
						:options="links.list"
						optionLabel="title"
						:displayText="'title'"
						:disabled="disabled"
						:error="form.errors.get('category_id')"
						@change-value="(value) => (form.category_id = value)"
					/>
				</div>
				<div class="col-12 col-md-6 mt-4">
					<DatePicker
						ref="date"
						label="Fecha"
						:disabled="disabled"
						:error="form.errors.get('date')"
						@change-value="(value) => (form.date = value)"
						:showTime="false"
					/>
				</div>
				<div class="col-12 col-md-6 mt-4">
					<MultiSelect
						ref="multi_category_id"
						label="Categoría"
						:options="links.list"
						optionLabel="title"
						:displayText="['title', 'link']"
						displayTextSeparator=" - "
						:disabled="disabled"
						:error="form.errors.get('multi_category_id')"
						@change-value="(value) => (form.multi_category_id = value)"
					/>
				</div>
				<div class="col-12 col-md-6 mt-4">
					<SelectButton
						ref="hour"
						label="Horario"
						:disabled="disabled"
						:error="form.errors.get('hour')"
						@change-value="(value) => (form.hour = value)"
						:values="[
							{ value: 'morning', label: 'mañana' },
							{ value: 'night', label: 'noche' },
						]"
					/>
				</div>
				<div class="col-12 mt-4">
					<TextArea
						ref="description"
						label="Descripción"
						:disabled="disabled"
						:error="form.errors.get('description')"
						@change-value="(value) => (form.description = value)"
					/>
				</div>
				<div class="col-12 col-md-6 mt-4">
					<CheckBox
						ref="active"
						label="Activo"
						:disabled="disabled"
						:error="form.errors.get('active')"
						@change-value="(value) => (form.active = value)"
						:values="[
							{ value: 'water', label: 'Agua' },
							{ value: 'fire', label: 'Fuego' },
						]"
					/>
				</div>
				<div class="col-12 col-md-6 mt-4">
					<RadioButton
						ref="nose"
						label="Nose"
						:disabled="disabled"
						:error="form.errors.get('nose')"
						@change-value="(value) => (form.nose = value)"
						:values="[
							{ value: 'nose1', label: 'nose1' },
							{ value: 'nose2', label: 'nose2' },
						]"
					/>
				</div>
				<div class="col-12 col-md-6 mt-4">
					<InputSwitch
						ref="rules"
						label="Normas"
						:disabled="disabled"
						:error="form.errors.get('rules')"
						@change-value="(value) => (form.rules = value)"
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
			form: new Form({
				title: "",
				category_id: null,
				description: "",
				date: null,
				active: null,
				nose: null,
				multi_category_id: [],
				rules: false,
				hour: null,
			}),
			modelName: "enlace",
			title: `Añadir enlace`,
			disabled: false,
		}),
		methods: {
			...mapActions(["sendForm", "getRegisters"]),
			...mapMutations(["toggleFormDialog", "changeCurrentRegister"]),
			save() {
				const update = this.links.register != null;
				const url = `/links${update ? `/${this.links.register.id}` : ""}`;

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
			...mapState(["dialogDefaults", "links"]),
		},
	};
</script>
