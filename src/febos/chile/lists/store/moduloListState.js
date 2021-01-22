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
        opcionId: '0',
        valor: 'usuarios',
        descripcion: 'Funcionarios'
      },
      {
        opcionId: '1',
        valor: 'unidades',
        descripcion: 'Unidades'
      },
      {
        opcionId: '2',
        valor: 'oficinas',
        descripcion: 'Oficina de Partes'
      },
      {
        opcionId: '3',
        valor: 'docDigital',
        descripcion: 'DocDigital'
      },
      {
        opcionId: '4',
        valor: 'ministerios',
        descripcion: 'Ministerio u Organismos'
      },
      {
        opcionId: '5',
        valor: 'empresas',
        descripcion: 'Proveedores o Empresas'
      },
      {
        opcionId: '6',
        valor: 'personas',
        descripcion: 'Personas'
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
  }
};
