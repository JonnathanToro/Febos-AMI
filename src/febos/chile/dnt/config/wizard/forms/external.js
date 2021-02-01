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
  wizardMapper(
    {
      dnt,
      observaciones,
      destinatarios,
      dntAdjuntos,
      referencias
    }
  ) {
    const data = {};

    if (dnt) {
      data.documentType = dnt.emisorCentroCostoNumero;
      data.document = dnt.emisorSucursalCodigo;
      data.documentNumber = dnt.numeroInt;
      data.issueDate = dnt.fechaEmision;
      data.isPrivate = Number.parseInt(dnt.transportePuertoTipo, 10);
      data.institutionType = dnt.compradorCodigo;
      data.institution = dnt.emisorContactoCodigo;
      data.personName = dnt.emisorContactoNombre;
      data.personPosition = dnt.emisorContactoCargo;
      data.withAttachment = dnt.transporteViaTransporteCodigoTransporte;
      data.documentDetail = dnt.transporteNotas;
    }

    if (observaciones && observaciones.length) {
      data.matter = observaciones[0].observacion;
      data.observation = observaciones[1].observacion;
    }

    if (destinatarios && destinatarios.length) {
      const subjects = destinatarios
        .filter((subject) => subject.tipoDestino === '1')
        .map((subject) => ({
          subjectType: {
            value: subject.destinoCodigo,
            label: subject.destinoNombre
          },
          subject: {
            value: subject.destinoListaCodigo,
            label: subject.destinoListaNombre
          },
          subjectEmail: subject.destinoCorreo,
          subjectTypeDigitalDoc: {
            value: subject.institucionCodigo || '',
            label: subject.institucionNombre || ''
          }
        }));

      data.subjects = subjects;
      data.subjectsSelected = subjects;

      const copies = destinatarios
        .filter((subject) => subject.tipoDestino === '2')
        .map((subject) => ({
          copySubjectType: {
            value: subject.destinoCodigo,
            label: subject.destinoNombre
          },
          copySubject: {
            value: subject.destinoListaCodigo,
            label: subject.destinoListaNombre
          },
          copySubjectEmail: subject.destinoCorreo,
          copySubjectTypeDigitalDoc: {
            value: subject.institucionCodigo || '',
            label: subject.institucionNombre || ''
          }
        }));

      data.copies = copies;
      data.copiesSelected = copies;
    }

    if (dntAdjuntos && dntAdjuntos.length) {
      const main = dntAdjuntos
        .find((file) => file.tipo === 'principal');

      if (main) {
        data.mainFile = {
          mime: main.adjuntoMime,
          name: main.adjuntoNombre,
          path: main.adjuntoUrl,
          date: main.fecha
        };
      }

      data.additionalFiles = dntAdjuntos
        .filter((file) => file.tipo === 'adjunto')
        .map((file) => ({
          mime: file.adjuntoMime,
          name: file.adjuntoNombre,
          path: file.adjuntoUrl,
          date: file.fecha
        }));
    }

    if (referencias && referencias.length) {
      const relatedDocuments = referencias.map((relatedDocument) => ({
        id: relatedDocument.linea,
        type: relatedDocument.tipoDocumento,
        number: relatedDocument.folio
      }));

      data.relatedDocuments = relatedDocuments;
      data.relatedDocumentsSelected = relatedDocuments;
    }

    return data;
  },
  draftMapper(input, iutCompany, nameCompany) {
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
        transportePuertoTipo: input.isPrivate,
        compradorCodigo: input.institutionType,
        compradorArea: input.institutionTypeName,
        emisorContactoCodigo: input.institution,
        emisorContactoArea: input.institutionName,
        emisorContactoNombre: input.personName,
        emisorContactoCargo: input.personPosition,
        transporteViaTransporteCodigoTransporte: input.withAttachment,
        transporteNotas: input.documentDetail
      },
      dntObservacion: [
        {
          observacion: input.matter
        },
        {
          obsevacion: input.observation
        }
      ],
      dntEtiqueta: input.tags,
      dntDestino: [
        ...(input.subjectsSelected || []).map((subject) => {
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
            destinoListaCodigo: subject.subject.value,
            destinoListaNombre: subject.subject.label,
            destinoCorreo: subject.subjectEmail,
            ...institution
          };
        }),
        ...(input.copiesSelected || []).map((subject) => {
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
          adjuntoMime: input.mainFile.mime,
          adjuntoNombre: input.mainFile.name,
          fecha: input.mainFile.date,
          adjuntoUrl: input.mainFile.path
        },
        ...(input.additionalFiles || []).map((file) => ({
          tipo: 'adjunto',
          adjuntoMime: file.mime,
          adjuntoNombre: file.name,
          fecha: file.date,
          adjuntoUrl: file.path
        }))
      ],
      dntReferencia: (input.relatedDocumentsSelected || []).map((relatedDocument) => ({
        linea: relatedDocument.id,
        tipoDocumento: relatedDocument.type,
        folio: relatedDocument.number
      }))
    };
  }
};
