<template>
	<div>
		<label
			for="basic"
			class="text-primary text-bold"
			>{{ label }}</label
		>

		<Calendar
			v-model="model"
			:disabled="disabled"
			:placeholder="label"
			:showButtonBar="true"
			:showTime="showTime"
			class="w-100"
			dateFormat="dd/mm/yy"
		>
		</Calendar>

		<div
			v-if="error != null"
			class="text-danger"
		>
			{{ error }}
		</div>
	</div>
</template>

<script>
	import Calendar from "primevue/calendar";

	export default {
		components: {
			Calendar,
		},
		props: ["label", "error", "displayText", "disabled", "form", "showTime"],
		data: () => ({
			model: null,
		}),
		watch: {
			model(newValue) {
				if (newValue != null) {
					newValue = this.$helper.formatDate(
						newValue,
						this.showTime ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD"
					);
				}

				this.$emit("change-value", newValue);
			},
		},
	};
</script>
