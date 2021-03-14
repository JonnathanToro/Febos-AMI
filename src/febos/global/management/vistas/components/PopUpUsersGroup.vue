<template>
  <vs-popup
    :title="`Usuarios del grupo ${usersGroup.nombre}`"
    @close="cancelEdit"
    :active.sync="showModal">
    <vs-list>
      <div  v-for="user in usersByGroup" :key="user.id">
        <vs-list-item :title="user.nombre" :subtitle="user.correo">
          <vs-chip color="warning" v-if="user.esAdministradorEmpresa === 'Y'">
            administrador
          </vs-chip>
        </vs-list-item>
      </div>
    </vs-list>
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
      'usersByGroup'
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

</style>
