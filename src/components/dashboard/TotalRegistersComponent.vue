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

export default {
  components: {
    Chart,
    Card,
  },
  props: {
    data: {
      type: Object,
    },
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
  watch: {
    data() {
      if (this.data) {
        this.chartData.datasets[0].data = [
          this.data.totalCategories,
          this.data.totalLinks,
          this.data.totalCodes,
        ];

        this.chartData.labels = [
          "Categories: " + this.data.totalCategories,
          "Links: " + this.data.totalLinks,
          "Codes: " + this.data.totalCodes,
        ];
      }
    },
  },
};
</script>
