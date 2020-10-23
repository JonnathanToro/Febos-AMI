<template>
  <div align="rigth">
    <div class="vx-row mb-2">
      <div class="vx-col w-auto">
        <span>Nombre:</span>
        <vs-input
          type="text"
          class="w-full"
          v-model="flujo.nombre"
        />
      </div>
      <div class="vx-col w-auto">
        <span>Descripción:</span>
        <vs-input
          type="text"
          class="w-full"
          v-model="flujo.descripcion"
        />
      </div>
    </div>
    <div class="vx-row mb-2">
      <div class="vx-col w-full">
        <span>Flujo:</span>
        <v-select
          v-model="flujo.flujo"
          placeholder="Seleccionar Flujo"
        />
      </div>
    </div>
    <br>
    <div class="vx-row mb-2">
      <div class="vx-col w-full">
        <h4>Documento</h4>
      </div>
    </div>
    <br>
    <div class="vx-row mb-2">
      <div class="vx-col w-full">
        <span>Nombre:</span>
        <vs-input
          type="text"
          class="w-full"
          v-model="flujo.documento.nombre"
        />
      </div>
    </div>
    <div class="vx-row mb-2">
      <div class="vx-col w-full">
        <span>Descripción:</span>
        <vs-textarea
          class="w-full"
          v-model="flujo.documento.descripcion"
          height="150px"
        />
      </div>
    </div>
    <br>
    <br>
    <div align="center">
      <div class="margin-bot">
        <vs-alert title="Alerta" class="mensaje" :active="respuesta" color="success">
          Acción realizada correctamente
        </vs-alert>
        <vs-alert title="Alerta"  :active="respuesta == false" color="danger">
          Error, al realizar la operación, reintente o contacte a soporte.
        </vs-alert>
      </div>
    </div>
    <div class="vx-row mb-2">
      <div class="vx-col w-full">
        <vs-button  v-if="habilitado == true" @click="enviar()" color="rgb(255, 41, 97)" type="filled" style="width: 100%;">Enviar</vs-button>
      </div>
    </div>
  </div>
</template>


<script>
import modalStore from "@/store/modals/acciones";
import vSelect from "vue-select";
import TiposDteMixin from "../../../mixins/TiposDteMixin";
import clienteFebosAPI from "@/febos/servicios/clienteFebosAPI";

export default {
  name: "modalEnviarAprobacion",
  mixins: [TiposDteMixin],
  computed: {
    getData: {
      get() {
        return modalStore.state.data;
      },
    },
  },
  data() {
    return {
      flujo: {
        nombre: null,
        descripcion: null,
        flujo: null,
        documento: {
          nombre: null,
          descripcion: null
        }
      },
      habilitado: false,
      aprobaciones: [],
      respuesta: null
    };
  },
  async mounted() {
    this.$vs.loading({ color: "#FF2961", text: "Espera un momento por favor" })

    this.flujo.nombre                 = 'DTE: '+this.getData.rutEmisor+" "+this.getData.tipoDocumento+" # "+this.getData.folio;
    this.flujo.descripcion            = 'DTE - '+this.traducitTipoDocumentoEnPalabras(this.getData.tipoDocumento)+' # '+this.getData.folio+' E: '+this.getData.rutEmisor+' '+this.getData.razonSocialEmisor+' R: '+this.getData.rutReceptor+' '+this.getData.razonSocialReceptor
    this.flujo.documento.nombre       = 'DTE: '+this.traducitTipoDocumentoEnPalabras(this.getData.tipoDocumento)+' '+this.getData.rutEmisor+' # '+this.getData.folio;
    this.flujo.documento.descripcion  = 'DTE - '+this.traducitTipoDocumentoEnPalabras(this.getData.tipoDocumento)+' # '+this.getData.folio+' E: '+this.getData.rutEmisor+' '+this.getData.razonSocialEmisor+' R: '+this.getData.rutReceptor+' '+this.getData.razonSocialReceptor

    await clienteFebosAPI.get('/aprobaciones').then((response) => {
      console.log("LISTADO APROBACIONES: ", response);
      if (response.data.codigo == 10 && response.data.aprobaciones.length < 1) {
        this.habilitado = true;
        this.$vs.loading.close();
      }else if(response.data.codigo == 10 && response.data.aprobaciones.length > 0) {
        response.data.aprobaciones.forEach(element => {
          this.aprobaciones.push(element);
        });
        this.$vs.loading.close();
      }else{
          this.respuesta = false;
          this.$vs.loading.close();
      }
    });
  },
  methods: {
    cerrarVentana() {
      modalStore.commit("ocultarBitacora");
    },
    enviar() {
      console.log("Datos enviados: ",this.flujo);
    }
  },
  components: {
    "v-select": vSelect,
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
