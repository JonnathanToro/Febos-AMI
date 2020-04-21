<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
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
                  <vs-divider></vs-divider>
                  <vs-list>
                    <vs-list-item :title="empresa.fantasia" :subtitle="empresa.razonSocial"
                                  v-for="(empresa,index) in empresasFiltradas" v-if="index <= maximoDeEmpresas"
                                  v-on:click.native="seleccionarEmpresa(empresa)"
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
  import {mapActions, mapState} from 'vuex';
  import RutMixin from "../../../chile/_vue/mixins/RutMixin";

  export default {
    mixins: [RutMixin],
    data() {
      return {
        buscadorDeEmpresa: '',
        maximoDeEmpresas: 7
      }
    },
    watch: {},
    computed: {
      ...mapState("usuario", {
        alias: state => state.alias
      }),
      ...mapState("empresas", {
        empresas: state => state.empresas
      }),
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
      ...mapActions("empresas", {
        listarEmpresas: "listarEmpresas",
        seleccionarEmpresa: "seleccionarEmpresa"
      })
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
    }
  }
</script>

<style lang="css">
  .empresa:hover {
    cursor: pointer;
    border-left-color: green;
    border-left-style: solid;
    border-left-width: 4px;
    background-color: #eee;
  }
</style>
