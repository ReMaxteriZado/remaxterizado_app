<template>
	<div>
		<label for="basic" class="text-primary fw-bold">{{ label }}</label>

		<Calendar
			v-model="formattedDate"
			:disabled="disabled"
			:placeholder="label"
			:showButtonBar="showButtonBar"
			:showTime="showTime"
			:dateFormat="dateFormat"
			:timeOnly="timeOnly"
			class="w-100"
			:class="[error != null ? 'p-invalid' : '']"
			@date-select="onDateSelect($event)"
			@clear-click="clearDate()"
		>
		</Calendar>

		<div v-if="error != null" class="text-danger">
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
			timeOnly: {
				type: Boolean,
				default: false,
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
			clearDate() {
				this.control = true;
				this.model = null;
			},
		},
		watch: {
			model(newValue) {
				if (newValue != null) {
					if (!this.timeOnly) {
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
					} else {
						// if type of newValue is string, create Date with the time
						if (typeof newValue === "string") {
							const date = new Date();
							const [hours, minutes] = newValue.split(":");

							date.setHours(hours);
							date.setMinutes(minutes);

							newValue = date;
						}

						if (!this.control) {
							this.formattedDate = this.$helper.formatDate(newValue, "HH:mm");
						}

						newValue = this.$helper.formatDate(newValue, "HH:mm");
					}
				} else {
					this.formattedDate = null;
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
