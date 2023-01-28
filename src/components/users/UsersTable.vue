<template>
  <TableDefault
    :route="route"
    :stateVariable="stateVariable"
    :list="users.list"
    :total="users.listTotal"
    :filters="filters"
    :delete="'users'"
  >
    <template #columns>
      <Column header="Nombre" field="name"></Column>
      <Column header="Email" field="email"></Column>
      <Column header="Rol" field="role.slug"></Column>
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
          name: "email",
          value: null,
          type: "string",
          placeholder: "Email",
        },
        {
          name: "role",
          value: null,
          type: "string",
          placeholder: "Rol",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["incrementViews"]),
  },
  computed: {
    ...mapState(["users"]),
  },
};
</script>
