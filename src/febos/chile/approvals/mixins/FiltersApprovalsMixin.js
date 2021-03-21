import { mapGetters } from 'vuex';

const filterViews = {
  todos: {
    filtrosFijos: [
      // eslint-disable-next-line no-template-curly-in-string
      { campo: 'emisorRut', valor: '${iutEmpresa}' },
      { campo: 'tipo', tipo: 'multi', valor: ['APR'] },
      { campo: 'estado', tipo: 'multi', valor: ['1', '2', '3', '4', '5', '6'] }
    ],
    filtrosPorDefecto: [
      // { campo: 'estado', tipo: 'multi', valor: ['1', '2', '3', '4', '5', '6'] }
    ],
    filtrosHabilitados: [
      { campo: 'fechaEmision', tipo: 'rangoFecha' },
      { campo: 'numero', tipo: 'numero' },
      { campo: 'participante', tipo: 'usuarios' },
      { campo: 'solicitanteEmail', tipo: 'correo' },
      {
        campo: 'estado',
        tipo: 'multi',
        opciones: [
          { valor: '1', nombre: 'Desestimado' },
          { valor: '2', nombre: 'Preparado' },
          { valor: '3', nombre: 'Iniciado' },
          { valor: '4', nombre: 'Aprobado' },
          { valor: '5', nombre: 'Rechazado' },
          { valor: '6', nombre: 'Anulado' }
        ]
      }
    ]
  },
  mios: {
    filtrosFijos: [
      // eslint-disable-next-line no-template-curly-in-string
      { campo: 'emisorRut', valor: '${iutEmpresa}' },
      // eslint-disable-next-line no-template-curly-in-string
      { campo: 'solicitanteEmail', valor: '${correoUsuario}' },
      { campo: 'tipo', tipo: 'multi', valor: ['APR'] },
      { campo: 'estado', tipo: 'multi', valor: ['1', '2', '3', '4', '5'] }
    ],
    filtrosPorDefecto: [
      // { campo: 'estado', tipo: 'multi', valor: ['1', '2', '3', '4', '5', '6'] }
    ],
    filtrosHabilitados: [
      { campo: 'fechaEmision', tipo: 'rangoFecha' },
      { campo: 'numero', tipo: 'numero' },
      {
        campo: 'estado',
        tipo: 'multi',
        opciones: [
          { valor: '1', nombre: 'Desestimado' },
          { valor: '2', nombre: 'Preparado' },
          { valor: '3', nombre: 'Iniciado' },
          { valor: '4', nombre: 'Aprobado' },
          { valor: '5', nombre: 'Rechazado' },
          { valor: '6', nombre: 'Anulado' }
        ]
      }
    ]
  }
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
