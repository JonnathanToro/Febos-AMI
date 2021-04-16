<template>
  <vs-popup
    :title="`Datos del usuario ${userData.nombre}`"
    @close="cancelEdit"
    :active.sync="showModal">
    <form data-vv-scope="data-user">
      <div class="row mb-5">
        <div class="col-md-6 mt-3">
          <vs-input
            label="RUT"
            maxlength="10"
            v-model="userData.iut"
            class="w-full"
            name="iut"
            :danger="errors.has('data-user.iut')"
            :danger-text="errors.first('data-user.iut')"
            v-validate="'required'"
          />
        </div>
        <div class="col-md-12 mt-3">
          <vs-input
            label="Nombre del usuario"
            maxlength="60"
            v-model="userData.nombre"
            class="w-full"
            name="name"
            :danger="errors.has('data-user.name')"
            :danger-text="errors.first('data-user.name')"
            v-validate="'required'"
          />
        </div>
        <div class="col-md-6 mt-3">
          <vs-input
            label="Alias"
            maxlength="60"
            v-model="userData.alias"
            class="w-full"
            name="alias"
            v-validate="'required'"
            :danger="errors.has('data-user.alias')"
            :danger-text="errors.first('data-user.alias')"
          />
        </div>
        <div class="col-md-6 mt-3">
          <vs-input
            label="Correo electrónico"
            maxlength="50"
            v-model="userData.correo"
            class="w-full"
            name="email"
            v-validate="'required|email'"
            :danger="errors.has('data-user.email')"
            :danger-text="errors.first('data-user.email')"
          />
        </div>
        <div class="col-md-12 mt-3">
          <div style="float: right">
            <vs-button
              class="action"
              color="primary"
              type="border"
              @click="saveChanges()"
              icon="save"
            >
              Guardar
            </vs-button>
          </div>
        </div>
      </div>
    </form>
  </vs-popup>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PopUpUser',
  mixins: [],
  props: {
    user: {
      type: Object,
      required: true
    },
    action: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      userData: {
        ...this.user
      }
    };
  },
  watch: {
    user(newValue) {
      this.userData = { ...newValue };
    }
  },
  computed: {
    ...mapGetters('Empresas', [
      'company'
    ]),
    ...mapGetters('Modals', [
      'modalName'
    ]),
    showModal: {
      get() {
        return this.modalName === 'modalUser';
      },
      set() {
        this.closeModal();
      }
    }
  },
  methods: {
    ...mapActions('Modals', [
      'closeModal'
    ]),
    ...mapActions('Usuario', [
      'updateUserComppany',
      'createUserCompany'
    ]),
    async validateForm(scope) {
      const result = await this.$validator.validateAll(scope);
      return !!result;
    },
    async validateUserData() {
      const userValid = await Promise.all([
        this.validateForm('data-user')
      ]);
      return userValid;
    },
    async saveChanges() {
      if (!await this.validateUserData()) {
        return;
      }
      const user = {
        iut: this.userData.iut,
        alias: this.userData.alias,
        correo: this.userData.correo,
        nombre: this.userData.nombre,
        tipo: 1, // nacional
        nivel: 1,
        cambiarClave: 'si',
        accesoWeb: 'si'
      };
      if (this.action === 'edit') {
        user.id = this.userData.id;
      }

      console.log('USER', user);

      if (this.action === 'add') {
        this.createUserCompany(user);
      } else {
        this.updateUserComppany(user);
      }
    },
    cancelEdit() {
      console.log('cancelar', this);
    }
  },
  mounted() {
    console.log('THIS', this);
  }
};
</script>
<style scoped>
.chip-custom {
  font-size: 12px;
  margin-top: 10px;
  color: #ffb300;
  background: #fff5df;
  border-radius: 10px;
  padding: 4px 8px;
}
</style>
