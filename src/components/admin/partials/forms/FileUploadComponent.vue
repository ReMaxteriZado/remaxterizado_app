<template>
    <div>
        <label class="w-100 text-primary text-bold">{{ label }}</label>

        <FileUpload
            :showUploadButton="false"
            cancelLabel="Cancelar"
            :chooseLabel="chooseLabel"
            :previewWidth="100"
            :maxFileSize="maxFileSize"
            :fileLimit="fileLimit"
            :multiple="fileLimit != null && fileLimit > 1"
            @select="selected"
            @remove="removeFile"
            @clear="removeAllFiles"
            :accept="accept"
            :disabled="disabled"
            invalidFileSizeMessage="El archivo '{0}' es demasiado grande. El tamaño máximo es de {1}.'"
            invalidFileLimitMessage="Solo se pueden subir {0} archivo/s."
        >
            <template #empty>
                <p>
                    Arrastra tus archivos o haz clic en el botón de "{{
                        chooseLabel
                    }}"
                </p>
            </template>
        </FileUpload>

        <div class="text-danger" v-if="error != null">
            {{ error }}
        </div>
    </div>
</template>

<script>
import FileUpload from "primevue/fileupload";

export default {
    components: {
        FileUpload,
    },
    data: () => ({
        files: [],
    }),
    props: {
        label: {
            type: String,
            default: "Seleccionar archivos",
        },
        old_file_name: {
            type: String,
            default: null,
        },
        old_file_mime: {
            type: String,
            default: null,
        },
        old_file_data: {
            type: String,
            default: null,
        },
        fileLimit: {
            type: Number,
            default: 1,
        },
        maxFileSize: {
            type: Number,
            default: 1100000,
        },
        chooseLabel: {
            type: String,
            default: "Subir archivo",
        },
        accept: {
            type: String,
            default: null,
        },
        error: {
            type: String,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        selected(event) {
            event.files.forEach((file) => {
                this.getBase64(file);
            });
        },
        removeAllFiles() {
            this.files = [];
        },
        removeFile(event) {
            this.files.forEach((file) => {
                if (file.name == event.file.name) {
                    this.files.splice(this.files.indexOf(file), 1);
                }
            });
        },
        getBase64(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                this.files.push({ name: file.name, base64: reader.result });
            };

            reader.onerror = (error) => {
                this.$toast.add({
                    severity: "error",
                    summary: "Ha ocurrido un error",
                    detail: "Inténtelo nuevamente",
                    life: 3000,
                });

                console.error("Error: ", error);
            };
        },
    },
};
</script>

<style lang="scss" scoped>
:deep(.p-fileupload-empty p) {
    margin-bottom: 0;
}
</style>
