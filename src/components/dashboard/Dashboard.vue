<template>
  <div>
    <div class="row gy-4">
      <div class="col-12 col-md-6 col-lg-3">
        <TotalRegisters :data="stats" />
      </div>
      <div class="col-12 col-md-6">
        <MaxCategories :data="stats" />
      </div>
      <div class="col-12">
        <Card>
          <template #content>
            <FormTitle :title="'Tareas'" />
            <Listbox :options="tasks" class="mt-2" />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "primevue/card";
import Listbox from "primevue/listbox";

import TotalRegisters from "@/components/dashboard/TotalRegisters.vue";
import MaxCategories from "@/components/dashboard/MaxCategories.vue";

import { mapActions, mapState } from "vuex";

export default {
  components: {
    Card,
    Listbox,
    TotalRegisters,
    MaxCategories,
  },
  data() {
    return {
      tasks: [
        "hacer que los codigos sean algo como codepend, donde se puedan añadir varios tipos de bloques de codigo para ajuntar un HTML, JS, CSS o PHP o lo que corresponda al link",
        "Hacer el CRUD del usuario conectado",
        "si creo una categoria sin padre (nivel 0), aparece como que tiene hijos pero no los tiene",
        "poder personalizar la posición de una categoría respecto a otra",
        "validar que si se ha añadido un enlace no se vuelva a poder añadir",
        "añadir estadísticas al dashboard",
        "crear CRON para obtener los favicons de los links",
        "añadir user_id a toda la BBDD para que solo se vea lo correspondiente al usuario en cuestion",
        "que se puedan adjuntar capturas de pantalla a modo de guía",
      ],
      stats: null,
    };
  },
  computed: {
    ...mapState(["userLogged"]),
  },
  methods: {
    ...mapActions(["getStats"]),
  },
  mounted() {
    this.getStats().then((response) => {
      this.stats = response.data;
    });
  },
};
</script>

<style lang="scss" scoped>
:deep(.p-listbox) {
  .p-listbox-list {
    padding: 0;
  }
}
</style>
