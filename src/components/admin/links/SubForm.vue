<template>
	<div>
		<InputText
			:ref="`${index - 1}.id`"
			class="d-none"
			@change-value="(value) => (form[`${index - 1}.id`] = value)"
		/>
		<InputText
			:ref="`${index - 1}.name`"
			label="Nombre"
			:disabled="disabled"
			:error="form.errors.get(`new_form.${index - 1}.name`)"
			@change-value="(value) => (form[`${index - 1}.name`] = value)"
		/>
		<InputText
			:ref="`${index - 1}.lastname`"
			label="Apellidos"
			:disabled="disabled"
			:error="form.errors.get(`new_form.${index - 1}.lastname`)"
			@change-value="(value) => (form[`${index - 1}.lastname`] = value)"
		/>
	</div>
</template>

<script>
	import Form from "vform";
	export default {
		data: () => ({
			form: new Form({
				id: null,
				name: null,
				lastname: null,
			}),
		}),
		props: {
			index: {
				type: Number,
				required: true,
			},
			disabled: {
				type: Boolean,
				default: false,
			},
		},
		methods: {
			setValues(values) {
				for (const key in values) {
					if (Object.hasOwnProperty.call(values, key)) {
						if (this.$refs[`${this.index -1}.${key}`] != undefined) {
							this.$refs[`${this.index -1}.${key}`].model = values[key];
						}
					}
				}
			},
			returnForm() {
				const subform = [
					{
						id: this.form[`${this.index - 1}.id`],
						name: this.form[`${this.index - 1}.name`],
						lastname: this.form[`${this.index - 1}.lastname`],
					},
				];
				return subform[0];
			},
		},
	};
</script>
