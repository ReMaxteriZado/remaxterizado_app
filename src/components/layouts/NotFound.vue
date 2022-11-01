<template>
	<div class="not-found"></div>
</template>

<script>
export default {
	beforeCreate() {
		this.$router.push({ path: "/login" });
	},
};
</script>
