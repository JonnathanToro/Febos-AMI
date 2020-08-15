<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login" v-bind:style="{ 'background-image': 'url(' + imagenFondo + ') !important' }" >
    <img :src="ingresoLogo.imagen" id="logo" v-bind:style="_estiloLogo">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">

          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col sm:w-full md:w-full lg:w-4/4 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">

                <div class="vx-card__title mb-10">
                  <h4 class="mb-4"><b>{{ alias }}</b>, por favor selecciona sobre cual organización quieres trabajar
                  </h4>
                </div>

                <div>
                  <vs-divider></vs-divider>
                  <vs-input icon="search" placeholder="Buscar" v-model="buscadorDeEmpresa" class="w-full"/>
                  <div class="mt-5">{{ mensajeEmpresasQueNoseVen }}</div>
                  <vs-divider v-if="!!empresaSeleccionada && !!empresaSeleccionada.iut"></vs-divider>
                  <vs-list v-if="!!empresaSeleccionada && !!empresaSeleccionada.iut">
                    <vs-list-item :title="empresaSeleccionada.fantasia" :subtitle="empresaSeleccionada.razonSocial"
                                  v-on:click.native="seleccionar(empresaSeleccionada)"
                                  class="pt-3 pb-3 empresa" :key="empresaSeleccionada.iut">
                      <vs-chip color="primary">Ultima seleccionada</vs-chip>
                      <vs-chip color="success" v-if="empresaSeleccionada.canalDescripcion">{{ empresaSeleccionada.canalDescripcion }}</vs-chip>
                      <vs-chip color="warning">{{ formatear(empresaSeleccionada.iut) }}</vs-chip>
                    </vs-list-item>
                  </vs-list>
                  <vs-divider></vs-divider>
                  <vs-list>
                    <vs-list-item :title="empresa.fantasia" :subtitle="empresa.razonSocial"
                                  v-for="(empresa,index) in empresasFiltradas" v-if="index <= maximoDeEmpresas &&(!empresaSeleccionada || empresaSeleccionada.iut != empresa.iut)"
                                  v-on:click.native="seleccionar(empresa)"
                                  class="pt-3 pb-3 empresa" :key="empresa.iut">
                      <vs-chip color="success" v-if="empresa.canalDescripcion">{{ empresa.canalDescripcion }}</vs-chip>
                      <vs-chip color="warning">{{ formatear(empresa.iut) }}</vs-chip>
                    </vs-list-item>
                  </vs-list>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
  import {mapActions,mapState} from 'vuex';
  import RutMixin from "../../../chile/_vue/mixins/RutMixin";
  import PersonalizacionMixin from "@/febos/global/empresas/mixins/PersonalizacionMixin";
  import IdleMixin from "../../_vue/mixins/IdleMixin";

  export default {
    mixins: [RutMixin,PersonalizacionMixin,IdleMixin],
    data() {
      return {
        buscadorDeEmpresa: '',
        maximoDeEmpresas: 7
      }
    },
    watch: {},
    computed: {
      ...mapState("Usuario", {
        alias: state => state.alias
      }),
      ...mapState("Empresas", {
        empresas: state => state.empresas,
        empresaSeleccionada: state => state.empresa
      }),
      computed: {
        ...mapState('Personalizacion', {
          imagenFondo: state => state.ingreso.imagenFondo,
          logo: state => state.menu.logo,
          ingresoLogo: state => state.ingreso.logo
        })
      },
      empresasFiltradas() {
        var that = this;
        return this.empresas.filter(function (empresa) {
          if (that.buscadorDeEmpresa == '') return true;
          var query = that.buscadorDeEmpresa.toLocaleLowerCase();
          return empresa.iut.toLocaleLowerCase().includes(query) || empresa.fantasia.toLocaleLowerCase().includes(query) || empresa.razonSocial.toLocaleLowerCase().includes(query);
        });
      },
      empresasQueNoSeVen() {
        let noSeVen = this.empresasFiltradas.length - this.maximoDeEmpresas;
        return noSeVen < 0 ? 0 : noSeVen;
      },
      mensajeEmpresasQueNoseVen() {
        if (this.empresasQueNoSeVen == 0) return '';
        if (this.empresasQueNoSeVen == 1) return 'Hay 1 empresa más que no se esta viendo, mejora tu búsqueda!'
        return `Hay ${this.empresasQueNoSeVen} empresas que no se estan viendo, mejora tu búsqueda! `
      }
    },
    methods: {
      ...mapActions("Empresas", {
        listarEmpresas: "listarEmpresas",
        limpiarListadoDocumentos:"limpiarListadoDocumentos",
        seleccionarEmpresa: "seleccionarEmpresa",
      }),
      seleccionar: function (empresa) {
        this.seleccionarEmpresa(empresa);
        //TODO: ver si necesita actualizar la información de su empresa, y redirigir a esa ventana
        this.$router.push({name: 'inicio'});
      }
    },
    mounted() {
      if (this.empresas.length === 0) {
        this.listarEmpresas({
          pagina: 1,
          filas: 10000,
          busquedaSimple: 'si'
        }).then(function () {

        });
      }
      if (this.empresas.length == 1) {
        this.seleccionar(this.empresas[0]);
      } else {
        if (this.empresa) {
          //console.log("seleccionada", this.empresa);
        }
      }
    }
  }
</script>

<style lang="css" scoped>
  .empresa:hover {
    cursor: pointer;
    border-left-color: green;
    border-left-style: solid;
    border-left-width: 4px;
    background-color: #eee;
  }
</style>
