<template>
  <div>
    <form data-vv-scope="step-3-part-1">
      <div class="row mb-3">
        <div class="col-12">
          <h4>Adjuntar Documento</h4>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-9">
          <vs-input
            class="w-100"
            label="Documento Principal (Si piensa firmar electrónicamente no debe ser escaneado)"
            name="mainFileName"
            readonly
            v-model="step.mainFile.name"
            v-validate="'required'"
            :danger="errors.has('step-3-part-1.mainFileName')"
            :danger-text="errors.first('step-3-part-1.mainFileName')"
          />
        </div>
        <div class="col-md-3 d-flex align-items-end">
          <UploadFile
            permission="*"
            text="Seleccionar"
            v-model="step.mainFile"
            upload-to="ed"
            :button-class="{ 'btn-block': true, 'mb-5': errors.has('step-3-part-1.mainFileName') }"
            container-class="w-100"
          />
        </div>
        <div class="col-md-12">
          <div v-if="error.message !== ''" class="con-text-validation span-text-validation-danger
           vs-input--text-validation-span v-enter-to"
               style="height: 32px;">
          <span class="span-text-validation">
            {{ error.message }}
          </span>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-9">
          <vs-input
            class="w-100"
            label="Archivo Adjunto"
            name="additionalFileName"
            v-model="additionalFile.name"
            readonly
          />
        </div>
        <div class="col-md-3 d-flex align-items-end">
          <UploadFile
            permission="*"
            text="Seleccionar"
            v-model="additionalFile"
            upload-to="ed"
            button-class="btn-block"
            container-class="w-100"
            @input="addAdditionalFile()"
          />
        </div>
      </div>
      <div class="row mb-3" v-if="Object.keys(step.mainFile).length">
        <div class="col-3">
          <div class="d-flex flex-column align-items-center">
            <vs-icon icon="description" size="75px" color="primary" />
            <b class="text-truncate w-100 text-center">{{ step.mainFile.name }}</b>
          </div>
        </div>
        <div class="col-3" v-for="file in step.additionalFiles" :key="file.id">
          <div class="d-flex flex-column align-items-center">
            <vs-icon icon="description" size="75px" color="primary" />
            <b class="text-truncate w-100 text-center">{{ file.name }}</b>
            <vs-button
              color="danger"
              type="flat"
              icon="clear"
              @click="removeAdditionalFile(file.id)"
            />
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <vs-divider />
        </div>
      </div>
    </form>
    <form data-vv-scope="step-3-part-2">
      <div class="row mb-3">
        <div class="col-12">
          <h4>Documentos Relacionados</h4>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <vs-input
            class="w-100"
            label="Contrato SAFI"
            maxlength="6"
            name="safiContract"
            v-model="step.safiContract"
          />
        </div>
        <div class="col-md-12">
          <div class="con-text-validation span-text-validation-danger
           vs-input--text-validation-span v-enter-to"
           style="height: 32px;font-size:12px; color:#673ab7 !important;"
          >
          <span class="span-text-validation">
            El número de Contrato SAFI en muchos casos es requerido, no lo olvides!
          </span>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <vs-divider />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <vs-select
            class="w-100"
            autocomplete
            label="Relacionado con"
            name="relatedDocumentType"
            v-model="relatedDocument.type"
            v-validate="'required'"
            :danger="errors.has('step-3-part-2.relatedDocumentType')"
            :danger-text="errors.first('step-3-part-2.relatedDocumentType')"
          >
            <vs-select-item
              value="expediente"
              text="Expediente"
            />
            <vs-select-item
              value="SSD"
              text="Proceso SSD"
            />
          </vs-select>
        </div>
        <div class="col-md-6">
          <vs-input
            class="w-100"
            label="Nº Documento"
            name="relatedDocumentNumber"
            v-model="relatedDocument.number"
            v-validate="'required'"
            :danger="errors.has('step-3-part-2.relatedDocumentNumber')"
            :danger-text="errors.first('step-3-part-2.relatedDocumentNumber')"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12 d-flex align-items-end justify-content-end">
          <vs-button color="primary" icon="add" v-on:click="addRelatedDocument()">
            Agregar relación
          </vs-button>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <vs-table
            class="pb-2 mb-2"
            multiple
            v-model="step.relatedDocumentsSelected"
            no-data-text="No tienes documentos relacionados"
            :data="step.relatedDocuments"
          >
            <template slot="thead">
              <vs-th>Relacionado con</vs-th>
              <vs-th>Nº Documento</vs-th>
            </template>
            <template slot-scope="{data}">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
                <vs-td :data="data[indextr].type">
                  {{ tr.type }}
                </vs-td>
                <vs-td :data="data[indextr].number">
                  {{ tr.number }}
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

import UploadFile from '@/febos/global/_vue/componentes/UploadFile';
import WizardStep from '@/febos/chile/dnt/mixins/WizardStep';

export default {
  mixins: [WizardStep],
  components: {
    UploadFile
  },
  data() {
    return {
      error: {
        message: ''
      },
      step: {
        mainFile: {},
        additionalFiles: [],
        safiContract: '',
        relatedDocuments: [],
        relatedDocumentsSelected: [],
        ...this.draft
      },
      additionalFile: {},
      relatedDocument: {
        type: '',
        number: ''
      }
    };
  },
  watch: {
    'step.mainFile.name': function () {
      this.$validator.reset();
    }
  },
  methods: {
    async addAdditionalFile() {
      if (!Object.keys(this.additionalFile).length) {
        return;
      }

      if (this.additionalFile.failed) {
        // TODO: display error message.
        this.error.message = 'La carga del archivo falló, inténtalo de nuevo';
        return;
      }

      this.step.additionalFiles.push(this.additionalFile);
      await this.$validator.reset();
    },
    removeAdditionalFile(fileId) {
      this.step.additionalFiles = this.step.additionalFiles.filter((file) => file.id !== fileId);
    },
    async addRelatedDocument() {
      if (this.step.safiContract === '') {
        this.$vs.notify({
          title: 'Oye!',
          text: 'Te recordamos que no estas ingresando el número de Contrato SAFI',
          color: 'warning',
          time: 3000,
          position: 'top-center'
        });
      }

      const isValid = await this.validateForm('step-3-part-2');

      if (!isValid) {
        return;
      }

      const row = {
        id: this.relatedDocument.length,
        type: this.relatedDocument.type,
        number: this.relatedDocument.number
      };
      const isSelected = this.step.relatedDocumentsSelected
        .some((relatedDoc) => relatedDoc.id === row.id
          && relatedDoc.type === row.type && relatedDoc.number === row.number);

      if (!isSelected) {
        this.step.relatedDocuments.push(row);
        this.step.relatedDocumentsSelected.push(row);
      } else {
        this.$vs.notify({
          title: 'Oops!',
          text: 'Ya agregaste esta referencia',
          color: 'warning',
          time: 9000,
          position: 'top-center'
        });
      }

      this.relatedDocument.type = '';
      this.relatedDocument.number = '';
      await this.$validator.reset();
    },
    isValid() {
      if (this.step.safiContract === '') {
        this.$vs.notify({
          title: 'Oye!',
          text: 'No estas ingresando el número de Contrato SAFI,'
            + ' después no digas que no te lo advertimos',
          color: 'warning',
          time: 9000,
          position: 'top-center'
        });
      }
      return this.validateForm('step-3-part-1');
    }
  }
};

</script>
