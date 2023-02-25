<template>
	<div class="container">
		<div class="skills d-flex flex-wrap align-items-center justify-content-center">
			<div v-for="skill in skills" :key="skill" class="custom-badge px-5 py-3" @click="skill.active = !skill.active"
				:class="{ active: skill.active }">
				<div class="image-container d-flex justify-content-center align-items-center rounded"
					:style="{ backgroundColor: skill.bgColor }">
					<img :src="require(`@/assets/images/skills/${skill.img}`)" :alt="skill.label" width="25" />
				</div>
				{{ skill.label }}
			</div>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			skills: [
				{
					label: "Vue",
					img: "vue.png",
					bgColor: "#41b883",
					active: false,
				},
				{
					label: "Laravel",
					img: "laravel.png",
					bgColor: "#eb4d43",
					active: false,
				},
				{
					label: "JavaScript",
					img: "js.png",
					bgColor: "#f6a81d",
					active: false,
				},
				{
					label: "PHP",
					img: "php.png",
					bgColor: "#6180b6",
					active: false,
				},
				{
					label: "SCSS",
					img: "sass.png",
					bgColor: "#c76395",
					active: false,
				},
				{
					label: "CSS3",
					img: "css.png",
					bgColor: "#3595cf",
					active: false,
				},
				{
					label: "JQuery",
					img: "jquery.png",
					bgColor: "#1163a4",
					active: false,
				},
				{
					label: "GIT",
					img: "git.png",
					bgColor: "#e84d31",
					active: false,
				},
				{
					label: "HTML5",
					img: "html5.png",
					bgColor: "#e96228",
					active: false,
				},
				{
					label: "SQL",
					img: "sql.png",
					bgColor: "#d88d28",
					active: false,
				},
				{
					label: "Android",
					img: "android.png",
					bgColor: "#3bd481",
					active: false,
				},
			]
		};
	},
};
</script>

<style lang="scss" scoped>
.skills {
	gap: 2rem;

	.custom-badge {
		background-color: white;
		color: $secondary;
		transition: $transition;
		cursor: pointer;
		box-shadow: $smooth-box-shadow;
		border-radius: $border-radius;
		position: relative;

		.image-container {
			width: 3rem;
			height: 3rem;
			position: absolute;
			top: -1rem;
			left: -1rem;
			overflow: hidden;
			transition: $transition;

			img {
				z-index: 5;
			}

			&::after {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: black;
				opacity: 0;
				transition: $transition;
			}
		}

		&.active,
		&:hover {
			transform: translate(3px, 3px);

			.image-container {
				top: 50%;
				transform: translateY(-50%);
			}
		}

		&.active {
			background-color: $secondary;
			color: white;

			.image-container {

				&::after {
					opacity: 0.4;
				}
			}
		}
	}
}
</style>