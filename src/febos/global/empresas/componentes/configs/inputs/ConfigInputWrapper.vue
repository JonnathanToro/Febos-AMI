<template>
  <div>
    <div class="row">
      <div class="col">
        <component
          v-bind:is="currentInputComponent"
          :type="type"
          :level="level"
          :param="param"
          :config="config"
          :value="value"
          @input="input"
        />
      </div>
    </div>
    <br>
    <div class="row" v-if="isSavingConfigurations">
      <div class="col">
        <b-spinner class="mr-1" variant="primary"/>
        Guardando
      </div>
    </div>
    <div class="row disabled" v-if="!newValue">
      <div class="col">
        <b-button
          variant="outline-secondary"
        >
          Guardar configuracion {{level |capitalize()}}
        </b-button>
      </div>
    </div>
    <div class="row" v-if="!isSavingConfigurations && newValue && hasPermissionSave">
      <div class="col">
        <b-button
          variant="primary"
          @click="saveParameter()"
        >
          Guardar Configuracion {{level |capitalize()}}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { BButton } from 'bootstrap-vue';

import ConfigInputSwitch from '@/febos/global/empresas/componentes/configs/inputs/ConfigInputSwitch';
import ConfigInputText from '@/febos/global/empresas/componentes/configs/inputs/ConfigInputText';

export default {
  name: 'ConfigInputWrapper',
  components: { ConfigInputSwitch, ConfigInputText, BButton },
  data() {
    return {
      defaultType: 'text',
      types: ['switch', 'text'],
      newValue: '',
      levelsPermissions: {},
      hasPermissionSave: false,
    };
  },
  props: {
    param: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
    },
    level: {
      type: String,
      required: true,
    },
    levels: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    config: {
      type: Object,
      required: false
    }
  },
  mounted() {
    this.levelsPermissions = this.levels.reduce((obj, item) => ({
      ...obj,
      ...{ [item.id]: item },
    }), {});
    this.hasPermissionSave = this.hasPermissionLevel();
  },
  computed: {
    ...mapGetters('Empresas', [
      'isSavingConfigurations'
    ]),
    ...mapGetters('Usuario', ['hasPermission']),
    currentInputComponent() {
      if (this.types.includes(this.type)) {
        return `config-input-${this.type.toLowerCase()}`;
      }
      return `config-input-${this.defaultType.toLowerCase()}`;
    },
  },
  methods: {
    ...mapActions('Empresas', [
      'saveConfiguration'
    ]),
    hasPermissionLevel() {
      if (this.levelsPermissions[this.level]) {
        if (!this.levelsPermissions[this.level].permissions) {
          return true;
        }
        if (this.hasPermission(this.levelsPermissions[this.level].permissions)) {
          return true;
        }
      }
      return false;
    },
    input(newValue) {
      this.newValue = newValue;
    },
    saveParameter() {
      const params = { origen: this.level };
      this.saveConfiguration({
        params,
        body: { parametroId: this.param, valor: this.newValue }
      });
    }
  }
};
</script>

<style scoped>
  .disabled > button {
    cursor: no-drop;
  }
</style>
