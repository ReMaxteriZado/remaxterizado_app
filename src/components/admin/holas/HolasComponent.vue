<template>
    <div>
        <TabView lazy>
            <TabPanel header="Áreas">
                <Table />
                <Form />
            </TabPanel>
        </TabView>
    </div>
</template>

<script>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

import Table from "./HolasTableComponent.vue";
import Form from "./HolasFormComponent.vue";

export default {
    components: {
        TabView,
        TabPanel,
        Table,
        Form,
    },
};
</script>
