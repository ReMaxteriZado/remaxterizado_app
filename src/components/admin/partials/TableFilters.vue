<template>
	<form id="filters" class="d-flex align-items-center gap-3 overflow-auto pb-1">
		<div v-for="(filter, index) in filters" :key="index" class="filter">
			<div v-if="filter.type == 'string'" class="p-input-icon-left">
				<i class="pi pi-search" />
				<InputText
					:name="filter.name"
					v-model="filter.value"
					:placeholder="filter.placeholder"
				/>
			</div>
			<div v-if="filter.type == 'dropdown'" class="p-input-icon-left">
				<i class="pi pi-search" />
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
			<div v-if="filter.type == 'date'" class="p-input-icon-left">
				<i class="pi pi-search" />
				<Calendar
					:name="filter.name"
					v-model="filter.value"
					dateFormat="dd/mm/yy"
					:placeholder="filter.placeholder"
					:manualInput="true"
				/>
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

.p-input-icon-left > i:first-of-type {
	z-index: 50;
}

:deep(.p-calendar .p-inputtext) {
	padding-left: 2.5rem;
}

:deep(.p-dropdown .p-dropdown-label) {
	padding-left: 2.5rem;
}

.filter {
	width: $width;
}

:deep(.p-dropdown) {
	width: $width;
}

:deep(input) {
	width: $width;
}

::-webkit-scrollbar {
	height: 12px;
}
</style>
