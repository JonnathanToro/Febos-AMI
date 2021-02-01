<template>
  <vs-popup
    :title="`Participantes del Expediente ${file.numero}`"
    :active.sync="showModal"
  >
    <vs-list>
      <div v-for="(participant, index) in participants" :key="index">

        <vs-list-item
          icon="inbox"
          :title="participant.destinoListaNombre"
          :subtitle="participant.destinoNombre">
          <vs-chip color="success">Bandeja de entrada</vs-chip>
        </vs-list-item>
        <vs-list-item
          v-if="participant.estado === 1"
          icon="move_to_inbox"
          :title="participant.destinoListaNombre"
          :subtitle="participant.destinoNombre">
          <vs-chip color="warning">Bandeja de finalizados</vs-chip>
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

</style>
