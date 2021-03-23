<template>

  <div>

    <vs-modal ref="modalUsuarioEmpresa" title="Empresas del usuario" @close="cerrarModal">
      <div slot="header" class="p-4">
        <h4>Empresas del usuario</h4>
      </div>
      <div class="vx-row" v-if="empresas && show">
        <div class="vx-col w-full" v-for="elemento in empresas" :key="elemento.id">
          <ul class="centex">
            <li class="mt-3">
              <vs-checkbox v-model="elemento.seleccionado" >{{ elemento.fantasia }}</vs-checkbox>
            </li>
          </ul>

        </div>
      </div>
      <div style="text-align: right" class="mt-3">
        <vs-button color="primary" type="filled" @click="actualizarEmpresas">Actualizar</vs-button>
      </div>

    </vs-modal>

  </div>
</template>

<script>
import VsModal from 'vs-modal';

import clienteFebosAPI from '@/febos/servicios/clienteFebosAPI';

export default {
  name: 'modalEmpresas',
  props: ['editar', 'usuario', 'empresas'],
  components: {
    VsModal
  },
  data() {
    return {
      user: null,
      show: false
    };
  },
  computed: {
  },
  watch: {
    editar(val) {
      this.user = {
        id: null, iut: null, nombre: null, alias: null, correo: null
      };
      this.show = false;
      if (val) {
        this.obtenerActuales();
        this.show = true;
        this.$refs.modalUsuarioEmpresa.open();
      } else {
        this.$refs.modalUsuarioEmpresa.close();
      }
    },
    usuario(val) {
      this.user = val;
    }
  },
  mounted() {
    // this.cargarEmpresas();
  },
  methods: {
    obtenerActuales() {
      this.$vs.loading({ color: '#FF2961', text: 'Espera un momento por favor' });
      clienteFebosAPI.get(`/usuarios/${ this.usuario.id }/empresas?busquedaSimple=si&filas=9000&pagina=1`).then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == 10) {
          const seleccionadas = response.data.empresas;
          this.empresas.forEach((value, index, array) => {
            const encontrada = seleccionadas.find((element) => element.id == value.id);
            if (encontrada === undefined) {
              array[index].seleccionado = false;
            } else {
              array[index].seleccionado = true;
              console.log(array[index].id);
            }
          });
        }
      });
    },
    actualizarEmpresas() {
      this.$vs.loading({ color: '#FF2961', text: 'Espera un momento por favor' });
      clienteFebosAPI.post(`/usuarios/${ this.usuario.id }/empresas?usuarioId=${ this.usuario.id}`).then((response) => {
        this.$vs.loading.close();
        if (response.data.codigo == 10) {
          this.$vs.notify({
            color: 'success', title: 'Usuarios', text: 'Empresas asociadas correctamente'
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
      }).catch(() => {
        this.$vs.loading.close();
        this.$vs.notify({
          color: 'danger', title: 'Usuario', text: 'Error de plataforma', time: 10000
        });
      });
    },
    cerrarModal() {
      this.$emit('cerrarEdicionUsuarioEmpresas', false);
    },

  }
};
</script>

<style scoped>

</style>
