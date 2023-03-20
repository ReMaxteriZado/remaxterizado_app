<template>
	<div class="web">
		<Navbar />
		<Header class="mt-5" />
		<About class="about" />
		<Experience class="experience" />
		<Skills class="skills" />
		<Projects class="projects" />
		<Footer class="footer" />
	</div>
</template>

<script>
import Navbar from "@/components/web/sections/Navbar.vue";
import Header from "@/components/web/sections/Header.vue";
import About from "@/components/web/sections/About.vue";
import Experience from "@/components/web/sections/Experience.vue";
import Skills from "@/components/web/sections/Skills.vue";
import Projects from "@/components/web/sections/Projects.vue";
import Footer from "@/components/web/sections/Footer.vue";

export default {
	components: {
		Navbar,
		Header,
		About,
		Experience,
		Skills,
		Projects,
		Footer,
	},
};
</script>

<style lang="scss" scoped>
.about,
.experience,
.skills,
.projects,
.footer {
	margin-top: 8rem;
}
</style>