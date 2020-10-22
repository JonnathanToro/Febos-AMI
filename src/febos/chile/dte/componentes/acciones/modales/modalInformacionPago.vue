<template>
  <div>
    <div v-if="!modificar">
      <h4 class="margin-bot">Información de pago</h4>
      <vs-row class="margin-bot">
        <vs-col  vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
          <vs-card style="margin: 5px;">
            <div slot="header">
              <span>
                <b>
                  Tipo de pago
                </b>
              </span>
            </div>
            <div>
              <span>{{ tipo_c.label }}</span>
            </div>
          </vs-card>
        </vs-col>
        <vs-col  vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
          <vs-card style="margin: 5px;">
            <div slot="header">
              <span>
                <b>
                  Medio de pago
                </b>
              </span>
            </div>
            <div>
              <span>{{ medio_c.label }}</span>
            </div>
          </vs-card>
        </vs-col>
        <vs-col  vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
          <vs-card style="margin: 5px;">
            <div slot="header">
              <span>
                <b>
                  Monto
                </b>
              </span>
            </div>
            <div v-if="elemento.monto !== ''">
              <span>{{ elemento.monto }}</span>
            </div>
            <div v-else>
              Sin Información
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
      <vs-row class="margin-bot">
        <vs-col  vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
          <vs-card style="margin: 5px;">
            <div slot="header">
              <span>
                <b>
                  Lugar
                </b>
              </span>
            </div>
            <div v-if="elemento.lugar !== ''">
              <span>{{ elemento.lugar }}</span>
            </div>
            <div v-else>
              Sin Información
            </div>
          </vs-card>
        </vs-col>
        <vs-col  vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
          <vs-card style="margin: 5px;">
            <div slot="header">
              <span>
                <b>
                  Fecha
                </b>
              </span>
            </div>
            <div v-if="elemento.updated !== '' && elemento.updated !== 'Invalid date'">
              <span>{{ elemento.updated }}</span>
            </div>
            <div v-else>
              Sin Información
            </div>
          </vs-card>
        </vs-col>
        <vs-col  vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
          <vs-card style="margin: 5px;">
            <div slot="header">
              <span>
                <b>
                  Comentario
                </b>
              </span>
            </div>
            <div v-if="elemento.comentario && elemento.comentario !== ''">
              <span>{{ elemento.comentario }}</span>
            </div>
            <div v-else>
              Sin Información
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
      <div style="width: 100%; margin-top: 15px;">
        <div align="right">
          <vs-button color="primary" style="margin-right: 10px;" type="filled" v-on:click="modificar = true">Modifícame</vs-button>
          <vs-button color="primary" type="border" v-on:click="cierrame">Cerrar</vs-button>
        </div>
      </div>
    </div>
    <div v-if="modificar">
      <div v-for="elemento in getData.infoPago" :key="elemento.id">
        <!-- formulario -->
        <h4>Información de pago</h4>
        <br />
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <span>Estado de pago:</span>
            <v-select
              v-model="tipo"
              :options="estados_de_pago"
              placeholder="Estado de pago"
            />
          </div>
        </div>
        <br />
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <span>Medio de pago:</span>
            <v-select
              v-model="medio"
              :options="medios_de_pago"
              placeholder="Medio de Pago"
            />
          </div>
        </div>
        <br/>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <span>Monto:</span>
            <vs-input
              type="number"
              class="w-full"
              v-model="elemento.monto"
              min="0"
            />
          </div>
        </div>
        <br/>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <span>Lugar:</span>
            <vs-input class="w-full" v-model="elemento.lugar" />
          </div>
        </div>
        <br />
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <span>Fecha:</span>
            <datepicker :format="format" placeholder="" v-model="elemento.updated"></datepicker>
          </div>
        </div>
        <br/>
        <div class="vx-row mb-6">
          <div class="vx-col w-full">
            <span>Información adicional:</span>
            <vs-input
              class="w-full"
              v-model="elemento.comentario"
            />
          </div>
        </div>
        <div align="center">
          <div class="margin-bot">
            <vs-alert title="Alerta" class="mensaje" :active="respuesta" color="success">
              Modificación realizada correctamente
            </vs-alert>
            <vs-alert title="Alerta"  :active="respuesta == false" color="danger">
              Error, al realizar la operación, reintente o contacte a soporte.
            </vs-alert>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-button class="mr-3 mb-2" v-on:click="tmpGuardar()">Guárdame</vs-button>
            <vs-button
              color="warning"
              type="border"
              class="mb-2"
              v-on:click="cierrame"
            >Cancelar</vs-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import modalStore from "@/store/modals/acciones";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import moment from 'moment';
import clienteFebosAPI from "@/febos/servicios/clienteFebosAPI";

export default {
  name: "modalInformacionPago",
  components: {
    "v-select": vSelect,
    Datepicker,
  },
  props: {
    documento: {
      type: Object
    }
  },
  computed: {
    getData: {
      get() {
        return modalStore.state.data;
      },
    },
    tipo: {
      get() {
        return this.estados_de_pago.find(element => element.code == this.elemento.tipo);
      },
      set(val) {
        this.elemento.tipo = val.code;
      }
    },
  medio: {
    get(){
      return this.medios_de_pago.find(element => element.code == this.elemento.medio);
    },
    set(val) {
          this.elemento.medio = val.code;
    }
  }
},
  data() {
    return {
      vista: true,
      modificar: false,
      format: "dd-MM-yyyy",
      estados_de_pago: [
        { code: 0, label: "Sin Información" },
        { code: 1, label: "Contabilizado" },
        { code: 2, label: "Enviado a Pago" },
        { code: 3, label: "Pagado" },
        { code: 4, label: "Cobrado" },
        { code: 5, label: "Pago no Efectuado" },
        { code: 6, label: "Documento compensado" },
        { code: 7, label: "Documento anulado" },
        { code: 8, label: "En preparación de pago" },
        { code: 9, label: "En nómina de pago" },
      ],
      medios_de_pago: [
        { code: '', label: "Sin gestión" },
        { code: 'CH', label: "Cheque" },
        { code: 'CF', label: "Cheque a Fecha" },
        { code: 'LT', label: "Letra" },
        { code: 'EF', label: "Efectivo" },
        { code: 'PE', label: "Pago a Cta. Cte." },
        { code: 'TC', label: "Tarjeta de crédito" },
        { code: 'VV', label: "Vale Vista" },
        { code: 'CO', label: "Confirming" },
        { code: 'OT', label: "Otro" },
      ],
      elemento: {},
      respuesta: null,
      tipo_c: '',
      medio_c: ''
    };
  },
  mounted()  {
    this.elemento = this.getData.infoPago[0];
    this.tipo_c = this.tipo;
    this.medio_c = this.medio;
    if( this.elemento.updated !== 'Invalid date' && this.elemento.updated !== '' ) {
      this.elemento.updated = moment(this.elemento.updated).format('DD-MM-YYYY');
    }else{
      this.elemento.updated = '';
    }

    console.log("GET DATA: ",this.getData);
  },
  methods: {
    tmpGuardar()  {
      this.$vs.loading({ color: "#FF2961", text: "Espera un momento por favor" })

      this.elemento.updated = moment(this.elemento.updated).format('YYYY-MM-DD');

      console.log("ANTES DE ENVIAR: ",this.elemento);
      clienteFebosAPI.post("/documentos/" + this.getData.febosId + "/pagos", this.elemento).then((response) => {
        console.log(response);
        if(response.data.codigo == 10) {
          this.respuesta = true;
          this.$vs.loading.close();
        }else{
          this.respuesta = false;
          this.$vs.loading.close();
        }
      });
    },
    cerrarVentana: function () {
      modalStore.commit("ocultarBitacora");
      this.confirmaCierre();
      //this.alertaCierre();
    },
    cierrame() {
      modalStore.commit("ocultarBitacora");
    },
  },

};
</script>

<style>
.margin-bot{
  margin-bottom: 15px;
}
</style>
