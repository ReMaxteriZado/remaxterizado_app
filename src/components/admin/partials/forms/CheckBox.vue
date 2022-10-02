<template>
	<div>
		<div class="d-flex align-items-center gap-2">
			<Checkbox
				v-model="model"
				:disabled="disabled"
                :name="name"
				:value="value"
				:binary="binary"
			/>
			<label
				class="text-primary text-bold"
				>{{ label }}</label
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
	import Checkbox from 'primevue/checkbox';

	export default {
		components: {
			Checkbox,
		},
		props: ["label", "error", "disabled", "name", "value", "binary"],
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