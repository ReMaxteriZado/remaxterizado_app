<template>
	<div>
		<label
			for="input"
			class="text-primary text-bold"
			>{{ label }}</label
		>

		<Password
			v-model="model"
			:disabled="disabled"
			:placeholder="label"
			:toggleMask="toggleMask"
			:feedback="feedback"
			class="w-100"
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
	import Password from "primevue/password";

	export default {
		components: {
			Password,
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
			toggleMask: {
				type: Boolean,
				default: true,
			},
			feedback: {
				type: Boolean,
				default: true,
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

<style
	lang="scss"
	scoped
>
	:deep(.p-inputtext) {
		width: 100%;
	}

	:deep(.pi.pi-eye) {
		cursor: pointer;
	}

	:deep(.pi.pi-eye-slash) {
		cursor: pointer;
	}
</style>
