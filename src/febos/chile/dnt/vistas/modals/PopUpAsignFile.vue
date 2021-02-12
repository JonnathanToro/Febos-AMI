<template>
  <vs-popup :title="`Asignarme Expediente ${file.numero}`" :active.sync="showModal">
    <div>
      Al asignarte el expediente serás responsable y podrás realizar acciones sobre éste
    </div>
    <div>
      <small>
        (Esta acción puede demorar unos segundos en completarse)
      </small>
    </div>
    <div class="m-top-20" style="display: flex;justify-content: flex-end;">
      <vs-button color="dark" v-on:click="cancelAsign()" type="border">Cancelar</vs-button>
      <vs-button
        v-on:click="asignFile()"
        color="primary"
        style="margin-left: 12px;"
        type="border"
      >
        Si, asignar
      </vs-button>
    </div>
  </vs-popup>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PopUpAsignFile',
  mixins: [],
  props: {
    file: {
      type: [Object],
      required: true,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters('Modals', [
      'modalName'
    ]),
    showModal: {
      get() {
        return this.modalName === 'asignFile';
      },
      set() {
        this.closeModal();
      }
    }
  },
  methods: {
    ...mapActions('Dnts', [
      'asignDntFileED'
    ]),
    ...mapActions('Modals', [
      'closeModal'
    ]),
    async asignFile() {
      await this.asignDntFileED(this.file.febosId);
    },
    cancelAsign() {
      this.closeModal();
    }
  }
};
</script>
<style scoped>

</style>
