<template>
  <Dialog
    v-model:visible="$store.state.users.dialog"
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
            ref="email"
            label="Email"
            :disabled="disabled"
            :error="form.errors.get('email')"
            @change-value="(value) => (form.email = value)"
          />
        </div>
        <div class="col-12 col-md-6">
          <InputPassword
            ref="password"
            label="Contraseña"
            :disabled="disabled"
            :error="form.errors.get('password')"
            @change-value="(value) => (form.password = value)"
          />
        </div>
				<div class="col-12 col-md-6">
					<DropDown
						ref="role_id"
						label="Rol"
						:options="roles.list"
						optionLabel="slug"
						:displayText="'slug'"
						:disabled="disabled"
						:error="form.errors.get('role_id')"
						@change-value="(value) => (form.role_id = value)"
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
    modelName: "usuario",
    title: `Añadir usuario`,
    disabled: false,
    tags: [],
  }),
  methods: {
    ...mapActions(["sendForm", "getRegisters"]),
    ...mapMutations(["toggleFormDialog", "changeCurrentRegister"]),
    save() {
      const update = this.users.register != null;
      const url = `/users${update ? `/${this.users.register.id}` : ""}`;

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
            page: this.users.currentPage,
            rows: this.users.rows,
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
        route: "/roles",
        stateVariable: "roles",
        getAll: true,
        showLoading: false,
      });

      const register = this.users.register;

      if (register != null) {
        for (const key in register) {
          if (
            Object.hasOwnProperty.call(register, key) &&
            this.$refs[key] != undefined
          ) {
            this.$refs[key].model = register[key];
          }
        }

        if (this.users.dialogMode == "edit") {
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
    ...mapState(["dialogDefaults", "users", "roles"]),
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
