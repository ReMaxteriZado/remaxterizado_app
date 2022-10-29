<template>
    <Card>
        <template #title> Total registers </template>
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
                response.data.total_categories,
                response.data.total_links,
                response.data.total_codes,
            ];

            this.chartData.labels = [
                "Categories: " + response.data.total_categories,
                "Links: " + response.data.total_links,
                "Codes: " + response.data.total_codes,
            ];
        });
    },
};
</script>
