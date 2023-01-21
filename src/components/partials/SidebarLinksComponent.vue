<template>
	<div class="w-100 d-flex flex-column">
		<div v-for="(item, index) in items" :key="index">
			<div v-if="!item.items">
				<Link class="px-3" :item="item" @click="toggleSidebar(false)" />
			</div>
			<div v-else>
				<Accordion @click="item.right_down = !item.right_down">
					<AccordionTab>
						<template #header>
							<div
								class="
									link
									w-100
									d-flex
									align-items-center
									justify-content-between
									px-3
									py-3
									p-ripple
								"
								v-ripple
							>
								<div class="d-flex align-items-center gap-2">
									<i :class="item.icon"></i>
									<p class="mb-0">{{ item.label }}</p>
								</div>
								<i
									class="pi"
									:class="[
										item.right_down ? 'pi-chevron-down' : 'pi-chevron-right',
									]"
								></i>
							</div>
						</template>
						<div class="d-flex flex-column">
							<div v-for="(subItem, subIndex) in item.items" :key="subIndex">
								<Link
									class="ps-5"
									:item="subItem"
									@click="toggleSidebar(false)"
								/>
							</div>
						</div>
					</AccordionTab>
				</Accordion>
			</div>
		</div>
	</div>
</template>

<script>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";

import Link from "./LinkComponent.vue";
import { mapMutations } from 'vuex';

export default {
	components: {
		Accordion,
		AccordionTab,
		Link,
	},
	data() {
		return {
			items: [
				{
					label: "Dashboard",
					href: "/admin/dashboard",
				},
				{
					label: "Categorías",
					href: "/admin/categories",
				},
				{
					label: "Enlaces",
					href: "/admin/links",
				},
				{
					label: "Códigos",
					href: "/admin/codes",
				},
				{
					label: "Demo",
					href: "/admin/demo",
				},
			],
		};
	},
	methods: {
		...mapMutations(["toggleSidebar"]),
	},
};
</script>
