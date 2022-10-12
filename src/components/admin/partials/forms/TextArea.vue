<template>
	<div>
		<label
			for="input"
			class="text-primary text-bold"
			>{{ label }}</label
		>

		<Textarea
			class="w-100"
			v-model="model"
			:disabled="disabled"
			:placeholder="label"
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
	import Textarea from "primevue/textarea"

	export default {
		components: {
			Textarea,
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
				this.$emit("change-value", newValue)
			},
		},
	}
</script>
