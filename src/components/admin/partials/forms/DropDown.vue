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
		props: [
			"label",
			"options",
			"optionValue",
			"optionLabel",
			"filter",
			"showClear",
			"error",
			"displayText",
			"displayTextSeparator",
			"disabled",
		],
		data: () => ({
			model: null,
		}),
		methods: {
			formatText(option) {
				if (Array.isArray(this.displayText)) {
					let text = "";

					this.displayText.forEach((item, index) => {
						text += option[item];

						if (index < this.displayText.length - 1) {
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
