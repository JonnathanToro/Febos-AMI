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
                :class="{ selected: doc.id === configDoc.configId }"
              >
                <vs-button
                  color="primary"
                  type="border"
                  @click="setConfig(doc)"
                  icon="search"
                />
              </vs-list-item>
            </vs-list>
          </div>
        </div>
        <div class="col-5">
          <div class="row" v-show="configDoc.configNombre">
            <div class="col-12">
              <h5>
                Configuración para {{configDoc.configNombre}}
              </h5>
              <div class="mt-3">
                <vs-select
                  class="w-100"
                  autocomplete
                  name="renew"
                  :disabled="configDoc.referenciaId"
                  v-validate="'required'"
                  :danger="errors.has('config-sheets.renew')"
                  :danger-text="errors.first('config-sheets.renew')"
                  label="Reiniciar configuración"
                  v-model="configDoc.renew"
                >
                  <vs-select-item
                    is-selected="true"
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
                  :disabled="configDoc.referenciaId"
                  class="w-100"
                  label="Folio inicial"
                  maxlength="50"
                  v-model="configDoc.initialSheet"
                  name="initialSheet"
                  v-validate="'required'"
                  :danger="errors.has('config-sheets.initialSheet')"
                  :danger-text="errors.first('config-sheets.initialSheet')"
                />
              </div>
            </div>
            <div class="col-12">
              <div class="mt-3">
                <vs-input
                  :disabled="configDoc.referenciaId"
                  class="w-100"
                  label="Prefijo"
                  maxlength="50"
                  v-model="configDoc.prefix"
                  name="prefix"
                />
              </div>
            </div>
            <div class="col-12" v-if="!configDoc.referenciaId">
              <div class="mt-3 text-center">
                <vs-button
                  class="mt-4"
                  type="border"
                  color="primary"
                  size="small"
                  v-on:click="updateDocConfig()"
                >
                  Guardar
                </vs-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="text-center">
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
      configFolio: '',
      activeLoading: true
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
    ...mapGetters('Management', [
      'allDocuments',
      'configSheet'
    ]),
    ...mapGetters('Empresas', [
      'company',
      'empresa'
    ]),
  },
  methods: {
    ...mapActions('Management', [
      'saveDocConfigSheet',
      'updateConfig'
    ]),
    setConfig(doc) {
      const config = (this.configSheet[doc.configId] || {});

      if (Object.keys(config).length && config.folioInicial) {
        this.configDoc = {
          ...doc,
          referenciaId: config.referenciaId,
          initialSheet: config.folioInicial,
          prefix: config.prefijo,
          renew: config.renueva
        };
        this.configDoc.configured = true;
      } else {
        this.configDoc = { ...doc };
      }
      console.log('SET', this.configDoc);
    },
    async validateForm(scope) {
      const result = await this.$validator.validateAll(scope);
      return !!result;
    },
    async updateDocConfig() {
      const isValid = await this.validateForm('config-sheets');
      if (!isValid) {
        return;
      }
      this.configDoc.configured = true;
      this.updateConfig(this.configDoc);
      this.$vs.notify({
        title: 'Genial!',
        text: 'Numeración configurada',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'success'
      });
      this.configDoc = {};
    },
    async saveConfig() {
      const isExternalOffice = (this.group.esOficina === 'Y' || this.group.esficina === 'si')
      && this.group.tipo === 'externa';

      // const isInternalOffice = (this.group.esOficina === 'Y' || this.group.esficina === 'si')
      //  && this.group.tipo === 'interna';

      const isGroup = this.group.nombre !== this.company.razonSocial;

      const instance = isExternalOffice
        ? 'final' : 'final'; // TODO: Braulio confirma el 28 abril si es al final siempre

      const configuredDocs = this.allDocuments
        .filter((document) => document.configured && !document.referenciaId)
        .map((documentMap) => {
          const docConfig = {};
          docConfig.configId = documentMap.configId;
          docConfig.configNombre = documentMap.configNombre;
          docConfig.folioInicial = documentMap.initialSheet;
          docConfig.prefijo = documentMap.prefix;
          docConfig.renueva = documentMap.renew;
          return docConfig;
        });
      console.log('SAVE', configuredDocs);
      const configSheets = {
        referenciaId: isGroup ? this.group.id : this.company.id,
        alcance: isGroup ? 'grupo' : 'empresa',
        instancia: instance,
        configFolios: configuredDocs
      };
      if (configuredDocs.length) {
        // this.saveDocConfigSheet(configSheets);
        console.log('save', configSheets);
      }
    }
  }
};
</script>

<style lang="css" scoped>

.selected {
  background: #eddaf3;
}

.box-config {
  max-height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
