<template>
  <div align="center">
    <p>¿Seguro de reenviar al SII?</p>
    <div style="text-align: right; margin-top: 30px;">
      <vs-button color="primary" type="filled" @click="reenviarDocumento">Reenviar documento</vs-button>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select';

import modalStore from '@/store/modals/acciones';
import clienteFebosAPI from '@/febos/servicios/clienteFebosAPI';

export default {
  name: 'modalReenviarSii',
  computed: {
    getData: {
      get() {
        return modalStore.state.data;
      },
    },
  },
  data() {
    return {
      vista: false,
      modificar: false,
      documento: {},
      respuesta: null,
      msjRespuesta: null
    };
  },
  mounted() {
    this.documento = this.getData;
  },
  methods: {
    cerrarVentana() {
      modalStore.commit('ocultarBitacora');
    },

    reenviarDocumento() {
      this.$vs.loading({ color: '#FF2961', text: 'Espera un momento por favor' });
      clienteFebosAPI.get(`/sii/dte/reenviodocumento?febosId=${ this.getData.febosId}`).then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == 10) {
          this.$vs.notify({
            color: 'success', title: 'Reenvío documento', text: 'Documento reenviado a Sii'
          });
          this.cerrarVentana();
        } else {
          this.$vs.notify({
            color: 'danger', title: 'Reenvío documento', text: `${response.data.mensaje }<br/><b>Seguimiento: </b>${ response.data.seguimientoId}`, time: 10000
          });
        }
      }).catch((error) => {
        this.$vs.loading.close();
        console.log(error);
        this.$vs.notify({
          color: 'danger', title: 'Reenvío documento', text: 'No fue posible procesar el reenvío del documento', time: 10000
        });
      });
    }
  },
  components: {
    'v-select': vSelect,
  },
};
</script>

<style>
.ajuste_dialogo {
  text-align: center;
}
[dir] .vs-button:not(.vs-radius):not(.includeIconOnly):not(.small):not(.large) {
    padding: -0.25rem 2rem;
    margin: 10px;
}
</style>
