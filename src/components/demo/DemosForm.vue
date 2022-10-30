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
			<div class="row gy-3">
				<div class="col-12">
					<FileUpload
						label="Subir archivo"
						ref="FileUpload"
						:error="form.errors.get('files_list')"
						:disabled="disabled"
					/>
				</div>
				<div class="col-12 col-md-6">
					<InputText
						ref="InputText"
						label="InputText"
						:disabled="disabled"
						:error="form.errors.get('text')"
						@change-value="(value) => (form.text = value)"
					/>
				</div>
				<div class="col-12 col-md-6">
					<DropDown
						ref="DropDown"
						label="Dropdown"
						:options="links.list"
						optionLabel="title"
						:displayText="'title'"
						:disabled="disabled"
						:error="form.errors.get('dropdown')"
						@change-value="(value) => (form.dropdown = value)"
					/>
				</div>
				<div class="col-12 col-md-6">
					<DatePicker
						ref="DatePicker"
						label="DatePicker"
						:disabled="disabled"
						:error="form.errors.get('date')"
						@change-value="(value) => (form.date = value)"
						:showTime="false"
					/>
				</div>
				<div class="col-12 col-md-6">
					<MultiSelect
						ref="MultiSelect"
						label="MultiSelect"
						:options="links.list"
						optionLabel="title"
						:displayText="['title', 'link']"
						displayTextSeparator=" - "
						:disabled="disabled"
						:error="form.errors.get('multiselect')"
						@change-value="(value) => (form.multiselect = value)"
					/>
				</div>
				<div class="col-12 col-md-6">
					<SelectButton
						ref="SelectButton"
						label="SelectButton"
						:disabled="disabled"
						:error="form.errors.get('selectbutton')"
						@change-value="(value) => (form.selectbutton = value)"
						:values="[
							{ value: 'Valor1', label: 'Valor 1' },
							{ value: 'Valor2', label: 'Valor 2' },
						]"
					/>
				</div>
				<div class="col-12">
					<TextArea
						ref="TextArea"
						label="TextArea"
						:disabled="disabled"
						:error="form.errors.get('textarea')"
						@change-value="(value) => (form.textarea = value)"
					/>
				</div>
				<div class="col-12 col-md-6">
					<CheckBox
						ref="CheckBoxMultiple"
						label="CheckBox multiple"
						:disabled="disabled"
						:error="form.errors.get('multiple_checkbox')"
						@change-value="(value) => (form.multiple_checkbox = value)"
						:values="[
							{ value: 'Valor1', label: 'Valor 1' },
							{ value: 'Valor2', label: 'Valor 2' },
						]"
						:name="'multiple_checkbox'"
					/>
				</div>
				<div class="col-12 col-md-6">
					<CheckBox
						ref="CheckBoxSingle"
						label="CheckBox simple"
						:disabled="disabled"
						:error="form.errors.get('single_checkbox')"
						@change-value="(value) => (form.single_checkbox = value)"
						:binary="true"
					/>
				</div>
				<div class="col-12 col-md-6">
					<RadioButton
						ref="RadioButton"
						label="RadioButton"
						:disabled="disabled"
						:error="form.errors.get('radiobutton')"
						@change-value="(value) => (form.radiobutton = value)"
						:values="[
							{ value: 'Valor1', label: 'Valor 1' },
							{ value: 'Valor2', label: 'Valor 2' },
						]"
						:name="'radiobutton'"
					/>
				</div>
				<div class="col-12 col-md-6">
					<InputSwitch
						ref="InputSwitch"
						label="InputSwitch"
						:disabled="disabled"
						:error="form.errors.get('inputswitch')"
						@change-value="(value) => (form.inputswitch = value)"
					/>
				</div>

				<div class="col-12">
					<Button label="Añadir nombre" @click="totalNames++" />
					<div v-if="form.errors.get(`new_form`) != null" class="text-danger">
						{{ form.errors.get(`new_form`) }}
					</div>
				</div>

				<div v-auto-animate>
					<div v-for="n in totalNames" :key="n" class="row mb-3">
						<!-- Large subform -->
						<SubForm :ref="'SubForm' + n" :index="n" :disabled="disabled" />
						<!-- End large subform -->

						<!-- Small subform -->
						<!-- <InputText
							:ref="`${n - 1}.id`"
							class="d-none"
							@change-value="(value) => (form[`${n - 1}.id`] = value)"
						/>
						<div class="col-12 col-md-6">
							<InputText
								:ref="`${n - 1}.name`"
								label="Nombre"
								:disabled="disabled"
								:error="form.errors.get(`new_form.${n - 1}.name`)"
								@change-value="(value) => (form[`${n - 1}.name`] = value)"
							/>
						</div>
						<div class="col-12 col-md-6">
							<InputText
								:ref="`${n - 1}.lastname`"
								label="Apellidos"
								:disabled="disabled"
								:error="form.errors.get(`new_form.${n - 1}.lastname`)"
								@change-value="(value) => (form[`${n - 1}.lastname`] = value)"
							/>
						</div> -->
						<!-- End small subform -->
					</div>
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
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Form from "vform";
import { mapActions, mapMutations, mapState } from "vuex";

import SubForm from "./SubForm.vue";

export default {
	components: {
		Dialog,
		Button,
		SubForm,
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

			this.form.files_list = this.$refs.FileUpload.files;

			for (let index = 0; index < this.totalNames; index++) {
				// ----------------- Small subform -----------------
				// this.form.new_form.push({
				// 	id: this.form[`${index}.id`],
				// 	name: this.form[`${index}.name`],
				// 	lastname: this.form[`${index}.lastname`],
				// });
				// ----------------- End small subform -----------------

				// ----------------- Large subform -----------------
				this.form.new_form.push(
					this.$refs[`SubForm${index + 1}`][0].returnForm()
				);
				// ----------------- End large subform -----------------
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
				} else {
					// ----------------- Large subform -----------------
					if (response?.data) {
						for (let index = 0; index < this.totalNames; index++) {
							this.$refs[`SubForm${index + 1}`][0].form.errors.clear();

							for (const key in response.data) {
								this.$refs[`SubForm${index + 1}`][0].form.errors.set(
									key,
									response.data[key]
								);
							}
						}
					}
					// ----------------- End large subform -----------------
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

			const register = this.links.register;

			if (register != null) {
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

						// ----------------- Small subform -----------------
						// this.$nextTick(() => {
						// 	for (const key in name) {
						// 		if (Object.hasOwnProperty.call(name, key)) {
						// 			if (this.$refs[`${index}.${key}`] != undefined) {
						// 				this.$refs[`${index}.${key}`][0].model = name[key];
						// 			}
						// 		}
						// 	}
						// });
						// ----------------- End small subform -----------------

						// ----------------- Large subform -----------------
						this.$nextTick(() => {
							this.$refs[`SubForm${index + 1}`][0].setValues(name);
						});
						// ----------------- End large subform -----------------
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
		...mapState(["dialogDefaults", "links"]),
	},
};
</script>
