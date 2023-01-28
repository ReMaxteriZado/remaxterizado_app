<template>
  <Dialog
    v-model:visible="$store.state.roles.dialog"
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
          <InputText
            ref="slug"
            label="Titular"
            :disabled="disabled"
            :error="form.errors.get('slug')"
            @change-value="(value) => (form.slug = value)"
          />
        </div>
        <div class="col-12">
          <TextArea
            ref="description"
            label="Descripción"
            :disabled="disabled"
            :error="form.errors.get('description')"
            @change-value="(value) => (form.description = value)"
          />
        </div>
        <div class="col-12">
          <FormSubtitle title="Permisos" />
        </div>
        <div class="col-12">
          <div
            v-for="(permission, index) in permissions.list"
            :key="index"
            class="row align-items-center py-3"
            :class="[index % 2 ? 'bg-light' : '']"
          >
            <div class="col-3">{{ permission.slug }}</div>
            <div class="col">
              <InputSwitch
                :ref="'create-' + permission.id"
                label="Crear"
                :disabled="disabled"
                :error="form.errors.get('create-' + permission.id)"
                @change-value="
                  (value) => (form['create-' + permission.id] = value)
                "
              />
            </div>
            <div class="col">
              <InputSwitch
                :ref="'read-' + permission.id"
                label="Leer"
                :disabled="disabled"
                :error="form.errors.get('read-' + permission.id)"
                @change-value="
                  (value) => (form['read-' + permission.id] = value)
                "
              />
            </div>
            <div class="col">
              <InputSwitch
                :ref="'update-' + permission.id"
                label="Actualizar"
                :disabled="disabled"
                :error="form.errors.get('update-' + permission.id)"
                @change-value="
                  (value) => (form['update-' + permission.id] = value)
                "
              />
            </div>
            <div class="col">
              <InputSwitch
                :ref="'delete-' + permission.id"
                label="Borrar"
                :disabled="disabled"
                :error="form.errors.get('delete-' + permission.id)"
                @change-value="
                  (value) => (form['delete-' + permission.id] = value)
                "
              />
            </div>
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
import Form from "vform";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
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
  }),
  methods: {
    ...mapActions(["sendForm", "getRegisters"]),
    ...mapMutations(["toggleFormDialog", "changeCurrentRegister"]),
    save() {
      const update = this.roles.register != null;
      const url = `/roles${update ? `/${this.roles.register.id}` : ""}`;

      let permissions = [];

      this.permissions.list.forEach((permission) => {
        permissions.push({
          id: permission.id,
          create: this.form[`create-${permission.id}`],
          read: this.form[`read-${permission.id}`],
          update: this.form[`update-${permission.id}`],
          delete: this.form[`delete-${permission.id}`],
        });
      });

      this.form.permissions = permissions;

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
            page: this.roles.currentPage,
            rows: this.roles.rows,
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

      const register = this.roles.register;

      if (register != null) {
        for (const key in register) {
          if (
            Object.hasOwnProperty.call(register, key) &&
            this.$refs[key] != undefined
          ) {
            this.$refs[key].model = register[key];
          }
        }

        if (this.roles.dialogMode == "edit") {
          this.title = `Editar ${this.modelName}`;
          this.disabled = false;
        } else {
          this.title = `Ver ${this.modelName}`;
          this.disabled = true;
        }
      }

      this.getRegisters({
        route: "/permissions",
        stateVariable: "permissions",
        getAll: true,
      }).then(() => {
        if (register != null) {
          register.permissions.forEach((permission) => {
            this.$refs["create-" + permission.permission_id][0].model =
              permission.create;

            this.$refs["read-" + permission.permission_id][0].model =
              permission.read;

            this.$refs["update-" + permission.permission_id][0].model =
              permission.update;

            this.$refs["delete-" + permission.permission_id][0].model =
              permission.delete;
          });
        }
      });
    },
  },
  computed: {
    ...mapState(["dialogDefaults", "roles", "categories", "permissions"]),
  },
};
</script>
