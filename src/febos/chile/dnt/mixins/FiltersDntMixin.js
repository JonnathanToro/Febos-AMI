import { mapGetters } from 'vuex';

const filterViews = {
  files: [{}],
  'en-curso': {
    filtrosFijos: [
      // eslint-disable-next-line no-template-curly-in-string
      { campo: 'emisorRut', valor: '${iutEmpresa}' }
    ],
    filtrosPorDefecto: [
      { campo: 'tipo', tipo: 'multi', valor: ['EXP', 'ACRE'] }
    ],
    filtrosHabilitados: [
      { campo: 'fechaEmision', tipo: 'rangoFecha' },
      { campo: 'numero', tipo: 'numero' },
      {
        campo: 'tipo',
        tipo: 'multi',
        opciones: [
          { valor: 'EXP', nombre: 'Expedientes' },
          { valor: 'ACRE', nombre: 'Oficina' },
        ]
      },
      { campo: 'emisorCentroCostoNumero', tipo: 'tipoDocumento' }, // tipo de documento
      // { campo: 'emisorSucursalDireccion', tipo: 'documento' }, // documento
      {
        campo: 'transportePuertoTipo', // es privado
        tipo: 'multi',
        opciones: [
          { nombre: 'Documento privado', valor: '1' },
          { nombre: 'Documento público', valor: '0' }
        ]
      },
      { campo: 'compradorCodigo', tipo: 'tipoInstitucion' }, // tipo institucion
      // { campo: 'emisorContactoArea', tipo: 'institucion' }, // nombre institucion
      { campo: 'emisorContactoNombre', tipo: 'texto' }, // nombre remitente
      { campo: 'emisorContactoCargo', tipo: 'texto' }, // cargo remitente
      {
        campo: 'transporteViaTransporteCodigoTransporte', // acompaña fisico
        tipo: 'multi',
        opciones: [
          { nombre: 'Acompaña físico', valor: '1' },
          { nombre: 'No acompaña físico', valor: '0' }
        ]
      },
      {
        campo: 'destinoCodigo', // tipos de destino
        tipo: 'multi',
        opciones: [
          { nombre: 'Funcionarios', valor: 'usuarios' },
          { nombre: 'Unidades', valor: 'unidades' },
          { nombre: 'Oficinas de partes', valor: 'oficinas' },
          { nombre: 'DocDigital', valor: 'docDigital' },
          { nombre: 'Ministerios', valor: 'ministerios' },
          { nombre: 'Empresas', valor: 'empresas' },
          { nombre: 'Personas', valor: 'personas' }
        ]
      },
      { campo: 'destinoUsuarios', tipo: 'destinoUsuarios' }, // tipo de destino usuarios
      { campo: 'destinoGrupos', tipo: 'destinoGrupos' }, // tipo de destino de grupo
      { campo: 'destinoCorreos', tipo: 'destinoCorreos' }, // tipo de destino de ministerio, persona o empresa
    ]
  },
  'of-entrada': [
    { field: 'tipo', value: 'EXP', },
    { field: 'emisorRut', value: '{empresa.iut}' },
    { field: 'filtrarBandeja', value: 'E' },
    { field: 'estado', value: '1,3' },
  ],
  finalizados: [
    { field: 'tipo', value: 'EXP' },
    { field: 'emisorRut', value: '{empresa.iut}' },
    { field: 'estado', value: '8,9' },
  ],
  entrada: [
    { field: 'tipo', value: 'DDD' }
  ]
};

export default {
  data() {
    return filterViews;
  },
  computed: {
    ...mapGetters('Usuario', { usuario: 'currentUser' }),
    ...mapGetters('Empresas', { empresa: 'company' }),
  },
  methods: {
    getFilterView(view) {
      return filterViews[view];
    }
  }
};
