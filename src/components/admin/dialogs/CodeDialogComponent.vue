<template>
    <div>
        <Dialog
            :modal="true"
            header="Code"
            :dismissableMask="true"
            v-model:visible="$store.state.displayCodeDialog"
            :style="{ width: '50vw' }"
        >
            <div class="d-flex flex-column gap-1 my-3">
                <label for="">Comment</label>
                <Textarea
                    v-model="view_code.comment"
                    :autoResize="true"
                    class="w-100"
                    disabled
                />
            </div>

            <div class="d-flex flex-column gap-1 my-3">
                <label for="">Code</label>
                <CodeEditor
                    :readonly="true"
                    :language="view_code.language"
                    :load_code="view_code.code"
                />
            </div>
        </Dialog>
    </div>
</template>

<script>
import Dialog from "primevue/dialog";
import Textarea from "primevue/textarea";

import CodeEditor from "@/components/admin/partials/CodeEditorComponent.vue";

import { mapState, mapMutations } from "vuex";

export default {
    components: {
        Dialog,
        CodeEditor,
        Textarea,
    },
    computed: {
        ...mapState(["view_code"]),
    },
    methods: {
        ...mapMutations(["toggleCodeDialog"]),
    },
};
</script>

<style></style>
