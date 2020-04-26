<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
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
                  <h4 class="mb-4" v-html="titulo"></h4>
                  <p v-html="bienvenida"></p>
                </div>

                <div>
                  <vs-input
                    name="correo"
                    icon-no-border
                    icon="icon icon-user"
                    icon-pack="feather"
                    :label-placeholder="campoUsuario"
                    v-model="correo"
                    class="w-full"
                    @keyup.enter.native="ingresar()"/>

                  <vs-input
                    type="password"
                    name="clave"
                    icon-no-border
                    icon="icon icon-lock"
                    icon-pack="feather"
                    :label-placeholder="campoClave"
                    v-model="clave"
                    class="w-full mt-8"
                    @keyup.enter.native="ingresar()"/>

                  <div class="flex flex-wrap justify-between my-5">
                    <vs-checkbox v-model="recordar" class="mb-3">Recordar mi usuario</vs-checkbox>
                    <router-link to="">Olvidaste tu contraseña?</router-link>
                  </div>
                  <vs-button type="border" v-if="mostrarBtnPP">{{ textoBotonPP }}
                  </vs-button>
                  <vs-button class="float-right btn-ingresar" v-on:click="ingresar()">
                    {{ textoBotonIngreso }}
                  </vs-button>
                  <div id="clave-unica" v-if="mostrarBtnClaveUnica">
                    <vs-divider>O</vs-divider>
                    También puedes ingresar con <B>Clave Única</B> del <B>Registro Civil</B>
                    <div class="flex flex-wrap mt-5 clave-unica">
                      <img src="@/assets/images/logo_clave_unica.png"/>
                    </div>
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
  import {mapActions, mapState} from 'vuex';
  import I18nMixin from "@/febos/global/_vue/mixins/I18nMixin";
  import PersonalizacionMixin from "@/febos/global/empresas/mixins/PersonalizacionMixin";

  export default {
    mixins: [I18nMixin, PersonalizacionMixin],
    data() {
      return {
        correo: "",
        clave: "",
        recordar: false,
        keyRecordar: `${process.env.VUE_APP_CODIGO_PAIS}.${process.env.VUE_APP_PORTAL}.${process.env.VUE_APP_AMBIENTE}.correo`,
      }
    },
    computed: {
      ...mapState('Personalizacion', {
        titulo: state => state.ingreso.tituloIngreso,
        bienvenida: state => state.ingreso.textoHtml,
        mostrarBtnClaveUnica: state => state.ingreso.botonClaveUnica,
        mostrarBtnPP: state => state.ingreso.botonRegistroProveedor,
        textoBotonPP: state => state.ingreso.nombreBotonRegistroProveedores,
        textoBotonIngreso: state => state.ingreso.nombreBotonIngreso,
        campoClave: state => state.ingreso.nombreCampoClave,
        campoUsuario: state => state.ingreso.nombreCampoUsuario,
        imagenIngreso: state => state.ingreso.imagenIngreso,
        colorFondoImagenIngreso: state => state.ingreso.colorFondoImagenIngreso,
        imagenFondo: state => state.ingreso.imagenFondo
      })
    },
    mounted() {
      if (localStorage.getItem(this.keyRecordar)) {
        this.correo = localStorage.getItem(this.keyRecordar);
        if (this.correo != '') {
          this.recordar = true;
        }
      }
    },
    methods: {
      ...mapActions("Usuario", {login: "ingreso"}),
      ingresar: function () {
        if (this.recordar) {
          localStorage.setItem(this.keyRecordar, this.correo);
        } else {
          localStorage.setItem(this.keyRecordar, '');
        }

        this.$vs.loading();
        this.login({
          correo: this.correo,
          clave: this.clave
        }).then((response) => {
          this.$vs.loading.close();
          if (response.codigo === 10) {
            this.$router.push({name: 'iniciando'})//.catch((a,b,c) => { console.log("error",a,b,c)});
          } else {
            this.$vs.dialog({
              color: 'danger',
              title: `Ups!`,
              text: `${response.mensaje}`,
              acceptText: 'Ok',
              //accept:this.acceptAlert,
            })
          }
        })

      }
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
