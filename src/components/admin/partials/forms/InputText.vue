<template>
	<div>
		<label
			for="input"
			class="text-primary text-bold"
			>{{ label }}</label
		>

		<InputText
			v-model="model"
			:disabled="disabled"
			:placeholder="label"
			type="text"
			class="w-100"
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
	import InputText from "primevue/inputtext"

	export default {
		components: {
			InputText,
		},
		props: ["label", "error", "disabled", "isNumber"],
		data: () => ({
			model: null,
		}),
		watch: {
			model(newValue) {
				let value = null

				if (this.isNumber && !isNaN(parseInt(newValue))) {
					value = parseInt(newValue)
				} else {
					value = newValue
				}

				this.$emit("change-value", value)
			},
		},
	}
</script>
