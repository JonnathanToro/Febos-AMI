<template>
  <vs-popup
    :title="`Participantes del Expediente ${file.numero}`"
    :active.sync="showModal"
  >
    <vs-list class="box-participants">
      <div
        v-for="(subject, index) in participants"
        :key="index"
      >
        <vs-list-item
          v-if="subject.tipoDestino === '1'"
          icon="contact_mail"
          style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
          :title="subject.destinoListaNombre" :subtitle="subject.destinoNombre">
          <!--<div v-for="(doc, index) in comment.documentos" :key="index" class="pill-info">
            <DownloadFile :path="doc.adjuntoUrl" :name="doc.nombre"/>
          </div>-->
          <vs-chip color="primary" v-if="subject.tipoDestino === '1'">
            Destinatario
          </vs-chip>
        </vs-list-item>
        <vs-list-item
          v-if="subject.tipoDestino === '2'"
          icon="supervised_user_circle"
          style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
          :title="subject.destinoListaNombre" :subtitle="subject.destinoNombre">
          <!--<div v-for="(doc, index) in comment.documentos" :key="index" class="pill-info">
            <DownloadFile :path="doc.adjuntoUrl" :name="doc.nombre"/>
          </div>-->
          <vs-chip color="#43C3B9" v-if="subject.tipoDestino === '2'">
            En copia
          </vs-chip>
        </vs-list-item>
      </div>
    </vs-list>
  </vs-popup>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PopUpParticipantsFile',
  props: {
    file: {
      type: [Object],
      required: true,
      default: () => {}
    }
  },
  methods: {
    ...mapActions('Modals', [
      'closeModal'
    ])
  },
  computed: {
    ...mapGetters('Dnts', [
      'participants'
    ]),
    ...mapGetters('Modals', [
      'modalName'
    ]),
    showModal: {
      get() {
        return this.modalName === 'participantsFile';
      },
      set() {
        this.closeModal();
      }
    }
  },
};
</script>
<style scoped>

.box-participants {
  height: 300px;
  overflow-y: scroll;
}

</style>
