<template>
  <div>
    <!--<div v-if="group.nombre && !configSheetByDoc.configFolios">
      <div class="row mb-3">
        <div class="col-5">
          <vs-select
            class="w-100"
            autocomplete
            name="approach"
            disabled
            label="Alcance de la configuración"
            v-model="configSheetByDoc.alcance"
          >
            <vs-select-item
              :value="'empresa'"
              text="Empresa"
            />
            <vs-select-item
              :value="'grupos'"
              text="Grupos"
            />
            <vs-select-item
              :value="'usuarios'"
              text="Usuarios"
            />
          </vs-select>
        </div>
        <div class="col-5">
          <vs-select
            class="w-100"
            autocomplete
            name="renew"
            disabled
            label="Reiniciar configuración"
            v-model="configSheetByDoc.reinicio"
          >
            <vs-select-item
              :value="'A'"
              text="Anual"
            />
            <vs-select-item
              :value="'M'"
              text="Mensual"
            />
            <vs-select-item
              :value="'N'"
              text="Nunca"
            />
          </vs-select>
        </div>
        <div class="col-2">
        </div>
      </div>
      <div
        class="row"
        v-for="(config, index) in configSheetByDoc.configFolios" :key="index"
      >
        <div class="col-5" v-if="configSheetByDoc.alcance === 'usuarios'">
          <vs-input
            disabled
            class="w-100"
            label="Usuario"
            v-model="config.configNombre"
          />

        </div>
        <div class="col-5" v-if="configSheetByDoc.alcance === 'grupos'">
          <vs-input
            disabled
            class="w-100"
            label="Grupo"
            v-model="config.configNombre"
          />
        </div>
        <div class="col-5">
          <vs-input
            disabled
            class="w-100"
            label="Folio inicial"
            maxlength="50"
            v-model="config.folioInicial"
          />
        </div>
        <hr>
      </div>

    </div>-->
    <form data-vv-scope="config-sheets" v-if="!configSheetByDoc.configFolios.length">
      <div class="row mb-3">
        <div class="col-5">
          <vs-input
            class="w-100"
            label="Folio inicial"
            maxlength="50"
            name="initialSheet"
            v-validate="'required'"
            :danger="errors.has('config-sheets.initialSheet')"
            :danger-text="errors.first('config-sheets.initialSheet')"
            v-model="config.folioInicial"
          />
        </div>
        <div class="col-5">
          <vs-select
            @change="setConfig"
            class="w-100"
            autocomplete
            name="renew"
            v-validate="'required'"
            :danger="errors.has('config-sheets.renew')"
            :danger-text="errors.first('config-sheets.renew')"
            label="Reiniciar configuración"
            v-model="configSheetDoc.reinicio"
          >
            <vs-select-item
              :value="'A'"
              text="Anual"
            />
            <vs-select-item
              :value="'N'"
              text="Nunca"
            />
          </vs-select>
        </div>
        <div class="col-2">
        </div>
      </div>
      <div class="row mt-3">
        <div
          class="col-12"
          v-if="configSheetDoc.alcance === 'grupos' || configSheetDoc.alcance === 'usuarios'"
        >
          <div class="row mt-3">
            <div class="col-5">
              <vs-select
                v-if="configSheetDoc.alcance === 'grupos'"
                class="w-100"
                autocomplete
                label="Grupos"
                v-model="configId"
                name="configId"
                v-validate="'required'"
                :danger="errors.has('config-sheets.configId')"
                :danger-text="errors.first('config-sheets.configId')"
              >
                <vs-select-item
                  v-for="group in groupsCompany"
                  :key="group.id"
                  :value="group.id"
                  :text="group.nombre"
                />
              </vs-select>
              <vs-select
                v-if="configSheetDoc.alcance === 'usuarios'"
                class="w-100"
                autocomplete
                label="Usuarios"
                v-model="configId"
                name="configIdUser"
                v-validate="'required'"
                :danger="errors.has('config-sheets.configIdUser')"
                :danger-text="errors.first('config-sheets.configIdUser')"
              >
                <vs-select-item
                  v-for="user in usersCompany"
                  :key="user.id"
                  :value="user.id"
                  :text="user.nombre"
                />
              </vs-select>
            </div>
            <div class="col-5">
              <vs-input
                class="w-100"
                label="Folio inicial"
                maxlength="50"
                v-model="configFolio"
                name="configFolio"
                v-validate="'required'"
                :danger="errors.has('config-sheets.configFolio')"
                :danger-text="errors.first('config-sheets.configFolio')"
              />
            </div>
            <div class="col-2 button-add">
              <vs-button
                radius
                class="ml-3"
                color="primary"
                type="border"
                icon="add"
                size="small"
                @click="addConfig()"
              />
            </div>
            <hr>
          </div>
          <div class="mt-3 box-config">
            <div
              class="row"
              v-for="(config, index) in configSheetDoc.configFolios" :key="index"
            >
              <div class="col-5" v-if="configSheetDoc.alcance === 'usuarios'">
                <vs-input
                  disabled
                  class="w-100"
                  label="Usuario"
                  v-model="config.configNombre"
                />

              </div>
              <div class="col-5" v-if="configSheetDoc.alcance === 'grupos'">
                <vs-input
                  disabled
                  class="w-100"
                  label="Grupo"
                  v-model="config.configNombre"
                />
              </div>
              <div class="col-5">
                <vs-input
                  disabled
                  class="w-100"
                  label="Folio inicial"
                  maxlength="50"
                  v-model="config.folioInicial"
                />
              </div>
              <div class="col-2 button-add">
                <vs-button
                  radius
                  class="ml-3"
                  color="danger"
                  type="border"
                  icon="highlight_off"
                  size="small"
                  @click="removeConfig(config, index)"
                />
              </div>
              <hr>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="text-center" v-if="!configSheetByDoc.configFolios">
      <vs-button
        class="mt-4"
        color="primary"
        v-on:click="saveConfig()"
      >
        Configurar
      </vs-button>
    </div>
  </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  mixins: [],
  data() {
    return {
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
    group: {
      type: Object
    },
    documents: {
      type: Array
    }
  },
  watch: {
    group() {
      if (this.group === this.company.razonSocial) {
        this.configSheetDoc.configFolios = [{
          folioInicial: '',
          configId: this.company.id,
          configNombre: this.company.razonSocial
        }];
      }
    }
  },
  computed: {
    ...mapGetters('List', [
      'allDocumentsState',
    ]),
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
      'clearSelected',
      'getDocConfigSheet',
      'saveDocConfigSheet'
    ]),
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

      this.configSheetDoc = {
        tipoDoc: option.opcionId,
        iut: this.company.iut,
        alcance: '',
        reinicio: '',
        configFolios: []
      };
      await this.getDocConfigSheet({ id: option.opcionId });
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
