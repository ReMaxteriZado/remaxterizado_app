<template>
  <TableDefault
    :route="route"
    :stateVariable="stateVariable"
    :list="links.list"
    :total="links.listTotal"
    :filters="filters"
    :delete="'links'"
  >
    <template #columns>
      <Column header="Título" field="title"></Column>
      <Column header="Columna con formato">
        <template #body="slotProps">
          {{ slotProps.data.title }}
        </template></Column
      >
    </template>
  </TableDefault>
</template>

<script>
import Column from "primevue/column";
import { mapState } from "vuex";

export default {
  components: {
    Column,
  },
  props: {
    route: {
      type: String,
      required: true,
    },
    stateVariable: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      filters: [
        {
          name: "string",
          value: null,
          type: "string",
          placeholder: "String",
        },
        {
          name: "date",
          value: null,
          type: "date",
          placeholder: "Date",
        },
        {
          name: "dropdown",
          value: null,
          type: "dropdown",
          placeholder: "Dropdown",
          options: [
            {
              label: "Opción 1",
              value: 1,
            },
            {
              label: "Opción 2",
              value: 2,
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState(["links"]),
  },
};
</script>
