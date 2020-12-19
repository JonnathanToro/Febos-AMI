<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
     v-bind:style="{ 'background-image': 'url(' + imagenFondo + ') !important' }"
  >
    <img :src="ingresoLogo.imagen" id="logo" v-bind:style="logoStyle" alt="logo" />
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
                  <h4 class="mb-4">Hola <b>{{ currentUser.alias }}</b>! Bienvenido!</h4>
                  <p>
                    Danos unos segundos para verificar algunas cosas antes de comenzar...
                  </p>
                </div>

                <div>
                  <vs-divider></vs-divider>
                  <div class="cargador" v-for="(loader,index) in loaders" :key="index">
                    <vs-icon :icon="loader.icono" :bg="loader.color" color="white" round />
                    {{ loader.texto }}
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
import { mapActions, mapGetters } from 'vuex';

import IdleMixin from '../../_vue/mixins/IdleMixin';

import PersonalizacionMixin from '@/febos/global/empresas/mixins/PersonalizacionMixin';

export default {
  mixins: [PersonalizacionMixin, IdleMixin],
  data() {
    return {
      recordar: false,
      loaders: [
        {
          id: 'P01',
          color: 'blue',
          texto: 'Verificando permisos',
          icono: 'autorenew'
        },
        {
          id: 'E01',
          color: 'blue',
          texto: 'Verificando relacion con empresas',
          icono: 'autorenew'
        }
        // {id: 'C01', color: 'blue', 'texto': 'Recuperando configuraciones', icono: 'autorenew'},
      ],
      loadersReady: 0
    };
  },
  watch: {
    loadersReady(value) {
      if (value === this.loaders.length) {
        // TODO: ver si necesita cambiar su contraseña y redirigir a esa ventana
        this.$router.push({ name: 'selectorEmpresa' })
          .catch((e) => console.log('error', e));
      }
    }
  },
  computed: {
    ...mapGetters('Usuario', ['currentUser'])
  },
  methods: {
    ...mapActions('Usuario', ['loadPermissions']),
    ...mapActions('Empresas', ['loadCompanies']),
    updateLoading(id) {
      this.loadersReady += 1;
      const currentLoader = this.loaders.find((loader) => loader.id === id);
      if (currentLoader) {
        currentLoader.color = 'green';
        currentLoader.icono = 'done';
      }
    },
    attemptLoadPermissions() {
      this.loadPermissions()
        .then(() => {
          this.updateLoading('P01');
        });
    },
    attemptLoadCompanies() {
      this.loadCompanies({
        pagina: 1,
        filas: 10000,
        busquedaSimple: 'si'
      })
        .then(() => {
          this.updateLoading('E01');
        });
    }
  },
  mounted() {
    this.attemptLoadPermissions();
    this.attemptLoadCompanies();
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
