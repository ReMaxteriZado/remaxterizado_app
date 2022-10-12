<template>
	<div>
		<label
			for="input"
			class="text-primary text-bold"
			>{{ label }}</label
		>
		<div
			v-for="(value, index) in values"
			:key="index"
			class="d-flex align-items-center gap-2"
		>
			<RadioButton
				v-model="model"
				:disabled="disabled"
				:name="name"
				:value="value.value"
			/>
			<label
				for="input"
				class="text-bold"
				>{{ value.label }}</label
			>
		</div>
		<div
			v-if="error != null"
			class="text-danger"
		>
			{{ error }}
		</div>
	</div>
</template>

<script>
	import RadioButton from "primevue/radiobutton";

	export default {
		components: {
			RadioButton,
		},
		props: {
			label: {
				type: String,
				required: true,
			},
			error: {
				type: String,
				default: null,
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			name: {
				type: String,
				required: true,
			},
			values: {
				type: Array,
				required: true,
			},
		},
		data: () => ({
			model: null,
		}),
		watch: {
			model(newValue) {
				this.$emit("change-value", newValue);
			},
		},
	};
</script>
