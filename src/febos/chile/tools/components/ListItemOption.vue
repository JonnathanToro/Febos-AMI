<template>
  <vs-row vs-w="12" class="wrap-option" v-bind:class="{ 'selected': selectedCategory }">
    <vs-col vs-lg="8" vs-sm="4" vs-xs="12">
      <div>
        <input
          maxlength="10"
          class="input-option" v-bind:class="{
            'input-blocked': !editMood,
            'input-edit': editMood
          }"
          size="small" v-model="option.valor"
        />
      </div>
      <div>
        <input
          maxlength="100"
          class="input-option" v-bind:class="{
            'input-blocked': !editMood,
            'input-edit': editMood
          }"
          size="small"
          v-model="option.descripcion"
        />
      </div>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-lg="4" vs-sm="4" vs-xs="12">
      <vs-button
        v-if="type === 'category'"
        v-tooltip="'Ver documentos'"
        color="primary"
        class="margin-right"
        size="small"
        type="border"
        v-on:click="listDocuments(option)"
        icon="search"
      />
      <CheckPermission permission="ED051">
        <vs-button
          v-if="type !== 'category' && !editMood"
          v-tooltip="'Configurar Folios'"
          color="primary"
          class="margin-right"
          size="small"
          type="border"
          v-on:click="configSheets(option)"
          icon="settings_remote"
        />
      </CheckPermission>
      <CheckPermission permission="ED029" v-if="!editMood">
        <vs-button
          v-tooltip="'Editar Opción'"
          color="primary"
          class="margin-right"
          size="small"
          type="border"
          v-on:click="editOption(option)"
          icon="edit"
        />
      </CheckPermission>
      <vs-button
        v-if="editMood"
        v-tooltip="'Guardar edición'"
        color="success"
        class="margin-right"
        size="small"
        type="border"
        v-on:click="saveOption(option)"
        icon="save"
      />
      <vs-button
        v-if="editMood"
        v-tooltip="'Cancelar edición'"
        color="danger"
        class="margin-right"
        size="small"
        type="border"
        v-on:click="editOption(option)"
        icon="cancel"
      />
      <CheckPermission permission="ED030">
        <vs-switch
          v-tooltip="'Deshabilitar opción'"
          color="primary"
          v-model="selected"
          v-on:click="toggleEnableOption({ option, selected, type })"
        />
      </CheckPermission>
    </vs-col>
  </vs-row>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

import CheckPermission from '@/febos/global/usuario/components/CheckPermission';

export default {
  components: { CheckPermission },
  mixins: [],
  data() {
    return {
      editMood: false,
      createMood: false,
      selected: this.option.deshabilitado !== 1,
      sheetsDoc: {},
      configSheetDoc: {},
      configOption: {},
      groupConfig: '',
      configIds: [],
      configId: '',
      configFolio: ''
    };
  },
  props: {
    option: {
      type: Object,
      required: true,
      default: () => {}
    },
    type: {
      type: [String, Object],
      required: true,
      default: () => ''
    },
    selectedCategory: {
      type: Boolean,
      required: false,
      default: false
    },
    usersCompany: {
      type: Array
    },
    groupsCompany: {
      type: Array
    }
  },
  watch: {},
  computed: {
    ...mapGetters('Empresas', [
      'company',
      'empresa'
    ]),
    ...mapGetters('Herramientas', [
      'configSheetByDoc'
    ])
  },
  methods: {
    ...mapActions('Herramientas', [
      'listDocuments',
      'toggleEnableOption',
      'saveOptions',
      'clearSelected',
      'getDocConfigSheet',
      'saveDocConfigSheet'
    ]),

    editOption() {
      this.editMood = !this.editMood;
      this.createMood = false;
      if (this.type === 'category') {
        this.clearSelected({ type: 'CATEGORY', option: this.option });
      }
    },
    setConfig() {
      if (this.configSheetDoc.alcance === 'empresa') {
        this.configSheetDoc.configFolios = [{
          folioInicial: '',
          configId: this.company.id,
          configNombre: this.company.razonSocial
        }];
      } else {
        this.configIds = [];
        this.configSheetDoc.configFolios = [];
        /*
        this.configSheetDoc.configFolios = [{
          folioInicial: '',
          configId: '',
          configNombre: ''
        }];
        */
      }
      console.log('config', this.configSheetDoc);
    },
    searchGroup(groupId) {
      return this.groupsCompany.find((group) => group.id === groupId);
    },
    searchUser(userId) {
      return this.usersCompany.find((user) => user.id === userId);
    },
    removeConfig(configRemove,) { // index) {
      this.configSheetDoc.configFolios = this.configSheetDoc.configFolios
        .filter((config) => config.configId !== configRemove.configId);
      this.configIds = this.configIds
        .filter((config) => config.configId !== configRemove.configId);
    },
    async addConfig() {
      const isSelected = this.configIds
        .some((configAdded) => configAdded.configId === this.configId);

      if (!isSelected) {
        const configName = this.configSheetDoc.alcance === 'grupos'
          ? this.searchGroup(this.configId) : this.searchUser(this.configId);
        this.configSheetDoc.configFolios.push({
          folioInicial: this.configFolio,
          configId: this.configId,
          configNombre: configName.nombre
        });
        this.configIds.push({ configId: this.configId });

        this.configId = '';
        this.configFolio = '';

        await this.$validator.reset();
      } else {
        this.$vs.notify({
          title: 'Oops!',
          text: 'Ya agregaste la configuración para este elemento',
          color: 'warning',
          time: 3000,
          position: 'top-center'
        });
      }

      /*
      const isSelected = this.configIds
        .some((configAdded) => configAdded.configId === config.configId);

      if (!isSelected) {
        this.configIds.push({ configId: config.configId });
        const configName = this.configSheetDoc.alcance === 'grupos'
          ? this.searchGroup(config.configId) : this.searchUser(config.configId);

        const configAdd = {
          folioInicial: config.folio,
          configId: config.configId,
          configNombre: configName.nombre
        };
        this.configSheetDoc.configFolios.push(configAdd);
        console.log('ADD', this.configSheetDoc.configFolios);
      } else {
        this.$vs.notify({
          title: 'Oops!',
          text: 'Ya agregaste la configuración para este elemento',
          color: 'warning',
          time: 3000,
          position: 'top-center'
        });
      }
      */
    },
    async validateForm(scope) {
      const result = await this.$validator.validateAll(scope);
      return !!result;
    },
    async validateConfig() {
      const configValid = await Promise.all([
        this.validateForm('config-sheets')
      ]);
      return configValid;
    },
    async saveConfig() {
      if (!await this.validateConfig()) {
        return;
      }

      if (this.configSheetDoc.configFolios.length) {
        this.saveDocConfigSheet({
          id: this.sheetsDoc.opcionId,
          config: this.configSheetDoc
        });
      } else {
        this.$vs.notify({
          title: 'Oops!',
          text: 'Te faltó añadir la configuración de los elementos',
          color: 'warning',
          time: 4000,
          position: 'top-center'
        });
      }
      console.log('save', this.configSheetDoc);
    },
    async configSheets(option) {
      this.sheetsDoc = { ...option };

      this.$refs.sheetsConfig.open();
      this.configSheetDoc = {
        tipoDoc: option.opcionId,
        iut: this.company.iut,
        alcance: '',
        reinicio: '',
        configFolios: []
      };
      await this.getDocConfigSheet({ id: option.opcionId });
    },
    saveOption(option) {
      this.editMood = false;
      this.saveOptions(option);
    }
  }
};
</script>

<style lang="css" scoped>

.button-add {
  display: flex;
  justify-content: center;
  align-items: center;
}

  .margin-top {
    margin-top: 20px;
  }
  .margin-right {
    margin-right: 10px;
  }

  .wrap-option {
    background:  #f8f8f8;
    margin-bottom: 6px;
  }

  .input-option {
    color: inherit;
    margin-top: 4px;
    width: 80%;
    background: transparent;
  }

  .input-blocked {
    color: inherit;
    pointer-events: none;
    border: none !important;
    padding: 4px 4px 6px 4px;
    border-radius: 5px;
  }

  .input-edit {
    color: inherit;
    border: 1px solid #66258324;
    padding: 4px 4px 6px 4px;
    border-radius: 5px;
  }

  .selected {
    background: #cfe7f3;
  }

  .box-config {
    max-height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>
