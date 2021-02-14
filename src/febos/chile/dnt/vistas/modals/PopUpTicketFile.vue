<template>
  <vs-popup
    title="Generar ticket de ayuda"
    :active.sync="showModal"
    >
    <div>
      <label for="message">Cuéntanos en que podemos ayudarte</label>
      <vs-textarea id="message" v-model="messageTicket"  counter="1000" />
    </div>
    <vs-button
      color="primary"
      class="m-top-20"
      style="float: right;"
      type="filled"
      v-on:click="sendTicketFile()"
    >
      Enviar ticket
    </vs-button>
  </vs-popup>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PopUpTicketFile',
  props: {
    file: {
      type: [Object],
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      messageTicket: ''
    };
  },
  methods: {
    ...mapActions('Modals', [
      'closeModal'
    ]),
    ...mapActions('Dnts', [
      'sendTicketHelp'
    ]),
    sendTicketFile() {
      if (this.messageTicket !== '') {
        const ticket = {
          febosId: this.file.febosId,
          correo: this.currentUser.correo,
          url: window.location.href,
          mensaje: this.messageTicket
        };
        console.log('ticket', ticket);
        this.sendTicketHelp(ticket);
      }
    },
  },
  computed: {
    ...mapGetters('Modals', [
      'modalName'
    ]),
    ...mapGetters('Usuario', [
      'currentUser'
    ]),
    showModal: {
      get() {
        return this.modalName === 'ticketFile';
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
