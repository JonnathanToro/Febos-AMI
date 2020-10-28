<template>
  <div>
    <h4>{{ titulo }}</h4>
    <h5 style="color: #aaaaaa;">{{ subtitulo }}</h5>

    <form data-vv-scope="formularioCeder" style="width: 100%; margin-top: 30px;">

      <h5>Datos del Cesionario</h5>

      <div class="vx-row mt-3">
        <div class="vx-col md:w-1/2 w-full">
          <vs-input
            label="RUT (sin puntos, con guión)"
            maxlength="10"
            v-model="ceder.cesionarioRut"
            class="w-full"
            name="cesionarioRut"
            v-validate="'required|validaRut'" />
          <span
            class="text-danger text-sm form-error-message"
            v-if="getError('cesionarioRut') == 'required'">RUT es obligatorio</span>
          <span
            class="text-danger text-sm form-error-message"
            v-if="getError('cesionarioRut') == 'rut'">Formato de RUT incorrecto</span>
        </div>
        <div class="vx-col w-full mt-2">
          <vs-input
            label="Razón Social"
            maxlength="60"
            v-model="ceder.cesionarioRazonSocial"
            class="w-full"
            name="cesionarioRazonSocial"
            v-validate="'required'" />
          <span
            class="text-danger text-sm form-error-message"
            v-if="getError('cesionarioRazonSocial') == 'required'">Razón social es oblitagorio</span>
        </div>
        <div class="vx-col w-full mt-2">
          <vs-input
            label="Dirección"
            maxlength="80"
            v-model="ceder.cesionarioDireccion"
            class="w-full"
            name="cesionarioDireccion"
            v-validate="'required'" />
          <span
            class="text-danger text-sm form-error-message"
            v-if="getError('cesionarioDireccion') == 'required'">Dirección es obligatoria</span>
        </div>
        <div class="vx-col w-full mt-2">
          <vs-input
            type="email"
            label="Email"
            maxlength="90"
            v-model="ceder.cesionarioMail"
            class="w-full"
            name="cesionarioMail"
            v-validate="'required|email'"
          />
          <span
            class="text-danger text-sm form-error-message"
            v-if="getError('cesionarioMail') == 'required'">Correo electrónico es obligatorio</span>
          <span
            class="text-danger text-sm form-error-message"
            v-if="getError('cesionarioMail') == 'email'">Correo electrónico es incorrecto</span>
        </div>
      </div>

      <h5 class="mt-4">Datos de contacto</h5>

      <div class="vx-row mt-3">
        <div class="vx-col w-full">
          <vs-input
            label="Nombre"
            maxlength="60"
            v-model="ceder.contactoNombreContacto"
            class="w-full"
            name="contactoNombreContacto"
            v-validate="'required|alpha_spaces'" />
          <span
            class="text-danger text-sm form-error-message"
            v-if="getError('contactoNombreContacto') == 'required'">Nombre del contacto es necesario</span>
        </div>
        <div class="vx-col md:w-1/2 w-full mt-2">
          <vs-input
            type="email"
            label="Email"
            maxlength="90"
            v-model="ceder.contactoEmailContato"
            class="w-full"
            name="contactoEmailContato"
            v-validate="'required|email'"
          />
          <span
            class="text-danger text-sm form-error-message"
            v-if="getError('contactoEmailContato') == 'required'">Correo electrónico es obligatorio</span>
          <span
            class="text-danger text-sm form-error-message"
            v-if="getError('contactoEmailContato') == 'email'">Correo electrónico es incorrecto</span>
        </div>

        <div class="vx-col md:w-1/2 w-full">
          <vs-input
            label="Teléfono"
            maxlength="12"
            placeholder="569"
            v-model="ceder.contactoTelefonoContacto"
            class="w-full"
            name="contactoTelefonoContacto"
            v-validate="'required|numeric'" />
          <span
            class="text-danger text-sm form-error-message"
            v-if="getError('contactoTelefonoContacto') == 'required'">Número de contacto es requerido</span>
        </div>
      </div>

    </form>

    <div align="right">
      <div>
        <vs-button color="primary" type="filled" @click="enviarCeder">Ceder</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import modalStore from "@/store/modals/acciones";
import clienteFebosAPI from "../../../../../servicios/clienteFebosAPI";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import TiposDteMixin from "@/febos/chile/dte/mixins/TiposDteMixin";
import { Validator } from "vee-validate";
import es from "vee-validate/dist/locale/es";

Validator.localize("es", es);
Validator.extend("validaRut", {
  getMessage: (field) => field + " incorrecto",
  validate: (value) => {
    var esCorrecto = validaRUT(value);
    return esCorrecto;
  },
});

export default {
  name: "modalCeder",
  mixins: [ TiposDteMixin ],
  components: {
    "vs-select": vSelect,
    Datepicker,
  },
  data() {
    return {
      ceder: {
        cesionarioRut: null,
        cesionarioRazonSocial: null,
        cesionarioDireccion: null,
        cesionarioMail: null,
        contactoNombreContacto: null,
        contactoEmailContato: null,
        contactoTelefonoContacto: null,
        febosId: null
      },
      respuesta: null,
      error: null
    }
  },
  computed: {
    getData: {
      get() {
        return modalStore.state.data;
      },
    },
    subtitulo: {
      get() {
        return "Emitida a " + this.getData.razonSocialReceptor + ", RUT " + this.getData.rutReceptor;
      }
    },
    titulo: {
      get() {
        return this.traducitTipoDocumentoEnPalabras(this.getData.tipoDocumento) + " Nº " + this.getData.folio;
      }
    },
  },
  mounted() {
    this.ceder.febosId = this.getData.febosId
  },
  methods: {
    cerrarVentana: function () {
      modalStore.commit("ocultarBitacora");
    },
    enviarCeder() {
      this.$validator.validateAll("formularioCeder").then((result) => {
        if (result) {
          this.__enviarCeder();
        } else {
          this.$vs.notify({
            color: 'danger', title: 'Cesión de documento', text: 'Debe ingresar todos los datos de forma correcta'
          });
        }
      });
    },
    __enviarCeder() {
      this.$vs.loading({ color: "#FF2961", text: "Espera un momento por favor" })
      clienteFebosAPI.post("/sii/dte/cesion", this.ceder).then((response) => {
        this.$vs.loading.close();
        if(response.data.codigo == 10) {
          this.$vs.notify({
            color: 'success', title: 'Cesión de documento', text: 'Documento cedido'
          });
          this.cerrarVentana();
        } else {
          this.$vs.notify({
            color: "danger", title: "Cesión de documento", text: response.data.mensaje + "<br/><b>Seguimiento: </b>" + response.data.seguimientoId, fixed: true
          });
        }
      }).catch((error) => {
        console.log(error);
        this.$vs.notify({
          color: "danger", title: "Cesión de documento", text: "No fue posible procesar la cesión del documento", fixed: true
        });
        this.$vs.loading.close();
      });
    },
    /* Validación Encabezado */
    getError(par) {
      let retorno = null;
      const ret = this.errors.items.find(elemento => elemento.field == par);
      if (ret !== undefined && retorno === null)  {
        if (par == "cesionarioRut" && ret.rule == "validaRut")  {
          return "rut";
        }
        if (par == "email" && ret.rule == "email") {
          return "email";
        }
        if (ret.rule == "required") {
          return "required";
        }
      }
      return null;
    },
  },


};

function validaRUT(rutCompleto) {
  rutCompleto = rutCompleto.replace("‐", "-");
  if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
  var tmp = rutCompleto.split("-");
  var digv = tmp[1];
  var rut = tmp[0];
  if (digv == "K") digv = "k";

  return dv(rut) == digv;
}

function dv(T) {
  var M = 0,
    S = 1;
  for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
  return S ? S - 1 : "k";
}

</script>

<style>
.con-vs-popup .vs-popup {
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  z-index: 100;
  width: 35%;
  margin: 10px;
  max-width: calc(100% - 30px);
  max-height: calc(100% - 30px);
  border-radius: 6px;
  -webkit-box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  -webkit-animation: rebound 0.3s;
  animation: rebound 0.3s;
}
.vs-input--input {
  color: inherit;
  position: relative;
  padding: 0.4rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15);
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  width: 100%;
}
.is-label-placeholder {
  width: 100%;
}
[dir] .vs-button:not(.vs-radius):not(.includeIconOnly):not(.small):not(.large) {
  padding: -0.25rem 2rem;
  margin: 10px;
}
.margen-inferior {
  margin-bottom: 15px;
}
</style>
