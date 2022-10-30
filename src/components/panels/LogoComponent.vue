<template>
	<div
		class="logo d-flex align-items-center justify-content-center bg-white p-3"
	>
		<router-link
			to="/admin/dashboard"
			class="d-flex justify-content-center align-items-center"
		>
			<img src="@/assets/images/logotipo.jpeg" />
		</router-link>
	</div>
</template>

<script>
export default {};
</script>

<style
	lang="scss"
	scoped
>
.logo {
	position: sticky;
	left: 0;
	top: 0;
	z-index: 50;

	img {
		max-width: 70px;
		max-height: 70px;
		border-radius: 100%;
	}
}
</style>
