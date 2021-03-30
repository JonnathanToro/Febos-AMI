<template>
  <vs-popup :title="`Responder Expediente ${file.numero}`" :active.sync="showModal">
    <div>
      Si decides responder este expediente vas a ser re-dirigido a un formulario
      y éste expediente quedará referenciado.
    </div>
    <div class="m-top-20" style="display: flex;justify-content: flex-end;">
      <vs-button color="dark" v-on:click="cancelAsign()" type="border">Cancelar</vs-button>
      <vs-button
        v-on:click="attemptAnswerFile()"
        color="primary"
        style="margin-left: 12px;"
        type="border"
      >
        Si, Responder
      </vs-button>
    </div>
  </vs-popup>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PopUpAnswerFile',
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
    ...mapGetters('Empresas', [
      'company'
    ]),
    showModal: {
      get() {
        return this.modalName === 'answerFile';
      },
      set() {
        this.closeModal();
      }
    }
  },
  methods: {
    ...mapActions('Dnts', [
      'answerCreateFile'
    ]),
    ...mapActions('Modals', [
      'closeModal'
    ]),
    async attemptAnswerFile() {
      const answerFile = {
        dnt: {
          tipo: 'EXP',
          emisorRut: this.company.iut,
          receptorRut: this.company.iut,
          emisorRazonSocial: this.company.razonSocial,
          receptorRazonSocial: this.company.razonSocial,
          claseMercadoPublico: 'int',
          estado: 3
        },
        referencias: [
          {
            linea: 1,
            tipoDocumento: this.file.tipo,
            folio: this.file.numero,
            otraReferenciaId: this.file.febosId
          }
        ]
      };
      this.answerCreateFile(answerFile);
    },
    cancelAsign() {
      this.closeModal();
    }
  }
};
</script>
<style scoped>

</style>
