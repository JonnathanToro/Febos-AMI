<template>
  <div>
    <form data-vv-scope="step-2-part-1">
      <div class="row mb-5">
        <div class="col-12">
          <h4>Datos de la persona que ingresa el documento</h4>
        </div>
        <div class="col-md-12">
          <list-user-groups
            class="w-100"
            autocomplete
            label="Grupo al que irá asociado el expediente"
            name="creatorGroup"
            v-model="step.creatorGroup"
            :danger="errors.has('step-2-part-1.creatorGroup')"
            :danger-text="errors.first('step-2-part-1.creatorGroup')"
            v-validate="{ required: userGroupsState.list.length > 1 }"
            ref="creatorGroup"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <h4>Origen / Datos Remitente</h4>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-12">
          <list-groups
            class="w-100"
            autocomplete
            label="Dirección - Región"
            name="directionId"
            v-model="step.directionId"
            :danger="errors.has('step-2-part-1.directionId')"
            :danger-text="errors.first('step-2-part-1.directionId')"
            v-validate="'required'"
            ref="directionId"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <list-group-users
            class="w-100"
            autocomplete
            label="Nombre de Persona que Genera Documento"
            name="personName"
            v-model="step.personName"
            :parent-value="step.directionId"
            :danger="errors.has('step-2-part-1.personName')"
            :danger-text="errors.first('step-2-part-1.personName')"
            v-validate="'required'"
            ref="personName"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <vs-input
            class="w-100"
            label="Cargo Persona"
            maxlength="150"
            name="personPosition"
            v-model="step.personPosition"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <vs-divider />
        </div>
      </div>
    </form>
    <form data-vv-scope="step-2-part-2">
      <div class="row mb-3">
        <div class="col-12">
          <h4>Destinatario</h4>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <list-subject-types
            class="w-100"
            autocomplete
            label="Destinos"
            name="subjectType"
            v-model="subjectForm.subjectType"
            v-validate="'required'"
            :danger="errors.has('step-2-part-2.subjectType')"
            :danger-text="errors.first('step-2-part-2.subjectType')"
            ref="subjectType"
          />
        </div>
        <div class="col-md-6">
          <list-subjects
            v-if="
              !isInput.includes(subjectForm.subjectType)
                && subjectForm.subjectType !== 'usuarios'
            "
            class="w-100"
            autocomplete
            label="Lista de Destino"
            name="subject"
            v-model="subjectForm.subject"
            :parent-value="subjectForm.subjectType"
            v-validate="{
              required: !isInput.includes(subjectForm.subjectType)
                && subjectForm.subjectType !== 'usuarios'
            }"
            :danger="errors.has('step-2-part-2.subject')"
            :danger-text="errors.first('step-2-part-2.subject')"
            ref="subject"
            key="subject-select"
          />
          <list-user
            v-if="
              !isInput.includes(subjectForm.subjectType)
                && subjectForm.subjectType === 'usuarios'
            "
            class="w-100"
            autocomplete
            label="Lista de Destino"
            name="subject"
            v-model="subjectForm.subject"
            v-validate="{
              required: !isInput.includes(subjectForm.subjectType)
                && subjectForm.subjectType === 'usuarios'
            }"
            :disabled="!subjectForm.subjectType"
            :danger="errors.has('step-2-part-2.subject')"
            :danger-text="errors.first('step-2-part-2.subject')"
            ref="subject"
            key="subject-select"
          />
          <vs-input
            v-if="isInput.includes(subjectForm.subjectType)"
            class="w-100"
            label="Ingrese un nombre"
            name="subject"
            v-model="subjectForm.subject"
            v-validate="{ required: isInput.includes(subjectForm.subjectType) }"
            :danger="errors.has('step-2-part-2.subject')"
            :danger-text="errors.first('step-2-part-2.subject')"
            key="subject-input"
          />
        </div>
      </div>
      <div class="row mb-3" v-if="subjectForm.subjectType === 'docDigital'">
        <div class="col-12">
          <list-institutions-doc-digital
            class="w-100"
            autocomplete
            label="Lista de Instituciones DocDigital"
            name="subjectTypeDigitalDoc"
            v-model="subjectForm.subjectTypeDigitalDoc"
            :parent-value="subjectForm.subject"
            v-validate="{ required: subjectForm.subjectType === 'docDigital'}"
            :danger="errors.has('step-2-part-2.subjectTypeDigitalDoc')"
            :danger-text="errors.first('step-2-part-2.subjectTypeDigitalDoc')"
            ref="subjectTypeDigitalDoc"
          />
        </div>
      </div>
      <div class="row mb-3" v-if="emailRequired.includes(subjectForm.subjectType)">
        <div class="col-12">
          <vs-input
            class="w-100"
            label="Correo Electrónico Persona Destinatario"
            name="subjectEmail"
            v-model="subjectForm.subjectEmail"
            v-validate="{
              required: emailRequired.includes(subjectForm.subjectType)
              ,
              email: true
            }"
            :danger="errors.has('step-2-part-2.subjectEmail')"
            :danger-text="errors.first('step-2-part-2.subjectEmail')"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12 d-flex align-items-end justify-content-end">
          <vs-button color="primary" icon="add" v-on:click="addSubject()">
            Agregar Destinatario
          </vs-button>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <vs-table
            multiple
            v-model="step.subjectsSelected"
            no-data-text="No tienes destinatarios"
            :data="step.subjects"
          >
            <template slot="thead">
              <vs-th>Destino</vs-th>
              <vs-th>Lista Destino</vs-th>
              <vs-th>Institución</vs-th>
            </template>
            <template slot-scope="{data}">
              <vs-tr :data="tr" v-for="(tr, indextr) in data" :key="indextr">
                <vs-td :data="data[indextr].subjectType.label">
                  {{tr.subjectType.label}}
                </vs-td>
                <vs-td :data="data[indextr].subject.label">
                  {{tr.subject.label}}
                </vs-td>
                <vs-td :data="data[indextr].subjectTypeDigitalDoc.label">
                  {{tr.subjectTypeDigitalDoc.label}}
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>
    </form>
      <div class="row mb-3">
        <div class="col-12">
          <vs-divider />
        </div>
      </div>
    <form data-vv-scope="step-2-part-3">
      <div class="row mb-3">
        <div class="col-12">
          <h4>Con copia a</h4>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <list-subject-types
            class="w-100"
            autocomplete
            label="Distribución"
            name="copySubjectType"
            v-model="copySubjectForm.copySubjectType"
            v-validate="'required'"
            :danger="errors.has('step-2-part-3.copySubjectType')"
            :danger-text="errors.first('step-2-part-3.copySubjectType')"
            ref="copySubjectType"
          />
        </div>
        <div class="col-md-6">
          <list-subjects
            v-if="
              !isInput.includes(copySubjectForm.copySubjectType)
                && copySubjectForm.copySubjectType !== 'usuarios'
            "
            class="w-100"
            autocomplete
            label="Lista de Distribución"
            name="copySubject"
            v-model="copySubjectForm.copySubject"
            :parent-value="copySubjectForm.copySubjectType"
            v-validate="{
              required: !isInput.includes(copySubjectForm.copySubject)
                && copySubjectForm.copySubjectType !== 'usuarios'
            }"
            :danger="errors.has('step-2-part-3.copySubject')"
            :danger-text="errors.first('step-2-part-3.copySubject')"
            ref="copySubject"
            key="copy-subject-select"
          />
          <list-user
            v-if="
              !isInput.includes(copySubjectForm.copySubjectType)
                && copySubjectForm.copySubjectType === 'usuarios'
            "
            class="w-100"
            autocomplete
            label="Lista de Destino"
            name="copySubject"
            v-model="copySubjectForm.copySubject"
            v-validate="{
              required: !isInput.includes(copySubjectForm.copySubjectType)
                && copySubjectForm.copySubjectType === 'usuarios'
            }"
            :disabled="!copySubjectForm.copySubjectType"
            :danger="errors.has('step-2-part-2.subject')"
            :danger-text="errors.first('step-2-part-2.subject')"
            ref="copySubject"
            key="copy-subject-select"
          />
          <vs-input
            v-if="isInput.includes(copySubjectForm.copySubjectType)"
            class="w-100"
            label="Ingrese un nombre"
            name="copySubject"
            v-model="copySubjectForm.copySubject"
            v-validate="{ required: isInput.includes(copySubjectForm.copySubjectType) }"
            :danger="errors.has('step-2-part-3.copySubject')"
            :danger-text="errors.first('step-2-part-3.copySubject')"
            key="copy-subject-input"
          />
        </div>
      </div>
      <div class="row mb-3" v-if="copySubjectForm.copySubjectType === 'docDigital'">
        <div class="col-12">
          <list-institutions-doc-digital
            class="w-100"
            autocomplete
            label="Lista de Instituciones DocDigital"
            name="copySubjectTypeDigitalDoc"
            v-model="copySubjectForm.copySubjectTypeDigitalDoc"
            :parent-value="copySubjectForm.copySubject"
            v-validate="{ required: copySubjectForm.copySubject === 'docDigital'}"
            :danger="errors.has('step-2-part-3.copySubjectTypeDigitalDoc')"
            :danger-text="errors.first('step-2-part-3.copySubjectTypeDigitalDoc')"
            ref="copySubjectTypeDigitalDoc"
          />
        </div>
      </div>
      <div class="row mb-3" v-if="emailRequired.includes(copySubjectForm.copySubjectType)">
        <div class="col-12">
          <vs-input
            class="w-100"
            label="Correo Electrónico Persona Destinatario"
            name="copySubjectEmail"
            v-model="copySubjectForm.copySubjectEmail"
            v-validate="{
              required: emailRequired.includes(copySubjectForm.copySubjectType)
              ,
              email: true
            }"
            :danger="errors.has('step-2-part-3.copySubjectEmail')"
            :danger-text="errors.first('step-2-part-3.copySubjectEmail')"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12 d-flex align-items-end justify-content-end">
          <vs-button color="primary" icon="add" v-on:click="addCopy()">
            Agregar copia a
          </vs-button>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <vs-table
            multiple
            v-model="step.copiesSelected"
            no-data-text="No tienes distribuciones con copia"
            :data="step.copies"
          >
            <template slot="thead">
              <vs-th>Distribución</vs-th>
              <vs-th>Lista Distribución</vs-th>
              <vs-th>Institución</vs-th>
            </template>
            <template slot-scope="{data}">
              <vs-tr :data="tr" v-for="(tr, indextr) in data" :key="indextr">
                <vs-td :data="data[indextr].copySubjectType.label">
                  {{tr.copySubjectType.label}}
                </vs-td>
                <vs-td :data="data[indextr].copySubject.label">
                  {{tr.copySubject.label}}
                </vs-td>
                <vs-td :data="data[indextr].copySubjectTypeDigitalDoc.label">
                  {{tr.copySubjectTypeDigitalDoc.label}}
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>
    </form>
    <div class="row mb-3">
      <div class="col-12">
        <vs-divider />
      </div>
    </div>
    <form data-vv-scope="step-2-part-4">
      <div class="row mb-3">
        <div class="col-md-6">
          <vs-select
            class="w-100"
            autocomplete
            label="Acompaña Físico"
            name="esFisico"
            v-model="step.withAttachment"
          >
            <vs-select-item
              :value="0"
              text="No"
            />
            <vs-select-item
              :value="1"
              text="Si"
            />
          </vs-select>
        </div>
        <div class="col-md-6">
          <vs-input
            class="w-100"
            label="Detalle"
            maxlength="250"
            name="documentDetail"
            v-model="step.documentDetail"
            v-validate="{ required: step.withAttachment === 1 }"
            :danger="errors.has('step-2-part-4.documentDetail')"
            :danger-text="errors.first('step-2-part-4.documentDetail')"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-12">
          <vs-input
            class="w-100"
            label="Resumen"
            maxlength="250"
            name="resumen"
            v-model="step.resumen"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <label for="observation">Observacion (5000 caracteres)</label>
          <vs-textarea
            id="observation"
            maxlength="5000"
            label="Observacion (5000 caracteres)"
            name="observacion"
            v-model="step.observation"
            width="100%"
            height="100px"
          />
        </div>
      </div>
      <div v-if="error.message !== ''" class="con-text-validation span-text-validation-danger
           vs-input--text-validation-span v-enter-to text-right"
           style="height: 32px;">
          <span class="span-text-validation">
            {{error.message}}
          </span>
      </div>
    </form>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

import WizardStep from '@/febos/chile/dnt/mixins/WizardStep';
import ListSubjects from '@/febos/chile/lists/components/ListSubjects';
import ListInstitutionsDocDigital from '@/febos/chile/lists/components/ListInstitutionsDocDigital';
import ListSubjectTypes from '@/febos/chile/lists/components/ListSubjectTypes';
import ListGroups from '@/febos/chile/lists/components/ListGroups';
import ListGroupUsers from '@/febos/chile/lists/components/ListGroupUsers';
import ListUserGroups from '@/febos/chile/lists/components/ListUserGroups';
import ListUser from '@/febos/chile/lists/components/ListUser';

export default {
  mixins: [WizardStep],
  components: {
    ListGroups,
    ListGroupUsers,
    ListSubjects,
    ListSubjectTypes,
    ListInstitutionsDocDigital,
    ListUserGroups,
    ListUser
  },
  data() {
    return {
      error: {
        message: ''
      },
      emailRequired: ['personas', 'empresas', 'ministerios'],
      isInput: ['personas', 'empresas'],
      subjectForm: {
        subjectType: '',
        subject: '',
        subjectTypeDigitalDoc: '',
        subjectEmail: '',
      },
      copySubjectForm: {
        copySubjectType: '',
        copySubject: '',
        copySubjectTypeDigitalDoc: '',
        copySubjectEmail: '',
      },
      step: {
        creatorGroup: '',
        directionId: '',
        personName: '',
        personPosition: '',
        withAttachment: 0,
        documentDetail: '',
        resumen: '',
        observation: '',
        subjects: [],
        copies: [],
        subjectsSelected: [],
        copiesSelected: [],
        ...this.draft
      }
    };
  },
  computed: {
    ...mapGetters('List', [
      'userGroupsState'
    ])
  },
  methods: {
    async addSubject() {
      const isValid = await this.validateForm('step-2-part-2');

      if (!isValid) {
        return;
      }

      const subjectType = this.$refs.subjectType.getOption();
      const subject = this.isInput.includes(this.subjectForm.subjectType)
        ? {
          label: this.subjectForm.subject,
          value: this.subjectForm.subject,
          id: this.subjectForm.subject
        }
        : this.$refs.subject.getOption();

      const subjectTypeDigitalDoc = this.$refs.subjectTypeDigitalDoc
        ? this.$refs.subjectTypeDigitalDoc.getOption()
        : {};

      const row = {
        subjectType,
        subject,
        subjectTypeDigitalDoc,
        subjectEmail: this.subjectForm.subjectEmail
      };

      const isSelected = this.step.subjectsSelected
        .some((subjectRow) => subjectRow.subject.id === row.subject.id);

      if (!isSelected) {
        this.step.subjects.push(row);
        this.step.subjectsSelected.push(row);
      } else {
        this.$vs.notify({
          title: 'Oops!',
          text: 'Ya agregaste este destinatario',
          color: 'warning',
          time: 3000,
          position: 'top-center'
        });
      }

      this.subjectForm.subjectType = '';
      this.subjectForm.subject = '';
      this.subjectForm.subjectTypeDigitalDoc = '';
      this.subjectForm.subjectEmail = '';
      await this.$validator.reset();
    },
    async addCopy() {
      const isValid = await this.validateForm('step-2-part-3');

      if (!isValid) {
        return;
      }

      const copySubjectType = this.$refs.copySubjectType.getOption();
      const copySubject = this.isInput.includes(this.copySubjectForm.copySubjectType)
        ? {
          label: this.copySubjectForm.copySubject,
          value: this.copySubjectForm.copySubject,
          id: this.copySubjectForm.copySubject
        }
        : this.$refs.copySubject.getOption();

      const copySubjectTypeDigitalDoc = this.$refs.copySubjectTypeDigitalDoc
        ? this.$refs.copySubjectTypeDigitalDoc.getOption()
        : {};

      const row = {
        copySubjectType,
        copySubject,
        copySubjectTypeDigitalDoc,
        copySubjectEmail: this.copySubjectForm.copySubjectEmail
      };

      const isSelected = this.step.copiesSelected
        .some((copyRow) => copyRow.copySubject.id === row.copySubject.id);

      if (!isSelected) {
        this.step.copies.push(row);
        this.step.copiesSelected.push(row);
      } else {
        this.$vs.notify({
          title: 'Oops!',
          text: 'Ya agregaste esta copia',
          color: 'warning',
          time: 3000,
          position: 'top-center'
        });
      }

      this.copySubjectForm.copySubjectType = '';
      this.copySubjectForm.copySubject = '';
      this.copySubjectForm.copySubjectTypeDigitalDoc = '';
      this.copySubjectForm.copySubjectEmail = '';
      await this.$validator.reset();
    },
    async isValid() {
      const stepValidations = await Promise.all([
        this.validateForm('step-2-part-1'),
        this.validateForm('step-2-part-4'),
      ]);

      if (stepValidations.some((step) => !step)) {
        return false;
      }

      if (!this.step.subjectsSelected.length) {
        this.error.message = 'Debes agregar al menos un destino';
        return false;
      }

      return true;
    },
    getStepData() {
      const directionName = this.step.directionId
        ? {
          directionName: this.$refs.directionId.getOption().label
        }
        : {};

      const personName = this.step.personName
        ? {
          personName: this.$refs.personName.getOption().label
        }
        : {};

      const creatorGroupName = this.step.creatorGroup
        ? {
          creatorGroupName: this.$refs.creatorGroup.getOption().label
        }
        : {};

      return {
        ...this.step,
        ...directionName,
        ...personName,
        ...creatorGroupName
      };
    }
  }
};

</script>
