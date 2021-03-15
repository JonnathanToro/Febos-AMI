<template>

  <div class="mt-5">
    <form data-vv-scope="formCasaMatriz" v-if="datos">

      <div class="vx-row">
        <div class="vx-col md:w-1/2 mt-3">
          <vs-input
            label="Dirección"
            maxlength="100"
            v-model="datos.direccion"
            class="w-full"
            name="direccion"
            v-validate="'required'"
          />
          <span class="text-danger text-sm form-error-message" v-if="getError('direccion')" >Dirección es obligatoria</span >
        </div>
        <div class="vx-col md:w-1/4 mt-3">
          <vs-input
            label="Ciudad"
            maxlength="40"
            v-model="datos.ciudad"
            class="w-full"
            name="ciudad"
            v-validate="'required|alpha_spaces'"
          />
          <span class="text-danger text-sm form-error-message" v-if="getError('ciudad')" >Ciudad es obligatoria</span >
        </div>
        <div class="vx-col md:w-1/4 mt-3">
          <vs-input
            label="Comuna"
            maxlength="40"
            v-model="datos.comuna"
            class="w-full"
            name="comuna"
            v-validate="'required|alpha_spaces'"
          />
          <span class="text-danger text-sm form-error-message" v-if="getError('comuna')" >Comuna es obligatoria</span >
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col md:w-1/4 mt-3">
          <vs-input
            label="Teléfono"
            maxlength="20"
            v-model="datos.telefono"
            class="w-full"
            name="telefono"
            v-validate="'required'"
          />
          <span class="text-danger text-sm form-error-message" v-if="getError('telefono')" >Teléfono es obligatorio</span >
        </div>
        <div class="vx-col md:w-1/4 mt-3">
          <vs-input
            label="Correo electrónico"
            maxlength="50"
            v-model="datos.correoElectronico"
            class="w-full"
            name="correoElectronico"
            v-validate="'required|email'"
          />
          <span class="text-danger text-sm form-error-message" v-if="getError('correoElectronico')" >Correo electrónico es obligatorio</span >
        </div>
        <div class="vx-col md:w-2/6 mt-3">
          <vs-input
            label="Código SII"
            maxlength="10"
            v-model="datos.codigoSii"
            class="w-full"
            name="codigoSii" min="0"
            v-validate="'required|numeric'"
          />
          <span class="text-danger text-sm form-error-message" v-if="getError('codigoSii')" >Código SII obligatorio</span >
        </div>
      </div>
      <div class="vx-row mt-8 mb-8">
        <div class="vx-col">
          <vs-button color="primary" type="filled" @click="validarCasaMatriz">Aceptar</vs-button>
        </div>
      </div>

    </form>
  </div>

</template>

<script>
import { Validator } from 'vee-validate';
import es from 'vee-validate/dist/locale/es';

import clienteFebosAPI from '@/febos/servicios/clienteFebosAPI';

Validator.localize('es', es);

export default {
  name: 'editCasaMatriz',
  props: ['iut', 'sucursales'],
  data() {
    return {
      datos: null,
      cambioClave: false,
    };
  },
  computed: {
    idEmpresa: {
      get() {
        const data = JSON.parse(
          localStorage.getItem(
            `${process.env.VUE_APP_AMBIENTE}/${process.env.VUE_APP_PORTAL}`
          )
        );
        return data.Empresas.empresa.id;
      }
    }
  },
  mounted() {
    this.obtenerCasaMatriz();
  },
  methods: {
    obtenerCasaMatriz() {
      this.datos = this.sucursales.find((element) => element.casaMatriz);
      if (!this.datos === undefined) {
        this.datos = {
          casaMatriz: true,
          id: null,
          rutEmpresa: null,
          sucursalActiva: true,
          direccion: null,
          ciudad: null,
          comuna: null,
          telefono: null,
          correoElectronico: null,
          codigoSii: null,
        };
      }
    },
    validarCasaMatriz() {
      this.$validator.validateAll('formCasaMatriz').then((result) => {
        if (result) {
          if (this.datos.id) {
            this.actualizarCasaMatriz();
          } else {
            this.crearCasaMatriz();
          }
        } else {
          this.$vs.notify({
            color: 'danger', title: 'Casa Matriz', text: 'Debe ingresar correctamente todos los datos solicitados'
          });
        }
      }).catch((error) => {
        window.console.log(error);
        this.$vs.notify({
          color: 'danger', title: 'Casas Matriz', text: 'Error de plataforma'
        });
      });
    },
    crearCasaMatriz() {
      this.$vs.loading({ type: 'default' });
      const datos = this.__mapPostCasaMatriz();
      clienteFebosAPI.post(`/empresas/${ this.idEmpresa }/sucursales`, datos).then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == 10) {
          this.$vs.notify({
            color: 'success', title: 'Casa Matriz', text: 'Casa matriz definida'
          });
        } else {
          this.$vs.notify({
            color: 'danger', title: 'Casa Matriz', text: `${response.data.mensaje }<br/><b>Seguimiento: </b>${ response.data.seguimientoId}`, time: 10000
          });
        }
      }).catch((error) => {
        this.$vs.loading.close();
        this.$vs.notify({
          color: 'danger', title: 'Casa Matriz', text: 'No fue posible actualizar la casa matriz'
        });
        window.console.log(error);
      });
    },
    actualizarCasaMatriz() {
      this.$vs.loading({ type: 'default' });
      const datos = this.__mapPostCasaMatriz();
      clienteFebosAPI.put(`/empresas/${ this.idEmpresa }/sucursales/${ this.datos.id}`, datos).then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == 10) {
          this.$vs.notify({
            color: 'success', title: 'Casa Matriz', text: 'Casa matriz actualizada'
          });
        } else {
          this.$vs.notify({
            color: 'danger', title: 'Casa Matriz', text: `${response.data.mensaje }<br/><b>Seguimiento: </b>${ response.data.seguimientoId}`, time: 10000
          });
        }
      }).catch((error) => {
        this.$vs.loading.close();
        this.$vs.notify({
          color: 'danger', title: 'Casa Matriz', text: 'No fue posible actualizar la casa matriz'
        });
        window.console.log(error);
      });
    },

    __mapPostCasaMatriz() {
      return {
        direccion: this.datos.direccion,
        correoElectronico: this.datos.correoElectronico,
        telefono: this.datos.telefono,
        ciudad: this.datos.ciudad,
        comuna: this.datos.comuna,
        codigoSii: this.datos.codigoSii,
        casaMatriz: 'si',
        id: this.datos.id
      };
    },

    /* Validación Encabezado */
    getError(par) {
      const retorno = null;
      const ret = this.errors.items.find((elemento) => elemento.field == par);
      if (ret !== undefined && retorno === null) {
        if (par == 'iut' && ret.rule == 'validaRut') {
          return 'rut';
        }
        if (par == 'email' && ret.rule == 'email') {
          return 'email';
        }
        if (ret.rule == 'required') {
          return 'required';
        }
        console.log(ret);
      }
      return null;
    },

  }
};
</script>

<style scoped>

</style>
