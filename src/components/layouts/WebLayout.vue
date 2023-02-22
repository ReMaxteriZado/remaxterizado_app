<template>
	<div class="web">
		<Navbar />
		<Header class="mt-5" />
		<About class="mt-5" />
        <Projects class="mt-5" />
		<Footer class="mt-5" />
	</div>
</template>

<script>
import Navbar from "@/components/web/sections/Navbar.vue";
import Header from "@/components/web/sections/Header.vue";
import About from "@/components/web/sections/About.vue";
import Projects from "@/components/web/sections/Projects.vue";
import Footer from "@/components/web/sections/Footer.vue";

export default {
	components: {
		Navbar,
		Header,
		About,
        Projects,
		Footer,
	},
};
</script>

<style lang="scss" scoped>
</style>