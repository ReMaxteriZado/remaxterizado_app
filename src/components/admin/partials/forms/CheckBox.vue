<template>
	<div>
		<div v-if="binary" class="d-flex align-items-center gap-2">
			<Checkbox
				v-model="model"
				:disabled="disabled"
				:binary="true"
			/>
			<label
				for="input"
				class="text-bold"
				>{{ label }}</label
			>
		</div>

		<div v-else>
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
				<Checkbox
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
	import Checkbox from "primevue/checkbox";

	export default {
		components: {
			Checkbox,
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
			binary: {
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
