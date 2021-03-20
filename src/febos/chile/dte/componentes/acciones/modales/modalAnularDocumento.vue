<template>
  <div align="center">
    <h4>Advertencia</h4>
    <br />
    <p>¿Esta acción no puede deshacerse ... estás seguro que deseas anular este documento?</p>
    <br />
    <div style="float: right;">
      <vs-button color="primary" type="filled" @click="anular">Anular documento</vs-button>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select';

import modalStore from '@/store/modals/acciones';
import clienteFebosAPI from '@/febos/servicios/clienteFebosAPI';

export default {
  name: 'modalAnularGuia',
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
      documento: {},
    };
  },
  mounted() {
    this.documento = this.getData;
  },
  methods: {
    cerrarVentana() {
      modalStore.commit('ocultarBitacora');
    },

    anular() {
      this.$vs.loading({ color: '#FF2961', text: 'Espera un momento por favor' });
      clienteFebosAPI.put(`/documentos/datos/${ this.documento.febosId }/estado=10`).then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == 10) {
          this.$vs.notify({
            color: 'success', title: 'Anulación Documento', text: 'Documento anulado correctamente'
          });
          this.cerrarVentana();
        } else {
          this.$vs.notify({
            color: 'danger', title: 'Anulación Documento', text: `${response.data.mensaje }<br/><b>Seguimiento: </b>${ response.data.seguimientoId}`, time: 10000
          });
        }
      }).catch((error) => {
        this.$vs.loading.close();
        console.log(error);
        this.$vs.notify({
          color: 'danger', title: 'Anulación Documento', text: 'No fue posible procesar la anulación del documento', time: 10000
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
