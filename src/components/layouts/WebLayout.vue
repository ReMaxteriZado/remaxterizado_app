<template>
	<div class="web">
		<Sidebar />
		<Navbar />
		<Header class="mt-md-5" />
		<About id="about-me" class="about" />
		<Experience id="experience" class="experience" />
		<Skills class="skills" />
		<Footer id="contact" class="footer" />
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

	export default {
		components: {
			Sidebar,
			Navbar,
			Header,
			About,
			Experience,
			Skills,
			Footer,
		},
	};
</script>

<style lang="scss" scoped>
	.about,
	.experience,
	.skills {
		padding-top: 8rem;
	}

	.footer {
		margin-top: 8rem;
	}

	@media (min-width: $mobile-min-width) and (max-width: $mobile-max-width) {
		.about,
		.experience,
		.skills {
			padding-top: 4rem;
		}

		.footer {
			margin-top: 4rem;
		}
	}
</style>
