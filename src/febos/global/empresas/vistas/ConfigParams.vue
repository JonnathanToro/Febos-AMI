<template>
  <div>
    <!-- eslint-disable -->
    <vx-card title="Configuraciones" title-color="primary">
      <vs-row vs-align="flex-start" vs-type="flex" vs-w="12">
        <vs-col vs-type="flex" vs-w="4" >
          <div class="demo-inline-spacing" v-if="isLoadingConfigurations">
            <b-spinner
              key="primary"
              class="mr-1"
              variant="primary"
            />
          </div>
          <TreeItem
            v-if="!isLoadingConfigurations"
            class="item"
            :item="arbol"
            @select-item="selectItem"
          >
            <template slot="folder-description" slot-scope="{item, isOpen}">
              <b-icon :icon="isOpen?'folder2-open':'folder'"/>
              {{ item.name }}
            </template>
            <template slot="item-description" slot-scope="{item, isOpen}">
              <ul>
                <li> <b-icon icon="pencil"/> {{ item.name }}</li>
              </ul>
            </template>
          </TreeItem>
        </vs-col>
        <vs-col vs-type="flex" vs-w="8"  v-if="selected.name">
        <ConfigList :config="selected" :configurations="configurations" :key="selected.name"/>
        </vs-col>
      </vs-row>
    </vx-card>
  </div>
</template>

<script>
// configuraciones/parametros
import { mapActions, mapGetters } from 'vuex';
import { BSpinner, BIcon } from 'bootstrap-vue';

import TreeItem from '@/components/TreeItem';
import configurations from '@/febos/global/empresas/componentes/configs/configuraciones';
import ConfigList from '@/febos/global/empresas/componentes/configs/ConfigList';

export default {
  name: 'Configuraciones',
  components: {
    TreeItem,
    BSpinner,
    ConfigList,
    BIcon
  },
  data() {
    return {
      arbol: configurations,
      isOpen: true,
      selected: {}
    };
  },
  mounted() {
    this.loadConfigurations();
  },
  computed: {
    ...mapGetters('Empresas', [
      'configurations',
      'isLoadingConfigurations'
    ])
  },
  methods: {
    ...mapActions('Empresas', [
      'loadConfigurations'
    ]),
    selectItem(item) {
      this.selected = item;
    },
  }
};
</script>

<style scoped>

</style>
