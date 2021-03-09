<template>
  <vs-popup :title="`Enviar Expediente ${file.numero}`" :active.sync="showModal">
    <div>
      <h5>
        Para:
      </h5>
      <div class="wrap-option">
        <vs-radio v-model="subject.typeSend" vs-value="moodUser">Usuario</vs-radio>
        <vs-radio v-model="subject.typeSend" vs-value="moodGroup">Unidad</vs-radio>
      </div>
      <div
        v-if="subject.typeSend === 'moodUser' && usersCompany && usersCompany.length"
        class="wrap-form"
      >
        <vs-select
          autocomplete
          class="selectExample"
          label="Usuarios"
          v-model="subject.user"
        >
          <vs-select-item
            v-for="user in usersCompany"
            :key="user.id"
            :value="user.id"
            :text="user.nombre"
          />
        </vs-select>
      </div>
      <div
        v-if="subject.typeSend === 'moodGroup' && groupsCompany && groupsCompany.length"
        class="wrap-form"
      >
        <vs-select
          autocomplete
          class="selectExample"
          label="Unidad"
          v-model="subject.group"
        >
          <vs-select-item
            v-for="group in groupsCompany"
            :key="group.id"
            :value="group.id"
            :text="group.nombre"
          />
        </vs-select>
      </div>
    </div>
    <div>
      <h5>
        Con copia:
      </h5>
      <div class="wrap-option">
        <vs-radio v-model="copy.typeCopy" vs-value="sendUser">Usuario</vs-radio>
        <vs-radio v-model="copy.typeCopy" vs-value="sendGroup">Unidad</vs-radio>
      </div>
      <div
        v-if="copy.typeCopy === 'sendUser' && usersCompany && usersCompany.length"
        class="wrap-form">
        <vs-select
          autocomplete
          class="selectExample"
          label="Usuarios"
          v-model="copy.user"
        >
          <vs-select-item
            v-for="user in usersCompany"
            :key="user.id"
            :value="user.id"
            :text="user.nombre"
          />
        </vs-select>
      </div>
      <div
        v-if="copy.typeCopy === 'sendGroup' && groupsCompany && groupsCompany.length"
        class="wrap-form"
      >
        <vs-select
          autocomplete
          class="selectExample"
          label="Unidad"
          v-model="copy.group"
        >
          <vs-select-item
            v-for="group in groupsCompany"
            :key="group.id"
            :value="group.id"
            :text="group.nombre"
          />
        </vs-select>
      </div>
    </div>
    <div class="m-top-20 text-center">
      <vs-button
        v-on:click="sendFileToSubjects()"
        color="primary"
        type="border"
      >
        Enviar Expediente
      </vs-button>
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
      subject: {
        typeSend: 'moodUser',
        group: '',
        user: ''
      },
      copy: {
        typeCopy: 'sendGroup',
        group: '',
        user: ''
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
    ]),
    ...mapActions('Dnts', [
      'sendDntFile'
    ]),
    converSubjectUser(data, type) {
      return {
        tipoDestino: type,
        estado: 1,
        destinoCodigo: 'usuarios',
        destinoNombre: 'Funcionario',
        destinoListaCodigo: data.id,
        destinoListaNombre: data.nombre,
        destinoCorreo: '',
      };
    },
    converSubjectGroup(data, type) {
      return {
        tipoDestino: type,
        estado: 1,
        destinoCodigo: 'unidades',
        destinoNombre: 'Unidades',
        destinoListaCodigo: data.id,
        destinoListaNombre: data.nombre,
        destinoCorreo: '',
      };
    },
    sendFileToSubjects() {
      const newSubjects = [];
      let user;
      let group;
      if (this.subject.user !== '') {
        user = this.usersCompany.find((userCompany) => userCompany.id === this.subject.user);
        newSubjects.push(this.subjectSend = this.converSubjectUser(user, 1));
      }
      if (this.subject.group !== '') {
        group = this.groupsCompany.find((groupCompany) => groupCompany.id === this.subject.group);
        newSubjects.push(this.subjectSend = this.converSubjectGroup(group, 1));
      }

      if (this.copy.user !== '') {
        user = this.usersCompany.find((userCompany) => userCompany.id === this.copy.user);
        newSubjects.push(this.copySend = this.converSubjectUser(user, 2));
      }
      if (this.copy.group !== '') {
        group = this.groupsCompany.find((groupCompany) => groupCompany.id === this.copy.group);
        newSubjects.push(this.copySend = this.converSubjectGroup(group, 2));
      }

      this.sendDntFile({
        febosId: this.file.febosId,
        destinos: newSubjects
      });
    }
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
