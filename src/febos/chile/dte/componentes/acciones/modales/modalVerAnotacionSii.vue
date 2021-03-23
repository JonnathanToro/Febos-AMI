<template>
  <div>
    <h4>{{ titulo }}</h4>
    <h5 style="color: #aaaaaa;">{{ subtitulo }}</h5>
    <div  v-if="datos == null" class="mt-3 mb-4">
      <p>
        Este proceso podría tardar mas de lo esperado, ya que se consulta directamente
        en el servicio de impuestos internos.
      </p>
      <br>
      <p>¿Desea Continuar?</p>
      <div class="mt-3" style="text-align: right">
        <vs-button @click="consultarSii" type="filled" color="primary" style="margin-right: 15px;">Consultar anotaciones</vs-button>
        <!--      <vs-button @click="cancelarCierre" type="border" color="primary">No, en otro momento</vs-button>-->
      </div>
    </div>

    <!-- TABLA DE RESPUESTA SII -->
      <div v-else>
        <div slot="header" align="center">
          <h4>Anotaciones SII Documento #{{ getData.folio }}</h4>
        </div>
        <div align="center" v-if="datos.referenciasTipoDte.length > 0">
          <vs-table :data="datos.referenciasTipoDte">
            <template slot="thead">
              <vs-th>Estado</vs-th>
              <vs-th>Número</vs-th>
              <vs-th>Nombre</vs-th>
              <vs-th>Fecha Emisión</vs-th>
            </template>
            <template slot-scope="{datos}">
              <vs-tr :key="indextr" v-for="(tr, indextr) in datos">
                <vs-td :data="datos[indextr].estado">
                  <div v-if="datos[indextr].estado == 1">
                    Creado
                  </div>
                  <div v-if="datos[indextr].estado == 2">
                    En Aprobación
                  </div>
                  <div v-if="datos[indextr].estado == 10">
                    Aprobado
                  </div>
                  <div v-if="datos[indextr].estado == 9">
                    Rechazado
                  </div>
                </vs-td>
                <vs-td :data="datos[indextr].numero">
                  {{datos[indextr].numero}}
                </vs-td>
                <vs-td :data="datos[indextr].nombreDescriptivo">
                  {{datos[indextr].nombreDescriptivo}}
                </vs-td>
                <vs-td :data="datos[indextr].fechaEmision">
                  {{datos[indextr].fechaEmision}}
                </vs-td>
              </vs-tr>
              </template>
            </vs-table>
          </div>
          <div v-else>
            <span align="center">No existen registros asociados</span>
          </div>
      </div>

    <!-- ALERTAS DE RESPUESTA SII -->
    <div v-if="error" align="center">
      <vs-alert title="Alerta" class="mensaje" :active="error" color="danger">
        Error al realizar la operación, reinténtelo más tarde o contacte a soporte Narvi.
      </vs-alert>
    </div>
  </div>
</template>

<script>
import clienteFebosAPI from '../../../../../servicios/clienteFebosAPI';

import modalStore from '@/store/modals/acciones';
import TiposDteMixin from '@/febos/chile/dte/mixins/TiposDteMixin';

export default {
  mixins: [TiposDteMixin],
  computed: {
    getData: {
      get() {
        return modalStore.state.data;
      },
    },
    subtitulo: {
      get() {
        return `Emitida a ${ this.getData.razonSocialReceptor }, RUT ${ this.getData.rutReceptor}`;
      }
    },
    titulo: {
      get() {
        return `${this.traducitTipoDocumentoEnPalabras(this.getData.tipoDocumento) } Nº ${ this.getData.folio}`;
      }
    },
  },
  data() {
    return {
      error: false,
      datos: null,
    };
  },
  methods: {
    cancelarCierre() {
      modalStore.commit('ocultarBitacora');
    },
    consultarSii() {
      this.$vs.loading({ color: '#FF2961', text: 'Espera un momento por favor' });
      clienteFebosAPI.get(`/sii/dte/eventos?febosId=${ this.getData.febosId}`).then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == 10) {
          this.datos = response.data;
        } else {
          this.$vs.notify({
            color: 'danger', title: 'Ver anotaciones SII', text: `${response.data.mensaje }<br/><b>Seguimiento: </b>${ response.data.seguimientoId}`, time: 10000
          });
        }
      }).catch((error) => {
        this.$vs.loading.close();
        console.log(error);
        this.$vs.notify({
          color: 'danger', title: 'Ver anotaciones SII', text: 'No fue posible realizar la consulta', time: 10000
        });
      });
    }
  },
};
</script>
<style>
  .margen-inferior {
    margin-bottom: 15px;
  }
</style>
