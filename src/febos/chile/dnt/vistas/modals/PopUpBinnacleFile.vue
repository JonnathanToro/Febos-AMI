<template>
  <vs-popup
    title="Bitácora del Expediente"
    :active.sync="showModal"
    v-if="binnacleFile"
    @close="closeModal"
  >
    <div>
      <vs-list class="wrap-binnacle">
        <div  v-for="binnacle in binnacleFile" :key="binnacle.bitacoraId">
          <vs-list-header :title="binnacle.fecha | dateCompleteFormat"></vs-list-header>
          <vs-list-item
            v-if="binnacle.severidadNombre === 'ERROR'"
            icon="warning"
            style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
            :title="binnacle.mensaje" :subtitle="binnacle.usuarioNombre"
          >
            <vs-chip
              v-tooltip="'Registro oculto'" title="Registro oculto"
              v-if="binnacle.tipoVista == -1 || binnacle.tipoVista == 0" >
              <vs-icon icon="remove_red_eye" size="small"></vs-icon>
              <span></span>
            </vs-chip>
            <CheckPermission permission="FEB99">
              <vs-chip
                class="add-code"
                @click.native="copyToClipboard(binnacle.seguimientoId)"
                ref="toClipboardId"
              >
                <vs-icon icon="search" size="small"></vs-icon>
                <span></span>
              </vs-chip>
            </CheckPermission>
            <!--<vs-chip color="dark" v-if="binacle.externalId">
              <vs-icon icon="pageview" size="small"></vs-icon>
            </vs-chip>-->
          </vs-list-item>
          <vs-list-item
            v-if="binnacle.severidadNombre === 'INFO'"
            icon="info"
            style="border-bottom:1px solid #cdcdcd;padding-bottom:12px;"
            :title="binnacle.mensaje" :subtitle="binnacle.usuarioNombre"
          >
            <vs-chip
              v-tooltip="'Registro oculto'"  title="Registro oculto"
              v-if="binnacle.tipoVista == -1 || binnacle.tipoVista == 0" >
              <vs-icon icon="remove_red_eye" size="small"></vs-icon>
              <span></span>
            </vs-chip>
            <CheckPermission permission="FEB99">
              <vs-chip
                class="add-code"
                @click.native="copyToClipboard(binnacle.seguimientoId)"
                ref="toClipboardId"
              >
                <vs-icon icon="search" size="small"></vs-icon>
                <span></span>
              </vs-chip>
            </CheckPermission>
            <!--<vs-chip color="dark" v-if="binacle.externalId">
              <vs-icon icon="pageview" size="small"></vs-icon>
            </vs-chip>-->
          </vs-list-item>
        </div>
      </vs-list>
    </div>
  </vs-popup>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

import CheckPermission from '@/febos/global/usuario/components/CheckPermission';

export default {
  components: { CheckPermission },
  computed: {
    ...mapGetters('Dnts', [
      'binnacleFile'
    ]),
    ...mapGetters('Modals', [
      'modalName'
    ]),
    showModal: {
      get() {
        return this.modalName === 'binnacle';
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
    copyToClipboard(code) {
      const element = document.createElement('input');
      element.value = code;
      document.body.appendChild(element);
      element.select();
      document.execCommand('copy');
      document.body.removeChild(element);
    }
  }
};

</script>
<style>
.wrap-binnacle {
  height: 400px;
  overflow-y: scroll;
}

.add-code {
  cursor: copy;
}
</style>
