<template>
  <div>
    <h4>{{ titulo }}</h4>
    <label style="color: #aaaaaa">{{ subtitulo }}</label>
    <vs-row v-if="!getPago.id && !modificar">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" style="margin-top: 20px; margin-bottom: 20px;">
        Sin información de pago
      </vs-col>
    </vs-row>
    <form data-vv-scope="informacionPago" style="width: 100%; margin-top: 30px; min-height: 400px;">
      <div v-if="getPago.id || modificar">

        <div class="vx-row">
          <div class="vx-col w-full emu-label">Estado de pago</div>
          <div class="vx-col w-full">
            <vs-select v-model="tipo" :options="estadosPago" :disabled="!modificar" />
          </div>
          <span
            class="text-danger text-sm form-error-message"
            v-if="getError('tipo') && modificar" >Debe indicar el tipo de pago</span>
        </div>
        <div class="vx-row mt-2">
          <div class="vx-col w-full emu-label">Medio de pago</div>
          <div class="vx-col w-full">
            <vs-select name="medio" v-model="medio" :options="mediosPago" style="width: 100%;" :disabled="!modificar" />
          </div>
          <span
            class="text-danger text-sm form-error-message"
            v-if="getError('medio') && modificar" >Debe indicar el medio de pago</span>
        </div>
        <div class="vx-row mt-2">
          <div class="vx-col md:w-1/2 w-full">
            <div for="" class="vs-input--label" style="width: 100% !important; display: block; margin-top: 4px;">Fecha</div>
            <div class="vs-con-input" style="width: 100% !important; display: block">
              <datepicker name="fecha" :format="format" placeholder="" v-model="fecha" style="width: 90%" monday-first :language="es" :disabled="!modificar"></datepicker>
              <span
                class="text-danger text-sm form-error-message"
                v-if="getError('fecha') && modificar" >Fecha de pago es requerida</span>
            </div>
          </div>
          <div class="vx-col md:w-1/2 w-full">
            <vs-input
              label="Monto"
              maxlength="10"
              type="number"
              v-model="pago.monto"
              class="w-full"
              name="monto" :disabled="!modificar"
              v-validate="'required|numeric'"/>
            <span
            class="text-danger text-sm form-error-message"
            v-if="getError('monto') && modificar" >Debe ingresar el monto</span>
          </div>
          <div class="vx-col w-full">
            <vs-input
              label="Lugar"
              maxlength="60"
              type="text"
              v-model="pago.lugar"
              class="w-full"
              name="lugar" :disabled="!modificar"
              v-validate="'max:60'"
            />
          </div>
          <div class="vx-col w-full mt-3">
            <vs-textarea label="Comentarios" v-model="pago.comentario" :disabled="!modificar" />
          </div>
        </div>
      </div>
    </form>
    <div v-if="!modificar">
      <div style="text-align: right;">
        <vs-button color="primary" style="margin-right: 10px;" type="border" v-on:click="modificar = true">Modifícame</vs-button>
      </div>
    </div>
    <div v-if="modificar">
      <div style="text-align: right;">
        <vs-button color="primary" style="margin-right: 10px;" type="filled" @click="validarPago">Actualizar</vs-button>
      </div>
    </div>

  </div>
</template>

<script>
import vSelect from 'vue-select';
import Datepicker from 'vuejs-datepicker';
import { es } from 'vuejs-datepicker/dist/locale';
import moment from 'moment';

import modalStore from '@/store/modals/acciones';
import TiposDteMixin from '@/febos/chile/dte/mixins/TiposDteMixin';
import clienteFebosAPI from '@/febos/servicios/clienteFebosAPI';

export default {
  name: 'modalInformacionPago',
  components: {
    'vs-select': vSelect,
    Datepicker,
  },
  mixins: [TiposDteMixin],
  props: {},
  computed: {
    subtitulo: {
      get() {
        let retorno = '';
        if (this.getDocumento.tpoTraVenta == 0) {
          retorno = `Recebida desde ${ this.getDocumento.razonSocialEmisor }, RUT ${ this.getDocumento.rutEmisor}`;
        } else {
          retorno = `Emitida a ${ this.getDocumento.razonSocialReceptor }, RUT ${ this.getDocumento.rutReceptor}`;
        }
        return retorno;
      }
    },
    titulo: {
      get() {
        return `${this.traducitTipoDocumentoEnPalabras(this.getDocumento.tipoDocumento) } Nº ${ this.getDocumento.folio}`;
      }
    },
    getDocumento: {
      get() {
        return this.getData.documento;
      }
    },
    getPago: {
      get() {
        if (this.getData.pago.length > 0) {
          return {
            id: this.getData.pago[0].id,
            fecha: this.getData.pago[0].fecha,
            updated: this.getData.pago[0].updated,
            lugar: this.getData.pago[0].lugar,
            medio: this.getData.pago[0].medio,
            monto: this.getData.pago[0].monto,
            tipo: this.getData.pago[0].tipo,
            comentario: this.getData.pago[0].comentario
          };
        }
        return this.pago;
      },
      set(val) {
        this.pago = val;
      }
    },
    getData: {
      get() {
        return modalStore.state.data;
      },
    },
    tipo: {
      get() {
        return this.estadosPago.find((element) => element.code == this.pago.tipo);
      },
      set(val) {
        this.pago.tipo = val.code;
      }
    },
    medio: {
      get() {
        return this.mediosPago.find((element) => element.code == this.pago.medio);
      },
      set(val) {
        this.pago.medio = val.code;
      }
    },
  },
  data() {
    return {
      format: 'dd/MM/yyyy',
      estadosPago: [
        { code: 0, label: 'Sin Información' },
        { code: 1, label: 'Contabilizado' },
        { code: 2, label: 'Enviado a Pago' },
        { code: 3, label: 'Pagado' },
        { code: 4, label: 'Cobrado' },
        { code: 5, label: 'Pago no Efectuado' },
        { code: 6, label: 'Documento compensado' },
        { code: 7, label: 'Documento anulado' },
        { code: 8, label: 'En preparación de pago' },
        { code: 9, label: 'En nómina de pago' },
      ],
      mediosPago: [
        { code: '', label: 'Sin gestión' },
        { code: 'CH', label: 'Cheque' },
        { code: 'CF', label: 'Cheque a Fecha' },
        { code: 'LT', label: 'Letra' },
        { code: 'EF', label: 'Efectivo' },
        { code: 'PE', label: 'Pago a Cta. Cte.' },
        { code: 'TC', label: 'Tarjeta de crédito' },
        { code: 'VV', label: 'Vale Vista' },
        { code: 'CO', label: 'Confirming' },
        { code: 'OT', label: 'Otro' },
      ],
      pago: {
        id: null, fecha: null, updated: null, lugar: null, medio: null, monto: null, tipo: null, comentario: null
      },
      fecha: moment().format('YYYY-MM-DD'),
      modificar: false,
      es
    };
  },
  mounted() {
    this.pago = modalStore.state.data.pago[0];
    this.fecha = this.pago.fecha;
  },
  methods: {
    validarPago() {
      this.$validator.validateAll('informacionPago').then((result) => {
        if (result) {
          this.$vs.loading({ color: '#FF2961', text: 'Espera un momento por favor' });
          this.pago.fecha = moment(this.fecha).format('YYYY-MM-DD');
          this.pago.updated = this.pago.fecha;

          clienteFebosAPI.post(`/documentos/${ this.getDocumento.febosId }/pagos`, this.pago).then((response) => {
            this.$vs.loading.close();
            if (response.data.codigo == 10) {
              this.$vs.notify({
                color: 'success', title: 'Información de pago', text: 'Información de pago actualizada.'
              });
              this.cerrarVentana();
            } else {
              this.$vs.notify({
                color: 'danger', title: 'Información de pago', text: `${response.data.mensaje }<br/><b>Seguimiento: </b>${ response.data.seguimientoId}`, time: 10000
              });
            }
          }).catch((error) => {
            console.log(error);
            this.$vs.notify({
              color: 'danger', title: 'Información de pago', text: 'No fue posible procesar la información de pago', time: 10000
            });
            this.$vs.loading.close();
          });
        }
      });
    },
    cerrarVentana() {
      modalStore.commit('ocultarBitacora');
      // this.confirmaCierre();
    },
    cierrame() {
      modalStore.commit('ocultarBitacora');
    },

    /* Validación Encabezado */
    getError(par) {
      const retorno = null;
      const ret = this.errors.items.find((elemento) => elemento.field == par);
      if (ret !== undefined && retorno === null) {
        if (ret.rule == 'required') {
          return 'required';
        }
      }
      return null;
    },

  },

};
</script>

<style>
.margin-bot{
  margin-bottom: 15px;
}
.emu-label  {
  font-size: 0.85rem;
  padding-left: 5px;
}
</style>
