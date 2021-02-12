<template>
  <div>
    <vs-row vs-justify="center">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="8">
        <step-progress
          :current-step="wizard.currentStep"
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
          <div slot="footer">
            <vs-row vs-justify="flex-end">
              <vs-button color="primary" v-if="!isFirstStep" @click="onBack">
                Volver
              </vs-button>
              <CheckPermission permission="ED014">
                <vs-button color="primary" class="ml-2" @click="onBackup">
                  Guardar Borrador
                </vs-button>
              </CheckPermission>
              <CheckPermission permission="ED015">
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

export default {
  components: {
    StepProgress,
    CheckPermission
  },
  data() {
    return {
      wizard: {
        currentStep: 0,
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
      return this.wizard.currentStep === 0;
    },
    isLastStep() {
      return this.wizard.currentStep >= this.wizard.steps.length - 1;
    },
    mockedSteps() {
      return new Array(this.wizard.steps.length)
        .fill('');
    },
    currentStepSetting() {
      return this.wizard.steps[this.wizard.currentStep];
    }
  },
  methods: {
    ...mapActions('Dnts', [
      'saveDocument',
      'clearWizardData',
      'loadWizardData',
      'addWizardData'
    ]),
    onBack() {
      if (this.isFirstStep) {
        return;
      }

      this.wizard.currentStep -= 1;
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

      this.wizard.currentStep += 1;
    },
    onEnd() {
      const { id } = this.$route.params;

      this.saveDocument({
        id,
        data: this.wizard.documentMapper(
          this.wizardData,
          this.company.iut,
          this.company.razonSocial
        )
      });
    },
    onBackup() {
      const { id } = this.$route.params;

      this.addWizardData(this.$refs.step.getStepData());

      this.saveDocument({
        id,
        data: this.wizard.documentMapper(
          this.wizardData,
          this.company.iut,
          this.company.razonSocial,
          true
        ),
        isDraft: true
      });
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
        mapper: this.wizard.wizardMapper
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
