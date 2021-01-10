import { mapGetters } from 'vuex';

const filterViews = {
  files: [{}],
  myFiles: [
    { field: 'tipo', value: 'APR' },
    { field: 'emisorRut', value: '{empresa.iut}' },
    { field: 'solicitanteEmail', value: '{usuario.correo}' },
    { field: 'estado', value: '1,2,3,4,5' },
  ],
  'en-curso': [
    { field: 'tipo', value: 'APR', },
    { field: 'emisorRut', value: '{empresa.iut}' },
    { field: 'solicitanteEmail', value: '{usuario.correo}' },
    { field: 'estado', value: '3' },
  ],
  'of-entrada': [
    { field: 'tipo', value: 'ACRE,MEMO', },
    { field: 'emisorRut', value: '{empresa.iut}' },
    { field: 'filtrarBandeja', value: 'E' },
    { field: 'estado', value: '1,3' },
  ],
  finalizados: [
    { field: 'tipo', value: 'APR' },
    { field: 'emisorRut', value: '{empresa.iut}' },
    { field: 'solicitanteEmail', value: '{usuario.correo}' },
    { field: 'estado', value: '6,4,5' },
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
      return (filterViews[view] || [])
        .map((filter) => {
          // eslint-disable-next-line no-unused-vars
          const [all, key] = /^{((\w|\.)+)}$/.exec(filter.value) || [];
          const value = key ? _.at(this, key) : filter.value;
          return `${filter.field}:${value}`;
        })
        .join('|');
    }
  }
};
