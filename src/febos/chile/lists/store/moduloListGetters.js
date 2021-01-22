export const documentTypesState = (state) => state.documentTypes;
export const documentsState = (state) => state.documents;
export const institutionTypesState = (state) => state.institutionTypes;
export const institutionsState = (state) => state.institutions;
export const subjectTypesState = (state) => state.subjectTypes;
export const subjectsState = (state) => {
  const subjects = [];
  (state.subjects.list || []).map((subject) => {
    const parserSubject = {};
    if (state.subjects.type === 'usuarios') {
      parserSubject.valor = subject.correo;
      parserSubject.opcionId = subject.id;
      parserSubject.descripcion = subject.nombre;
    }
    if (state.subjects.type === 'unidades' || state.subjects.type === 'oficinas') {
      parserSubject.valor = subject.id;
      parserSubject.opcionId = subject.id;
      parserSubject.descripcion = subject.nombre;
    }
    if (state.subjects.type === 'docDigital') {
      parserSubject.valor = subject.valor;
      parserSubject.opcionId = subject.opcionId;
      parserSubject.descripcion = subject.descripcion;
    }
    if (state.subjects.type === 'ministerios') {
      parserSubject.valor = subject.valor;
      parserSubject.opcionId = subject.opcionId;
      parserSubject.descripcion = subject.descripcion;
    }
    return subjects.push(parserSubject);
  });

  const newStateSubject = {
    list: subjects,
    loading: false
  };
  return newStateSubject;
};
export const institutionsDocDigitalState = (state) => state.institutionsDocDigital;
