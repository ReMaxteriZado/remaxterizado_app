<template>
    <div>
        <PrismEditor
            class="my-editor"
            v-model="code"
            :highlight="highlighter"
            :lineNumbers="true"
            :readonly="readonly"
        />
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
    props: ["language", "load_code", "readonly"],
    data() {
        return {
            code: this.load_code != null ? this.load_code : "",
        };
    },
    methods: {
        highlighter(code) {
            switch (this.language) {
                case "PHP":
                    return highlight(code, languages.php);
                case "JavaScript":
                    return highlight(code, languages.javascript);
                case "HTML":
                    return highlight(code, languages.html);
                case "CSS":
                    return highlight(code, languages.css);
                case "SCSS":
                    return highlight(code, languages.scss);

                default:
                    return highlight(code, languages.html);
            }
        },
    },
    watch: {
        code() {
            this.$parent.form.code = this.code;
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
