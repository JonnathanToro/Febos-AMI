<template>
  <div>
    <vs-button size="small" style="margin-bottom: 10px;" @click="agregarSucursal">Agregar</vs-button>
    <!--<vs-button size="small" style="margin-bottom: 10px;" @click="cargarSucursales" color="warning">Recargar</vs-button>-->
    <vs-table :data="registros" :pagination="true" :maxItems="10" noDataText="Sin sucursales">
      <template slot="thead">
        <vs-th>Comuna</vs-th>
        <vs-th>Ciudad</vs-th>
        <vs-th>Dirección</vs-th>
        <vs-th>Teléfono</vs-th>
        <vs-th>Activa</vs-th>
        <vs-th>Acciones</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].comuna">
            {{data[indextr].comuna}}
          </vs-td>
          <vs-td :data="data[indextr].ciudad">
            {{data[indextr].ciudad}}
          </vs-td>
          <vs-td :data="data[indextr].direccion">
            {{data[indextr].direccion}}
          </vs-td>
          <vs-td :data="data[indextr].telefono">
            {{data[indextr].telefono}}
          </vs-td>
          <vs-td :data="data[indextr].sucursalActiva" style="text-align: center">
            <vs-icon icon="done" color="success" v-if="data[indextr].sucursalActiva"></vs-icon>
            <vs-icon icon="clear" color="danger" v-if="!data[indextr].sucursalActiva"></vs-icon>
          </vs-td>
          <vs-td :data="data[indextr].id">
            <div
              class="btn-group" size="small"
              role="group">
              <vs-button
                size="small"
                color="primary"
                @click="editarSucursal(tr)">Editar</vs-button>
              <vs-button
                size="small"
                color="dark"
                @click="eliminarSucursal(tr)">Eliminar</vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>

    </vs-table>

    <vs-modal size="l" ref="modalSucursal" title="Sucursal">
      <div slot="header" class="p-4">
        <h4>Sucursal</h4>
      </div>
      <form data-vv-scope="formSucursal" v-if="registro">

        <div class="vx-row">
          <div class="vx-col md:w-1/2 mt-3">
            <vs-input
              label="Dirección"
              maxlength="100"
              v-model="registro.direccion"
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
              v-model="registro.ciudad"
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
              v-model="registro.comuna"
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
              v-model="registro.telefono"
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
              v-model="registro.correoElectronico"
              class="w-full"
              name="correoElectronico"
              v-validate="'required|email'"
            />
            <span class="text-danger text-sm form-error-message" v-if="getError('correoElectronico')" >Correo electrónico es obligatorio</span >
          </div>
          <!--<div class="vx-col md:w-2/6 mt-3">
            <vs-input
              label="Código SII"
              maxlength="10"
              v-model="registro.codigoSii"
              class="w-full"
              name="codigoSii" min="0"
              v-validate="'required|numeric'"
            />
            <span class="text-danger text-sm form-error-message" v-if="getError('codigoSii')" >Código SII obligatorio</span >
          </div>-->
        </div>
        <div class="vx-row mt-8 mb-8">
          <div class="vx-col">
            <vs-button color="primary" type="filled" @click="validarSucursal">Aceptar</vs-button>
          </div>
        </div>

      </form>

    </vs-modal>

  </div>
</template>

<script>
import VsModal from 'vs-modal';

import clienteFebosAPI from '@/febos/servicios/clienteFebosAPI';

export default {
  name: 'relSucursales',
  props: ['iut', 'codigoSii', 'sucursales'],
  components: {
    VsModal
  },
  data() {
    return {
      registros: [],
      registro: null,
      toDelete: null,
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
    this.filtrarSucursales();
  },
  methods: {
    filtrarSucursales() {
      this.registros = this.sucursales.filter((element) => !element.casaMatriz);
    },
    agregarSucursal() {
      this.registro = {
        id: null,
        rutEmpresa: this.idEmpresa,
        direccion: null,
        correoElectronico: null,
        telefono: null,
        comuna: null,
        ciudad: null,
        codigoSii: null,
        casaMatriz: 'no'
      };
      this.$refs.modalSucursal.open();
    },
    editarSucursal(sucursal) {
      this.registro = sucursal;
      this.$refs.modalSucursal.open();
    },
    eliminarSucursal(sucursal) {
      this.toDelete = sucursal;
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Eliminar Sucursal',
        text: `Está seguro de eliminar la Sucursal ubicada en  ${ sucursal.direccion }, ${ sucursal.ciudad}`,
        accept: this.__eliminarSucursal
      });
    },
    __eliminarSucursal() {
      this.$vs.loading({ type: 'default' });
      clienteFebosAPI.delete(`/empresas/${ this.idEmpresa }/sucursales/${ this.toDelete.id}`).then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == '10') {
          this.$vs.notify({
            color: 'success', title: 'Sucursal', text: 'La sucursal fue actualizda correctamente.'
          });
          this.cargarSucursales();
        } else {
          this.$vs.notify({
            color: 'danger', title: 'Sucursal', text: `${response.data.mensaje }<br/><b>Seguimiento: </b>${ response.data.seguimientoId}`, fixed: true
          });
        }
      }).catch((error) => {
        this.$vs.loading.close();
        console.log(error);
        this.$vs.notify({
          color: 'danger', title: 'Sucursal', text: 'No fue posible eliminar la sucursal'
        });
      });
    },
    validarSucursal() {
      this.$validator.validateAll('formSucursal').then((result) => {
        if (result) {
          if (this.registro.id) {
            this.actualizarSucursal();
          } else {
            this.crearSucursal();
          }
        } else {
          this.$vs.notify({
            color: 'danger', title: 'Sucursal', text: 'Debe ingresar correctamente todos los datos solicitados'
          });
        }
      }).catch((error) => {
        window.console.log(error);
        this.$vs.notify({
          color: 'danger', title: 'Sucursal', text: 'Error de plataforma'
        });
      });
    },
    actualizarSucursal() {
      this.$vs.loading({ type: 'default' });
      clienteFebosAPI.put(`/empresas/${ this.idEmpresa }/sucursales/${ this.registro.id}`, this.__mapPostSucursal()).then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == 10) {
          this.$vs.notify({
            color: 'success', title: 'Sucursal', text: 'La sucursal fue actualizda correctamente.'
          });
          this.$refs.modalSucursal.close();
          this.cargarSucursales();
        } else {
          this.$vs.notify({
            color: 'danger', title: 'Sucursal', text: `${response.data.mensaje }<br/><b>Seguimiento: </b>${ response.data.seguimientoId}`, fixed: true
          });
        }
      }).catch((error) => {
        this.$vs.loading.close();
        this.$vs.notify({
          color: 'danger', title: 'Sucursal', text: 'No fue posible actualizar la sucursal'
        });
        window.console.log(error);
      });
    },
    crearSucursal() {
      this.$vs.loading({ type: 'default' });
      clienteFebosAPI.post(`/empresas/${ this.idEmpresa }/sucursales`, this.__mapPostSucursal()).then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == 10) {
          this.$vs.notify({
            color: 'success', title: 'Sucursal', text: 'Los registros fueron actualizados correctamente'
          });
          this.$refs.modalSucursal.close();
          this.cargarSucursales();
        } else {
          this.$vs.notify({
            color: 'danger', title: 'Sucursal', text: `${response.data.mensaje }<br/><b>Seguimiento: </b>${ response.data.seguimientoId}`, fixed: true
          });
        }
      }).catch((error) => {
        this.$vs.loading.close();
        this.$vs.notify({
          color: 'danger', title: 'Sucursal', text: 'No fue posible actualizar la sucursal'
        });
        window.console.log(error);
      });
    },
    __mapPostSucursal() {
      return {
        id: this.registro.id,
        rutEmpresa: this.iut,
        sucursalActiva: true,
        direccion: this.registro.direccion,
        correoElectronico: this.registro.correoElectronico,
        telefono: this.registro.telefono,
        comuna: this.registro.comuna,
        ciudad: this.registro.ciudad,
        codigoSii: this.codigoSii,
        casaMatriz: 'no'
      };
    },

    cargarSucursales() {
      this.$vs.loading({ type: 'default' });
      clienteFebosAPI.get(`/empresas/${ this.idEmpresa }/sucursales`).then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == '10') {
          this.registros = response.data.sucursales;
          this.filtrarSucursales();
        } else {
          this.$vs.notify({
            color: 'danger', title: 'Sucursal', text: `${response.data.mensaje }<br/><b>Seguimiento: </b>${ response.data.seguimientoId}`, fixed: true
          });
        }
      }).catch((error) => {
        this.$vs.loading.close();
        this.$vs.notify({
          color: 'danger', title: 'Sucursales', text: 'No fue posible otener las sucursales'
        });
        window.console.log(error);
      });
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

<style lang="css">

[dir] .vs-button:not(.vs-radius):not(.includeIconOnly):not(.small):not(.large) {
  padding: -0.25rem 2rem;
  margin: 10px;
}
[dir] .btn-group button {
  /*padding: 1rem 1.25rem !important;*/
  padding: 6px !important;
}

table {
  border-spacing: 0;
  width: 100%;
  border-collapse: unset !important;
}

th.selector > div > span.checkbox_x.vs-checkbox {
  border: 2px solid #ffffff !important;
}

tr th {
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: center;
  font-size: 100%;
  background-color: rgba(var(--vs-primary), 1);
  color: white;
}

th, td {
  padding: 0.5em 1em;
  border-top: 1px solid rgba(var(--vs-primary), 1);;
}

tr:last-child td {
  border-bottom: 1px solid rgba(var(--vs-primary), 1);;
}

th:first-child, td:first-child {
  border-left: 1px solid rgba(var(--vs-primary), 1);;
}

th:last-child, td:last-child {
  border-right: 1px solid rgba(var(--vs-primary), 1);
}

thead tr:first-child th:first-child {
  border-radius: 0.6em 0 0 0;
}

thead tr:first-child th:last-child {
  border-radius: 0 0.6em 0 0;
}

tbody tr:last-child td:first-child {
  border-radius: 0 0 0 0.6em;
}

tbody tr:last-child td:last-child {
  border-radius: 0 0 0.6em 0;
}

.fila:hover {
  background-color: #efefef;
}
</style>
