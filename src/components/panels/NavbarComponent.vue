<template>
    <nav class="d-flex justify-content-end align-items-center gap-3">
        <LinkComponent
            v-for="(link, key) in links"
            :key="key"
            :href="link.href"
            :text="link.text"
            :isSection="link.isSection"
            @click="link.action != undefinded ? showSidebar() : null"
        />
    </nav>
</template>

<script>
    import LinkComponent from "../partials/LinkComponent.vue";

    export default {
        components: {
            LinkComponent,
        },
        data() {
            return {
                links: [
                    {
                        href: "/",
                        text: "Home",
                        isSection: false,
                    },
                    {
                        href: "#knowledges",
                        text: "My Knowledges",
                        isSection: true,
                    },
                    {
                        href: "#contact-form",
                        text: "Contact Form",
                        isSection: true,
                    },
                    {
                        href: "/about",
                        text: "About",
                        isSection: false,
                    },
                    {
                        href: "/users",
                        text: "Users",
                        isSection: false,
                    },
                    {
                        href: "#login",
                        text: "Login",
                        isSection: false,
                        action: "showSidebar",
                    },
                ],
            };
        },
        methods: {
            showSidebar() {
                this.$store.commit("toggleSidebar", true);
            },
        },
    };
</script>

<style lang="scss" scoped>
    nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.25);
        box-shadow: 0 5px 20px 0 rgba(white, 0.15);
        backdrop-filter: blur(4px);
        border: 1px solid rgba(255, 255, 255, 0.18);
    }
</style>
