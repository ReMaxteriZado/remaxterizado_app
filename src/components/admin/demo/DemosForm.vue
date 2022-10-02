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
				<div class="col-12">
					<FileUpload
						label="Subir archivo"
						ref="FileUpload"
						:error="form.errors.has('files_list') ? form.errors.get('files_list') : null"
						:disabled="disabled"
					/>
				</div>
				<div class="col-12 col-md-6 mt-4">
					<InputText
						ref="title"
						label="Título"
						:disabled="disabled"
						:error="form.errors.has('title') ? form.errors.get('title') : null"
						@change-value="(value) => (form.title = value)"
					/>
				</div>
				<div class="col-12 col-md-6 mt-4">
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
						:options="links.list"
						optionValue="id"
						optionLabel="title"
						:filter="true"
						:showClear="true"
						:displayText="'title'"
						:disabled="disabled"
						:error="form.errors.has('category_id') ? form.errors.get('category_id') : null"
						@change-value="(value) => (form.category_id = value)"
					/>
				</div>
				<div class="col-12 col-md-6 mt-4">
					<DatePicker
						ref="date"
						label="Fecha"
						:disabled="disabled"
						:error="form.errors.has('date') ? form.errors.get('date') : null"
						@change-value="(value) => (form.date = value)"
						:showTime="false"
					/>
				</div>
				<div class="col-12 col-md-6 mt-4">
					<MultiSelect
						ref="multi_category_id"
						label="Categoría"
						:options="links.list"
						optionValue="id"
						optionLabel="title"
						:filter="true"
						:showClear="true"
						:displayText="['title', 'link']"
						displayTextSeparator=" - "
						:disabled="disabled"
						:error="
							form.errors.has('multi_category_id') ? form.errors.get('multi_category_id') : null
						"
						@change-value="(value) => (form.multi_category_id = value)"
					/>
				</div>
				<div class="col-12 col-md-6 mt-4">
					<SelectButton
						ref="hour"
						label="Horario"
						:disabled="disabled"
						:error="form.errors.has('hour') ? form.errors.get('hour') : null"
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
						:error="form.errors.has('description') ? form.errors.get('description') : null"
						@change-value="(value) => (form.description = value)"
					/>
				</div>
				<div class="col-12 col-md-6 mt-4">
					<CheckBox
						ref="active"
						label="Activo"
						:disabled="disabled"
						:error="form.errors.has('active') ? form.errors.get('active') : null"
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
						:error="form.errors.has('nose') ? form.errors.get('nose') : null"
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
						:error="form.errors.has('rules') ? form.errors.get('rules') : null"
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
			...mapActions(["sendPostForm", "sendPutForm", "getLinks"]),
			...mapMutations(["toggleLinksDialog", "changeCurrentLink"]),
			save() {
				let url = "/links";
				let result = null;

				this.form.files_list = this.$refs.FileUpload.files;

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
