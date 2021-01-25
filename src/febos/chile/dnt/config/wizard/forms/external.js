export default {
  currentStep: 0,
  steps: [
    {
      title: 'Identification',
      component: require('../../../components/external/StepIdentification').default
    },
    {
      title: 'Información',
      component: require('../../../components/external/StepInformation').default
    },
    {
      title: 'Documentos relacionados',
      component: require('../../../components/external/StepFiles').default
    }
  ],
  mapper(input, iutCompany, nameCompany) {
    return {
      dnt: {
        tipo: 'EXP',
        emisorRut: iutCompany,
        receptorRut: iutCompany,
        emisorRazonSocial: nameCompany,
        receptorRazonSocial: nameCompany,
        claseMercadoPublico: 'ext',
        emisorCentroCostoNumero: input.documentType,
        emisorCentroCostoNombre: input.documentTypeName,
        emisorSucursalCodigo: input.document,
        emisorSucursalDireccion: input.documentName,
        numeroInt: input.documentNumber,
        fechaEmision: input.issueDate,
        materia: input.matter,
        transporteTipoPuerto: input.isPrivate,
        compradorCodigo: input.institutionType,
        compradorArea: input.institutionTypeName,
        emisorContactoCodigo: input.institution,
        emisorContactoArea: input.institutionName,
        emisorContactoNombre: input.personName,
        emisorContactoCargo: input.personPosition,
        transporteViaTransporteCodigoTransporte: input.withAttachment,
        transporteNotas: input.documentDetail,
        observacion: input.observation
      },
      dntEtiqueta: input.tags,
      dntDestino: [
        ...input.subjectsSelected.map((subject) => {
          const institution = Object.keys(subject.subjectTypeDigitalDoc).length
            ? {
              institucionCodigo: subject.subjectTypeDigitalDoc.value,
              institucionNombre: subject.subjectTypeDigitalDoc.label,
            }
            : {};

          return {
            tipoDestino: 1,
            estado: 1,
            destinoCodigo: subject.subjectType.value,
            destinoNombre: subject.subjectType.label,
            destinoListaCodigo: subject.subject.label,
            destinoListaNombre: subject.subject.label,
            destinoCorreo: subject.subjectEmail,
            ...institution
          };
        }),
        ...input.copiesSelected.map((subject) => {
          const institution = Object.keys(subject.copySubjectTypeDigitalDoc).length
            ? {
              institucionCodigo: subject.copySubjectTypeDigitalDoc.value,
              institucionNombre: subject.copySubjectTypeDigitalDoc.label,
            }
            : {};

          return {
            tipoDestino: 2,
            estado: 1,
            destinoCodigo: subject.copySubjectType.value,
            destinoNombre: subject.copySubjectType.label,
            destinoListaCodigo: subject.copySubject.label,
            destinoListaNombre: subject.copySubject.label,
            destinoCorreo: subject.copySubjectEmail,
            ...institution
          };
        })
      ],
      dntAdjuntos: [
        {
          tipo: 'principal',
          mime: input.mainFile.mime,
          nombre: input.mainFile.name,
          fecha: input.mainFile.date,
          url: input.mainFile.path
        },
        ...input.additionalFiles.map((file) => ({
          tipo: 'adjunto',
          mime: file.mime,
          nombre: file.name,
          fecha: file.date,
          url: file.path
        }))
      ],
      dntReferencia: input.relatedDocumentsSelected.map((relatedDocument) => ({
        linea: relatedDocument.id,
        tipoDocumento: relatedDocument.type,
        folio: relatedDocument.number
      }))
    };
  }
};
