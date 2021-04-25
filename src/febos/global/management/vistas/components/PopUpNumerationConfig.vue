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
    <form
      data-vv-scope="config-sheets">
      <div class="row mb-3">
        <div class="col-7">
          <div class="box-config">
            <vs-list>
              <vs-list-item
                v-for="doc in allDocuments" :key="doc.id"
                :title="doc.value"
                :subtitle="doc.label"
              >
                <vs-switch color="warning" @change="setConfig(doc)" v-model="doc.configured"/>
              </vs-list-item>
            </vs-list>
          </div>
        </div>
        <div class="col-5">
          <div class="row">
            <div class="col-12">
              <div class="mt-3">
                <vs-select
                  @change="setConfig"
                  class="w-100"
                  autocomplete
                  name="renew"
                  v-validate="'required'"
                  :danger="errors.has('config-sheets.renew')"
                  :danger-text="errors.first('config-sheets.renew')"
                  label="Reiniciar configuración"
                  v-model="configDoc.renew"
                >
                  <vs-select-item
                    :value="'N'"
                    text="Nunca"
                  />
                  <vs-select-item
                    :value="'A'"
                    text="Anual"
                  />
                </vs-select>
              </div>
            </div>
            <div class="col-12">
              <div class="mt-3">
                <vs-input
                  class="w-100"
                  label="Folio inicial"
                  maxlength="50"
                  v-model="configDoc.folio"
                  name="configFolio"
                  v-validate="'required'"
                  :danger="errors.has('config-sheets.configFolio')"
                  :danger-text="errors.first('config-sheets.configFolio')"
                />
              </div>
            </div>
            <div class="col-12">
              <div class="mt-3">
                <vs-input
                  class="w-100"
                  label="Prefijo"
                  maxlength="50"
                  v-model="configDoc.prefix"
                  name="configFolio"
                  v-validate="'required'"
                  :danger="errors.has('config-sheets.configFolio')"
                  :danger-text="errors.first('config-sheets.configFolio')"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-2">
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
      configDoc: {},
      configSheetDoc: {
        configFolios: []
      },
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
  computed: {
    ...mapGetters('List', [
      'allDocumentsState',
    ]),
    ...mapGetters('Empresas', [
      'company',
      'empresa'
    ]),
    ...mapGetters('Management', [
      'configSheetByDoc'
    ]),
    allDocuments() {
      return this.allDocumentsState.list
        .map((documentMap) => ({
          configured: false,
          ...documentMap
        }))
        .filter((document) => document.groupId.includes('.item'));
    }
  },
  methods: {
    ...mapActions('Management', [
      'saveDocConfigSheet'
    ]),
    setConfig(doc) {
      this.configSheetDoc.configFolios.push({
        configId: doc.id,
        configNombre: doc.label,
        initialSheet: '',
        prefix: '',
        renew: ''
      });
      console.log('config', this.configSheetDoc);
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
    /*
    async configSheets(option) {
      this.sheetsDoc = { ...option };

      this.configSheetDoc = {
        tipoDoc: option.opcionId,
        iut: this.company.iut,
        alcance: '',
        reinicio: '',
        configFolios: []
      };
    }
    */
  },
  created() {
    console.log('DOC', this.allDocumentsState);
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
