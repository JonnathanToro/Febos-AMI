<template>
  <vs-modal size="l" ref="modalEdicion" title="Usuario" @close="cerrarModal">
    <div slot="header" class="p-4">
      <h4>Usuario</h4>
    </div>

    <form data-vv-scope="data-user" v-if="user">
      <div class="vx-row">
        <div class="vx-col w-1/4">
          <vs-input
            label="RUT"
            maxlength="10"
            v-model="user.iut"
            class="w-full"
            name="iut"
            :danger="errors.has('data-user.iut')"
            :danger-text="errors.first('data-user.iut')"
            v-validate="'required'"
          />
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col md:w-1/2 mt-3">
          <vs-input
            label="Nombre del usuario"
            maxlength="60"
            v-model="user.nombre"
            class="w-full"
            name="name"
            :danger="errors.has('data-user.name')"
            :danger-text="errors.first('data-user.name')"
            v-validate="'required'"
          />
        </div>
        <div class="vx-col md:w-1/2 mt-3">
          <vs-input
            label="Alias"
            maxlength="60"
            v-model="user.alias"
            class="w-full"
            name="alias"
            v-validate="'required'"
            :danger="errors.has('data-user.alias')"
            :danger-text="errors.first('data-user.alias')"
          />
        </div>
        <div class="vx-col md:w-1/2 mt-3">
          <vs-input
            label="Correo electrónico"
            maxlength="50"
            v-model="user.correo"
            class="w-full"
            name="email"
            v-validate="'required|email'"
            :danger="errors.has('data-user.email')"
            :danger-text="errors.first('data-user.email')"
          />
        </div>
        <div class="vx-col w-1/4">
          <div class="mt-3 mb-2" style="font-size: 0.85rem">Perfil de usuario</div>
          <ul class="leftx">
            <li>
              <vs-radio v-model="user.profileType" vs-value="admin">Administrador</vs-radio>
            </li>
            <li>
              <vs-radio v-model="user.profileType" vs-value="usuario">Usuario</vs-radio>
            </li>
          </ul>
        </div>
      </div>
      <div class="vx-row">
      </div>
      <div style="text-align: right" class="mt-3">
        <vs-button color="primary" type="filled"
                   @click="crearUsuario" v-if="!user.id">Crear
        </vs-button>
        <vs-button color="primary" type="filled"
                   @click="actualizarUsuario" v-if="user.id">Actualizar
        </vs-button>
      </div>

    </form>

  </vs-modal>
</template>

<script>
import VsModal from 'vs-modal';
import { Validator } from 'vee-validate';
import es from 'vee-validate/dist/locale/es';

Validator.localize('es', es);

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
        id: null,
        iut: null,
        name: null,
        alias: null,
        email: null
      }
    };
  },
  computed: {},
  watch: {
    editar(val) {
      this.tabDefault = 0;
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
    async validateForm(scope) {
      const result = await this.$validator.validateAll(scope);
      return !!result;
    },
    async validarUsuario() {
      return Promise.all([
        this.validateForm('data-user')
      ]);
    },
    async actualizarUsuario() {
      if (!await this.validarUsuario()) {
        return;
      }

      const datos = {
        alias: this.user.alias,
        correo: this.user.correo,
        nombre: this.user.nombre,
        tipo: 1
      };
      console.log('actualizoo', datos);

      /*
      this.$vs.loading({ type: 'default' });

      clienteFebosAPI.put("/usuarios/" + this.user.id, datos).then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == 10) {
          this.$vs.notify({
            color: 'success', title: 'Usuarios', text: 'Usuario actualizado'
          });
          this.cerrarModal();
        } else {
          this.$vs.notify({
            color: "danger",
            title: "Usuario",
            text: response.data.mensaje + "<br/><b>Seguimiento: </b>"
            + response.data.seguimientoId, time: 10000
          });
        }
      }).catch((error) => {
        this.$vs.loading.close();
        console.log(error);
        this.$vs.notify({
          color: 'danger', title: 'Usuario', text: 'Error de plataforma', time: 10000
        });
      })
       */
    },
    async crearUsuario() {
      if (!await this.validarUsuario()) {
        return;
      }

      console.log('ACREAr');
    },
    async cerrarModal() {
      this.$emit('cerrarEdicionUsuario', false);
    },

    /* Validación Encabezado */
    getError(par) {
      const ret = this.errors.items.find((elemento) => elemento.field === par);
      if (ret !== undefined) {
        if (par === 'iut' && ret.rule === 'validaRut') {
          return 'rut';
        }
        if (par === 'correo' && ret.rule === 'email') {
          return 'correo';
        }
        if (ret.rule === 'required') {
          return 'required';
        }
        console.log(ret);
      }
      return null;
    }

  }

};
</script>

<style scoped>

</style>
