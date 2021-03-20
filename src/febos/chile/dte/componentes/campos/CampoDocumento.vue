<template>
  <div>
    <span class="razonSocial">{{ razonSocial }}</span>
    <div>
      <vs-chip :color="colores.navbar">
        {{ traducitTipoDocumentoEnPalabras(documento.tipoDocumento) }}
      </vs-chip>
      <vs-chip color="#aaa">
        # {{ documento.folio }}
      </vs-chip>
      <vs-chip color="primary" v-if="documento.diasParaPago>0">
        <vs-tooltip text="Días faltantes para pago, tomando en cuenta 30 días" position="top">
          {{ documento.diasParaPago}}
        </vs-tooltip>
      </vs-chip>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import TiposDteMixin from '../../mixins/TiposDteMixin';

export default {
  name: 'CampoDocumento',
  mixins: [TiposDteMixin],
  props: {
    documento: {
      type: Object,
    },
  },
  computed: {
    ...mapState('Empresas', {
      empresaActual: (state) => state.empresa,
    }),
    ...mapState('Personalizacion', {
      colores: (state) => state.colores,
    }),
    razonSocial() {
      if (this.empresaActual.iut == this.documento.rutEmisor) {
        return this.documento.razonSocialReceptor;
      }
      return this.documento.razonSocialEmisor;
    }
  }
};
</script>

<style scoped>
  .razonSocial{
    font-size:90%;
    font-weight: bold;
  }
</style>
