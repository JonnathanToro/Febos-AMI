<template>
  <vs-dropdown-item
    class="menu-accion"
    v-if="desplegar()"
    v-on:click.native="ejecutarAccion()"
  >
    <div class="icono">
      <vs-icon :icon="icono" size="small"></vs-icon>
    </div>
    <div class="accion">
      {{ nombre }}
    </div>
  </vs-dropdown-item>
</template>

<script>
import PermisoAccionMixin from '../../mixins/PermisoAccionMixin';
import clienteFebosAPI from '../../../../servicios/clienteFebosAPI';
import modalStore from '../../../../../store/modals/acciones';

export default {
  name: 'AccionVerReferencias',
  mixins: [PermisoAccionMixin],
  props: {
    documento: {
      type: Object
    }
  },
  data() {
    return {
      icono: 'visibility',
      nombre: 'Ver Referencias',
      permiso: 'DTE44'
    };
  },
  mount() {
  },
  methods: {
    ejecutarAccion() {
      this.$vs.loading({ color: '#FF2961', text: 'Espera un momento por favor' });
      const modalComponente = () => import('@/febos/chile/dte/componentes/acciones/modales/modalVerReferencias.vue');

      clienteFebosAPI.get(`/documentos/${ this.documento.febosId }/referencias`).then((response) => {
        this.$vs.loading.close();

        // modalStore.commit("setTitulo", "Ver Referencias Documento N°"+this.documento.folio);
        modalStore.commit('setTitulo', 'Referencias del documento');
        modalStore.commit('febosId', this.documento.febosId);
        modalStore.commit('setData', { documento: this.documento, referencias: response.data });

        if (response.data.referenciadosTipoDnt.length == 0
              && response.data.referenciadosTipoDte.length == 0
              && response.data.referenciasTipoDnt.length == 0
              && response.data.referenciasTipoDte.length == 0) {
          modalStore.commit('mostrarBitacora', modalComponente);
        } else {
          modalStore.commit('mostrarBitacora', modalComponente);
        }
      }).catch(() => {
        this.$vs.loading.close();
        this.$vs.notify({
          color: 'danger', title: 'Ver Referencias', text: 'No fue posible acceder a plataforma'
        });
      });
    },
    desplegar() {
      return this.esAccionAplicable() && this._tienePermiso(this.permiso);
    },
    esAccionAplicable() {
      return true;
    }
  }
};
</script>

<style scoped>
.menu-accion {
  vertical-align: middle;
  width: 250px !important;
}
.icono,
.accion {
  vertical-align: top;
  display: inline-flex;
}
.menu-accion .icono {
  margin-right: 5px;
}
</style>
