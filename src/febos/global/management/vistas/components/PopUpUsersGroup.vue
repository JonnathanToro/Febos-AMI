<template>
  <vs-popup
    :title="`Usuarios del grupo ${usersGroup.nombre}`"
    @close="cancelEdit"
    :active.sync="showModal">
    <div class="row">
      <div class="col-md-6">
        <vs-list>
          <div  v-for="user in usersCompany" :key="user.id">
            <vs-list-item :title="user.nombre" :subtitle="user.correo">
            </vs-list-item>
          </div>
        </vs-list>
      </div>
      <div class="col-md-6">
        <vs-list>
          <div  v-for="user in usersByGroup" :key="user.id">
            <vs-list-item :title="user.nombre" :subtitle="user.correo">
              <vs-chip color="warning" v-if="user.esAdministradorEmpresa === 'Y'">
                administrador
              </vs-chip>
              <vs-chip color="warning" v-if="user.esLider === 'Y'">
                <vs-avatar icon="flag" />
                lider
              </vs-chip>
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
    }
  },
  data() {
    return {
      usersGroup: {
        ...this.group
      }
    };
  },
  watch: {
    group(newValue) {
      this.usersGroup = { ...newValue };
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
      'getUsersGroup'
    ]),
    saveChanges() {
      console.log('ADDD');
    },
    cancelEdit() {
      console.log('cancelar', this);
    }
  },
  created() {
    this.getUsersGroup(this.usersGroup.id);
  }
};
</script>
<style scoped>

.con-vs-popup .vs-popup {
  width: 70% !important;

}
</style>
