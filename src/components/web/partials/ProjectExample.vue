<template>
	<div class="project d-flex flex-wrap">
		<div class="image col-12 col-md-4">
			<div class="techs d-flex justify-content-between align-items-center gap-2">
				<img src="@/assets/images/logotipo-sin-fondo.png" width="25" />
				<img src="@/assets/images/logotipo-sin-fondo.png" width="25" />
				<img src="@/assets/images/logotipo-sin-fondo.png" width="25" />
			</div>
		</div>
		<div class="col-12 col-md-8 p-3">
			<p class="text-limit mb-0">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus sapiente,
				illo odit voluptatibus accusamus vero excepturi atque. Rerum optio vitae
				enim odit recusandae omnis dolore, nam velit ducimus, ullam a!
			</p>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.project {
	height: 10rem;
	border-radius: $border-radius;
	overflow: hidden;
	background-color: white;
	box-shadow: $smooth-box-shadow;

	.image {
		background-image: url("@/assets/images/header.jpeg");
		background-position: center;
		background-size: cover;
		position: relative;

		.techs {
			position: absolute;
			bottom: 0.5rem;
			right: 0.5rem;
		}
	}

	.text-limit {
		display: -webkit-box;
		-webkit-line-clamp: 5;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
}
</style>