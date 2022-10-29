<template>
	<div>
		<label
			for="basic"
			class="text-primary text-bold"
			>{{ label }}</label
		>

		<Calendar
			v-model="formattedDate"
			:disabled="disabled"
			:placeholder="label"
			:showButtonBar="showButtonBar"
			:showTime="showTime"
			:dateFormat="dateFormat"
			class="w-100"
			:class="[error != null ? 'p-invalid' : '']"
			@date-select="onDateSelect($event)"
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
			showTime: {
				type: Boolean,
				default: false,
			},
			dateFormat: {
				type: String,
				default: "dd/mm/yy",
			},
			showButtonBar: {
				type: Boolean,
				default: true,
			},
		},
		data: () => ({
			model: null,
			formattedDate: null,
			control: false,
		}),
		methods: {
			onDateSelect(event) {
				if (event != null) {
					this.control = true;
					this.model = event;
				}
			},
		},
		watch: {
			model(newValue) {
				if (newValue != null) {
					if (!this.control) {
						this.formattedDate = this.$helper.formatDate(
							newValue,
							this.showTime ? "DD/MM/YYYY HH:mm" : "DD/MM/YYYY"
						);
					}

					newValue = this.$helper.formatDate(
						newValue,
						this.showTime ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD"
					);
				}

				this.$emit("change-value", newValue);
			},
		},
		beforeUnmount() {
			this.model = null;
			this.formattedDate = null;
			this.control = false;
		},
	};
</script>
