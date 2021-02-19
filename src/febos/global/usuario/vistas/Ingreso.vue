<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
    v-bind:style="{ 'background-image': 'url(' + imagenFondo + ') !important' }"
  >
    <img :src="ingresoLogo.imagen" id="logo" v-bind:style="logoStyle" />
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
                  <h4 class="mb-4" v-html="tituloIngreso"></h4>
                  <p v-html="textoHtml"></p>
                </div>

                <form ref="form" data-vv-scope="form" @submit.prevent="attemptSignIn()">
                  <vs-input
                    name="correo"
                    icon-no-border
                    icon="icon icon-user"
                    icon-pack="feather"
                    :label-placeholder="nombreCampoUsuario"
                    v-model="correo"
                    class="w-full"
                    v-validate="'required|email'"
                    :danger="errors.has('form.correo')"
                    :danger-text="errors.first('form.correo')"
                    @keyup.enter.native="attemptSignIn()"
                  />
                  <vs-input
                    type="password"
                    name="clave"
                    icon-no-border
                    icon="icon icon-lock"
                    icon-pack="feather"
                    :label-placeholder="nombreCampoClave"
                    v-model="clave"
                    class="w-full mt-8"
                    required
                    v-validate="'required'"
                    :danger="errors.has('form.clave')"
                    :danger-text="errors.first('form.clave')"
                    @keyup.enter.native="attemptSignIn()"
                  />
                  <div v-if="product !== 'ed'" class="flex flex-wrap justify-between my-5">
                    <vs-checkbox v-model="recordar" class="mb-3">Recordar mi usuario</vs-checkbox>
                    <router-link to="">Olvidaste tu contraseña?</router-link>
                  </div>
                  <vs-button type="border" v-if="botonRegistroProveedor && product !== 'ed'">
                    {{ nombreBotonRegistroProveedores }}
                  </vs-button>
                  <vs-button
                    class="float-right btn-ingresar mb-10"
                    style="margin-top:20px"
                    v-on:click="attemptSignIn()"
                  >
                    {{ nombreBotonIngreso }}
                  </vs-button>
                  <div id="clave-unica" v-if="botonClaveUnica && product !== 'ed'">
                    <vs-divider>O</vs-divider>
                    También puedes ingresar con <B>Clave Única</B> del <B>Registro Civil</B>
                    <div class="flex flex-wrap mt-5 clave-unica">
                      <img src="@/assets/images/logo_clave_unica.png"/>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import I18nMixin from '@/febos/global/_vue/mixins/I18nMixin';
import PersonalizacionMixin from '@/febos/global/empresas/mixins/PersonalizacionMixin';

export default {
  mixins: [I18nMixin, PersonalizacionMixin],
  data() {
    return {
      product: process.env.VUE_APP_PRODUCTO,
      correo: '',
      clave: '',
      recordar: false,
      keyRecordar: `${process.env.VUE_APP_CODIGO_PAIS}.${process.env.VUE_APP_PORTAL}.${process.env.VUE_APP_AMBIENTE}.correo`
    };
  },
  mounted() {
    if (localStorage.getItem(this.keyRecordar)) {
      this.correo = localStorage.getItem(this.keyRecordar);
      if (this.correo !== '') {
        this.recordar = true;
      }
    }
    this.attemptLoadSettings();
  },
  methods: {
    ...mapActions('Usuario', ['signIn']),
    async attemptSignIn() {
      const result = await this.$validator.validateAll('form');

      if (!result) {
        return;
      }

      if (this.recordar) {
        localStorage.setItem(this.keyRecordar, this.correo);
      } else {
        localStorage.setItem(this.keyRecordar, '');
      }

      this.$vs.loading();

      try {
        await this.signIn({
          correo: this.correo,
          clave: this.clave
        });
        await this.$router.push({ name: 'iniciando' });
      } catch (error) {
        this.$vs.dialog({
          color: 'danger',
          title: 'Ups!',
          text: `${error.message}`,
          acceptText: 'Ok'
        });
      } finally {
        this.$vs.loading.close();
      }
    }
  }
};
</script>

<style lang="scss">
#page-login {
  .clave-unica {
    img {
      display: block;
      margin: 0 auto;
      cursor: pointer;
    }
  }
}
</style>
