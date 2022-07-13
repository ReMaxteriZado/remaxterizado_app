<template>
    <div id="web-layout">
        <SidebarComponent />
        <FloatingButtonComponent />
        <NavbarComponent />
        <HeaderComponent />
        <router-view></router-view>
        <FooterComponent />
    </div>
</template>

<script>
import FloatingButtonComponent from "../partials/FloatingButtonComponent.vue";
import NavbarComponent from "../panels/NavbarComponent.vue";
import HeaderComponent from "../panels/HeaderComponent.vue";
import SidebarComponent from "../panels/SidebarComponent.vue";
import FooterComponent from "../panels/FooterComponent.vue";

export default {
    components: {
        FloatingButtonComponent,
        NavbarComponent,
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
    },
};
</script>
