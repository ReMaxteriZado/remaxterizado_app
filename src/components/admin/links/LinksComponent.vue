<template>
	<div>
		<TitleComponent title="Links" />
		<LinksTable />
		<NewLink />
	</div>
</template>

<script>
	import TitleComponent from "@/components/admin/partials/TitleComponent.vue";
	import LinksTable from "./LinksTable.vue";
	import NewLink from "./LinksForm.vue";

	export default {
		components: {
			TitleComponent,
			LinksTable,
			NewLink,
		},
	};
</script>
