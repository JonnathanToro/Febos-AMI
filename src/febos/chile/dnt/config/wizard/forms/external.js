export default {
  currentStep: 0,
  steps: [
    {
      title: 'Documentos relacionados',
      component: require('../../../components/external/StepFiles').default
    },
    {
      title: 'Identification',
      component: require('../../../components/external/StepIdentification').default
    },
    {
      title: 'Información',
      component: require('../../../components/external/StepInformation').default
    }
  ]
};
