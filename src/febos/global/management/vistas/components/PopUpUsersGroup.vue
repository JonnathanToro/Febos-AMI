<template>
  <vs-popup
    :title="`Usuarios del grupo ${usersGroup.nombre}`"
    @close="cancelEdit"
    fullscreen
    :active.sync="showModal">
    <div class="row mt-4 box-users">
      <div class="col-md-6 border-right">
        <vs-list>
          <div v-for="user in usersGeneral" :key="user.id">
            <vs-list-item
              :class="{ exists: isUserInGroup(user) }"
              :title="user.nombre"
              :subtitle="user.correo">
              <vs-button
                color="warning"
                v-if="!isUserInGroup(user)"
                size="small"
                type="border"
                @click="addUser(user)"
              >
                Agregar
              </vs-button>
            </vs-list-item>
          </div>
        </vs-list>
      </div>
      <div class="col-md-6">
        <vs-list>
          <div v-for="user in usersOnGroup" :key="user.id">
            <vs-list-item :title="user.nombre" :subtitle="user.correo">
              <vs-chip color="warning" v-if="user.esAdministradorEmpresa === 'Y'">
                administrador
              </vs-chip>
              <vs-chip color="warning" v-if="user.esLider === 'Y'">
                <vs-avatar icon="flag" />
                lider
              </vs-chip>
              <vs-button
                color="danger"
                size="small"
                type="border"
              >
                Remover
              </vs-button>
            </vs-list-item>
          </div>
        </vs-list>
      </div>
    </div>
  </vs-popup>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PopUpEditGroup',
  mixins: [],
  props: {
    group: {
      type: Object,
      required: true
    },
    usersGeneral: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      usersGroup: {
        ...this.group
      },
      usersOnGroup: this.usersByGroup
    };
  },
  watch: {
    group(newValue) {
      this.usersGroup = { ...newValue };
    },
    usersByGroup(newValue) {
      this.usersOnGroup = newValue;
    }
  },
  computed: {
    ...mapGetters('Empresas', [
      'company',
      'usersByGroup',
      'usersCompany'
    ]),
    ...mapGetters('Modals', [
      'modalName'
    ]),
    showModal: {
      get() {
        return this.modalName === 'modalUsersGroup';
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
    ...mapActions('Empresas', [
      'getUsersGroup',
      'addUserToGroup'
    ]),
    isUserInGroup(user) {
      return this.usersByGroup.find((userGroup) => userGroup.usuarioId === user.id);
    },
    addUser(user) {
      console.log('ACC', user);
      const body = {
        grupoId: this.usersGroup.id,
        usuarios: this.usersOnGroup.map((userMap) => userMap.usuarioId).join(),
        user
      };

      body.usuarios = body.usuarios.length
        ? body.usuarios.concat(user.usuarioId) : body.usuarios = user.usuarioId;
      this.addUserToGroup({ empresaId: this.company.id, body });
    },
    saveChanges() {
      console.log('ADDD');
    },
    cancelEdit() {
      console.log('cancelar', this);
    }
  },
  mounted() {
    this.usersOnGroup = this.usersByGroup;
  }
};
</script>
<style scoped>

.box-users {
  height: 500px;
  overflow-y: scroll;
}
.con-vs-popup .vs-popup {
  width: 70% !important;
}
.exists {
  color: #671e85;
  background: #671e852b;
  border-radius: 4px;
}
</style>
