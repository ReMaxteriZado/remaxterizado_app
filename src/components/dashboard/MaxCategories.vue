<template>
  <Card>
    <template #title> Categorías con más enlaces </template>
    <template #content>
      <Chart type="bar" :data="basicData" :options="basicOptions" />
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
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      basicData: {
        labels: [],
        datasets: [
          {
            label: "Categories",
            backgroundColor: "#ff4f5a",
            data: [],
          },
        ],
      },
      basicOptions: {
        plugins: {
          legend: {
            display: false,
            labels: {
              color: "#495057",
            },
          },
        },
      },
    };
  },
  methods: {
    ...mapActions(["getStats"]),
  },
  watch: {
    data() {
      if (this.data) {
        let values = [];

        this.data.categoriesMoreLinks.forEach((category) => {
          values.push(category.links_count);
          this.basicData.labels.push(category.name);
        });

        this.basicData.datasets[0].data = values;
      }
    },
  },
};
</script>
