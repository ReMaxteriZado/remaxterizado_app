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
		props: ["label", "error", "disabled"],
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
