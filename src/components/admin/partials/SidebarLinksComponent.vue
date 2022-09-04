<template>
    <div class="w-100 d-flex flex-column">
        <div v-for="(item, index) in items" :key="index">
            <div v-if="$helper.checkUserHasPermission(item.permission)">
                <div v-if="!item.items">
                    <Link class="px-3" :item="item" />
                </div>
                <div v-else>
                    <Accordion @click="item.right_down = !item.right_down">
                        <AccordionTab>
                            <template #header>
                                <div
                                    class="link w-100 d-flex align-items-center justify-content-between px-3 py-3 p-ripple"
                                    v-ripple
                                >
                                    <div
                                        class="d-flex align-items-center gap-2"
                                    >
                                        <i :class="item.icon"></i>
                                        <p class="mb-0">{{ item.label }}</p>
                                    </div>
                                    <i
                                        class="pi"
                                        :class="[
                                            item.right_down
                                                ? 'pi-chevron-down'
                                                : 'pi-chevron-right',
                                        ]"
                                    ></i>
                                </div>
                            </template>
                            <div class="d-flex flex-column">
                                <div
                                    v-for="(subItem, subIndex) in item.items"
                                    :key="subIndex"
                                >
                                    <div
                                        v-if="
                                            $helper.checkUserHasPermission(
                                                subItem.permission
                                            )
                                        "
                                    >
                                        <Link class="ps-5" :item="subItem" />
                                    </div>
                                </div>
                            </div>
                        </AccordionTab>
                    </Accordion>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";

import Link from "./LinkComponent.vue";

export default {
    components: {
        Accordion,
        AccordionTab,
        Link,
    },
    data() {
        return {
            items: [
                {
                    label: "Test",
                    icon: "fa-solid fa-coffee",
                    href: "/admin/dashboard",
                    permission: "all",
                    is_fontawesome_icon: true,
                },
                {
                    label: "Dashboard",
                    icon: "pi pi-home",
                    href: "/admin/dashboard",
                    permission: "all",
                },
                {
                    label: "Libro de incidencias",
                    icon: "pi pi-list",
                    href: "/admin/incidences",
                    permission: "centers-read",
                },
                {
                    label: "Empleados",
                    icon: "pi pi-users",
                    href: "/admin/users",
                    permission: "users-read",
                },
                {
                    label: "Usuarios",
                    icon: "pi pi-users",
                    href: "/admin/patients",
                    permission: "patients-read",
                },
                {
                    label: "Reuniones",
                    icon: "pi pi-clock",
                    href: "/admin/meetings",
                    permission: "meetings-read",
                },
                {
                    label: "Roles",
                    icon: "pi pi-user",
                    href: "/admin/roles",
                    permission: "roles-create",
                },
                {
                    label: "Mi centro",
                    icon: "pi pi-home",
                    permission: "all",
                    right_down: false,
                    items: [
                        {
                            label: "Reuniones",
                            href: "/admin/dashboard",
                            permission: "all",
                        },
                        {
                            label: "Registros diarios",
                            href: "/admin/dashboard",
                            permission: "all",
                        },
                        {
                            label: "Actividades",
                            href: "/admin/dashboard",
                            permission: "all",
                        },
                        {
                            label: "Usuarios",
                            href: "/admin/my_center/patients",
                            permission: "all",
                        },
                    ],
                },
                {
                    label: "RRHH",
                    icon: "pi pi-users",
                    permission: "all",
                    right_down: false,
                    items: [
                        {
                            label: "Mi perfil",
                            href: "/admin/my_profile",
                            permission: "all",
                        },
                        {
                            label: "Mis ausencias",
                            href: "/admin/absences",
                            permission: "all",
                        },
                        {
                            label: "Fichaje",
                            href: "/admin/registers",
                            permission: "all",
                        },
                        {
                            label: "Empleados",
                            href: "/admin/employees",
                            permission: "all",
                        },
                        {
                            label: "Calendario",
                            href: "/admin/calendar",
                            permission: "all",
                        },
                    ],
                },
                {
                    label: "Empresa",
                    icon: "pi pi-cog",
                    permission: "all",
                    items: [
                        // {
                        //     label: "Prioridades",
                        //     icon: "pi pi-list",
                        //     href: "/admin/priorities",
                        //     permission: "priorities-read",
                        // },
                        {
                            label: "Tipos de jornada",
                            icon: "pi pi-list",
                            href: "/admin/workday_types",
                            permission: "workday_types-read",
                        },
                        {
                            label: "Coches",
                            icon: "pi pi-list",
                            href: "/admin/cars",
                            permission: "cars-read",
                        },
                        {
                            label: "Rutas",
                            icon: "pi pi-list",
                            href: "/admin/routes",
                            permission: "routes-read",
                        },
                        {
                            label: "Centros",
                            icon: "pi pi-list",
                            href: "/admin/centers",
                            permission: "centers-read",
                        },
                        {
                            label: "Proveedores",
                            icon: "pi pi-list",
                            href: "/admin/suppliers",
                            permission: "suppliers-read",
                        },
                        {
                            label: "Tipos de incidencias",
                            icon: "pi pi-list",
                            href: "/admin/incidences_types",
                            permission: "incidences_types-read",
                        },
                        {
                            label: "Áreas",
                            icon: "pi pi-list",
                            href: "/admin/areas",
                            permission: "areas-read",
                        },
                        {
                            label: "Tipos de reuniones",
                            icon: "pi pi-list",
                            href: "/admin/meeting_types",
                            permission: "meeting_types-read",
                        },
                        {
                            label: "Tipos de contratos",
                            icon: "pi pi-list",
                            href: "/admin/contracts_types",
                            permission: "contracts_types-read",
                        },
                        {
                            label: "Tipos de jornadas",
                            icon: "pi pi-list",
                            href: "/admin/workshops_types",
                            permission: "workshops_types-read",
                        },
                        {
                            label: "Tipos de ausencias",
                            icon: "pi pi-list",
                            href: "/admin/absence_types",
                            permission: "absence_types-read",
                        },
                        {
                            label: "Tipos de plaza",
                            icon: "pi pi-list",
                            href: "/admin/patients_positions",
                            permission: "patients_positions-read",
                        },
                        {
                            label: "Festivos",
                            icon: "pi pi-list",
                            href: "/admin/public_holidays",
                            permission: "public_holidays-read",
                        },
                    ],
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>

:deep(.p-accordion .p-accordion-header .p-accordion-header-link) {
    background-color: white;
    border: none;
    color: $text;
    font-weight: bold;
    padding: 0;

    &:focus {
        box-shadow: none !important;
    }
}

:deep(.p-accordion-toggle-icon) {
    display: none;
}

:deep(.p-accordion .p-accordion-content) {
    padding: 0;
    border: none;
}

:deep(.p-accordion
        .p-accordion-header:not(.p-disabled).p-highlight
        .p-accordion-header-link) {
    background-color: #e5e5e5;
}
</style>
