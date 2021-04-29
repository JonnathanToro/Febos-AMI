<template>
  <div>
    <div v-if="!confirmInfo">
      <form data-vv-scope="config-sheets">
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
    <div v-if="confirmInfo">
      <h5>
        Vas a configurar la siguiente numeración:
      </h5>

      <ul class="mt-3 box-config">
        <li
          class="border-bottom"
          v-for="config in configSheets.configFolios" :key="config.configId"
        >
          <div>
            <b>Documento: </b>{{config.configNombre}}
          </div>
          <div>
            <b>Folio Inicial: </b>{{config.folioInicial}}
          </div>
          <div>
           <b>Prefijo: </b>{{config.prefijo}}
          </div>
          <div>
            <b>Renovación: </b>
            <span v-if="config.renueva === 'N'">Nunca</span>
            <span v-if="config.renueva === 'A'">Anual</span>
          </div>
        </li>
      </ul>
      <div class="chip-custom">
        Una vez configurada la numeración no podrá ser modificada, en caso de ser necesario
        deberás comunicarte con nuestra mesa de ayuda.
      </div>
      <div class="text-center">
        <vs-button
          class="mt-4"
          color="primary"
          v-on:click="confirmSave()"
        >
          Si, configurar
        </vs-button>
        <vs-button
          class="mt-4"
          color="primary"
          v-on:click="cancelSave()"
        >
          Cancelar
        </vs-button>

      </div>
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
      confirmInfo: false,
      configSheets: {}
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
    successAction() {
      this.$vs.notify({
        title: 'Super!!',
        text: 'Acción realizada exitosamente',
        color: 'success',
        time: 3000,
        position: 'top-center'
      });
    }
  },
  computed: {
    ...mapGetters('Management', [
      'allDocuments',
      'configSheet',
      'successAction'
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
      const config = this.configSheet[doc.configId];

      if (config && config.folioInicial) {
        this.configDoc = {
          ...doc,
          referenciaId: config.referenciaId,
          initialSheet: config.folioInicial,
          prefix: config.prefijo,
          renew: config.renueva,
          configured: true
        };
      } else {
        this.configDoc = { ...doc };
      }
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
      this.updateConfig({ ...this.configDoc, configured: true });
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

      const isGroup = this.group.nombre !== this.company.razonSocial;

      const instance = isExternalOffice
        ? 'final' : 'inicio';

      const configuredDocs = this.allDocuments
        .filter((document) => document.configured && !document.referenciaId)
        .map((documentMap) => ({
          configId: documentMap.configId,
          configNombre: documentMap.configNombre,
          folioInicial: documentMap.initialSheet,
          prefijo: documentMap.prefix,
          renueva: documentMap.renew
        }));
      this.configSheets = {
        referenciaId: isGroup ? this.group.id : this.company.id,
        alcance: isGroup ? 'grupo' : 'empresa',
        instancia: instance,
        configFolios: configuredDocs
      };
      if (configuredDocs.length) {
        this.confirmInfo = true;
      }
    },
    confirmSave() {
      this.saveDocConfigSheet(this.configSheets);
      this.confirmInfo = false;
    },
    cancelSave() {
      this.confirmInfo = false;
    }
  },
  created() {
    this.confirmInfo = false;
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

.chip-custom {
  font-size: 12px;
  margin-top: 10px;
  color: #ffb300;
  background: #fff5df;
  border-radius: 10px;
  padding: 4px 8px;
}
</style>
