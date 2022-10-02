<template>
	<div>
		<label
			for="input"
			class="text-primary text-bold"
			>{{ label }}</label
		>

		<SelectButton
			v-model="model"
			:disabled="disabled"
			:options="values"
			optionLabel="label"
			multiple
			:class="[error != null ? 'p-invalid' : '']"
		/>

		<div
			v-if="error != null"
			class="text-danger"
		>
			{{ error }}
		</div>
	</div>
</template>

<script>
	import SelectButton from "primevue/selectbutton";

	export default {
		components: {
			SelectButton,
		},
		props: ["label", "error", "disabled", "values"],
		data: () => ({
			model: null,
		}),
		watch: {
			model(newValue) {
				// let values = [];

				// if (newValue != null) {
				// 	values = newValue.map((value) => value.value);
				// }
				
				this.$emit("change-value", newValue);
			},
		},
	};
</script>
