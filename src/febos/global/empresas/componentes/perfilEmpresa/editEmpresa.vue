<template>
  <div class="mt-5">
      <form data-vv-scope="perfilEmpresa">

        <div class="vx-row">
          <div class="vx-col w-1/4">
            <vs-input
              label="RUT"
              maxlength="10"
              v-model="datos.iut"
              class="w-full"
              name="iut"
              v-validate="'required|validaRut'"
              readonly="readonly"
            />
            <span class="text-danger text-sm form-error-message" v-if="getError('rutReceptor') == 'required'">RUT es obligatorio</span>
            <span class="text-danger text-sm form-error-message" v-if="getError('rutReceptor') == 'rut'">Formato de RUT incorrecto</span>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col md:w-1/4 mt-3">
            <vs-input
              label="Cód. Actividad Económica"
              maxlength="10"
              v-model="datos.acteco"
              class="w-full"
              name="acteco" min="0"
              v-validate="'required|alpha_num'"
            />
            <span class="text-danger text-sm form-error-message" v-if="getError('acteco')" >Cód. actividad económica es obligatorio</span >
          </div>
          <div class="vx-col md:w-1/4 mt-3">
            <vs-input
              label="Giro"
              maxlength="50"
              v-model="datos.giro"
              class="w-full"
              name="giro" min="0"
              v-validate="'required|alpha_spaces'"
            />
            <span class="text-danger text-sm form-error-message" v-if="getError('giro')" >Giro es obligatorio</span >
          </div>
          <div class="vx-col md:w-2/6 mt-3">
            <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
              <label for="fecharResolucion" class="vs-input--label">Fecha Resolución</label>
              <datepicker
                id="fechaResolucion" name="fechaResolucion" required v-model="datos.fechaResolucion"></datepicker>
            </div>
          </div>
          <div class="vx-col md:w-2/6 mt-3">
            <vs-input
              label="Número Resolución"
              maxlength="10"
              v-model="datos.numeroResolucion"
              class="w-full"
              name="numeroResolucion" min="0"
              v-validate="'required|numeric'"
            />
            <span class="text-danger text-sm form-error-message" v-if="getError('numeroResolucion')" >Número de resolución obligatorio</span >
          </div>
<!--          <div class="vx-col md:w-1/8 mt-10" >
            <vs-switch id="esPyme" name="esPyme" v-model="datos.esPyme"/>
          </div>
          <div class="vx-col md:w-1/8 mt-10 pl-0">
            <label for="esPyme" style="font-size: 12px">Es Pyme</label>
          </div>-->
        </div>
        <div class="vx-row">
          <div class="vx-col md:w-1/2 mt-3">
            <vs-input
              label="Razón Social"
              maxlength="100"
              v-model="datos.razon"
              class="w-full"
              name="razon"
              v-validate="'required|alpha_spaces'"
            />
            <span class="text-danger text-sm form-error-message" v-if="getError('razon')" >Razón Social es obligatoria</span >
          </div>
          <div class="vx-col md:w-1/2 mt-3">
            <vs-input
              label="Nombre de fantasía"
              maxlength="100"
              v-model="datos.fantasia"
              class="w-full"
              name="fantasia"
              v-validate="'required|alpha_spaces'"
            />
            <span class="text-danger text-sm form-error-message" v-if="getError('fantasia')" >Nombre de fantasía es obligatorio</span >
          </div>
        </div>
        <div class="vx-row mt-8">
          <div class="vx-col w-1/4">
            <vs-input
              label="RUT Representante Legal"
              maxlength="10"
              v-model="datos.rutRepLegal"
              class="w-full"
              name="rutRepLegal"
              v-validate="'required|validaRut'"
            />
            <span class="text-danger text-sm form-error-message" v-if="getError('rutRepLegal') == 'required'">RUT es obligatorio</span>
            <span class="text-danger text-sm form-error-message" v-if="getError('rutRepLegal') == 'rut'">Formato de RUT incorrecto</span>
          </div>
          <div class="vx-col md:w-1/2">
            <vs-input
              label="Nombre Representante Legal"
              maxlength="100"
              v-model="datos.nombreRepLegal"
              class="w-full"
              name="nombreRepLegal"
              v-validate="'required|alpha_spaces'"
            />
            <span class="text-danger text-sm form-error-message" v-if="getError('nombreRepLegal')" >Represenante Legal es obligatoria</span >
          </div>
        </div>
        <div class="vx-row mt-8 mb-8">
          <div class="vx-col">
            <vs-button color="primary" type="filled" @click="validarEmpresa">Aceptar</vs-button>
          </div>
        </div>
      </form>
  </div>
</template>

<script>
import { Validator } from "vee-validate";
import es from "vee-validate/dist/locale/es";
import Datepicker from "vuejs-datepicker";
import clienteFebosAPI from "@/febos/servicios/clienteFebosAPI";

Validator.localize("es", es);
Validator.extend("validaRut", {
  getMessage: (field) => field + " incorrecto",
  validate: (value) => {
    var esCorrecto = validaRUT(value);
    return esCorrecto;
  },
});

export default {
  name: "editEmpresa",
  props: ["empresa"],
  components: {
    Datepicker
  },
  data()  {
    return {
      datos: {
        acteco: null, ciudad: null, comuna: null, correo: null,
        direccion: null, fantasia: null, iut: null, razon: null,
        telefono: null, fechaResolucion: null, numeroResolucion: null, giro: null, nombreRepLegal: null,
        rutRepLegal: null, esPyme: null,
        codigoSII: null
      },
      cambioClave: false, claveSii: null,
    }
  },
  computed: {},
  mounted() {
    this.datos = this.empresa;
    this.$vs.loading.close();
  },
  methods: {

    validarEmpresa()  {
      this.$validator.validateAll("perfilEmpresa").then((result) => {
        if (result) {
          this.actualizarEmpresa();
        } else {
          this.$vs.notify({
            color: 'danger', title: 'Empresa', text: 'Debe ingresar correctamente todos los datos solicitados'
          });
        }
      }).catch((error) => {
        window.console.log(error);
        this.$vs.notify({
          color: 'danger', title: 'Empresa', text: 'Error de plataforma'
        });
      })
    },
    actualizarEmpresa() {
      this.$vs.loading({ type: 'default' });
      var data = JSON.parse(
        localStorage.getItem(
          `${process.env.VUE_APP_AMBIENTE}/${process.env.VUE_APP_PORTAL}`
        )
      );
      let datos = this.__mapPostEmpresa();
      clienteFebosAPI.put("/empresas/" + data.Empresas.empresa.id, datos).then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == 10)  {
          this.$vs.notify({
            color: "success", title: "Empresa", text: "Empresa actualizada"
          })
        } else {
          this.$vs.notify({
            color: "danger", title: "Empresa", text: response.data.mensaje + "<br/><b>Seguimiento: </b>" + response.data.seguimientoId, time: 10000
          })
        }
      }).catch((error) => {
        this.$vs.loading.close();
        this.$vs.notify({
          color: "danger", title: "Empresa", text: "No fue posible actualizar la empresa"
        });
        window.console.log(error);
      })
    },
    __mapPostEmpresa()  {
      let retorno = {
        razonSocial: this.datos.razon,
        fantasia: this.datos.fantasia,
        giro: this.datos.giro,
        rutRepLegal: this.datos.rutRepLegal,
        nombreRepLegal: this.datos.nombreRepLegal,
        fechaResolucion: this.datos.fechaResolucion,
        numeroResolucion: this.datos.numeroResolucion,
        // esPyme: (this.datos.esPyme) ? "si" : "no",
        esPyme: "si",
      }
      if (this.claveSii)      retorno.claveSii = btoa(this.claveSii);
      if (this.datos.acteco)  retorno.acteco = this.datos.acteco;
      return retorno;
    },

    /* Validación Encabezado */
    getError(par) {
      let retorno = null;
      const ret = this.errors.items.find(elemento => elemento.field == par);
      if (ret !== undefined && retorno === null)  {
        if (par == "iut" && ret.rule == "validaRut")  {
          return "rut";
        }
        if (par == "email" && ret.rule == "email") {
          return "email";
        }
        if (ret.rule == "required") {
          return "required";
        }
        console.log(ret);
      }
      return null;
    },



  }
}


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

<style scoped>

</style>
