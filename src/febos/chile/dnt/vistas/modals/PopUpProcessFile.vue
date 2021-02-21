<template>
  <vs-popup :title="`Finalizar Expediente ${processedFile.numero}`" :active.sync="showModal">
    <div>
      Al dar por finalizado este documento, no podras actuar sobre el, estas de acuerdo?
    </div>
    <div class="chip-custom">
      ¡Al realizar esta acción se marcará
      como finalizado el expediente para todos los participantes!
    </div>
    <div class="m-top-20" style="display: flex;justify-content: flex-end;">
      <vs-button color="dark" v-on:click="cancelProcess()" type="border">Cancelar</vs-button>
      <vs-button
        v-on:click="processFile()"
        color="primary"
        style="margin-left: 12px;"
        type="border"
      >
        Si, finalizar
      </vs-button>
    </div>
  </vs-popup>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

import FiltersDntMixin from '@/febos/chile/dnt/mixins/FiltersDntMixin';

export default {
  name: 'PopUpProcessFile',
  mixins: [FiltersDntMixin],
  props: {
    processedFile: {
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
        return this.modalName === 'processFile';
      },
      set() {
        this.closeModal();
      }
    }
  },
  methods: {
    ...mapActions('Dnts', [
      'processDntFileED'
    ]),
    ...mapActions('Modals', [
      'closeModal'
    ]),
    async processFile() {
      const toProcess = {
        febosId: this.processedFile.febosId,
        estadoId: 9
      };
      await this.processDntFileED(toProcess);
    },
    cancelProcess() {
      this.closeModal();
    }
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
