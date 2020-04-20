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
                  <h4 class="mb-4">PRE_INGRESO</h4>
                  <p>Hola! porfavor ingresa tus credenciales de acceso. Si tu empresa utiliza <B>Single Sign On</B> con
                    <B>Febos</B>, no debes ingresar tu correo, si no que tu usuario de empresa de siempre!</p>
                </div>

                <div>
                  <vs-input
                    name="correo"
                    icon-no-border
                    icon="icon icon-user"
                    icon-pack="feather"
                    label-placeholder="Correo o nombre de usuario"
                    v-model="correo"
                    class="w-full"/>

                  <vs-input
                    type="password"
                    name="clave"
                    icon-no-border
                    icon="icon icon-lock"
                    icon-pack="feather"
                    label-placeholder="Clave"
                    v-model="clave"
                    class="w-full mt-8"/>

                  <div class="flex flex-wrap justify-between my-5">
                    <vs-checkbox v-model="recordar" class="mb-3">Recordar credenciales</vs-checkbox>
                    <router-link to="">Olvidaste tu contraseña?</router-link>
                  </div>
                  <vs-button type="border">Registrarme como Proveedor</vs-button>
                  <vs-button class="float-right" v-on:click="ingresar()">Ingresar</vs-button>

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
      </vx-card>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        correo: "",
        clave: "",
        recordar: false,
      }
    },
    methods: {
      ...mapActions("usuario", {login: "ingreso"}),
      ingresar: function () {
        this.$vs.loading();
        this.login({
          correo:this.correo,
          clave:this.clave
        }).then((response) =>{
          this.$vs.loading.close();
          if(response.codigo === 10){
            console.log("login OK");
          }else{
            this.$vs.dialog({
              color:'danger',
              title: `Ups!`,
              text: `${response.mensaje}`,
              acceptText:'Ok',
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
