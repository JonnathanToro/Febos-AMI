<template>
  <vs-popup title="Enviar Expediente" :active.sync="showModal">
    <h5>
      Para:
    </h5>
    <div class="wrap-option">
      <vs-radio v-model="send.typeSend" vs-value="moodUser">Usuario</vs-radio>
      <vs-radio v-model="send.typeSend" vs-value="moodUnidad">Unidad</vs-radio>
    </div>
    <div
      v-if="send.typeSend === 'moodUser' && usersCompany && usersCompany.length"
      class="wrap-form"
    >
      <vs-select
        autocomplete
        class="selectExample"
        label="Usuarios"
        v-model="send.user"
      >
        <vs-select-item
          v-for="user in usersCompany"
          :key="user.id"
          :value="user.correo"
          :text="user.nombre"
        />
      </vs-select>
    </div>
    <div
      v-if="send.typeSend === 'moodUnidad' && groupsCompany && groupsCompany.length"
      class="wrap-form"
    >
      <vs-select
        autocomplete
        class="selectExample"
        label="Unidad"
        v-model="send.unidad"
      >
        <vs-select-item
          v-for="group in groupsCompany"
          :key="group.id"
          :value="group.id"
          :text="group.nombre"
        />
      </vs-select>
    </div>
    <h5>
      Con copia:
    </h5>
    <div class="wrap-option">
      <vs-radio v-model="send.typeCopy" vs-value="sendUser">Usuario</vs-radio>
      <vs-radio v-model="send.typeCopy" vs-value="sendUnidad">Unidad</vs-radio>
    </div>
    <div
      v-if="send.typeCopy === 'sendUser' && usersCompany && usersCompany.length"
      class="wrap-form">
      <vs-select
        autocomplete
        class="selectExample"
        label="Usuarios"
        v-model="send.user"
      >
        <vs-select-item
          v-for="user in usersCompany"
          :key="user.id"
          :value="user.correo"
          :text="user.nombre"
        />
      </vs-select>
    </div>
    <div
      v-if="send.typeCopy === 'sendUnidad' && groupsCompany && groupsCompany.length"
      class="wrap-form"
    >
      <vs-select
        autocomplete
        class="selectExample"
        label="Unidad"
        v-model="send.unidad"
      >
        <vs-select-item
          v-for="group in groupsCompany"
          :key="group.id"
          :value="group.id"
          :text="group.nombre"
        />
      </vs-select>
    </div>
  </vs-popup>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PopUpSendFile',
  props: {
    file: {
      type: [Object]
    }
  },
  data() {
    return {
      send: {
        user: '',
        typeSend: 'moodUser',
        typeCopy: 'sendUnidad',
        unidad: '',
        usuario: ''
      }
    };
  },
  computed: {
    ...mapGetters('Dnts', [
      'commentsEd'
    ]),
    ...mapGetters('Empresas', [
      'empresa',
      'usersCompany',
      'groupsCompany'
    ]),
    ...mapGetters('Modals', [
      'modalName'
    ]),
    showModal: {
      get() {
        return this.modalName === 'sendFile';
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
      'getUsersCompany',
      'getGroupsCompany'
    ])

  }
};
</script>
<style>

.m-top-20 {
  margin-top: 20px;
}

.wrap-option {
  display: flex;
  justify-content: space-around;
}

.wrap-form {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.pill-comment-user {
  width: 90%;
  border: 1px solid #c2f785;
  border-radius: 25px;
  margin-bottom: 10px;
  float: left;
}

.pill-comment-me {
  width: 90%;
  border: 1px solid #3a9eef6b;
  border-radius: 25px;
  margin-bottom: 10px;
  float: right;
}
</style>
