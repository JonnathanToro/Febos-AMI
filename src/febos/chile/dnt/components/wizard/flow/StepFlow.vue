<template>
  <div>
    <form data-vv-scope="flow-part-1">
      <div class="row mb-3">
        <div class="col-12">
          <h4>Datos para el flujo</h4>
          <span>
            Este expediente podrá ser tramitado por
            <span v-if="wizardData.fileCategory === 'numInt'">
              Oficina interna
            </span>
            <span v-if="wizardData.fileCategory === 'numOf'">
              Oficina externa
            </span>
          </span>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <vs-input
            class="w-100"
            label="Nombre para el flujo"
            name="name"
            v-model="step.name"
            :danger="errors.has('flow-part-1.name')"
            :danger-text="errors.first('flow-part-1.name')"
            v-validate="'required'"
          />
        </div>
        <div class="col-md-6">
          <vs-input
            class="w-100"
            label="Descripción para el flujo"
            name="description"
            v-model="step.description"
            :danger="errors.has('flow-part-1.description')"
            :danger-text="errors.first('flow-part-1.description')"
            v-validate="'required'"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-3">
              <label>Estampar aprobaciones</label>
            </div>
            <div class="col-md-1">
              <vs-radio
                vs-name="pdfStamp"
                :vs-value="true"
                v-model="step.pdfStamp"
              >
                Si
              </vs-radio>
            </div>
            <div class="col-md-1">
              <vs-radio
                vs-name="pdfStamp"
                :vs-value="false"
                v-model="step.pdfStamp"
              >
                No
              </vs-radio>
            </div>
          </div>
        </div>
        <div class="col-md-6" />
      </div>
    </form>
    <form data-vv-scope="flow-part-2">
      <div class="row mb-3">
        <div class="col-12">
          <h4>Detalle del flujo</h4>
        </div>
      </div>
      <div class="row mb-5">
        <div class="col-3">
          <vs-select
            class="w-100"
            autocomplete
            label="Selecciona el tipo de paso"
            name="stepType"
            v-model="stepType"
            :danger="errors.has('flow-part-2.stepType')"
            :danger-text="errors.first('flow-part-2.stepType')"
            v-validate="'required'"
          >
            <vs-select-item
              :value="stepTypes.USER"
              text="Usuario"
            />
            <vs-select-item
              :value="stepTypes.GROUP"
              text="Grupo"
            />
            <vs-select-item
              :value="stepTypes.OFFICE"
              text="Oficina"
            />
          </vs-select>
        </div>
        <div
          class="col-6"
          v-if="stepType === stepTypes.GROUP || stepType === this.stepTypes.OFFICE"
        >
          <list-groups
            class="w-100"
            autocomplete
            label="Grupo del responsable"
            name="groupStep"
            v-model="groupStep"
            :typeList="stepType"
            :officeType="wizardData.fileCategory"
            ref="groupStep"
            :danger="errors.has('flow-part-2.groupStep')"
            :danger-text="errors.first('flow-part-2.groupStep')"
            v-validate="{
              required: stepType === stepTypes.GROUP || stepType === this.stepTypes.OFFICE
            }"
          />
        </div>
        <div
          class="col-6"
          v-if="stepType === stepTypes.USER"
        >
          <list-user
            class="w-100"
            autocomplete
            label="Usuario"
            name="userStep"
            v-model="userStep"
            ref="userStep"
            :danger="errors.has('flow-part-2.userStep')"
            :danger-text="errors.first('flow-part-2.userStep')"
            v-validate="{ required: stepType === stepTypes.USER }"
          />
        </div>
        <div class="col-3">
          <vs-select
            class="w-100"
            autocomplete
            label="Selecciona el tipo de rol"
            name="rolType"
            v-model="rolType"
            :danger="errors.has('flow-part-2.rolType')"
            :danger-text="errors.first('flow-part-2.rolType')"
            v-validate="'required'"
          >
            <vs-select-item
              :value="rolTypes.APPROVER"
              text="Aprobador"
            />
            <vs-select-item
              :value="rolTypes.REVIEWER"
              text="Revisor"
            />
            <vs-select-item
              :value="rolTypes.SIGNER"
              text="Firmante"
            />
          </vs-select>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12 d-flex align-items-end justify-content-end">
          <vs-button
            color="primary"
            icon="add"
            v-on:click="addStep()"
            :disabled="groupUsersState.loading"
          >
            Agregar Paso
          </vs-button>
        </div>
      </div>
      <div class="row mb-3" v-if="step.steps.length">
        <div
          class="col-3"
          v-for="(step, index) in step.steps" :key="`step-${index}`"
        >
          <div class="step-wrapper">
            <span class="step-number">{{step.stepNumber}}</span>
            <span class="step-delete">
              <vs-icon
                icon="highlight_off"
                size="small"
                bg="white"
                round
                @click="removeStep(index)"
              />
            </span>
            <div class="text-center step-name">
              {{ step.responsibleName }}
              <span
                v-if="step.stepType === stepTypes.GROUP || step.stepType === stepTypes.OFFICE"
              >
                {{(step.groupUsers.length) }}
              </span>
            </div>
            <div class="step-type">
              <span v-if="step.stepType === stepTypes.USER">
                usuario
              </span>
              <span v-if="step.stepType === stepTypes.GROUP">
                grupo
              </span>
              <span v-if="step.stepType === stepTypes.OFFICE">
                oficina
              </span>
            </div>
            <div class="step-rol">
              <span v-if="step.rolType === rolTypes.APPROVER">
                aprobador
              </span>
                <span v-if="step.rolType === rolTypes.SIGNER">
                firmante
              </span>
                <span v-if="step.rolType === rolTypes.REVIEWER">
                revisor
              </span>
            </div>
          </div>
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
// cloud/#/documentos/flujo/68483ee2201b324e08295632f39fb0458e66
import { mapGetters } from 'vuex';
import Vue from 'vue';

import RolTypes from '@/febos/chile/dnt/mixins/RolTypes';
import StepTypes from '@/febos/chile/dnt/mixins/StepTypes';
import ListGroups from '@/febos/chile/lists/components/ListGroups';
import ListUser from '@/febos/chile/lists/components/ListUser';
import WizardStep from '@/febos/chile/dnt/mixins/WizardStep';
import { getUsersByGroup } from '@/febos/servicios/api/empresas.api';

export default {
  mixins: [WizardStep],
  components: { ListGroups, ListUser },
  data() {
    return {
      error: {
        message: ''
      },
      rolTypes: RolTypes,
      stepTypes: StepTypes,
      step: {
        fileMime: 'application/pdf',
        fileDate: Vue.moment().format('YYYY-MM-DD HH:mm:ss'),
        fileId: this.$route.params.id,
        name: '',
        description: '',
        pdfStamp: true,
        steps: [],
        file: ''
      },
      stepType: StepTypes.GROUP,
      rolType: '',
      groupStep: '',
      userStep: ''
    };
  },
  computed: {
    ...mapGetters('List', [
      'groupUsersState'
    ]),
    ...mapGetters('Dnts', [
      'wizardData'
    ]),
    ...mapGetters('Empresas', [
      'company'
    ])
  },
  watch: {},
  methods: {
    removeStep(index) {
      this.error.message = '';
      this.step.step = this.step.steps.splice(index, 1);
    },
    async addStep() {
      const isValid = await this.validateForm('flow-part-2');

      if (!isValid) {
        return;
      }

      if (this.step.steps.find((step) => step.stepType === StepTypes.OFFICE)) {
        this.error.message = 'Oops! El último paso debe ser la oficina y ya la agregaste';
        return;
      }

      const responsibleStep = (
        this.stepType === StepTypes.GROUP || this.stepType === StepTypes.OFFICE
      )
        ? this.$refs.groupStep.getOption()
        : this.$refs.userStep.getOption();

      const step = {
        stepType: this.stepType,
        rolType: this.rolType,
        stepNumber: this.step.steps.length + 1,
        responsibleName: responsibleStep.label,
        responsibleId: responsibleStep.id,
        responsibleEmail: responsibleStep.email || ''
      };

      if (this.stepType === StepTypes.GROUP || this.stepType === StepTypes.OFFICE) {
        const { data: { usuarios: users } } = await getUsersByGroup({
          empresaId: this.company.id,
          pagina: 1,
          filas: 9999,
          groupId: responsibleStep.id
        });

        step.groupUsers = users.map((user) => ({
          ...user,
          tipoValorResponsableId: user.id
        }));
      }

      this.step.steps.push(step);

      this.stepType = this.stepTypes.GROUP;
      this.rolType = '';
      this.groupStep = '';
      this.userStep = '';
      await this.$validator.reset();
    },
    async isValid() {
      const flowValidation = await Promise.all([
        this.validateForm('flow-part-1')
      ]);

      if (flowValidation.some((step) => !step)) {
        return false;
      }

      if (!this.step.steps.length) {
        this.error.message = 'Debes agregar al menos un paso';
        return false;
      }

      if (this.step.steps[this.step.steps.length - 1].rolType === this.rolTypes.REVIEWER) {
        this.error.message = 'El último paso no puede ser revisor';
        return false;
      }

      return true;
    },
    getStepData() {
      return {
        fileNumber: this.wizardData.fileNumber,
        fileUrl: this.wizardData.fileUrl,
        fileName: `Expediente-Nro-${ this.wizardData.fileNumber}`,
        typeFlowId: this.wizardData.fileType,
        typeFlowText: `${ this.wizardData.fileType } - `,
        fileType: this.wizardData.fileType,
        number: this.wizardData.fileNumber,
        // TODO: mover al mapper. @lettunia
        privado: 'N',
        ...this.step
      };
    }
  }
};
</script>
<style>

.step-wrapper {
  border: 1px solid #cfcfcf;
  padding: 10px;
  border-radius: 5px;
  position: relative;
  margin-top: 20px;
}

.step-number {
  position: absolute;
  top: -10px;
  left: -4px;
  padding: 2px 8px;
  background: #16c86b;
  border-radius: 50%;
  color: white;
  font-size: 12px;
}

.step-delete {
  position: absolute;
  top: -10px;
  right: -4px;
  font-size: 10px;
  color: #b11e0b;
  cursor: pointer;
}

.step-rol {
  position: absolute;
  bottom: -10px;
  right: -1px;
  padding: 2px 8px;
  background: #671e85;
  border-radius: 5px;
  color: white;
  font-size: 12px;
}

.step-type {
  position: absolute;
  bottom: -10px;
  left: -1px;
  padding: 2px 8px;
  background: #155f87;
  border-radius: 5px;
  color: white;
  font-size: 12px;
}

.step-name {
  padding: 8px 0;
}
</style>
