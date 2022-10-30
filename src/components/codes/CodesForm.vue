<template>
	<Dialog
		v-model:visible="$store.state.codes.dialog"
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
				<div class="col-12 col-md-6">
					<DropDown
						ref="link_id"
						label="Enlace"
						:options="links.list"
						optionLabel="title"
						:displayText="['title', 'link']"
						:displayTextSeparator="' - '"
						:disabled="disabled"
						:error="form.errors.get('link_id')"
						@change-value="(value) => (form.link_id = value)"
					/>
				</div>
				<div class="col-12 col-md-6">
					<DropDown
						ref="language"
						label="Lenguaje"
						:options="codeLanguages"
						:optionValue="'value'"
						:optionLabel="'label'"
						:displayText="'label'"
						:disabled="disabled"
						:error="form.errors.get('language')"
						@change-value="(value) => (form.language = value)"
					/>
				</div>
				<div class="col-12">
					<TextArea
						ref="comment"
						label="Comentario"
						:disabled="disabled"
						:error="form.errors.get('comment')"
						@change-value="(value) => (form.comment = value)"
					/>
				</div>
				<div v-if="form.language != null" class="col-12">
					<CodeEditor
						ref="code"
						label="Código"
						:disabled="disabled"
						:language="form.language"
						:error="form.errors.get('code')"
						@change-value="(value) => (form.code = value)"
					></CodeEditor>
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

import CodeEditor from "@/components/partials/forms/CodeEditor.vue";

export default {
	components: {
		Dialog,
		Button,
		CodeEditor,
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
		modelName: "código",
		title: `Añadir código`,
		disabled: false,
		loadCode: null,
	}),
	methods: {
		...mapActions(["sendForm", "getRegisters"]),
		...mapMutations(["toggleFormDialog", "changeCurrentRegister"]),
		save() {
			const update = this.codes.register != null;
			const url = `/codes${update ? `/${this.codes.register.id}` : ""}`;

			this.form.new_form = [];

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
						page: this.codes.currentPage,
						rows: this.codes.rows,
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
				route: "/links",
				stateVariable: "links",
				getAll: true,
				showLoading: false,
			});

			const register = this.codes.register;

			if (register != null) {
				for (const key in register) {
					if (Object.hasOwnProperty.call(register, key)) {
						if (this.$refs[key] != undefined) {
							this.$refs[key].model = register[key];
						}
					}
				}

				if (this.codes.dialogMode == "edit") {
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
		...mapState(["dialogDefaults", "codes", "links", "codeLanguages"]),
	},
	watch: {
		"form.language"(value) {
			if (this.codes.register != null && value != null) {
				this.$nextTick(() => {
					this.$refs["code"].model = this.codes.register.code;
				});
			}
		},
	},
};
</script>
