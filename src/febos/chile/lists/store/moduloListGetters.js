export const documentTypesState = (state) => ({
  ...state.documentTypes,
  list: state.documentTypes.list
    .sort(({ label: a }, { label: b }) => a.localeCompare(b))
});
export const documentsState = (state) => ({
  ...state.documents,
  list: state.documents.list
    .sort(({ label: a }, { label: b }) => a.localeCompare(b))
});

export const institutionTypesState = (state) => ({
  ...state.institutionTypes,
  list: state.institutionTypes.list
    .sort(({ label: a }, { label: b }) => a.localeCompare(b))
});
export const institutionsState = (state) => ({
  ...state.institutions,
  list: state.institutions.list
    .sort(({ label: a }, { label: b }) => a.localeCompare(b))
});

export const subjectTypesState = (state) => ({
  ...state.subjectTypes,
  list: state.subjectTypes.list
    .sort(({ label: a }, { label: b }) => a.localeCompare(b))
});
export const subjectsState = (state) => ({
  ...state.subjects,
  list: state.subjects.list
    .sort(({ label: a }, { label: b }) => a.localeCompare(b))
});

export const institutionsDocDigitalState = (state) => ({
  ...state.institutionsDocDigital,
  list: state.institutionsDocDigital.list
    .sort(({ label: a }, { label: b }) => a.localeCompare(b))
});
