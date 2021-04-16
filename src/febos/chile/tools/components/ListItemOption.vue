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
    <vs-modal
      :title="`Configuración de folios para ${sheetsDoc.descripcion}`"
      ref="sheetsConfig"
      size="l"
      dismiss-on="close-button esc"
    >
      <div v-if="configSheetByDoc.configFolios">
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

      </div>
      <form data-vv-scope="config-sheets" v-if="!configSheetByDoc.configFolios">
        <div class="row mb-3">
          <div class="col-5">
            <vs-select
              @change="setConfig"
              class="w-100"
              autocomplete
              name="approach"
              v-validate="'required'"
              :danger="errors.has('config-sheets.approach')"
              :danger-text="errors.first('config-sheets.approach')"
              label="Alcance de la configuración"
              v-model="configSheetDoc.alcance"
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
        <div class="row mt-3">
          <div class="col-5" v-if="configSheetDoc.alcance === 'empresa'">
            <div v-for="(config, index) in configSheetDoc.configFolios" :key="index">
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
          </div>
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
    </vs-modal>
  </vs-row>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import VsModal from 'vs-modal';

import CheckPermission from '@/febos/global/usuario/components/CheckPermission';

export default {
  components: { CheckPermission, VsModal },
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
      console.log('save', this.configSheetDoc);
      this.saveDocConfigSheet({
        id: this.sheetsDoc.opcionId,
        config: this.configSheetDoc
      });
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
