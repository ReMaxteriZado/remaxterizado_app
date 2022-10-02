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
				<p>Arrastra tus archivos o haz clic en el botón "{{ chooseLabel }}"</p>
			</template>
		</FileUpload>

		<div
			class="text-danger"
			v-if="error != null"
		>
			{{ error }}
		</div>

		<Button
			v-if="old_file_id != null"
			class="mt-2"
			@click="
				downloadFile({
					id: old_file_id,
					download_route: download_old_file_route,
					is_from_database,
				})
			"
			label="Descargar archivo"
		/>

		<div
			v-if="old_files_array.length"
			class="d-flex flex-wrap gap-4 py-3"
		>
			<div
				v-for="(file, index) in old_files_array"
				:key="index"
				class="d-flex align-items-center gap-2"
			>
				<Button
					@click="
						downloadFile({
							id: file.id,
							download_route: download_old_file_route,
							is_from_database,
						})
					"
					:label="'Descargar archivo: ' + file.name"
				/>
				<i
					v-if="show_old_files_array_delete"
					class="cursor-pointer pi pi-trash text-primary"
					style="font-size: 1.2rem"
					v-tooltip.bottom="'Eliminar archivo'"
					@click="
						deleteFile({
							id: file.id,
							delete_route: delete_old_file_route,
							dispatch_action_on_delete,
						})
					"
				></i>
			</div>
		</div>
	</div>
</template>

<script>
	import Button from "primevue/button";
	import FileUpload from "primevue/fileupload";
	import { mapActions } from "vuex";

	export default {
		components: {
			Button,
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
			old_file_id: {
				type: Number,
				default: null,
			},
			old_files_array: {
				type: Array,
				default: () => [],
			},
			is_from_database: {
				type: Boolean,
				default: false,
			},
			download_old_file_route: {
				type: String,
				default: null,
			},
			show_old_files_array_delete: {
				type: Boolean,
				default: false,
			},
			delete_old_file_route: {
				type: String,
				default: null,
			},
			dispatch_action_on_delete: {
				type: Object,
				default: null,
			},
		},
		methods: {
			...mapActions(["downloadFile", "deleteFile"]),
			selected(event) {
				event.files.forEach((file) => {
					this.getBase64(file);
				});
			},
			removeAllFiles() {
				this.files = [];

				const button = document.querySelector(".p-fileupload-buttonbar button");

				if (button) {
					button.click();
				}
			},
			removeFile(event) {
				this.files.forEach((file) => {
					if (file.name == event.file.name) {
						this.files.splice(this.files.indexOf(file), 1);
					}
				});
			},
			getBase64(file) {
				this.removeAllFiles();

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

<style
	lang="scss"
	scoped
>
	:deep(.p-fileupload-empty p) {
		margin-bottom: 0;
	}

    :deep(.p-fileupload-buttonbar .p-button:last-child) {
        background-color: #131313 !important;
    }
</style>
