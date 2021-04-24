<template>
  <vs-popup :title="`Responder Expediente ${file.numero}`" :active.sync="showModal">
    <div>
      Si decides responder este expediente vas a ser re-dirigido a un formulario
      y éste expediente quedará referenciado.
    </div>
    <div class="mt-3">
      <div class="bg-alert p-3">
        Por favor selecciona con que tipo de expediente quieres responder, recuerda que
        <b>trámite interno es procesado por oficinas internas</b>
      </div>
      <div class="mt-3">
        <vs-select
          class="w-100"
          autocomplete
          label="Tipo de Expediente respuesta"
          name="formatDocument"
          v-model="fileType"
        >
          <vs-select-item
            :value="'numInt'"
            text="Trámite interno"
          />
          <vs-select-item
            :value="'numOf'"
            text="Trámite oficial"
          />
        </vs-select>
      </div>
      <div class="mt-3">
        <list-user-groups
          class="w-100"
          autocomplete
          label="Grupo al que irá asociado el expediente"
          name="creatorGroup"
          v-model="creatorGroup"
          :danger="errors.has('step-2-part-1.creatorGroup')"
          :danger-text="errors.first('step-2-part-1.creatorGroup')"
          v-validate="{ required: userGroupsState.list.length > 1 }"
          ref="creatorGroup"
        />
      </div>
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

import ListUserGroups from '@/febos/chile/lists/components/ListUserGroups';

export default {
  name: 'PopUpAnswerFile',
  components: {
    ListUserGroups
  },
  mixins: [],
  data() {
    return {
      fileType: 'numInt',
      creatorGroup: ''
    };
  },
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
    ...mapGetters('List', [
      'userGroupsState'
    ]),
    ...mapGetters('Usuario', [
      'currentUser'
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
      const creatorGroupName = this.creatorGroup
        ? this.$refs.creatorGroup.getOption().label
        : '';
      const answerFile = {
        dnt: {
          tipo: 'EXP',
          emisorRut: this.company.iut,
          receptorRut: this.company.iut,
          emisorRazonSocial: this.company.razonSocial,
          receptorRazonSocial: this.company.razonSocial,
          claseMercadoPublico: this.fileType,
          estado: 3,
          solicitanteGrupoId: this.creatorGroup,
          solicitanteGrupoNombre: creatorGroupName,
          compradorCodigo: this.creatorGroup,
          compradorArea: creatorGroupName,
          emisorContactoNombre: this.currentUser.nombre,
          emisorContactoCodigo: this.currentUser.id
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

.bg-alert {
  background: #671e85;
  border-radius: 5px;
  color: white;
}

</style>
