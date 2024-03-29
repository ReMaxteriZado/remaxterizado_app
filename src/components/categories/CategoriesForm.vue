<template>
  <Dialog
    v-model:visible="$store.state.categories.dialog"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '30vw' }"
    :modal="dialogDefaults.modal"
    :closeOnEscape="dialogDefaults.closeOnEscape"
    :dismissableMask="dialogDefaults.dismissableMask"
    @hide="hide"
    @show="show"
  >
    <template #header>
      <FormTitle :title="title" />
    </template>

    <form @keydown="$event.key === 'Enter' ? save() : null">
      <div class="row gy-3">
        <div class="col-12 col-md-6">
          <InputText
            ref="name"
            label="Nombre"
            :disabled="disabled"
            :error="form.errors.get('name')"
            @change-value="(value) => (form.name = value)"
          />
        </div>
        <div class="col-12 col-md-6">
          <DropDown
            ref="parent_id"
            label="Categoría"
            :options="categories.list"
            :displayText="['parent.name', 'name']"
            :displayTextSeparator="' > '"
            :disabled="disabled"
            :error="form.errors.get('parent_id')"
            @change-value="(value) => (form.parent_id = value)"
          />
        </div>
      </div>
    </form>

    <template #footer v-if="!disabled">
      <div class="col-12 d-flex justify-content-end">
        <Button @click="save()" label="Guardar" :disabled="form.busy" />
      </div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";

import Form from "vform";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: {
    Dialog,
  },
  props: {
    route: {
      type: String,
      required: true,
    },
    stateVariable: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    form: new Form(),
    modelName: "categoría",
    title: `Añadir categoría`,
    disabled: false,
    tags: [],
  }),
  methods: {
    ...mapActions(["getCategories", "sendForm", "getRegisters"]),
    ...mapMutations(["toggleFormDialog", "changeCurrentRegister"]),
    save() {
      const update = this.categories.register != null;
      const url = `/categories${
        update ? `/${this.categories.register.id}` : ""
      }`;

      this.sendForm({
        method: update ? "put" : "post",
        form: this.form,
        url: url,
        errors: this.form.errors,
      }).then((response) => {
        if (response.status === 200) {
          this.toggleFormDialog({
            stateVariable: this.stateVariable,
            value: false,
          });

          this.getCategories();
        }
      });
    },
    hide() {
      this.title = `Añadir ${this.modelName}`;
      this.disabled = false;

      this.changeCurrentRegister({
        stateVariable: this.stateVariable,
        register: null,
      });
    },
    clearForm() {
      this.form.clear();
      this.form.reset();

      for (const key in this.$refs) {
        if (Object.hasOwnProperty.call(this.$refs, key)) {
          this.$refs[key].model = null;
        }
      }
    },
    show() {
      this.clearForm();

      this.getRegisters({
        route: "/categories",
        stateVariable: "categories",
        getAll: true,
        showLoading: false,
      });

      const register = this.categories.register?.category;

      if (register != null) {
        for (const key in register) {
          if (Object.hasOwnProperty.call(register, key)) {
            if (this.$refs[key] != undefined) {
              this.$refs[key].model = register[key];
            }
          }
        }

        if (this.categories.dialogMode == "edit") {
          this.title = `Editar ${this.modelName}`;
          this.disabled = false;
        } else {
          this.title = `Ver ${this.modelName}`;
          this.disabled = true;
        }
      }
    },
  },
  computed: {
    ...mapState(["dialogDefaults", "categories"]),
  },
};
</script>
