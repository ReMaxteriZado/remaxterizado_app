<template>
  <Dialog
    v-model:visible="$store.state.links.dialog"
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
            ref="title"
            label="Título"
            :disabled="disabled"
            :error="form.errors.get('title')"
            @change-value="(value) => (form.title = value)"
          />
        </div>
        <div class="col-12 col-md-6">
          <InputText
            ref="link"
            label="Enlace"
            :disabled="disabled"
            :error="form.errors.get('link')"
            @change-value="(value) => (form.link = value)"
          />
        </div>
        <div class="col-12 col-md-6">
          <DropDown
            ref="category_id"
            label="Categoría"
            :options="categories.list"
            :displayText="['parent.name', 'name']"
            :displayTextSeparator="' > '"
            :disabled="disabled"
            :error="form.errors.get('category_id')"
            @change-value="(value) => (form.category_id = value)"
          />
        </div>
        <div class="col-12 col-md-6">
          <label for="input" class="text-primary text-bold w-100">Tags</label>
          <Chips
            ref="tags"
            v-model="form.tags"
            class="w-100"
            :allowDuplicate="false"
            :placeholder="'Tags'"
            :disabled="disabled"
          />
          <div v-if="form.errors.get('tags')" class="text-danger">
            {{ form.errors.get("tags") }}
          </div>
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
import Chips from "primevue/chips";
import Form from "vform";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: {
    Chips,
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
    modelName: "enlace",
    title: `Añadir enlace`,
    disabled: false,
    tags: [],
  }),
  methods: {
    ...mapActions(["sendForm", "getRegisters"]),
    ...mapMutations(["toggleFormDialog", "changeCurrentRegister"]),
    save() {
      const update = this.links.register != null;
      const url = `/links${update ? `/${this.links.register.id}` : ""}`;

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

          this.getRegisters({
            route: this.route,
            stateVariable: this.stateVariable,
            page: this.links.currentPage,
            rows: this.links.rows,
          });
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

      const register = this.links.register;

      if (register != null) {
        for (const key in register) {
          if (
            Object.hasOwnProperty.call(register, key) &&
            this.$refs[key] != undefined
          ) {
            this.$refs[key].model = register[key];
          }

          this.form.tags = JSON.parse(register.tags);
        }

        if (this.links.dialogMode == "edit") {
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
    ...mapState(["dialogDefaults", "links", "categories"]),
  },
};
</script>

<style lang="scss" scoped>
:deep(.p-chips) {
  .p-chips-multiple-container {
    gap: 0.5rem;
  }

  .p-chips-multiple-container {
    width: 100%;
  }
}
</style>
