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
import PermisoAccionMixin from "../../mixins/PermisoAccionMixin";
import clienteFebosAPI from "../../../../servicios/clienteFebosAPI";
// import modalStore from "../../../../../store/modals/acciones";

export default {
  name: "AccionCertificadoCesion",
  mixins: [PermisoAccionMixin],
  props: {
    documento: {
      type: Object
    }
  },
  data() {
    return {
      icono: "description",
      nombre: "Certificado de Cesión",
      permiso: "SII27"
    };
  },
  methods: {
    ejecutarAccion() {
      this.$vs.loading({ color: "#FF2961", text: "Espera un momento por favor" })
      clienteFebosAPI.get("/sii/dte/cesion/consulta?febosId=" + this.documento.febosId).then((response) => {
        this.$vs.loading.close();
        if(response.data.imagenLink) {
          window.open(response.data.imagenLink);
        }else{
          this.$vs.notify({
            color: 'danger', title: 'Certificado de sesión', text: response.data.mensaje + "<br/><b>Seguimiento: </b>" + response.data.seguimientoId, time: 10000
          });
        }
      }).catch(() => {
        this.$vs.notify({
          color: 'danger', title: 'Certificado de sesión', text: "No fue posible realizar la consulta"
        });
        this.$vs.loading.close();
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
