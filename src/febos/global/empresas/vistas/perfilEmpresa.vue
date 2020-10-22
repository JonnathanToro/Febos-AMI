<template>
  <div>
    <vx-card title="Perfil de la empresa" title-color="primary">

      <vs-tabs style="min-height: 500px">
        <vs-tab label="Empresa">
          <empresa-perfil v-if="datos" :empresa="datos"></empresa-perfil>
        </vs-tab>
        <vs-tab label="Casa Matriz">
          <empresa-casa-matriz v-if="datos" :iut="datos.iut" :sucursales="sucursales"></empresa-casa-matriz>
        </vs-tab>
        <vs-tab label="Sucursales">
          <empresa-sucrusales v-if="datos" :iud="datos.iut" :codigoSii="datos.codigoSII" :sucursales="sucursales"></empresa-sucrusales>
        </vs-tab>
<!--        <vs-tab label="Cuentas Bancarias">
          Cuentas bancarias
        </vs-tab>-->
      </vs-tabs>
    </vx-card>


  </div>
</template>

<script>
import clienteFebosAPI from "@/febos/servicios/clienteFebosAPI";
import empresaPerfil from "@/febos/global/empresas/componentes/perfilEmpresa/editEmpresa";
import empresaCasaMatriz from "@/febos/global/empresas/componentes/perfilEmpresa/editCasaMatriz";
import empresaSucrusales from "@/febos/global/empresas/componentes/perfilEmpresa/relSucursales";

export default {
  name: "perfilEmpresa",
  components: {
    empresaPerfil, empresaCasaMatriz, empresaSucrusales
  },
  data()  {
    return {
      datos: null, sucursales: [],
      cambioClave: false,
    }
  },
  mounted() {
    this.obtenerEmpresa();
  },
  computed: {},
  methods: {
    obtenerEmpresa()  {
      this.$vs.loading({ type: 'default' });
      var data = JSON.parse(
        localStorage.getItem(
          `${process.env.VUE_APP_AMBIENTE}/${process.env.VUE_APP_PORTAL}`
        )
      );
      clienteFebosAPI.get("/empresas/" + data.Empresas.empresa.iut).then((response) => {
        // this.$vs.loading.close();
        if (response.data.codigo == 10) {
          this.datos = {
            acteco: response.data.acteco, ciudad: null, comuna: null, correo: null,
            direccion: null, fantasia: response.data.fantasia, iut: response.data.iut, razon: response.data.razonSocial,
            telefono: null, fechaResolucion: response.data.fechaResolucion, numeroResolucion: response.data.numeroResolucion,
            giro: response.data.giro, nombreRepLegal: response.data.nombreRepLegal, rutRepLegal: response.data.rutRepLegal,
            esPyme: (response.data.esPyme == 'no') ? false : true, codigoSII: null
          };
          this.sucursales = response.data.sucursales;
        } else {
          window.console.log("Datos no cargados");
        }
      }).catch((err) => {
        window.console.log(err);
      })
    },
  }
}

</script>

<style scoped>

</style>
