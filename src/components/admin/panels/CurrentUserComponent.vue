<template>
    <div class="d-flex align-items-center gap-3 p-2">
        <div class="today">
            <span class="text-muted">Hoy es&nbsp;</span
            ><span class="text-primary text-bold">{{ currentDate }}</span>
        </div>
        <div class="vertical-line"></div>
        <div class="name" v-if="userLogged != null">
            <span class="text-muted">Hola,&nbsp;</span
            ><span class="text-primary text-bold"
                ><b>{{ userLogged.name }}</b></span
            >
            <Avatar :label="firstLetter" class="ms-2" />
        </div>
    </div>
</template>

<script>
import Avatar from "primevue/avatar";
import { mapState } from "vuex";

export default {
    components: {
        Avatar,
    },
    computed: {
        currentDate() {
            // format date into dd/MM
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;

            // translate current month into spanish
            let monthNames = [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre",
            ];

            return `${day} de ${monthNames[month - 1]}`;
        },
        firstLetter() {
            return this.userLogged.name.charAt(0);
        },
        ...mapState(["userLogged"]),
    },
};
</script>

<style lang="scss" scoped>
.today {
    position: relative;

    &:hover {
        &::after {
            opacity: 0;
        }
    }
}
.vertical-line {
    width: 2px;
    height: 60%;
    background-color: lightgray;
    transition: $transition;
}

:deep(.p-avatar) {
    background-color: rgba($primary, 20%);
    color: $primary;

    .p-avatar-text {
        font-weight: bold;
    }
}
</style>
