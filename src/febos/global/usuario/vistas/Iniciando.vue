<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login" v-bind:style="{ 'background-image': 'url(' + imagenFondo + ') !important' }">
    <img :src="ingresoLogo.imagen" id="logo" v-bind:style="_estiloLogo">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">

          <div class="vx-row no-gutter justify-center items-center">

            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto">
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">

                <div class="vx-card__title mb-10">
                  <h4 class="mb-4">Hola <b>{{ alias }}</b>! Bienvenido!</h4>
                  <p>
                    Danos unos segundos para verificar algunas cosas antes de comenzar...
                  </p>
                </div>

                <div>
                  <vs-divider></vs-divider>
                  <div class="cargador" v-for="(cargador,index) in cargadores" :key="index">
                    <vs-icon :icon="cargador.icono" :bg="cargador.color" color="white" round></vs-icon>
                    {{ cargador.texto }}
                  </div>
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
  import {mapActions, mapState} from 'vuex'
  import PersonalizacionMixin from "@/febos/global/empresas/mixins/PersonalizacionMixin";
  import IdleMixin from "../../_vue/mixins/IdleMixin";

  export default {
    mixins: [PersonalizacionMixin,IdleMixin],
    data() {
      return {
        recordar: false,
        cargadores: [
          {id: 'P01', color: 'blue', 'texto': 'Verificando permisos', icono: 'autorenew'},
          {id: 'E01', color: 'blue', 'texto': 'Verificando relacion con empresas', icono: 'autorenew'},
         // {id: 'C01', color: 'blue', 'texto': 'Recuperando configuraciones', icono: 'autorenew'},
        ],
        cargadoresListos: 0
      }
    },
    watch: {
      cargadoresListos(valorNuevo) {
        if (valorNuevo === this.cargadores.length) {
          //TODO: ver si necesita cambiar su contraseña y redirigir a esa ventana
          this.$router.push({name: 'selectorEmpresa'}).catch(e => { console.log("error",e)});
        }
      }
    },
    computed: {
      ...mapState("Usuario", {
        iut: state => state.iut,
        alias: state => state.alias
      }),
      computed: {
        ...mapState('Personalizacion', {
          imagenFondo: state => state.ingreso.imagenFondo,
          logo: state => state.menu.logo,
          ingresoLogo: state => state.ingreso.logo
        })
      },
    },
    methods: {
      ...mapActions("Usuario", {permisos: "cargarPermisos"}),
      ...mapActions("Empresas", {empresas: "listarEmpresas"}),
      actualizarCargador: function (id) {
        this.cargadoresListos++;
        this.cargadores.forEach(function (cargador) {
          if (cargador.id === id) {
            cargador.color = 'green';
            cargador.icono = 'done';
          }
        })
      },
      cargarPermisos: function () {
        this.permisos({
          iut: this.iut
        }).then(() => {
          this.actualizarCargador('P01');
        })
      },
      cargarEmpresas: function () {
        this.empresas({
          pagina: 1,
          filas: 10000,
          busquedaSimple: 'si'
        }).then(() => {
          this.actualizarCargador('E01');
        })
      }
    },
    mounted() {
      this.cargarPermisos();
      this.cargarEmpresas();
    }
  }
</script>

<style lang="scss">
  #page-login {
    .clave-unica {
      img {
        display: block;
        margin: 0 auto;
        cursor: pointer;

        &:hover {

        }
      }

    }
  }
</style>
