<template>
	<div class="not-found"></div>
</template>

<script>
export default {
	beforeCreate() {
		window.location.href = "/login";
	},
};
</script>
