<template>
	<div>
		<label for="input" class="text-primary text-bold">{{ label }}</label>

		<PrismEditor
			class="my-editor"
			v-model="model"
			:highlight="highlighter"
			:lineNumbers="true"
			:readonly="disabled"
		/>

		<div v-if="error != null" class="text-danger">
			{{ error }}
		</div>
	</div>
</template>

<script>
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";

import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";

import "prismjs/themes/prism-tomorrow.css";

import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-php";
import "prismjs/components/prism-scss";

export default {
	components: {
		PrismEditor,
	},
	props: {
		label: {
			type: String,
		},
		error: {
			type: String,
			default: null,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		language: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		model: null,
	}),
	methods: {
		highlighter(model) {
			switch (this.language) {
				case "PHP":
					return highlight(model, languages.php);
				case "JavaScript":
					return highlight(model, languages.javascript);
				case "HTML":
					return highlight(model, languages.html);
				case "CSS":
					return highlight(model, languages.css);
				case "SCSS":
					return highlight(model, languages.scss);

				default:
					return highlight(model, languages.html);
			}
		},
	},
	watch: {
		model(newValue) {
			this.$emit("change-value", newValue);
		},
	},
};
</script>

<style lang="scss" scoped>
.my-editor {
	background: #2d2d2d;
	color: #ccc;
	font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
	font-size: 14px;
	line-height: 1.5;
	padding: 5px;
	border-radius: $border-radius;
}

// optional
.prism-editor__textarea:focus {
	outline: none;
}
</style>
