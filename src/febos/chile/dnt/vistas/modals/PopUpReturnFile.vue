<template>
  <vs-popup :title="`Retornar Expediente ${file.numero}`" :active.sync="showModal">
    <div>
      <span class="chip-custom">
        Por Favor deja un comentario sobre el motivo de la devolución del expediente
      </span>
      <div class="wrap-commentary">
        <vs-textarea
          maxlength="255"
          label="Comentario"
          v-model="commentary"
        />
      </div>
    </div>
    <div class="m-top-20" style="display: flex;justify-content: flex-end;">
      <vs-button color="dark" v-on:click="cancelProcess()" type="border">Cancelar</vs-button>
      <vs-button
        v-on:click="returnFile()"
        color="primary"
        style="margin-left: 12px;"
        type="border"
      >
        Si, devolver
      </vs-button>
    </div>
  </vs-popup>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

import FiltersDntMixin from '@/febos/chile/dnt/mixins/FiltersDntMixin';

export default {
  name: 'PopUpReturnFile',
  data() {
    return {
      commentary: ''
    };
  },
  mixins: [FiltersDntMixin],
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
        return this.modalName === 'returnFile';
      },
      set() {
        this.closeModal();
      }
    }
  },
  methods: {
    ...mapActions('Dnts', [
      'returnFileEd'
    ]),
    ...mapActions('Modals', [
      'closeModal'
    ]),
    async returnFile() {
      const toReturn = {
        febosId: this.file.febosId,
        comentario: this.commentary
      };
      await this.returnFileEd(toReturn);
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
  border-radius: 10px;
  padding: 4px 8px;
}
.wrap-commentary {
  width: 90%;
  margin: 20px auto;
}
</style>
