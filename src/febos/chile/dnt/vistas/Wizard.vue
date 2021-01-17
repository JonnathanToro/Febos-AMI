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
    <vs-row vs-justify="center">
      <vs-col vs-w="10">
        <vs-card>
          <div slot="header">
            <h3>
              {{currentStepSetting.title}}
            </h3>
          </div>
          <div>
            <component
              ref="step"
              :is="currentStepSetting.component"
            />
          </div>
          <div slot="footer">
            <vs-row vs-justify="flex-end">
              <vs-button color="primary" v-if="!isFirstStep" @click="onBack">
                Volver
              </vs-button>
              <vs-button color="primary" class="ml-2" @click="onBackup">
                Guardar Borrador
              </vs-button>
              <vs-button color="success" class="ml-2" @click="onNext">
                <span v-if="isLastStep">Guardar y Enviar</span>
                <span v-if="!isLastStep">Siguiente</span>
              </vs-button>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>
<script>
import StepProgress from 'vue-step-progress';
import { mapGetters } from 'vuex';

import config from '../config';

export default {
  components: {
    StepProgress
  },
  data() {
    return {
      wizard: {
        currentStep: 0,
        steps: []
      }
    };
  },
  computed: {
    ...mapGetters('Personalizacion', [
      'colors'
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
    onBack() {
      if (this.isFirstStep) {
        return;
      }

      this.wizard.currentStep -= 1;
    },
    onNext() {
      if (!this.$refs.step.isValid()) {
        console.log('toast');
        return;
      }

      if (this.isLastStep) {
        this.onEnd();
        return;
      }

      this.wizard.currentStep += 1;
    },
    onEnd() {
      console.log('ended');
    },
    onBackup() {
      console.log('backup');
    }
  },
  created() {
    const { wizard } = this.$route.params;
    if (config[wizard]) {
      this.wizard = config[wizard]();
    }
  }
};
</script>

<style lang="scss">

@import "~vue-step-progress/dist/main.css";

</style>
