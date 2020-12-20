<template>
  <vs-row>
    <vs-col id="list">
      <vs-table :data="templatesList">
        <template slot="header">
          <h3>
            Plantillas creadas
          </h3>
        </template>
        <template slot="thead">
          <vs-th>
            Tipo
          </vs-th>
          <vs-th>
            Nombre
          </vs-th>
          <vs-th>
            Descripción
          </vs-th>
          <vs-th>
            Creada
          </vs-th>
          <vs-th>
            Estado
          </vs-th>
          <vs-th>
          </vs-th>
        </template>

        <template>
          <vs-tr v-for="template in templatesList" :key="template.opcionId">
            <ListTemplateItem :item="template">
            </ListTemplateItem>
          </vs-tr>
        </template>
      </vs-table>
    </vs-col>
  </vs-row>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

import ListTemplateItem from '../components/ListTemplateItem';

export default {
  components: { ListTemplateItem },
  watch: {
    loading(value) {
      if (!value) {
        this.$vs.loading.close('#list > .con-vs-loading');
        return;
      }

      this.$vs.loading({
        container: '#list',
        scale: 0.6
      });
    }
  },
  computed: {
    ...mapGetters('Templates', [
      'templatesList'
    ])
  },
  methods: {
    ...mapActions('Templates', [
      'listTemplates'
    ]),
    ...mapActions('Herramientas', [
      'toggleEnableTemplate'
    ]),
  },
  mounted() {
    this.listTemplates();
    console.log('AACA', this);
  }
};
</script>
<style>

</style>
