<template>
	<form id="filters" class="d-flex align-items-center gap-3 pb-1">
		<div v-for="(filter, index) in filters" :key="index" class="filter">
			<div v-if="filter.type == 'string'" v-tooltip.top="filter.placeholder">
				<InputText
					:name="filter.name"
					v-model="filter.value"
					:placeholder="filter.placeholder"
				/>
			</div>
			<div v-if="filter.type == 'dropdown'" v-tooltip.top="filter.placeholder">
				<Dropdown
					v-model="filter.value"
					:options="filter.options"
					optionLabel="label"
					optionValue="value"
					:placeholder="filter.placeholder"
					:showClear="true"
				/>
				<input hidden type="text" :name="filter.name" :value="filter.value" />
			</div>
			<div v-if="filter.type == 'date'" v-tooltip.top="filter.placeholder">
				<Calendar
					:name="filter.name"
					v-model="filter.value"
					dateFormat="dd/mm/yy"
					:placeholder="filter.placeholder"
					:manualInput="true"
				/>
				<input hidden type="text" :name="filter.name" :value="filter.value" />
			</div>
		</div>
	</form>
</template>

<script>
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";

export default {
	components: {
		InputText,
		Calendar,
		Dropdown,
	},
	props: {
		filters: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang="scss" scoped>
$width: 10rem;

#filters {
	overflow-x: auto;

	.filter {
		width: $width;
	}
}

.p-input-icon-left > i:first-of-type {
	z-index: 50;
}

:deep(.p-calendar .p-inputtext) {
	width: $width;
}

:deep(.p-dropdown) {
	width: $width;
}

:deep(input) {
	width: $width;
}
</style>
