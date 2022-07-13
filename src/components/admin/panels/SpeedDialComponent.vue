<template>
    <SpeedDial
        :model="speed_dial"
        :radius="120"
        direction="down-right"
        type="quarter-circle"
        @click="show_actions = !show_actions"
        :tooltipOptions="{ position: 'right' }"
        :transitionDelay="100"
        showIcon="pi pi-bars"
        hideIcon="pi pi-times"
    />
</template>

<script>
import SpeedDial from "primevue/speeddial";

// import mapacions
import { mapActions } from "vuex";


export default {
    components: {
        SpeedDial,
    },
    data() {
        return {
            speed_dial: [
                {
                    label: "Go website",
                    icon: "pi pi-globe",
                    command: () => {
                        this.$router.push("/");
                    },
                },
                {
                    label: "Edit profile",
                    icon: "pi pi-pencil",
                    command: () => {
                        alert("Edit");
                    },
                },
                {
                    label: "Log out",
                    icon: "pi pi-power-off",
                    command: () => {
                        this.logout();
                    },
                },
                {
                    label: "Dashboard",
                    icon: "pi pi-home",
                    command: () => {
                        this.$router.push("/admin/dashboard");
                    },
                },
            ],
            show_actions: false,
        };
    },
    methods: {
        ...mapActions(["logout"]),
    },
};
</script>
