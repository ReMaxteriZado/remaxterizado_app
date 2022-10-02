<template>
	<div>
		<TitleComponent title="Enlaces" />
		<LinksTable class="mt-4" />
		<LinksForm />
	</div>
</template>

<script>
	import TitleComponent from "@/components/admin/partials/TitleComponent.vue";
	import LinksTable from "./LinksTable.vue";
	import LinksForm from "./LinksForm.vue";

	export default {
		components: {
			TitleComponent,
			LinksTable,
			LinksForm,
		},
	};
</script>
