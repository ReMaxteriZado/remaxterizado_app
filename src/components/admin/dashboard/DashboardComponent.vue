<template>
    <div>
        <Title :title="'Welcome ' + userLogged?.name" />

        <div class="row">
            <div class="col-12 col-md-6 col-lg-3 h-auto">
                <TotalRegisters class="h-100" />
            </div>
            <div class="col-12 col-md-6 h-auto">
                <MaxCategories class="h-100" />
            </div>
            <!-- <div class="col-12 mt-4">
                <LinksTable />
            </div> -->
        </div>

        <Listbox :options="tasks" />
    </div>
</template>

<script>
import Listbox from "primevue/listbox";

import Title from "@/components/admin/partials/TitleComponent.vue";
import TotalRegisters from "@/components/admin/dashboard/TotalRegistersComponent.vue";
import MaxCategories from "@/components/admin/dashboard/MaxCategoriesComponent.vue";
// import LinksTable from "@/components/admin/links/LinksTableComponent.vue";

import { mapState } from "vuex";

export default {
    components: {
        Listbox,
        Title,
        TotalRegisters,
        MaxCategories,
        // LinksTable,
    },
    data() {
        return {
            tasks: [
                "cuando se recarga una tabla, que se tenga en cuenta el filtro",
                "hacer que los codigos sean algo como codepend, donde se puedan añadir varios tipos de bloques de codigo para ajuntar un HTML, JS, CSS o PHP o lo que corresponda al link",
                "si buscamos una categoria, borramos y volvemos a buscar la misma, borramos y volvemos a buscar la misma se empieza a duplicar la opción infinitamente",
                "crear CRON para guardar la BBDD automaticamente",
                "Si un link se queda sin categoria por haberla borrado, que se muestre una alerta en el dashboard con la cantidad de links pendientes, además de poder filtrarlos en la tabla de links",
                "Hacer el CRUD del usuario conectado",
                "añadir botones para desplegar todas las carpetas de las categorías",
                "si creo una categoria sin padre (nivel 0), aparece como que tiene hijos pero no los tiene",
                "si hacemos CTRL + INTRO que se envie el formulario",
                "poder personalizar la posición de una categoría respecto a otra",
                "validar que si se ha añadido un enlace no se vuelva a poder añadir",
                "añadir estadísticas al dashboard",
                "crear CRON para obtener los favicons de los links",
                "añadir user_id a toda la BBDD para que solo se vea lo correspondiente al usuario en cuestion",
                "que se puedan adjuntar capturas de pantalla a modo de guía",
            ],
        };
    },
    computed: {
        ...mapState(["userLogged"]),
    },
};
</script>

<style lang="scss" scoped>
:deep(.p-card) {
    border-radius: $border-radius;
    box-shadow: $smooth-box-shadow !important;
}
</style>
