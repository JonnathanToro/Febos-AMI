import StepFlow from '@/febos/chile/dnt/components/wizard/flow/stepFlow';

export default () => ({
  currentStep: 0,
  steps: [
    {
      title: 'Enviar documento a flujo',
      component: StepFlow
    }
  ],
  options: ['submit'],
  submitAction: 'sendToFlow',
  loadAllData: false,
  wizardMapper(rawData) {
    return {
      fileUrl: rawData.imagenLink,
      fileNumber: rawData.numero,
      fileType: rawData.tipo,
      fileCategory: rawData.dnt.claseMercadoPublico
    };
  },
  documentMapper(input) {
    const data = {
      typeFlow: input.typeFlow,
      ejecucion: {
        descripcion: input.description,
        estampar: input.pdfStamp,
        nombre: input.name,
        numero: input.number,
        plantilla: {
          aprobaciones: {
            nombre: '',
            descripcion: '',
            estampar: input.pdfStamp,
            foliacion: true,
            tipoejecucion: 'N',
            tipoObjeto: input.typeFlowId,
          },
          aprobacionesPlantillaPaso: input.steps.map((step) => ({
            desdePrecio: 0,
            gatillacionesAInsertar: [],
            cantidadMinAprobacion: 1,
            demoraMaxHoras: 0,
            redirigirFlujo: true,
            subrogadoId: '',
            subrogado: '',
            aprobacionesTipoPasoId: step.stepType,
            aprobacionesTipoRolId: step.rolType,
            grupoUsuarios: step.groupUsers || [],
            numeroPaso: step.stepNumber,
            responsable: step.responsibleName,
            responsableCorreo: step.responsibleEmail,
            tipoValorResponsableId: step.responsibleId
          }))
        }
      },
      documentos: [
        {
          adjuntoMime: input.fileMime,
          adjuntoNombre: input.fileName,
          adjuntoUrl: input.fileUrl,
          fecha: input.fileDate,
          objetoId: input.fileId,
          objetoNombre: input.fileName,
          tipoObjetoId: input.typeFlowId,
          tipoObjetoTexto: input.typeFlowText
        }
      ],
      gatillacionesPreDefinidas: ['f13b799d-8640-4b42-a1e1-2e9044e038b5']
    };

    return data;
  }
});
