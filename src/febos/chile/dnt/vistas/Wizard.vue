<template>
  <div>
    <vs-row vs-justify="center">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="8">
        <step-progress
          :current-step="currentStep"
          :steps="mockedSteps"
          :active-color="colors.primario"
          :active-thickness="0"
          :passive-thickness="0"
          :line-thickness="8"
        />
      </vs-col>
    </vs-row>
    <vs-row vs-justify="center" v-if="wizardData.fileNumber">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="10">
        <h4 style="color: #662583">Expediente # {{wizardData.fileNumber}}</h4>
      </vs-col>
    </vs-row>
    <vs-row vs-justify="center">
      <vs-col vs-w="10">
        <vs-card id="wizard">
          <div slot="header">
            <h3>
              {{currentStepSetting.title}}
            </h3>
          </div>
          <div>
            <component
              ref="step"
              :is="currentStepSetting.component"
              :draft="wizardData"
            />
          </div>
          <div slot="footer" class="mt-4 pt-5">
            <vs-row vs-justify="flex-end">
              <vs-button color="primary" v-if="!isFirstStep" @click="onBack">
                Volver
              </vs-button>
              <CheckPermission permission="ED014" v-if="wizard.options.includes('draft')">
                <vs-button color="primary" class="ml-2" @click="onBackup">
                  Guardar Borrador
                </vs-button>
              </CheckPermission>
              <CheckPermission
                permission="ED046"
                v-if="wizard.options.includes('flow') && isLastStep"
              >
                <vs-button color="warning" class="ml-2" @click="onFlow">
                  <span>Enviar a Flujo</span>
                </vs-button>
              </CheckPermission>
              <CheckPermission permission="ED015" v-if="wizard.options.includes('submit')">
                <vs-button color="success" class="ml-2" @click="onNext">
                  <span v-if="isLastStep">Guardar y Enviar</span>
                  <span v-if="!isLastStep">Siguiente</span>
                </vs-button>
              </CheckPermission>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>
<script>

import StepProgress from 'vue-step-progress';
import { mapGetters, mapActions } from 'vuex';

import config from '../config/wizard';

import CheckPermission from '@/febos/global/usuario/components/CheckPermission';
import { updateSearchParams } from '@/febos/global/utils/router';

export default {
  components: {
    StepProgress,
    CheckPermission
  },
  data() {
    return {
      currentStep: Number.parseInt(this.$route.query.step || 0, 10),
      wizard: {
        steps: []
      }
    };
  },
  watch: {
    loading(value) {
      if (!value) {
        this.$vs.loading.close('#wizard > .con-vs-loading');
        return;
      }

      this.$vs.loading({
        container: '#wizard',
        scale: 0.6
      });
    }
  },
  computed: {
    ...mapGetters('Personalizacion', [
      'colors'
    ]),
    ...mapGetters('Empresas', [
      'company'
    ]),
    ...mapGetters('Dnts', [
      'loading',
      'wizardData'
    ]),
    isFirstStep() {
      return this.currentStep === 0;
    },
    isLastStep() {
      return this.currentStep >= this.wizard.steps.length - 1;
    },
    mockedSteps() {
      return new Array(this.wizard.steps.length)
        .fill('');
    },
    currentStepSetting() {
      return this.wizard.steps[this.currentStep];
    }
  },
  methods: {
    ...mapActions('Dnts', [
      'clearWizardData',
      'loadWizardData',
      'addWizardData'
    ]),
    onBack() {
      if (this.isFirstStep) {
        return;
      }

      this.currentStep -= 1;
    },
    async onNext() {
      if (!await this.$refs.step.isValid()) {
        return;
      }

      this.addWizardData(this.$refs.step.getStepData());

      if (this.isLastStep) {
        this.onEnd();
        return;
      }

      this.currentStep += 1;
      updateSearchParams({ step: this.currentStep });
    },
    onEnd(flow) {
      const { id } = this.$route.params;
      const isFileOfficial = this.$route.params.wizard.includes('externo')
        || this.$route.params.wizard.includes('interno');

      this.$store.dispatch(`Dnts/${this.wizard.submitAction}`, {
        id,
        data: this.wizard.documentMapper(
          this.wizardData,
          this.company.iut,
          this.company.razonSocial
        ),
        isDraft: false,
        isFileOfficial,
        redirectFlow: flow
      });
      this.$vs.notify({
        title: 'Genial!',
        text: 'Se ha enviado el elemento al flujo de aprobaciones',
        color: '#671e85',
        position: 'top-center'
      });
    },
    onBackup() {
      const { id } = this.$route.params;

      this.addWizardData(this.$refs.step.getStepData());

      this.$store.dispatch(`Dnts/${this.wizard.backupAction}`, {
        id,
        data: this.wizard.documentMapper(
          this.wizardData,
          this.company.iut,
          this.company.razonSocial,
          true
        ),
        isDraft: true
      });
    },
    async onFlow() {
      if (!await this.$refs.step.isValid()) {
        return;
      }

      this.addWizardData(this.$refs.step.getStepData());
      if (this.isLastStep && this.wizard.options.includes('flow')) {
        this.onEnd(true);
        return;
      }

      this.wizard.currentStep += 1;
    }
  },
  created() {
    this.clearWizardData();

    const { wizard, id } = this.$route.params;
    if (config[wizard]) {
      this.wizard = config[wizard]();
    }

    if (id) {
      this.loadWizardData({
        id,
        mapper: this.wizard.wizardMapper,
        loadAllData: this.wizard.loadAllData
      });
    }
  },
  destroyed() {
    this.clearWizardData();
  }
};
</script>

<style lang="scss">

@import "~vue-step-progress/dist/main.css";

</style>
