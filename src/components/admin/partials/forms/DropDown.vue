<template>
	<div>
		<label
			for="input"
			class="text-primary text-bold"
			>{{ label }}</label
		>

		<Dropdown
			v-model="model"
			:options="options"
			:optionValue="optionValue"
			:optionLabel="optionLabel"
			:filter="filter"
			:showClear="showClear"
			:placeholder="label"
			:disabled="disabled || options.length == 0"
			class="w-100"
			:class="[error != null ? 'p-invalid' : '']"
		>
			<template #option="slotProps">
				{{ formatText(slotProps.option) }}
			</template>
		</Dropdown>

		<div
			v-if="error != null"
			class="text-danger"
		>
			{{ error }}
		</div>
	</div>
</template>

<script>
	import Dropdown from "primevue/dropdown";

	export default {
		components: {
			Dropdown,
		},
		props: {
			label: {
				type: String,
				required: true,
			},
			options: {
				type: Array,
				required: true,
			},
			optionValue: {
				type: String,
				default: "id",
			},
			optionLabel: {
				type: String,
				default: "name",
			},
			filter: {
				type: Boolean,
				default: true,
			},
			showClear: {
				type: Boolean,
				default: true,
			},
			error: {
				type: String,
				default: null,
			},
			displayText: {
				type: [String, Array],
				required: true,
			},
			displayTextSeparator: {
				type: String,
				default: " ",
			},
			disabled: {
				type: Boolean,
				default: false,
			},
		},
		data: () => ({
			model: null,
		}),
		methods: {
			formatText(option) {
				if (Array.isArray(this.displayText)) {
					let text = "";

					this.displayText.forEach((item, index) => {
						if (item.includes(".")) {
							let parts = item.split(".");

							if (option[parts[0]] != null) {
								text += option[parts[0]][parts[1]];
							}
						} else {
							text += option[item];
						}

						if (text != "" && index < this.displayText.length - 1) {
							text += this.displayTextSeparator;
						}
					});

					return text;
				} else {
					return option[this.displayText];
				}
			},
		},
		watch: {
			model(newValue) {
				this.$emit("change-value", newValue);
			},
		},
	};
</script>
