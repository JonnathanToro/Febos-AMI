<template>
  <app-collapse-item @visible="(visible)=>{param.visible=visible}" :is-visible="true">
    <template slot="header" slot-scope="props">
      <!-- SLOT DE TITULO, PERSONALIZAR BARRA GENERAL-->
      <feather-icon
        :icon="!!props.visible?'ChevronUpIcon':'ChevronDownIcon'"
        size="18"
        class="mr-1 icon-header"
      />
      <span class="lead collapse-title">{{ param.name }}</span>
    </template>
    <template slot="header-acction">
      <!-- TODO: Revisar como armar segun array de levels y permisos -->
      <span class="level-config"
            @click="changeLevelView('global')" v-b-tooltip.hover title="Configuracion General">
      <b-avatar size="25" icon="globe"
                :variant="level=='global'?'success':config.valorGlobal?'info':'secondary'"
      />
      </span>
      <span class="level-config"
            @click="changeLevelView('empresa')" v-b-tooltip.hover title="Configuracion Empresa">
      <b-avatar size="25" icon="building"
                :variant="level=='empresa'?'success':config.valorEmpresa?'info':'secondary'"
      />
        </span>
      <span class="level-config"
            @click="changeLevelView('usuario')" v-b-tooltip.hover title="Configuracion Usuario">
      <b-avatar size="25" icon="person"
                :variant="level=='usuario'?'success':config.valorUsuario?'info':'secondary'"/>
        </span>
    </template>
    <div class="row">
      <div class="col-md-6">{{config.descripcion}}</div>
      <div class="col-md-6">Ultima Actualizacion: {{config.fechaConfiguracion || 'Nunca'}}</div>
      <div class="col-md-6">Parametro Id: <strong>{{param.parameter_id}}</strong></div>
    </div>
    <br>
    <config-input-wrapper
      :key="level"
      :type="param.type"
      :level="level"
      :levels="levels"
      :param="param.parameter_id"
      :value="value"
    />
  </app-collapse-item>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ConfigInputWrapper from '@/febos/global/empresas/componentes/configs/inputs/ConfigInputWrapper';
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem';

const levels = [
  { id: 'global', permission: 'FEB99', level: 0 },
  { id: 'portal', permission: 'FEB99', level: 5 },
  { id: 'empresa', level: 10 },
  { id: 'grupo', level: 20 },
  { id: 'usuario', level: 30 }
];
const capitalize = (str) => str.replace(/^\w/, (c) => c.toUpperCase());

export default {
  name: 'ConfigListItem',
  components: {
    AppCollapseItem,
    ConfigInputWrapper
  },
  data() {
    return {
      levels,
      level: 'global',
      value: '',
      config: {},
      loading: false
    };
  },
  props: {
    param: {
      type: Object,
      required: true,
    },
    configurations: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.param.visible = true;
    this.config = this.configurations[this.param.parameter_id] || {};
    this.initParameter(this.config);
  },
  computed: {
    ...mapGetters('Empresas', [
      'isSavingConfigurations'
    ])
  },
  methods: {
    ...mapActions('Empresas', [
      'saveConfiguration'
    ]),
    changeLevelView(level) {
      this.level = level;
      const config = this.findValueLevel(this.config, level);
      const [, valueSelected] = config;
      this.value = valueSelected;
    },
    initParameter(configuration) {
      const config = this.findValueLevel(configuration);
      const [levelSelected, valueSelected] = config;
      this.level = levelSelected;
      this.value = valueSelected;
    },
    findValueLevel(configuration = {}, levelToFind = 'usuario') {
      const levelFound = levels.find((level) => level.id === levelToFind);
      return levels
        .filter((level) => level.level <= levelFound.level)
        .map((level) => level.id)
        .map((level) => [level, configuration[`valor${capitalize(level)}`]])
        .reverse()
        .find(([, config]) => config);
    }
  }
};
</script>

<style scoped>
  .icon-header {
    top: 7px;
  }

  .level-config {
    cursor: pointer;
  }
</style>
