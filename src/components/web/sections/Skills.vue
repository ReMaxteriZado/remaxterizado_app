<template>
	<div class="container">
		<div
			class="skills d-flex flex-wrap align-items-center justify-content-center"
		>
			<div
				v-for="skill in skills"
				:key="skill"
				class="custom-badge p-2 px-md-5 py-md-3"
			>
				<div
					class="image-container d-flex justify-content-center align-items-center rounded"
					:style="{ backgroundColor: skill.bgColor }"
				>
					<img
						:src="require(`@/assets/images/skills/${skill.img}`)"
						:alt="skill.label"
						width="25"
					/>
				</div>
				<div class="skill-label text-center">
					{{ skill.label }}
				</div>
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
					},
					{
						label: "Laravel",
						img: "laravel.png",
						bgColor: "#eb4d43",
					},
					{
						label: "JavaScript",
						img: "js.png",
						bgColor: "#f6a81d",
					},
					{
						label: "PHP",
						img: "php.png",
						bgColor: "#6180b6",
					},
					{
						label: "SCSS",
						img: "sass.png",
						bgColor: "#c76395",
					},
					{
						label: "CSS3",
						img: "css.png",
						bgColor: "#3595cf",
					},
					{
						label: "JQuery",
						img: "jquery.png",
						bgColor: "#1163a4",
					},
					{
						label: "GIT",
						img: "git.png",
						bgColor: "#e84d31",
					},
					{
						label: "HTML5",
						img: "html5.png",
						bgColor: "#e96228",
					},
					{
						label: "SQL",
						img: "sql.png",
						bgColor: "#d88d28",
					},
					{
						label: "Android",
						img: "android.png",
						bgColor: "#3bd481",
					},
				],
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
			cursor: default;
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
			}

			&:hover {
				transform: translate(2px, 2px);

				.image-container {
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}

	@media (min-width: $mobile-min-width) and (max-width: $large-tablet-max-width) {
		.skills {
			gap: 1rem;

			.custom-badge {
				width: 40%;
				display: flex;
				align-items: center;
				gap: 0.5rem;
				font-size: 0.8rem;

				.image-container {
					width: 3rem;
					height: 3rem;
					position: relative;
					top: unset;
					left: unset;
				}

				&:hover {
					transform: unset;

					.image-container {
						top: auto;
						transform: unset;
					}
				}

				.skill-label {
					width: calc(100% - 3.5rem);
				}
			}
		}
	}
</style>
