export default {
  documentTypes: {
    list: [],
    loading: false
  },
  documents: {
    list: [],
    loading: false
  },
  institutionTypes: {
    list: [],
    loading: false
  },
  institutions: {
    list: [],
    loading: false
  },
  subjectTypes: {
    list: [
      {
        id: '0',
        value: 'usuarios',
        label: 'Funcionarios'
      },
      {
        id: '1',
        value: 'unidades',
        label: 'Unidades'
      },
      {
        id: '2',
        value: 'oficinas',
        label: 'Oficina de Partes'
      },
      {
        id: '3',
        value: 'docDigital',
        label: 'DocDigital'
      },
      {
        id: '4',
        value: 'ministerios',
        label: 'Ministerio u Organismos'
      },
      {
        id: '5',
        value: 'empresas',
        label: 'Proveedores o Empresas'
      },
      {
        id: '6',
        value: 'personas',
        label: 'Personas'
      }
    ],
    loading: false
  },
  subjects: {
    type: '',
    list: [],
    loading: false
  },
  institutionsDocDigital: {
    list: [],
    loading: false
  },
  groups: {
    list: [],
    loading: false
  },
  users: {
    list: [],
    loading: false
  },
  activities: {
    list: [],
    loading: false
  },
  activityStates: {
    list: [],
    loading: false
  },
};
