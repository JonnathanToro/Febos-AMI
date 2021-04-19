<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
    v-bind:style="{ 'background-image': 'url(' + imagenFondo + ') !important' }"
  >
    <img :src="ingresoLogo.imagen" id="logo" v-bind:style="logoStyle">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">

          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col sm:w-full md:w-full lg:w-4/4 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">

                <div class="vx-card__title mb-10">
                  <h4 class="mb-4">
                    <b>{{currentUserAlias}}</b>,
                    por favor selecciona sobre cual organización quieres trabajar
                  </h4>
                </div>

                <div>
                  <vs-divider />
                  <vs-input
                    icon="search"
                    placeholder="Buscar"
                    v-model="query"
                    class="w-full"
                  />
                  <div class="mt-5">{{ hiddenCompaniesMessage }}</div>
                  <vs-divider v-if="!!company && !!company.iut" />
                  <vs-list v-if="!!company && !!company.iut">
                    <vs-list-item
                      :title="company.fantasia"
                      :subtitle="company.razonSocial"
                      v-on:click.native="select(company)"
                      class="pt-3 pb-3 empresa" :key="company.iut"
                    >
                      <vs-chip color="primary">Ultima seleccionada</vs-chip>
                      <vs-chip color="success" v-if="company.canalDescripcion">
                        {{company.canalDescripcion}}
                      </vs-chip>
                      <vs-chip color="warning">{{ formatear(company.iut) }}</vs-chip>
                    </vs-list-item>
                  </vs-list>
                  <vs-divider />
                  <vs-list>
                    <vs-list-item
                      :title="empresa.fantasia" :subtitle="empresa.razonSocial"
                      v-for="empresa in filteredCompanies"
                      v-on:click.native="select(empresa)"
                      class="pt-3 pb-3 empresa" :key="empresa.iut"
                    >
                      <vs-chip color="success" v-if="empresa.canalDescripcion">
                        {{ empresa.canalDescripcion }}
                      </vs-chip>
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
import { mapActions, mapGetters } from 'vuex';

import RutMixin from '../../../chile/_vue/mixins/RutMixin';

import PersonalizacionMixin from '@/febos/global/empresas/mixins/PersonalizacionMixin';

export default {
  mixins: [RutMixin, PersonalizacionMixin],
  data() {
    return {
      query: '',
      max: 7
    };
  },
  watch: {},
  computed: {
    ...mapGetters('Usuario', [
      'currentUserAlias'
    ]),
    ...mapGetters('Empresas', [
      'companies',
      'company'
    ]),
    filteredCompanies() {
      return this.companies
        .filter((company) => {
          if (this.query === '') return true;
          const query = this.query.toLocaleLowerCase();
          return (company.iut && company.iut.toLocaleLowerCase().includes(query))
            || (company.fantasia && company.fantasia.toLocaleLowerCase().includes(query))
            || (company.razonSocial && company.razonSocial.toLocaleLowerCase().includes(query));
        })
        .filter((company, index) => (
          index <= this.max && (!this.company || this.company.iut !== company.iut)
        ));
    },
    hiddenCompanies() {
      return Math.max(this.filteredCompanies.length - this.max, 0);
    },
    hiddenCompaniesMessage() {
      if (this.hiddenCompanies === 0) return '';
      if (this.hiddenCompanies === 1) return 'Hay 1 empresa más que no se esta viendo, mejora tu búsqueda!';
      return `Hay ${this.hiddenCompanies} empresas que no se estan viendo, mejora tu búsqueda!`;
    }
  },
  methods: {
    ...mapActions('Empresas', [
      'loadCompanies',
      'limpiarListadoDocumentos',
      'selectCompany'
    ]),
    select(company) {
      this.selectCompany(company);
      // TODO: ver si necesita actualizar la información de su empresa, y redirigir a esa ventana
      this.$router.push({ name: 'start' });
    }
  },
  mounted() {
    if (!this.companies.length) {
      this.loadCompanies({
        pagina: 1,
        filas: 10000,
        busquedaSimple: 'si'
      });
    }

    if (this.companies.length === 1) {
      this.selectCompany(this.companies[0]);
    }
  }
};
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
