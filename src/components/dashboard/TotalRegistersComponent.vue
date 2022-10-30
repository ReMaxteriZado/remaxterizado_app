<template>
	<Card>
		<template #title> Registros totales </template>
		<template #content>
			<Chart type="doughnut" :data="chartData" :options="lightOptions" />
		</template>
	</Card>
</template>

<script>
import Chart from "primevue/chart";
import Card from "primevue/card";

import { mapActions } from "vuex";

export default {
	components: {
		Chart,
		Card,
	},
	data() {
		return {
			chartData: {
				labels: ["Categories", "Links", "Codes"],
				datasets: [
					{
						data: [1, 1, 1],
						backgroundColor: ["#ff4f5a", "#36A2EB", "#FFCE56"],
						hoverBackgroundColor: ["#ff4f5a", "#36A2EB", "#FFCE56"],
					},
				],
			},
			lightOptions: {
				plugins: {
					legend: {
						labels: {
							color: "#495057",
						},
					},
					tooltip: {
						enabled: false,
					},
				},
			},
		};
	},
	methods: {
		...mapActions(["getStats"]),
	},
	mounted() {
		this.getStats().then((response) => {
			this.chartData.datasets[0].data = [
				response.data.totalCategories,
				response.data.totalLinks,
				response.data.totalCodes,
			];

			this.chartData.labels = [
				"Categories: " + response.data.totalCategories,
				"Links: " + response.data.totalLinks,
				"Codes: " + response.data.totalCodes,
			];
		});
	},
};
</script>
