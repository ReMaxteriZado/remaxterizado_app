<template>
	<div
		class="
			urrent-user
			d-flex
			align-items-center
			justify-content-between
			gap-3
			p-2
		"
	>
		<Button
			@click="toggleSidebar(true)"
			icon="pi pi-bars"
			class="p-button-rounded bg-primary d-md-none"
		/>
		<div class="today">
			<span class="text-muted">Hoy&nbsp;</span
			><span class="text-primary text-bold">{{ currentDate }}</span>
		</div>
		<div v-if="userLogged != null" class="vertical-line"></div>
		<div v-if="userLogged != null" class="name">
			<span class="text-muted">Hola,&nbsp;</span
			><span class="text-primary text-bold"
				><b>{{ userLogged.name }}</b></span
			>
			<Avatar :label="firstLetter" class="ms-2" />
		</div>
	</div>
</template>

<script>
import Avatar from "primevue/avatar";
import { mapMutations, mapState } from "vuex";

export default {
	components: {
		Avatar,
	},
	computed: {
		currentDate() {
			const date = new Date();
			const day = date.getDate();
			const month = date.getMonth() + 1;

			const monthNames = [
				"Enero",
				"Febrero",
				"Marzo",
				"Abril",
				"Mayo",
				"Junio",
				"Julio",
				"Agosto",
				"Septiembre",
				"Octubre",
				"Noviembre",
				"Diciembre",
			];

			return `${day} de ${monthNames[month - 1]}`;
		},
		firstLetter() {
			return this.userLogged.name.charAt(0);
		},
		...mapState(["userLogged"]),
	},
	methods: {
		...mapMutations(["toggleSidebar"]),
	},
};
</script>

<style lang="scss" scoped>
.today {
	position: relative;

	&:hover {
		&::after {
			opacity: 0;
		}
	}
}

.vertical-line {
	width: 2px;
	height: 60%;
	background-color: lightgray;
	transition: $transition;
}

:deep(.p-avatar) {
	background-color: rgba($secondary, 20%);
	color: $secondary;

	.p-avatar-text {
		font-weight: bold;
	}
}

// Mobiles
@media only screen and (min-width: $mobile-min-width) and (max-width: $mobile-max-width) {
	.current-user {
		width: 100%;
	}
}
</style>
