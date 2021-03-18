<template>
  <vs-modal size="l" ref="modalEdicion" title="Usuario" @close="cerrarModal">
    <div slot="header" class="p-4">
      <h4>Usuario</h4>
    </div>

    <form data-vv-scope="perfilUsuario" v-if="user">

      <div class="vx-row">
        <div class="vx-col w-1/4">
          <vs-input
            label="RUT"
            maxlength="10"
            v-model="user.iut"
            class="w-full"
            name="iut"
            v-validate="'required|validaRut'"
          />
          <span class="text-danger text-sm form-error-message" v-if="getError('iut') == 'required'">RUT es obligatorio</span>
          <span class="text-danger text-sm form-error-message" v-if="getError('iut') == 'rut'">Formato de RUT incorrecto</span>
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col md:w-1/2 mt-3">
          <vs-input
            label="Nombre del usuario"
            maxlength="60"
            v-model="user.nombre"
            class="w-full"
            name="nombre"
            v-validate="'required'"
          />
          <span class="text-danger text-sm form-error-message" v-if="getError('nombre')" >Nombre del usuario es obligatorio</span >
        </div>
        <div class="vx-col md:w-1/2 mt-3">
          <vs-input
            label="Alias"
            maxlength="60"
            v-model="user.alias"
            class="w-full"
            name="alias"
            v-validate="'required'"
          />
          <span class="text-danger text-sm form-error-message" v-if="getError('alias')" >Alias del usuario es obligatorio</span >
        </div>
        <div class="vx-col md:w-1/2 mt-3">
          <vs-input
            label="Correo electrónico"
            maxlength="50"
            v-model="user.correo"
            class="w-full"
            name="correo"
            v-validate="'required|email'"
          />
          <span class="text-danger text-sm form-error-message" v-if="getError('correo')" >Correo es obligatorio y debe ser correcto</span >
        </div>
        <div class="vx-col w-1/4">
          <div class="mt-3 mb-2" style="font-size: 0.85rem">Perfil de usuario</div>
          <ul class="leftx">
            <li>
              <vs-radio v-model="user.perfil" vs-value="admin">Administrador</vs-radio>
            </li>
            <li>
              <vs-radio v-model="user.perfil" vs-value="usuario">Usuario</vs-radio>
            </li>
          </ul>
        </div>
      </div>
      <div class="vx-row">
      </div>
      <div style="text-align: right" class="mt-3">
        <vs-button color="primary" type="filled" @click="validarUsuario" v-if="!user.id">Crear</vs-button>
        <vs-button color="primary" type="filled" @click="validarUsuario" v-if="user.id">Actualizar</vs-button>
      </div>

    </form>

  </vs-modal>
</template>

<script>
import VsModal from 'vs-modal';
import { Validator } from 'vee-validate';
import es from 'vee-validate/dist/locale/es';

import clienteFebosAPI from '@/febos/servicios/clienteFebosAPI';

Validator.localize('es', es);
Validator.extend('validaRut', {
  getMessage: (field) => `${field } incorrecto`,
  validate: (value) => {
    const esCorrecto = validaRUT(value);
    return esCorrecto;
  },
});

export default {
  name: 'modalUsuario',
  props: ['editar', 'usuario'],
  components: {
    VsModal
  },
  data() {
    return {
      tabDefault: 0,
      user: {
        id: null, iut: null, nombre: null, alias: null, correo: null
      },
    };
  },
  computed: {
  },
  watch: {
    editar(val) {
      this.tabDefault = 0;
      this.user = {
        id: null, iut: null, nombre: null, alias: null, correo: null
      };
      if (val) {
        this.$refs.modalEdicion.open();
      } else {
        this.$refs.modalEdicion.close();
      }
    },
    usuario(val) {
      this.user = val;
    }
  },
  mounted() {
  },
  methods: {

    validarUsuario() {
      this.$validator.validateAll('perfilUsuario').then((result) => {
        if (result) {
          if (this.user.id) {
            this.actualizarUsuario();
          } else {
            this.crearUsuario();
          }
        } else {
          this.$vs.notify({
            color: 'danger', title: 'Usuario', text: 'Debe ingresar todos los datos solicitados de forma correcta'
          });
        }
      }).catch((error) => {
        window.console.log(error);
        this.$vs.notify({
          color: 'danger', title: 'Ususario', text: 'Error de plataforma'
        });
      });
    },
    actualizarUsuario() {
      this.$vs.loading({ type: 'default' });
      const datos = {
        alias: this.user.alias,
        correo: this.user.correo,
        nombre: this.user.nombre,
        tipo: 1
      };
      clienteFebosAPI.put(`/usuarios/${ this.user.id}`, datos).then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == 10) {
          this.$vs.notify({
            color: 'success', title: 'Usuarios', text: 'Usuario actualizado'
          });
          this.cerrarModal();
        } else {
          this.$vs.notify({
            color: 'danger',
            title: 'Usuario',
            text: `${response.data.mensaje }<br/><b>Seguimiento: </b>${ response.data.seguimientoId}`,
            time: 10000
          });
        }
      }).catch((error) => {
        this.$vs.loading.close();
        console.log(error);
        this.$vs.notify({
          color: 'danger', title: 'Usuario', text: 'Error de plataforma', time: 10000
        });
      });
    },
    crearUsuario() {
      this.$vs.loading({ type: 'default' });
      const datos = {
        accesoWeb: 'si',
        alias: this.user.alias,
        cambiarClave: 'si',
        clave: '',
        correo: this.user.correo,
        iut: this.user.iut,
        nivel: 1,
        nombre: this.user.nombre,
        tipo: 1
      };
      clienteFebosAPI.put('/usuarios', datos).then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == 10) {
          this.$vs.notify({
            color: 'success', title: 'Usuarios', text: 'Usuario creado correctamente'
          });
          this.cerrarModal();
        } else {
          this.$vs.notify({
            color: 'danger',
            title: 'Usuario',
            text: `${response.data.mensaje }<br/><b>Seguimiento: </b>${ response.data.seguimientoId}`,
            time: 10000
          });
        }
      }).catch((error) => {
        this.$vs.loading.close();
        console.log(error);
        this.$vs.notify({
          color: 'danger', title: 'Usuario', text: 'Error de plataforma', time: 10000
        });
      });
    },
    cerrarModal() {
      this.$emit('cerrarEdicionUsuario', false);
    },

    /* Validación Encabezado */
    getError(par) {
      const retorno = null;
      const ret = this.errors.items.find((elemento) => elemento.field == par);
      if (ret !== undefined && retorno === null) {
        if (par == 'iut' && ret.rule == 'validaRut') {
          return 'rut';
        }
        if (par == 'correo' && ret.rule == 'email') {
          return 'correo';
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

function validaRUT(rutCompleto) {
  rutCompleto = rutCompleto.replace('‐', '-');
  if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
  const tmp = rutCompleto.split('-');
  let digv = tmp[1];
  const rut = tmp[0];
  if (digv == 'K') digv = 'k';

  return dv(rut) == digv;
}

function dv(T) {
  let M = 0;
  let S = 1;
  for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
  return S ? S - 1 : 'k';
}
</script>

<style scoped>

</style>
