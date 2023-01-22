<template>
  <TableDefault
    :route="route"
    :stateVariable="stateVariable"
    :list="roles.list"
    :total="roles.listTotal"
    :filters="filters"
    :delete="'roles'"
  >
    <template #columns>
      <Column header="Nombre" field="name"></Column>
      <Column header="Titular" field="slug"></Column>

      <Column header="Descripción">
        <template #body="slotProps">
          <LongTextColumn :data="slotProps.data.description" /> </template
      ></Column>
    </template>
  </TableDefault>
</template>

<script>
import Column from "primevue/column";
import { mapState, mapActions } from "vuex";

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
          name: "name",
          value: null,
          type: "string",
          placeholder: "Nombre",
        },
        {
          name: "slug",
          value: null,
          type: "string",
          placeholder: "Titular",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["incrementViews"]),
  },
  computed: {
    ...mapState(["roles"]),
  },
};
</script>
