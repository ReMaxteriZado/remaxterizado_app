<template>
    <Breadcrumb :home="home" :model="items">
        <template #item="{ item }">
            <router-link
                :to="item.url"
                v-if="item.url"
                class="link text-primary"
            >
                <i v-if="item.icon" :class="item.icon"></i>
                <span>{{ item.label }}</span>
            </router-link>
            <span class="link text-primary" v-else>{{ item.label }}</span>
        </template>
    </Breadcrumb>
</template>

<script>
import Card from "primevue/card";
import Breadcrumb from "primevue/breadcrumb";

export default {
    components: {
        Breadcrumb,
        Card,
    },
    data: () => ({
        home: {
            label: "Inicio",
            url: "/admin/dashboard",
        },
        items: [],
    }),
    mounted() {
        if (this.$route.name != undefined) {
            this.$route.name.split("/").forEach((bread) => {
                this.items.push({ label: bread });
            });
        }
    },
    watch: {
        $route(to) {
            this.items = [];

            if (to.name != undefined) {
                to.name.split("/").forEach((bread, index) => {
                    let path = to.path.split("/");
                    let url = "";

                    for (let i = 0; i <= index + 1; i++) {
                        url += "/" + path[i + 1];
                    }

                    this.items.push({ label: bread, url: url });
                });

                // remove url prop for last items item
                this.items[this.items.length - 1].url = null;

                // Incluir el ID del elemento editando en el breadcrumb
                // if (to.params?.id != undefined) {
                //     this.items.push({ label: to.params?.id });
                // }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.link {
    text-decoration: none;
}
</style>
