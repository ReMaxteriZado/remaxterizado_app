<template>
	<div class="web">
		<Sidebar />
		<Navbar />
		<Header />
		<About id="about-me" />
		<Experience id="experience" />
		<Skills />
		<Footer id="contact" class="footer" />
		<ToggleSidebarButton />
	</div>
</template>

<script>
	import Sidebar from "@/components/web/sections/Sidebar.vue";
	import Navbar from "@/components/web/sections/Navbar.vue";
	import Header from "@/components/web/sections/Header.vue";
	import About from "@/components/web/sections/About.vue";
	import Experience from "@/components/web/sections/Experience.vue";
	import Skills from "@/components/web/sections/Skills.vue";
	import Footer from "@/components/web/sections/Footer.vue";
	import ToggleSidebarButton from "@/components/web/partials/ToggleSidebarButton.vue";

	export default {
		components: {
			Sidebar,
			Navbar,
			Header,
			About,
			Experience,
			Skills,
			Footer,
			ToggleSidebarButton,
		},
	};
</script>

<style lang="scss" scoped>
	.footer {
		margin-top: 8rem;
	}

	@media (min-width: $mobile-min-width) and (max-width: $large-tablet-max-width) {
		.footer {
			margin-top: 4rem;
		}
	}
</style>
