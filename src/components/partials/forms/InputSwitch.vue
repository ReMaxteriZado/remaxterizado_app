<template>
	<div class="d-flex flex-column">
		<label
			for="input"
			class="text-primary text-bold"
			>{{ label }}</label
		>

		<InputSwitch
			v-model="model"
			:disabled="disabled"
			:placeholder="label"
			:trueValue="1"
			:falseValue="0"
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
	import InputSwitch from "primevue/inputswitch";

	export default {
		components: {
			InputSwitch,
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
